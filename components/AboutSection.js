"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Store } from "lucide-react";
import { getSiteSettings } from "@/lib/catalog-data";

const defaultText = "İmza Saat, saat aksesuarları ve yedek parçaları alanındaki ürün çeşitliliğiyle müşterilerine hizmet vermektedir.";

function asRichHtml(value) {
  if (!value) return `<p>${defaultText}</p>`;
  // Rich text already saved by the admin editor.
  if (/<(p|div|h[1-6]|ul|ol|li|strong|b|em|i|br)\b/i.test(value)) return value;
  // Older plain-text settings are displayed with their original paragraph breaks.
  return value
    .split(/\n\s*\n/)
    .map(paragraph => `<p>${paragraph.replace(/\n/g, "<br>")}</p>`)
    .join("");
}

export default function AboutSection() {
  const [image, setImage] = useState("");
  const [copy, setCopy] = useState(defaultText);

  useEffect(() => {
    let active = true;
    getSiteSettings().then(settings => {
      if (!active) return;
      setImage(settings.about_image || "");
      setCopy(settings.about_text || defaultText);
    }).catch(error => console.error("Hakkımızda bilgisi okunamadı:", error));
    return () => { active = false; };
  }, []);

  return (
    <section className="home-about section" id="hakkimizda">
      <div className="home-about-heading">
        <span className="eyebrow">İMZA SAAT · BİZ KİMİZ?</span>
        <h2>Hakkımızda</h2>
      </div>
      <div className="home-about-layout">
        <div className={`home-about-photo${image ? " has-image" : " is-placeholder"}`}>
          {image ? <img src={image} alt="İmza Saat mağazası" /> : (
            <div className="home-about-photo-placeholder">
              <Store size={34} strokeWidth={1.1}/>
              <span>MAĞAZAMIZDAN BİR KARE</span>
              <small>Dükkân fotoğrafı yönetim panelinden eklenebilir.</small>
            </div>
          )}
          <span className="home-about-photo-caption">İMZA SAAT · İSTANBUL</span>
        </div>
        <div className="home-about-copy">
          <span className="eyebrow">ZAMANSIZ DETAYLAR</span>
          <article className="home-about-rich rich-content" dangerouslySetInnerHTML={{ __html: asRichHtml(copy) }} />
          <Link href="/hakkimizda" className="home-about-link">Hakkımızda daha fazlası <ArrowUpRight size={17}/></Link>
        </div>
      </div>
    </section>
  );
}
