import Link from "next/link";

export default function ProductCard({ product }) {
  // Slug tek başına benzersiz olmayabilir; ID ekleyerek her ürün için ayrı adres üret.
  const productPath = `/urun/${product.slug || "urun"}-${String(product.id || "").toLowerCase()}`;
  return (
    <Link href={productPath} className="product-card">
      <div className="product-photo" style={{ backgroundImage: `url(${product.image})` }} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.shortDescription}</p>
        <span className="product-arrow">→</span>
      </div>
    </Link>
  );
}
