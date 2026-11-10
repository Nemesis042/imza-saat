"use client";
import {useEffect,useState} from "react";
import {useParams} from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import {categories,products as seed} from "@/lib/catalog";
import {getProducts,getCategoryCovers} from "@/lib/catalog-data";
export default function CategoryPage(){
 const {slug}=useParams();const [items,setItems]=useState(seed);const [covers,setCovers]=useState({});const [ready,setReady]=useState(false);
 useEffect(()=>{let active=true;Promise.all([getProducts(),getCategoryCovers()]).then(([p,c])=>{if(active){setItems(p);setCovers(c);setReady(true)}}).catch(()=>setReady(true));return()=>{active=false}},[]);
 const category=categories.find(c=>c.slug===slug);
 if(!category)return <><Header/><main className="inner-page"><h1>Kategori bulunamadı</h1></main><Footer/></>;
 const list=items.filter(p=>p.category===slug);
 return <><Header/><main className="inner-page"><div className="category-page-cover" style={{backgroundImage:`linear-gradient(90deg,rgba(0,0,0,.48),rgba(0,0,0,.08)),url(${covers[slug]||category.image})`}}><div className="category-page-title"><span className="eyebrow">ÜRÜN KATALOĞU</span><h1>{category.title}</h1><p>{category.description}</p></div></div>{!ready?<p>Ürünler yükleniyor...</p>:<div className="product-grid category-products">{list.map(p=><ProductCard key={p.id} product={p}/>)}</div>}{ready&&!list.length&&<p>Bu kategoride henüz ürün bulunmuyor.</p>}</main><Footer/></>;
}
