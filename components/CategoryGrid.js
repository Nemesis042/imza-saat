"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { categories as seed } from "@/lib/catalog";
import { getCategoryCovers } from "@/lib/catalog-data";
export default function CategoryGrid(){
 const rail=useRef(null),drag=useRef({active:false,pending:false,startX:0,startY:0,scrollLeft:0,moved:false,pointerId:null});
 const [covers,setCovers]=useState({});
 useEffect(()=>{let active=true;getCategoryCovers().then(v=>{if(active)setCovers(v)});return()=>{active=false}},[]);
 function down(e){
  if(e.pointerType==="mouse"&&e.button!==0)return;
  drag.current={active:false,pending:true,startX:e.clientX,startY:e.clientY,scrollLeft:rail.current?.scrollLeft||0,moved:false,pointerId:e.pointerId};
 }
 function move(e){
  const d=drag.current;if(!d.pending||!rail.current)return;
  const dx=e.clientX-d.startX,dy=e.clientY-d.startY;
  if(!d.active){
   if(Math.abs(dx)<7&&Math.abs(dy)<7)return;
   // Let the browser handle vertical page movement; take over only horizontal swipes.
   if(Math.abs(dy)>Math.abs(dx)) { d.pending=false; return; }
   d.active=true;d.moved=true;
   try{rail.current.setPointerCapture(e.pointerId)}catch{}
  }
  rail.current.scrollLeft=d.scrollLeft-dx;
  if(e.cancelable)e.preventDefault();
 }
 function up(){
  const wasMoved=drag.current.moved;drag.current.active=false;drag.current.pending=false;
  if(wasMoved)setTimeout(()=>{drag.current.moved=false;},180);
 }
 function clickCapture(e){if(drag.current.moved){e.preventDefault();e.stopPropagation();}}
 const scroll=dir=>rail.current?.scrollBy({left:dir*Math.max(320,rail.current.clientWidth*.72),behavior:"smooth"});
 return <section className="section collection-section"><div className="section-heading"><span/><div><small>ÜRÜN KATEGORİLERİ</small><h2>Koleksiyonlarımız</h2></div><span/></div>
 <div className="collection-toolbar"><p><i/> Daha fazlasını keşfetmek için kaydırın</p><div className="rail-controls"><button onClick={()=>scroll(-1)} aria-label="Önceki kategoriler"><ChevronLeft/></button><button onClick={()=>scroll(1)} aria-label="Sonraki kategoriler"><ChevronRight/></button></div></div>
 <div className="category-rail-wrap"><div className="category-rail" ref={rail} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onClickCapture={clickCapture}>
 {seed.map(c=><Link draggable="false" href={`/kategori/${c.slug}`} className="category-card" key={c.slug}><div className="category-photo" style={{backgroundImage:`url(${covers[c.slug]||c.image})`}}/><div className="category-overlay"><h3>{c.title}</h3><span>→</span></div></Link>)}
 </div><div className="featured-edge-hint featured-edge-left collection-edge-line" aria-hidden="true"/><div className="featured-edge-hint featured-edge-right collection-edge-line" aria-hidden="true"/></div></section>;
}
