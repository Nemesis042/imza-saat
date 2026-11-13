import { Watch, Link2, Layers, BatteryCharging, Settings, Wrench, Cog, SlidersHorizontal } from "lucide-react";

const groups = [
  ["Deri Kayışlar", "Hakiki deri, şık ve dayanıklı kayış seçenekleri.", Watch],
  ["Metal Kordonlar", "Klasik ve modern metal kordon modelleri.", Link2],
  ["Silikon Kayışlar", "Hafif, esnek ve konforlu kullanım.", Layers],
  ["Saat Pilleri", "Farklı marka ve ölçülerde pil çeşitleri.", BatteryCharging],
  ["Saat Makineleri", "Çeşitli mekanizma modelleri.", Settings],
  ["Saatçi El Aletleri", "Profesyonel saat tamir ve bakım aletleri.", Wrench],
  ["Saat Yedek Aksamları", "Saat tamiri için gerekli yedek parçalar.", Cog],
  ["Pim Çeşitleri", "Farklı ölçü ve tiplerde pim seçenekleri.", SlidersHorizontal],
];

export default function BrandShowcase() {
  return (
    <section className="brand-showcase product-varieties">
      <div className="section-heading">
        <span />
        <div><small>İMZA SAAT ÜRÜN GRUPLARI</small><h2>Ürün Çeşitlerimiz</h2></div>
        <span />
      </div>
      <div className="variety-grid">
        {groups.map(([title, description, Icon]) => (
          <article className="variety-item" key={title}>
            <Icon aria-hidden="true" />
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
