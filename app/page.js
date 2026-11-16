import Header from "@/components/Header";
import ContactBar from "@/components/ContactBar";
import CategoryGrid from "@/components/CategoryGrid";
import ProductVarieties from "@/components/ProductVarieties";
import FeaturedProducts from "@/components/FeaturedProducts";
import AboutSection from "@/components/AboutSection";
import BrandShowcase from "@/components/BrandShowcase";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <ContactBar />
      <main>
        <CategoryGrid />
        <ProductVarieties />
        <FeaturedProducts />
        <AboutSection />
        <BrandShowcase />
      </main>
      <Footer />
    </>
  );
}
