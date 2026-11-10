# İmza Saat — Supabase bağlantılı sürüm

Bu paket, mevcut tasarımı koruyarak ürün kataloğunu, kategori kapaklarını, vitrin sırasını ve Hakkımızda alanını Supabase'e bağlar.

## 1. Dosyaları yerleştirme
1. Mevcut `imza-saat-web` klasörünün bir kopyasını yedekleyin.
2. Bu ZIP'i ayrı bir klasöre çıkarın.
3. Supabase projenizdeki mevcut `.env.local` dosyasını yeni proje klasörüne kendiniz kopyalayın. ZIP'e güvenlik nedeniyle eklenmedi.
4. `.env.local` içinde şu iki satır bulunmalı:
   - `NEXT_PUBLIC_SUPABASE_URL=...`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...`

`service_role` veya `secret` anahtarını asla tarayıcıda kullanılan `.env.local` değişkenlerine koymayın.

## 2. Veritabanı tabloları
1. Supabase projenizde **SQL Editor → New query** açın.
2. Bu paketteki `supabase-setup.sql` dosyasının tamamını yapıştırın.
3. **Run** düğmesine basın. İşlem başarılıysa `Success` görürsünüz.

Uygulama şu yeni tabloları kullanır: `imza_products`, `imza_category_covers`, `imza_site_settings`. Daha önce oluşturduğunuz `products`, `categories`, `site_settings` tablolarını silmez veya değiştirmez.

## 3. Yönetici hesabı
1. Supabase → **Authentication → Users** bölümüne girin.
2. **Add user** ile kendinize ait e-posta ve güçlü bir şifre kullanarak yönetici hesabı oluşturun.
3. Authentication ayarlarında herkese açık yeni kullanıcı kaydını (sign-ups) kapatın. Yönetici dışında hesap oluşturulmasına izin vermeyin.
4. Yönetim panelinde artık `admin/admin` kullanılmaz. Oluşturduğunuz e-posta ve şifreyle `/admin` sayfasından giriş yapın.

## 4. Çalıştırma
Proje klasöründe terminal açın:
```powershell
npm.cmd install
npm.cmd run dev
```
Tarayıcıda `http://localhost:3000` adresini açın.

## 5. Eski tarayıcı verilerini taşıma
Eski sitedeki ürünler, kategori kapakları ve Hakkımızda bilgileri aynı tarayıcının `localStorage` alanında duruyorsa, ilk yönetici girişi sırasında otomatik olarak Supabase'e aktarılmaya çalışılır. Base64 fotoğraflar da Storage'a yüklenir. Eski tarayıcı verileri yoksa örnek katalog verileri başlangıç olarak kullanılır.

**Önemli:** İlk giriş ve taşıma tamamlanana kadar eski siteyi / tarayıcı verilerini silmeyin. Taşıma bittikten sonra yönetim panelindeki ürünleri kontrol edin.

## Güvenlik notu
- `product-images` bucket'ı herkese açık görsel okumaya açıktır; bu, ürün fotoğraflarının sitede görünmesi için gereklidir.
- Görsel yükleme, güncelleme ve silme işlemleri oturum açmış Supabase kullanıcılarıyla sınırlandırılmıştır.
- Veritabanında ziyaretçiler yalnızca okuma yapabilir; yazma işlemleri oturum açmış kullanıcılarla sınırlıdır.
- Bu sürümde uygulama verileri Supabase'e yazar. Yayına almadan önce yönetici hesabı ve Auth sign-up ayarını mutlaka kontrol edin.
