# İmza Saat

Next.js tabanlı ürün kataloğu ve marka tanıtım sitesi.

## Çalıştırma

```bash
npm install
npm run dev
```

## Bu sürümde yapılanlar

- Hakkımızda bölümü ana sayfaya taşındı; üst menüdeki bağlantı ana sayfadaki bölüme gider.
- Eski `/hakkimizda` adresi ana sayfadaki Hakkımızda bölümüne yönlendirilir.
- Yönetim paneline **Ana Sayfa Hakkımızda** bölümü eklendi. Buradan dükkân fotoğrafı yüklenebilir/değiştirilebilir/kaldırılabilir ve tanıtım metni düzenlenebilir.
- Öne çıkan ürün kartları masaüstünde daha geniş ve büyük olacak şekilde düzenlendi; mobilde yatay kaydırma ve oklar korunur.
- Yeni bölüm ve vitrin düzeni masaüstü ve mobil ekranlara uyumlu hale getirildi.

Not: Bu projedeki mevcut ürün ve yönetim verisi altyapısı gibi Hakkımızda fotoğrafı/metni de tarayıcının localStorage alanında tutulur. Farklı cihazlarda ortak görünmesi için daha sonra Supabase bağlantısı gerekir.
