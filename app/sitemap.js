
import { getProducts } from "@/lib/catalog-data";
import { categories } from "@/lib/catalog";

const BASE_URL = "https://www.imzasaat.com";

export default async function sitemap() {
  const products = await getProducts();

  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/hakkimizda`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/iletisim`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const categoryPages = categories.map((category) => ({
    url: `${BASE_URL}/kategori/${category.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productPages = products
    .filter((product) => product.slug)
    .map((product) => ({
      url: `${BASE_URL}/urun/${product.slug}`,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  return [...staticPages, ...categoryPages, ...productPages];
}
