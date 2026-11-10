"use client";
import { useState } from "react";
import { Settings, ShieldCheck, X } from "lucide-react";
import { useRouter } from "next/navigation";
export default function AdminShortcut() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return <div className="personalize-wrap">
    <button className="personalize-button" onClick={() => setOpen(v => !v)} aria-label="Yönetim menüsü"><Settings size={18}/></button>
    {open && <div className="personalize-popover">
      <div className="personalize-head"><b>İmza Saat</b><button onClick={() => setOpen(false)} aria-label="Kapat"><X size={16}/></button></div>
      <button className="personalize-option" onClick={() => { setOpen(false); router.push("/admin"); }}><ShieldCheck size={17}/><span>Yönetici girişi</span></button>
    </div>}
  </div>;
}
