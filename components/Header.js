"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  ["Ana Sayfa", "/"],
  ["Deri Kayışlar", "/kategori/deri-kayislar"],
  ["Metal Kordonlar", "/kategori/metal-kordonlar"],
  ["Silikon Kayışlar", "/kategori/silikon-kayislar"],
  ["Hakkımızda", "/#hakkimizda"],
  ["İletişim", "/iletisim"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className={`site-header${open ? " mobile-menu-open" : ""}`}>
      <Link href="/" className="brand" onClick={() => setOpen(false)}>
        <span>İMZA SAAT</span>
        <small>SAAT KAYIŞLARI & AKSESUARLAR</small>
      </Link>
      <button className="mobile-menu-toggle" type="button" aria-label={open ? "Menüyü kapat" : "Menüyü aç"} aria-expanded={open} onClick={() => setOpen(v => !v)}>
        {open ? <X size={23} strokeWidth={1.6} /> : <Menu size={23} strokeWidth={1.6} />}
      </button>
      <nav className="desktop-nav" aria-label="Ana menü">
        {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
      </nav>
      <Link className="header-contact" href="/iletisim">Bize Ulaşın ↗</Link>
    </header>
  );
}
