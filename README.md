# PsychoMatch HR — İşe Alım Psikolojik Envanteri & Değerlendirme Platformu

<p align="center">
  <img src="logo.png" alt="PsychoMatch HR Logo" width="190" />
</p>

<p align="center">
  Big Five (OCEAN) modeli, pozisyon uyum matrisleri ve samimiyet analiziyle aday değerlendirme ve psikometrik raporlama platformu.
</p>

<p align="center">
  <a href="https://pm-envanter.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/Canlı%20Demo-Vercel-black?style=flat-square&logo=vercel&logoColor=white" alt="Canlı Demo" />
  </a>
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/Chart.js-4.x-FF6384?style=flat-square&logo=chartdotjs&logoColor=white" alt="Chart.js" />
  <img src="https://img.shields.io/badge/Model-Big%20Five%20(OCEAN)-2563EB?style=flat-square" alt="Big Five" />
  <img src="https://img.shields.io/badge/Depolama-LocalStorage-059669?style=flat-square" alt="LocalStorage" />
</p>

---

## Canlı Demo

Uygulamayı tarayıcınızda doğrudan deneyimlemek için:  
**[pm-envanter.vercel.app](https://pm-envanter.vercel.app)**

---

## Projenin Hikayesi ve Amacı

Merhaba! Ben Beyza.

İşe alım süreçlerinde yalnızca teknik yeterliliklerin ve özgeçmiş bilgilerinin değerlendirilmesi, adayın kurum kültürüne, pozisyonun doğasına ve ekip dinamiğine gerçek uyumunu anlamak için her zaman yeterli olmayabiliyor. Adayların stres yönetimi, iletişim tarzı, sorumluluk bilinci ve yeniliklere yaklaşımı gibi temel kişilik boyutlarının ölçümlenmesi, uzun vadeli ve başarılı bir istihdamın en kritik unsurlarından biridir.

PsychoMatch HR projesini; şirketlerin ve insan kaynakları uzmanlarının aday değerlendirme süreçlerini daha objektif, bilimsel temellere dayalı ve veriye dayalı hale getirmelerine katkı sağlamak amacıyla geliştirdim. Psikolojide küresel geçerliliği kanıtlanmış Big Five (OCEAN) kişilik modelini temel alarak, adayların kişilik özelliklerini analiz eden, hedeflenen pozisyon ile yetkinlik profili arasındaki uyumu hesaplayan ve adayın yanıtlardaki dürüstlük düzeyini (sosyal beğenirlik eğilimini) denetleyen uçtan uca bir dijital değerlendirme platformu inşa ettim.

---

## Öne Çıkan Özellikler ve Çözümler

- **Bilimsel Big Five (OCEAN) Kişilik Modeli:** Adayların kişilik envanterini beş ana boyutta (Duygusal Denge, Sorumluluk & Özdisiplin, Dışadönüklük, Uyumluluk, Deneyime Açıklık) Likert tipi ve senaryo bazlı sorularla ölçümleyen analiz yapısı.
- **Ters Puanlama ve Doğruluk Algoritması:** Yanıt kalıplarını normalize eden ters kodlanmış (reversed) sorular ile adayın rastgele işaretleme eğilimini minimize eden puanlama mantığı.
- **Samimiyet ve Dürüstlük İndeksi (Lie Scale):** Adayın kendini aşırı kusursuz veya sosyal açıdan ideal gösterme çabasını (sosyal beğenirlik eğilimi) ölçümleyerek testin güvenilirlik düzeyini İK uzmanına raporlayan kontrol mekanizması.
- **Hedef Pozisyon İdeal Profil Matrisi (Job Benchmarks):** Yazılım Geliştirici, Proje Yöneticisi, İnsan Kaynakları Uzmanı, Satış & Müşteri Yöneticisi ve Veri Analisti gibi kritik roller için tanımlanmış ideal yetkinlik profilleri ile adayın sonuçlarını karşılaştıran ve yüzde cinsinden Pozisyon Uyum Skoru üreten eşleştirme motoru.
- **Görsel Radar Grafiği ve Detaylı Boyut Dağılımı:** Chart.js kütüphanesi entegrasyonuyla adayın kişisel profilini interaktif radar grafiği ve boyutsal ilerleme çubukları üzerinden anlaşılır biçimde sunan görselleştirme katmanı.
- **Niteliksel İçgörüler ve Güçlü Yön Analizi:** Skorlara göre otomatik tespit edilen öne çıkan güçlü yönler, gelişime açık alanlar ve adaya özel risk değerlendirmesi.
- **İK Mülakatına Özel Soru Tavsiyeleri:** Adayın düşük veya riskli çıkan boyutlarına göre sistem tarafından üretilen, mülakat sırasında yöneltilebilecek hedef odaklı soru ipuçları.
- **Mülakat Notları ve Resmi Rapor Çıktısı (Print / PDF):** İK değerlendirme notlarının anlık olarak eklenebildiği ve tek tıkla resmi aday değerlendirme raporu formatında yazdırılabilen veya PDF olarak kaydedilebilen çıktı desteği.
- **İK Yönetim & Aday Geçmişi Paneli:** Yapılan test sonuçlarının adayın adı, başvurduğu pozisyon, uyum skoru ve tarih bilgileriyle LocalStorage üzerinde arşivlenmesi, filtrelenmesi ve geçmiş raporların tek tıkla yeniden incelenebilmesi.

---

## Sistem Mimarisi ve Teknik Yaklaşım

Uygulama, harici ağır framework bağımlılıkları olmaksızın, tamamen saf web standartları ve modüler JavaScript mimarisi üzerine kurgulanmıştır:

- **Veri Katmanı (`questions.js` & `roles.js`):** Psikometrik sorular, soru tipleri, kategori etiketleri ve pozisyon benchmark kriterlerinin ayrık ve yönetilebilir veri yapıları olarak tutulması.
- **Puanlama ve Analiz Motoru (`scoring.js`):** Yanıtların normalize edilmesi, ters kodlanmış puan hesaplamaları, Lie Scale denetimi, mutlak sapma tabanlı pozisyon uyum analizi ve dinamik mülakat sorusu üretim fonksiyonlarının tek bir analitik motorda toplanması.
- **Durum ve Arayüz Kontrolcüsü (`app.js`):** Ekran geçişleri (Karşılama, Test, Sonuç Raporu, İK Paneli), süre sayacı, ilerleme takibi ve LocalStorage veri saklama süreçlerinin reaktif yönetimi.
- **Tasarım ve Baskı Stilleri (`style.css`):** CSS değişkenleri (CSS Custom Properties) ile modern kurumsal renk paleti, kart mimarisi, mobil uyumlu duyarlı tasarım ve `@media print` sorguları ile optimize edilmiş resmi rapor baskı düzeni.

---

## Kullanılan Teknolojiler

| Alan | Teknoloji / Kütüphane | Açıklama |
|---|---|---|
| Çekirdek Dil | JavaScript (ES6+) | Modüler mimari, nesne yönelimli controller ve puanlama motoru |
| Arayüz Yapısı | HTML5 | Semantik etiketler ve erişilebilir form elemanları |
| Stil & Tasarım | Modern CSS3 | Responsive Flexbox/Grid, CSS değişkenleri ve baskı optimizasyonu |
| Veri Görselleştirme | Chart.js | İnteraktif radar grafiği ve boyut dağılımı sunumu |
| Veri Saklama | Web Storage API (LocalStorage) | Sunucu gereksinimi olmaksızın yerel aday geçmişi arşivleme |

---

## Proje Dizini

```text
pm-envanter/
├── index.html            # Ana uygulama arayüzü ve ekran görünümleri
├── style.css             # Kurumsal tasarım sistemi, responsive ve print stilleri
├── logo.png              # PsychoMatch HR kurumsal logosu
├── js/
│   ├── questions.js      # Psikometrik sorular ve ölçek tanımları
│   ├── roles.js          # Hedef pozisyon ideal kişilik profili matrisleri
│   ├── scoring.js        # OCEAN hesaplama, uyum skoru ve mülakat soru motoru
│   └── app.js            # Durum yönetimi, süre sayacı ve arayüz etkileşimleri
└── README.md             # Proje dokümantasyonu
```

---

## Kurulum ve Çalıştırma

Projeyi yerel makinenizde çalıştırmak için herhangi bir paket yöneticisi veya derleme aracına ihtiyaç duyulmamaktadır.

1. Proje deposunu bilgisayarınıza klonlayın veya indirin:
   ```bash
   git clone https://github.com/kaya-beyza/pm-envanter.git
   ```

2. Proje dizinine gidin:
   ```bash
   cd pm-envanter
   ```

3. `index.html` dosyasını doğrudan tercih ettiğiniz bir internet tarayıcısında açın veya VS Code Live Server gibi yerel bir geliştirme sunucusu üzerinden başlatın:
   ```bash
   # VS Code Live Server veya npx serve ile:
   npx serve .
   ```

---

## Değerlendirme Akışı

1. **Aday Bilgileri:** Aday adı, soyadı, deneyim düzeyi ve hedeflenen iş pozisyonu seçilir.
2. **Psikometrik Test:** Süre sayacı eşliğinde Likert tipi ve senaryo temelli sorular yanıtlanır.
3. **Analiz ve Raporlama:** Test tamamlandığında OCEAN boyutları, Pozisyon Uyum Skoru ve Samimiyet İndeksi anlık olarak hesaplanır ve radar grafiğiyle görselleştirilir.
4. **İK Karar Desteği:** Güçlü yönler, gelişim alanları ve adaya özel mülakat soru önerileri incelenerek İK notları eklenir, rapor yazdırılabilir veya PDF olarak kaydedilebilir.
5. **Aday Arşivi:** Sonuçlar İK Yönetim Paneli'nde arşivlenerek önceki adaylarla karşılaştırmalı inceleme imkanı sunulur.

---

## İletişim

Görüş, öneri veya iş birliği için bana aşağıdaki kanallardan ulaşabilirsiniz:

- GitHub: [github.com/kaya-beyza](https://github.com/kaya-beyza)
- E-posta: [beyzzakayya@gmail.com](mailto:beyzzakayya@gmail.com)
