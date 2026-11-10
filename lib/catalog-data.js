import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { categories as seedCategories, products as seedProducts, featuredProductIds } from "@/lib/catalog";

const PRODUCT_TABLE = "imza_products";
const COVER_TABLE = "imza_category_covers";
const SETTINGS_TABLE = "imza_site_settings";

export async function getProducts() {
  if (!isSupabaseConfigured) return seedProducts;
  const { data, error } = await supabase.from(PRODUCT_TABLE).select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: true });
  if (error) { console.error("Ürünler Supabase'den okunamadı:", error.message); return seedProducts; }
  return data?.length ? data.map(fromProduct) : seedProducts;
}
export async function getCategoryCovers() {
  if (!isSupabaseConfigured) return {};
  const { data, error } = await supabase.from(COVER_TABLE).select("slug,image_url");
  if (error) { console.error("Kategori kapakları okunamadı:", error.message); return {}; }
  return Object.fromEntries((data || []).map(x => [x.slug, x.image_url]));
}
export async function getSiteSettings() {
  const defaults = { about_image: "", about_text: "Saat kayışları, kordonlar ve saat aksesuarlarında özenle seçilmiş ürünleri bir araya getiriyoruz. İmza Saat olarak amacımız, her saate kendi karakterini yansıtan doğru detayları sunmak.", featured_ids: featuredProductIds };
  if (!isSupabaseConfigured) return defaults;
  const { data, error } = await supabase.from(SETTINGS_TABLE).select("key,value");
  if (error) { console.error("Site ayarları okunamadı:", error.message); return defaults; }
  return { ...defaults, ...Object.fromEntries((data || []).map(x => [x.key, x.value])) };
}
export function fromProduct(p) {
  return { ...p, categoryLabel: p.category_label, shortDescription: p.short_description, image: p.image_url || "" };
}
export function toProduct(p) {
  return { id:p.id, slug:p.slug, name:p.name, category:p.category, category_label:p.categoryLabel || "", short_description:p.shortDescription || "", description:p.description || "", image_url:p.image || "", featured:!!p.featured, sort_order:Number(p.sort_order || 0) };
}
export async function saveProduct(product, isNew=false) {
  const row = toProduct(product);
  const result = isNew
    ? await supabase.from(PRODUCT_TABLE).insert(row)
    : await supabase.from(PRODUCT_TABLE).upsert(row, { onConflict:"id" });
  if (result.error) throw result.error;
}
export async function deleteProduct(id) {
  const { error } = await supabase.from(PRODUCT_TABLE).delete().eq("id", id);
  if (error) throw error;
}
export async function saveCategoryCover(slug, image_url) {
  const { error } = await supabase.from(COVER_TABLE).upsert({ slug, image_url }, { onConflict:"slug" });
  if (error) throw error;
}
export async function saveSetting(key, value) {
  const { error } = await supabase.from(SETTINGS_TABLE).upsert({ key, value }, { onConflict:"key" });
  if (error) throw error;
}
export async function uploadImage(file, folder="products") {
  if (!supabase) throw new Error("Supabase bağlantısı yapılandırılmamış.");
  const ext = (file.name?.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g,"") || "jpg";
  const path = `${folder}/${Date.now()}-${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("product-images").upload(path, file, { cacheControl:"3600", upsert:false, contentType:file.type || "image/jpeg" });
  if (error) throw error;
  const { data } = supabase.storage.from("product-images").getPublicUrl(path);
  return data.publicUrl;
}


export async function migrateLegacyLocalStorage() {
  if (!isSupabaseConfigured || typeof window === "undefined") return;
  const { data: existing, error } = await supabase.from(PRODUCT_TABLE).select("id").limit(1);
  if (error) throw error;
  if (existing?.length) return;
  let legacyProducts = [];
  try { legacyProducts = JSON.parse(localStorage.getItem("imzaSaatProductsV1") || "[]"); } catch {}
  const products = legacyProducts.length ? legacyProducts : seedProducts;
  async function migrateImage(value, folder) {
    if (!value || !value.startsWith("data:")) return value || "";
    const blob = await (await fetch(value)).blob();
    const file = new File([blob], `legacy-${Date.now()}.jpg`, { type: blob.type || "image/jpeg" });
    return uploadImage(file, folder);
  }
  if (products.length) {
    const rows = await Promise.all(products.map(async (p, i) => ({ ...toProduct({ ...p, image: await migrateImage(p.image, "products") }), sort_order:i })));
    const result = await supabase.from(PRODUCT_TABLE).upsert(rows, { onConflict:"id" });
    if (result.error) throw result.error;
  }
  const read = key => { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } };
  const covers = read("imzaSaatCategoryCoversV1") || {};
  for (const [slug, image_url] of Object.entries(covers)) await saveCategoryCover(slug, await migrateImage(image_url, "categories"));
  const aboutImage = await migrateImage(localStorage.getItem("imzaSaatAboutImageV1") || "", "about");
  const aboutText = localStorage.getItem("imzaSaatAboutTextV1");
  const featured = read("imzaSaatFeaturedV1");
  if (aboutImage) await saveSetting("about_image", aboutImage);
  if (aboutText) await saveSetting("about_text", aboutText);
  if (featured) await saveSetting("featured_ids", featured);
}
