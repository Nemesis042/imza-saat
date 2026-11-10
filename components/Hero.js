"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
const slides = [
 { image:"https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1800&q=90", eyebrow:"SAAT AKSESUARLARINDA ÖZENLİ SEÇİM", title:<>Saatinize<br/>Karakter Katın.</>, text:"İmza Saat, farklı tarzlara ve saat modellerine uyum sağlayan kayış ve aksesuarları bir araya getirir.", href:"/kategori/deri-kayislar", cta:"Koleksiyonu Keşfet" },
 { image:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1800&q=90", eyebrow:"ZAMANSIZ TASARIMLAR", title:<>Her Detayda<br/>Kendi Tarzınız.</>, text:"Klasik çizgilerden modern dokunuşlara, saatinizi tamamlayan parçaları keşfedin.", href:"/kategori/metal-kordonlar", cta:"Metal Kordonları Gör" },
 { image:"https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1800&q=90", eyebrow:"GÜNLÜK STİLİNİZİ TAMAMLAYIN", title:<>Tarzınıza Uygun<br/>Dokunuşlar.</>, text:"Farklı kullanım alışkanlıkları ve stiller için özenle seçilmiş saat aksesuarları.", href:"/kategori/silikon-kayislar", cta:"Koleksiyonları İncele" }
];
export default function Hero(){
 const [active,setActive]=useState(0);
 useEffect(()=>{const timer=setInterval(()=>setActive(v=>(v+1)%slides.length),6500);return()=>clearInterval(timer)},[]);
 const slide=slides[active];
 return <section className="hero">
  <div className="hero-copy" key={`copy-${active}`}><span className="eyebrow">{slide.eyebrow}</span><h1>{slide.title}</h1><p>{slide.text}</p><Link className="button button-dark" href={slide.href}>{slide.cta} <span>→</span></Link>
   <div className="hero-index"><b>{String(active+1).padStart(2,"0")}</b><div className="hero-progress">{slides.map((s,i)=><button key={i} aria-label={`${i+1}. görsel`} onClick={()=>setActive(i)} className={i===active?"active":""}/>)}</div><span>03</span></div>
  </div>
  <div className="hero-visual" aria-label="Saat ve aksesuar görselleri">{slides.map((s,i)=><div key={s.image} className={`hero-photo-layer ${i===active?"is-active":""}`} style={{backgroundImage:`url(${s.image})`}} />)}</div>
 </section>
}
