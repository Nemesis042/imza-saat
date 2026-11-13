import Link from "next/link";
import { Watch, Link2, Layers3, BatteryCharging, Cog, Wrench, Settings2, Pin } from "lucide-react";
import { categories } from "@/lib/catalog";
const icons = [Watch, Link2, Layers3, BatteryCharging, Cog, Wrench, Settings2, Pin];
export default function ProductTypes() {
  return <section className="product-types-section" aria-labelledby="product-types-title">
    <div className="section-heading"><span/><div><h2 id="product-types-title">Ürün Çeşitlerimiz</h2></div><span/></div>
    <div className="product-types-grid">{categories.map((category, index) => {
      const Icon = icons[index] || Watch;
      return <Link href={`/kategori/${category.slug}`} className="product-type" key={category.slug}>
        <Icon aria-hidden="true" strokeWidth={1.6}/><h3>{category.title}</h3><p>{category.description}</p>
      </Link>;
    })}</div>
  </section>;
}
