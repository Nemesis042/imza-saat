const movementBrands = [
  ["Miyota", "miyota.jpg"],
  ["ISA Swiss", "isa-swiss.jpg"],
  ["Ronda", "ronda.jpg"],
  ["Epson", "epson.jpg"],
  ["ETA", "eta.jpg"],
];
const batteryBrands = [
  ["Maxell", "maxell.jpg"],
  ["Renata", "renata.jpg"],
  ["Murata", "murata.jpg"],
  ["Seizaiken", "seizaiken.jpg"],
  ["Rayovac", "rayovac.jpg"],
  ["Duracell", "duracell.jpg"],
  ["GP Batteries", "gp-batteries.png"],
];

function LogoGrid({ brands, label, className }) {
  return (
    <div className={`trusted-brand-group ${className}`}>
      <h3>{label}</h3>
      <div className="trusted-brand-logos">
        {brands.map(([name, file]) => (
          <div className="trusted-brand-tile" key={name}>
            <img src={`/brand-logos/${file}`} alt={name} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BrandShowcase() {
  return (
    <section className="trusted-brands" aria-labelledby="trusted-brands-title">
      <div className="trusted-brands-intro">
        <span className="eyebrow">GÜVENİLİR MARKALAR</span>
        <h2 id="trusted-brands-title">Kalitenin arkasındaki isimler.</h2>
        <p>Saat mekanizmaları ve pil seçeneklerinde tanınan markaları bir araya getiriyoruz.</p>
      </div>
      <div className="trusted-brands-groups">
        <LogoGrid brands={movementBrands} label="Mekanizma Markaları" className="trusted-movements" />
        <LogoGrid brands={batteryBrands} label="Pil Markaları" className="trusted-batteries" />
      </div>
    </section>
  );
}
