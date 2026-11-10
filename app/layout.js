import "./globals.css";
import AdminShortcut from "@/components/AdminShortcut";
export const metadata={title:"İmza Saat | Saat Aksesuarları",description:"Saat kayışları, kordonlar ve aksesuarlar."};
export default function RootLayout({children}){return <html lang="tr"><body>{children}<AdminShortcut/></body></html>}
