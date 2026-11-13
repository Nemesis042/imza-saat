import "./globals.css";
import AdminShortcut from "@/components/AdminShortcut";
export const metadata={
 metadataBase:new URL("https://www.imzasaat.com"),
 title:{default:"İmza Saat | Saat Aksesuarları",template:"%s | İmza Saat"},
 description:"İmza Saat; deri kayışlar, metal kordonlar, saat pilleri, mekanizmalar, saatçi el aletleri ve yedek parçalar.",
 applicationName:"İmza Saat",
 openGraph:{type:"website",locale:"tr_TR",siteName:"İmza Saat",title:"İmza Saat | Saat Aksesuarları",description:"Saat aksesuarları, kayışlar, kordonlar ve saat yedek parçaları."},
 robots:{index:true,follow:true},
};
export default function RootLayout({children}){return <html lang="tr"><body>{children}<AdminShortcut/></body></html>}
