const movements = [
  ["MIYOTA", "/brand-logos/miyota.jpg"],
  ["ISA SWISS", "/brand-logos/isa-swiss.jpg"],
  ["RONDA", "/brand-logos/ronda.jpg"],
  ["EPSON", "/brand-logos/epson.jpg"],
  ["ETA", "/brand-logos/eta.png"],
];
const batteries = [
  ["maxell", "/brand-logos/maxell.jpg"],
  ["renata", "/brand-logos/renata.png"],
  ["muRata", "/brand-logos/murata.jpg"],
  ["SEIZAIKEN", "/brand-logos/seizaiken.jpg"],
  ["RAYOVAC", "/brand-logos/rayovac.jpg"],
  ["DURACELL", "/brand-logos/duracell.jpg"],
  ["GP Batteries", "/brand-logos/gp-batteries.png"],
];

function BrandRow({ title, subtitle, brands, kind }) {
  return (
    <section className={`brand-group brand-group-${kind}`}>
      <div className="brand-heading"><span>{subtitle}</span><h3>{title}</h3></div>
      <div className="brand-logos">
        {brands.map(([name, src]) => (
          <div className="brand-logo-tile" key={name} title={name}>
            <img src={src} alt={`${name} logosu`} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function BrandShowcase() {
  return (
    <section className="brand-showcase">
      <div className="brand-intro">
        <span className="eyebrow">GÜVENİLİR MARKALAR</span>
        <h2>Kalitenin arkasındaki<br />isimler.</h2>
        <p>Saat mekanizmaları ve pil seçeneklerinde tanınan markaları bir araya getiriyoruz.</p>
      </div>
      <div className="brand-groups">
        <BrandRow title="Saat Makineleri" subtitle="MEKANİZMA MARKALARI" brands={movements} kind="movements" />
        <BrandRow title="Saat Pilleri" subtitle="PİL MARKALARI" brands={batteries} kind="batteries" />
      </div>
    </section>
  );
}
