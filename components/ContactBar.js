import { Clock, Instagram, Mail, MapPin, MessageCircle } from "lucide-react";

const address = "Tahtakale Mah. Tomruk Sk. No:3 D:110 Vakıfhan Zemin Kat, Fatih, İstanbul";
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

const contacts = [
  { key: "location", title: "Adresimiz", detail: "Tahtakale Mah. Tomruk Sk. · Fatih / İstanbul", href: mapUrl, Icon: MapPin, external: true },
  { key: "whatsapp", title: "WhatsApp", detail: "+90 535 794 35 94", href: "https://wa.me/905357943594", Icon: MessageCircle, external: true },
  { key: "email", title: "E-posta", detail: "imzasaatt@gmail.com", href: "mailto:imzasaatt@gmail.com", Icon: Mail },
  { key: "instagram", title: "Instagram", detail: "@imza_saat", href: "https://instagram.com/imza_saat", Icon: Instagram, external: true },
];

const businessHours = [
  "Hafta içi: 08:00–18:30",
  "Cumartesi: 08:00–17:00",
  "Pazar: Kapalı",
];

export default function ContactBar() {
  return (
    <section className="top-contact" aria-label="İmza Saat iletişim bilgileri">
      <div className="top-contact-inner">
        {contacts.map(({ key, title, detail, href, Icon, external }) => (
          <a className={`top-contact-item top-contact-${key}`} href={href} key={key} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
            <Icon aria-hidden="true" />
            <span><b>{title}</b><small>{detail}</small></span>
          </a>
        ))}
        <div className="top-contact-item top-contact-hours">
          <Clock aria-hidden="true" />
          <span><b>Çalışma Saatleri</b><small>{businessHours.join(" · ")}</small></span>
        </div>
      </div>
    </section>
  );
}
