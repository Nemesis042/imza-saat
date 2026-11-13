// Örnek katalog. Gerçek ürünler Supabase ve yönetim paneli bağlanınca buradan taşınacak.
export const categories=[
{slug:"deri-kayislar",title:"Deri Kayışlar",description:"Klasik ve modern saatler için deri kayış seçenekleri.",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85"},
{slug:"metal-kordonlar",title:"Metal Kordonlar",description:"Farklı saat modellerine uyum sağlayan metal kordonlar.",image:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85"},
{slug:"silikon-kayislar",title:"Silikon Kayışlar",description:"Günlük kullanım ve sportif tarz için silikon kayışlar.",image:"https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1200&q=85"},
{slug:"piller",title:"Saat Pilleri",description:"Saatler için pil seçenekleri.",image:"https://images.unsplash.com/photo-1619641805634-9f1e7e5a9f4a?auto=format&fit=crop&w=1200&q=85"},
{slug:"saat-makineleri",title:"Saat Makineleri",description:"Saat mekanizmaları ve makine seçenekleri.",image:"https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=1200&q=85"},
{slug:"saatci-el-aletleri",title:"Saatçi El Aletleri",description:"Profesyonel saat tamiri ve bakımında kullanılan el aletleri.",image:"https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=1200&q=85"},
{slug:"saat-yedek-aksamlari",title:"Saat Yedek Aksamları",description:"Saat tamiri ve bakımı için gerekli yedek parçalar.",image:"https://images.unsplash.com/photo-1619134778706-7015533a6150?auto=format&fit=crop&w=1200&q=85"},
{slug:"pim-cesitleri",title:"Pim Çeşitleri",description:"Farklı ölçü ve tiplerde saat kordon pimleri.",image:"https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=1200&q=85"}];
export const products=[
{id:"URN-001",slug:"klasik-deri-kayis",name:"Klasik Deri Kayış",category:"deri-kayislar",categoryLabel:"DERİ KAYIŞLAR",shortDescription:"Kahverengi · Klasik görünüm",description:"Klasik tarzı tamamlayan kahverengi deri kayış.",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85"},
{id:"URN-002",slug:"metal-kordon",name:"Metal Kordon",category:"metal-kordonlar",categoryLabel:"METAL KORDONLAR",shortDescription:"Gümüş · Metal",description:"Zamansız ve sade metal kordon.",image:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85"},
{id:"URN-003",slug:"silikon-kayis",name:"Silikon Kayış",category:"silikon-kayislar",categoryLabel:"SİLİKON KAYIŞLAR",shortDescription:"Siyah · Sportif",description:"Günlük ve sportif kullanım için silikon kayış.",image:"https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=900&q=85"}];
// Ana sayfa vitrininde görünecek ürünlerin ID listesi. ID'ler ziyaretçi arayüzünde gösterilmez.
export const featuredProductIds=["URN-001","URN-002","URN-003"];
