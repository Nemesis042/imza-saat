"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
const links = [
  ["Ana Sayfa", "/"], ["Deri Kayışlar", "/kategori/deri-kayislar"],
  ["Metal Kordonlar", "/kategori/metal-kordonlar"], ["Silikon Kayışlar", "/kategori/silikon-kayislar"],
  ["Saat Pilleri", "/kategori/piller"], ["Saat Makineleri", "/kategori/saat-makineleri"],
  ["Diğer Kategoriler", "/#koleksiyonlar"], ["Hakkımızda", "/hakkimizda"],
];
export default function Header() {
 const [open,setOpen]=useState(false);
 return <header className={`site-header${open?" mobile-menu-open":""}`}>
  <Link href="/" className="brand brand-image" aria-label="İmza Saat ana sayfa" onClick={()=>setOpen(false)}><img src="/brand/imza-saat-logo-transparent.png" alt="İmza Saat Aksesuarları"/></Link>
  <button className="mobile-menu-toggle" type="button" aria-label={open?"Menüyü kapat":"Menüyü aç"} aria-expanded={open} onClick={()=>setOpen(v=>!v)}>{open?<X size={23}/>:<Menu size={23}/>}</button>
  <nav className="desktop-nav" aria-label="Ana menü">{links.map(([label,href])=><Link key={href+label} href={href} onClick={()=>setOpen(false)}>{label}</Link>)}</nav>
  <Link className="header-contact" href="/iletisim">Bize Ulaşın ↗</Link>
 </header>;
}
