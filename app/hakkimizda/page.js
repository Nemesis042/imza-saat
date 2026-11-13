import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteSettings } from "@/lib/catalog-data";
export const metadata = { title: "Hakkımızda", description: "İmza Saat hakkında bilgi edinin." };
function richHtml(value) {
  if (!value) return "<p>İmza Saat olarak saat aksesuarları ve yedek parçalarını özenle bir araya getiriyoruz.</p>";
  if (/<(p|div|h[1-6]|ul|ol|li|strong|b|em|i|br)\b/i.test(value)) return value;
  return value.split(/\n\s*\n/).map(part => `<p>${part.replace(/\n/g, "<br>")}</p>`).join("");
}
export default async function About() {
  const settings = await getSiteSettings();
  return <><Header/><main className="inner-page text-page about-page"><span className="eyebrow">İMZA SAAT · BİZ KİMİZ?</span><h1>Hakkımızda</h1>{settings.about_image && <img className="about-page-image" src={settings.about_image} alt="İmza Saat mağazası"/>}<article className="rich-content" dangerouslySetInnerHTML={{__html:richHtml(settings.about_text)}}/></main><Footer/></>;
}
