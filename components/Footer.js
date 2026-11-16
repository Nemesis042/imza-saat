import { Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
const address = "Tahtakale Mah. Tomruk Sk. No:3 D:110 Vakıfhan Zemin Kat, Fatih / İstanbul";
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
export default function Footer(){return <footer className="site-footer footer-contact-panel">
 <div className="footer-brand"><img src="/brand/imza-saat-logo-transparent.png" alt="İmza Saat Aksesuarları"/><p>Saatte güven, detaylarda kalite.</p></div>
 <div className="footer-contact-item"><MapPin/><div><b>Adresimiz</b><a href={mapUrl} target="_blank" rel="noreferrer">Tahtakale Mah. Tomruk Sk.<br/>No:3 D:110 Vakıfhan Zemin Kat<br/>Fatih / İstanbul</a></div></div>
 <div className="footer-contact-item"><MessageCircle/><div><b>WhatsApp</b><a href="https://wa.me/905357943594" target="_blank" rel="noreferrer">+90 535 794 35 94</a></div></div>
 <div className="footer-contact-item"><Mail/><div><b>E-posta</b><a href="mailto:imzasaatt@gmail.com">imzasaatt@gmail.com</a></div></div>
 <div className="footer-contact-item"><Instagram/><div><b>Instagram</b><a href="https://instagram.com/imza_saat" target="_blank" rel="noreferrer">@imza_saat</a></div></div>
 <div className="copyright">© {new Date().getFullYear()} İmza Saat. Tüm hakları saklıdır.</div>
 </footer>}
