"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products as seed } from "@/lib/catalog";
import { getProducts } from "@/lib/catalog-data";
export default function ProductPage() {
  const { slug } = useParams();
  const [items, setItems] = useState(seed);
  const [ready, setReady] = useState(false);
  useEffect(() => { let active=true; getProducts().then(data=>{if(active){setItems(data);setReady(true)}}).catch(()=>setReady(true)); return()=>{active=false}; }, []);
  const routeValue = Array.isArray(slug) ? slug[0] : slug;
  const productId = routeValue?.match(/-(urn-[a-z0-9-]+)$/i)?.[1]?.toUpperCase();
  const product = (productId && items.find(p => String(p.id).toUpperCase() === productId)) || items.find(p => p.slug === routeValue);
  return <><Header/><main className="inner-page product-detail">
    {!ready ? <p>Ürün yükleniyor...</p> : product ? <>
      <div className="detail-image" style={{ backgroundImage: `url(${product.image})` }} />
      <div className="detail-copy"><span className="eyebrow">{product.categoryLabel || product.category}</span><h1>{product.name}</h1><p>{product.description || product.shortDescription}</p><a className="button button-dark" href="/iletisim">Bize Ulaşın →</a></div>
    </> : <div className="detail-copy"><span className="eyebrow">ÜRÜN KATALOĞU</span><h1>Ürün bulunamadı</h1><p>Bu ürün kaldırılmış veya bağlantısı değişmiş olabilir.</p><a className="button button-dark" href="/">Ana sayfaya dön →</a></div>}
  </main><Footer/></>;
}
