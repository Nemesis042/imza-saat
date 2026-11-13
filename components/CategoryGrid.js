"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { categories as seed } from "@/lib/catalog";
import { getCategoryCovers } from "@/lib/catalog-data";

export default function CategoryGrid() {
  const [covers, setCovers] = useState({});

  useEffect(() => {
    let active = true;
    getCategoryCovers()
      .then((value) => { if (active) setCovers(value); })
      .catch((error) => console.error("Kategori kapakları yüklenemedi:", error));
    return () => { active = false; };
  }, []);

  return (
    <section className="section collection-section" id="koleksiyonlar">
      <div className="section-heading">
        <span />
        <div><small>ÜRÜN KATEGORİLERİ</small><h2>Koleksiyonlarımız</h2></div>
        <span />
      </div>
      <div className="category-grid approved-category-grid">
        {seed.map((category) => (
          <Link
            draggable="false"
            href={`/kategori/${category.slug}`}
            className="category-card"
            key={category.slug}
          >
            <div
              className="category-photo"
              style={{ backgroundImage: `url(${covers[category.slug] || category.image})` }}
            />
            <div className="category-overlay">
              <h3>{category.title}</h3>
              <span aria-hidden="true">↗</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
