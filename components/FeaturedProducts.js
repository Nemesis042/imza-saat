"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products as seed, featuredProductIds } from "@/lib/catalog";
import { getProducts, getSiteSettings } from "@/lib/catalog-data";

export default function FeaturedProducts() {
  const [items, setItems] = useState(seed);
  const [ids, setIds] = useState(featuredProductIds);
  const viewportRef = useRef(null);
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });

  const handlePointerDown = event => {
    // Touch cihazlarda tarayıcının doğal parmak kaydırmasını kullan.
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    dragRef.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: viewport.scrollLeft,
      moved: false,
    };
    viewport.classList.add("is-dragging");
    viewport.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = event => {
    const drag = dragRef.current;
    const viewport = viewportRef.current;
    if (!drag.active || !viewport) return;
    const delta = event.clientX - drag.startX;
    if (Math.abs(delta) > 4) drag.moved = true;
    if (drag.moved) {
      event.preventDefault();
      viewport.scrollLeft = drag.scrollLeft - delta;
    }
  };

  const finishPointerDrag = event => {
    const viewport = viewportRef.current;
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    viewport?.classList.remove("is-dragging");
    if (viewport?.hasPointerCapture?.(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }
    // Tıklama olayının drag sonrası ürünü açmasını engelle.
    if (dragRef.current.moved) {
      window.setTimeout(() => { dragRef.current.moved = false; }, 0);
    }
  };

  const preventClickAfterDrag = event => {
    if (dragRef.current.moved) {
      event.preventDefault();
      event.stopPropagation();
      dragRef.current.moved = false;
    }
  };
  const selected = useMemo(() => ids.map(id => items.find(p => p.id === id)).filter(Boolean), [ids, items]);
  const pages = useMemo(() => {
    const result = [];
    for (let i = 0; i < selected.length; i += 8) result.push(selected.slice(i, i + 8));
    return result;
  }, [selected]);

  useEffect(() => {
    let active = true;
    Promise.all([getProducts(), getSiteSettings()]).then(([products, settings]) => {
      if (!active) return;
      setItems(products);
      setIds(settings.featured_ids || products.filter(p => p.featured).map(p => p.id) || featuredProductIds);
    }).catch(error => console.error("Vitrin verileri okunamadı", error));
    return () => { active = false; };
  }, []);

  const movePage = direction => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.scrollBy({ left: direction * viewport.clientWidth, behavior: "smooth" });
  };

  return (
    <section className="section featured-section">
      <div className="section-heading"><span /><div><small>İMZA SAAT SEÇKİSİ</small><h2>Öne Çıkan Ürünler</h2></div><span /></div>
      {selected.length ? <>
        <div className="featured-toolbar">
          <p>Özenle seçilmiş ürünleri keşfedin</p>
          <div className="rail-controls" aria-label="Ürün sayfaları">
            <button type="button" onClick={() => movePage(-1)} aria-label="Önceki ürünler"><ChevronLeft /></button>
            <button type="button" onClick={() => movePage(1)} aria-label="Sonraki ürünler"><ChevronRight /></button>
          </div>
        </div>
        <div className="featured-grid-wrap">
          <div className="featured-edge-hint featured-edge-left" aria-hidden="true" />
          <div
            className="featured-pages"
            ref={viewportRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={finishPointerDrag}
            onPointerCancel={finishPointerDrag}
            onClickCapture={preventClickAfterDrag}
          >
            {pages.map((page, index) => (
              <div className="featured-page" key={`page-${index}`}>
                <div className="featured-grid">
                  {page.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              </div>
            ))}
          </div>
          <div className="featured-edge-hint featured-edge-right" aria-hidden="true" />
        </div>
      </> : <p className="empty-featured">Yakında öne çıkan ürünlerimizi burada keşfedebilirsiniz.</p>}
    </section>
  );
}
