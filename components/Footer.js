import Link from "next/link";
import { Instagram, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
export default function Footer(){return <footer className="site-footer">
 <div className="footer-brand"><strong>İMZA SAAT</strong><span>SAAT KAYIŞLARI & AKSESUARLAR</span><p>Saatinize karakter katan detaylar.</p></div>
 <div className="footer-links"><b>KEŞFET</b><Link href="/kategori/deri-kayislar">Deri Kayışlar</Link><Link href="/kategori/metal-kordonlar">Metal Kordonlar</Link><Link href="/kategori/silikon-kayislar">Silikon Kayışlar</Link><Link href="/kategori/piller">Saat Pilleri</Link><Link href="/kategori/saat-makineleri">Saat Makineleri</Link></div>
 <div className="footer-contact"><b>İLETİŞİM</b><a href="tel:+905323995319"><Phone size={15}/>0532 399 53 19</a><a href="mailto:o.zbek@hotmail.com"><Mail size={15}/>o.zbek@hotmail.com</a><a href="https://instagram.com/imza_saat" target="_blank" rel="noreferrer"><Instagram size={15}/>@imza_saat</a><a href="https://wa.me/905323995319" target="_blank" rel="noreferrer"><MessageCircle size={15}/>WhatsApp üzerinden yazın</a><p><MapPin size={15}/> <span>Tahtakale Mah. Tomruk Sk.<br/>No:3 D:110 Vakıfhan Zemin Kat<br/>Fatih / İstanbul</span></p></div>
 <div className="copyright">© {new Date().getFullYear()} İmza Saat. Tüm hakları saklıdır.</div>
 </footer>}
