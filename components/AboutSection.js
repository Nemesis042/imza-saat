"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Store } from "lucide-react";

import { getSiteSettings } from "@/lib/catalog-data";
const defaultText = "Saat kayışları, kordonlar ve saat aksesuarlarında özenle seçilmiş ürünleri bir araya getiriyoruz. İmza Saat olarak amacımız, her saate kendi karakterini yansıtan doğru detayları sunmak.";

export default function AboutSection() {
  const [image, setImage] = useState("");
  const [copy, setCopy] = useState(defaultText);
  useEffect(() => {
    let active = true;
    getSiteSettings().then(settings => {
      if (!active) return;
      setImage(settings.about_image || "");
      setCopy(settings.about_text || defaultText);
    });
    return () => { active = false; };
  }, []);

  return (
    <section className="home-about section" id="hakkimizda">
      <div className="home-about-heading">
        <span className="eyebrow">İMZA SAAT · BİZ KİMİZ?</span>
        <h2>Detaylarda<br/><em>saklı bir imza.</em></h2>
      </div>
      <div className="home-about-layout">
        <div className={`home-about-photo${image ? " has-image" : " is-placeholder"}`}>
          {image ? <img src={image} alt="İmza Saat mağazası" /> : <div className="home-about-photo-placeholder"><Store size={34} strokeWidth={1.1}/><span>MAĞAZAMIZDAN BİR KARE</span><small>Dükkân fotoğrafı yönetim panelinden eklenebilir.</small></div>}
          <span className="home-about-photo-caption">İMZA SAAT · İSTANBUL</span>
        </div>
        <div className="home-about-copy">
          <span className="eyebrow">ZAMANSIZ DETAYLAR</span>
          <p>{copy}</p>
          <p className="home-about-note">Kayıştan kordonlara, saat makinelerinden pillere uzanan seçkimizle saat dünyasının tamamlayıcı parçalarını bir araya getiriyoruz.</p>
          <Link href="/iletisim" className="home-about-link">Bizimle iletişime geçin <ArrowUpRight size={17}/></Link>
        </div>
      </div>
    </section>
  );
}
