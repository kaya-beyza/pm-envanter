/**
 * İşe Alım Psikolojik Envanteri - Psikometrik Soru Havuzum ve Kategorilerim
 * Big Five (OCEAN) Kişilik Modeli & Samimiyet (Lie Scale) Ölçümü
 */

const PSYCHOMETRIC_QUESTIONS = [
    // 1. DUYGUSAL DENGE & STRES YÖNETİMİ (Emotional Stability)
    {
        id: 1,
        type: "likert",
        text: "Beklenmedik kriz durumlarında ve yüksek baskı altında soğukkanlılığımı korurum.",
        category: "emotional_stability",
        isReversed: false,
        weight: 1.0
    },
    {
        id: 2,
        type: "likert",
        text: "Yoğun iş temposunda veya sıkışık teslim tarihlerinde kolayca endişeye kapılırım.",
        category: "emotional_stability",
        isReversed: true,
        weight: 1.0
    },
    {
        id: 3,
        type: "multiple",
        text: "Projede büyük ve beklenmeyen bir aksaklık yaşandığında ilk tepkiniz ne olur?",
        category: "emotional_stability",
        options: [
            { text: "Derin bir nefes alıp durumu sakince analiz eder, çözüm planı hazırlarım.", score: 5 },
            { text: "Hemen ekibimi toplayıp görev dağılımı yaparak aksiyon alırım.", score: 4 },
            { text: "Stres yaşarım ama yine de yapılması gerekenleri yapmaya çalışırım.", score: 3 },
            { text: "Sorumluluğun veya hatanın kimde olduğunu anlamaya odaklanırım.", score: 2 }
        ]
    },

    // 2. SORUMLULUK & ÖZDISİPLİN (Conscientiousness)
    {
        id: 4,
        type: "likert",
        text: "Görevlerimi son ana bırakmadan, detaylı ve planlı bir şekilde tamamlamaya özen gösteririm.",
        category: "conscientiousness",
        isReversed: false,
        weight: 1.0
    },
    {
        id: 5,
        type: "likert",
        text: "İş takibinde küçük detayları gözden kaçırabilir veya kuralları esnetebilirim.",
        category: "conscientiousness",
        isReversed: true,
        weight: 1.0
    },
    {
        id: 6,
        type: "multiple",
        text: "Bir görevi teslim etmeden önceki kalite kontrol yaklaşımınız nasıldır?",
        category: "conscientiousness",
        options: [
            { text: "Tüm detayları, standartları ve olası hataları adım adım kontrol ederim.", score: 5 },
            { text: "Genel çıktıyı hızlıca gözden geçirir, ana hataları düzeltirim.", score: 4 },
            { text: "İşin zamanında bitmesi benim için mükemmellikten daha önemlidir.", score: 3 },
            { text: "Genellikle başkasının kontrol etmesini tercih ederim.", score: 2 }
        ]
    },

    // 3. DIŞA DÖNÜKLÜK & İLETİŞİM (Extraversion)
    {
        id: 7,
        type: "likert",
        text: "Yeni insanlarla tanışmaktan, fikirlerimi topluluk önünde paylaşmaktan enerjimi alırım.",
        category: "extraversion",
        isReversed: false,
        weight: 1.0
    },
    {
        id: 8,
        type: "likert",
        text: "Uzun süre sosyal etkileşim gerektiren ortamlarda zihinsel olarak çabuk yorulurum.",
        category: "extraversion",
        isReversed: true,
        weight: 1.0
    },
    {
        id: 9,
        type: "multiple",
        text: "Şirket içi bir toplantıda fikrinize katılınmadığında nasıl bir tutum sergilersiniz?",
        category: "extraversion",
        options: [
            { text: "Fikrimi somut gerekçeler ve heyecanla açıkça savunmaya devam ederim.", score: 5 },
            { text: "Farklı bakış açılarını dinler, ortak bir noktada buluşmak için diyalog kurarım.", score: 4 },
            { text: "Tartışmayı uzatmamak için sessiz kalmayı tercih ederim.", score: 2 },
            { text: "Toplantı sonrası birebir görüşmelerle ikna etmeye çalışırım.", score: 3 }
        ]
    },

    // 4. UYUMLULUK & TAKIM ÇALIŞMASI (Agreeableness)
    {
        id: 10,
        type: "likert",
        text: "Takım arkadaşlarımın ihtiyaçlarını dinler, yardım etmeye ve uzlaşma sağlamaya öncelik veririm.",
        category: "agreeableness",
        isReversed: false,
        weight: 1.0
    },
    {
        id: 11,
        type: "likert",
        text: "İş hedeflerine ulaşmak için gerektiğinde çalışma arkadaşlarımla sert tartışmalara girmekten çekinmem.",
        category: "agreeableness",
        isReversed: true,
        weight: 1.0
    },
    {
        id: 12,
        type: "multiple",
        text: "Takımınızda çalışma temposu düşük bir çalışma arkadaşınız olduğunda ne yaparsınız?",
        category: "agreeableness",
        options: [
            { text: "Onunla empati kurup zorlandığı noktada destek teklif ederim.", score: 5 },
            { text: "İşlerin aksamaması için görevlerinin bir kısmını üstlenirim.", score: 4 },
            { text: "Durumu doğrudan yöneticiye bildiririm.", score: 2 },
            { text: "Kendi sorumluluklarıma odaklanıp müdahale etmem.", score: 3 }
        ]
    },

    // 5. DENEYİME AÇIKLIK & İNOVASYON (Openness)
    {
        id: 13,
        type: "likert",
        text: "Geleneksel yöntemler yerine yeni teknolojileri, yaratıcı fikirleri ve alışılmadık çözümleri denerim.",
        category: "openness",
        isReversed: false,
        weight: 1.0
    },
    {
        id: 14,
        type: "likert",
        text: "Kanıtlanmış ve alışılmış çalışma yöntemlerini değiştirmek riskli ve gereksizdir.",
        category: "openness",
        isReversed: true,
        weight: 1.0
    },
    {
        id: 15,
        type: "multiple",
        text: "İş yerinizde yeni ve karmaşık bir yazılım/sistem entegrasyonu başlatıldığında yaklaşımınız ne olur?",
        category: "openness",
        options: [
            { text: "Heyecanla öğrenmeye başlar, sistemin öncüsü olmak isterim.", score: 5 },
            { text: "Eğitimleri takip eder, sistemin faydalarını anlamaya çalışırım.", score: 4 },
            { text: "Zorunlu olmadıkça eski sistemde kalmayı tercih ederim.", score: 2 },
            { text: "Sistemin eksik ve hatalı yönlerini araştırmaya odaklanırım.", score: 3 }
        ]
    },

    // 6. SAMİMİYET & YANILTMA ÖLÇÜMÜ (Lie Scale / Social Desirability)
    {
        id: 16,
        type: "likert",
        text: "Hayatım boyunca hiç kimse hakkında olumsuz veya eleştirel bir düşünceye kapılmadım.",
        category: "lie_scale",
        isReversed: false, // 5 veren adayın samimiyeti şüphelidir
        weight: 1.0
    },
    {
        id: 17,
        type: "likert",
        text: "İş yerinde verdiğim tüm kararlar her zaman %100 kusursuz ve hatasız olmuştur.",
        category: "lie_scale",
        isReversed: false,
        weight: 1.0
    },
    {
        id: 18,
        type: "likert",
        text: "Bazen yorgun olduğumda işe odaklanmakta zorlandığım anlar olur.",
        category: "lie_scale",
        isReversed: true, // Dürüstlüğü temsil eder
        weight: 1.0
    },

    // 7. KARAR VERME VE LİDERLİK EĞİLİMİ (Ek Maddeler)
    {
        id: 19,
        type: "multiple",
        text: "Baskı altında hızlı karar almanız gerektiğinde hangi faktöre öncelik verirsiniz?",
        category: "conscientiousness",
        options: [
            { text: "Mevcut veri ve somut göstergelerin analizi", score: 5 },
            { text: "Sezgilerim ve geçmiş tecrübelerim", score: 4 },
            { text: "Ekip üyelerinin ortak görüşü", score: 3 },
            { text: "Risk derecesi en düşük olan seçenek", score: 3 }
        ]
    },
    {
        id: 20,
        type: "likert",
        text: "Karmaşık belirsizlikler içeren projelerde inisiyatif alıp liderlik etmekten çekinmem.",
        category: "extraversion",
        isReversed: false,
        weight: 1.0
    }
];

// Kategori başlıklarım ve boyut açıklamalarım
const DIMENSION_METADATA = {
    emotional_stability: {
        title: "Duygusal Denge & Stres Yönetimi",
        code: "N",
        description: "Baskı altında soğukkanlılık, kriz anlarını yönetme ve duygusal kararlılık seviyesi."
    },
    conscientiousness: {
        title: "Sorumluluk & Özdisiplin",
        code: "C",
        description: "Planlı çalışma, detaylara dikkat, verilen sözlere sadakat ve kalite odaklılık."
    },
    extraversion: {
        title: "Dışa Dönüklük & İletişim",
        code: "E",
        description: "Sosyal etki, ikna kabiliyeti, açık iletişim ve enerjik tutum."
    },
    agreeableness: {
        title: "Uyumluluk & Takım Çalışması",
        code: "A",
        description: "Empati, işbirliğine yatkınlık, uzlaşmacı yaklaşım ve destekleyici tutum."
    },
    openness: {
        title: "Deneyime Açıklık & İnovasyon",
        code: "O",
        description: "Yaratıcılık, yeni teknolojilere merak, esneklik ve yenilikçi düşünce."
    },
    lie_scale: {
        title: "Samimiyet & Dürüstlük İndeksi",
        code: "L",
        description: "Adayın testteki dürüstlük derecesi ve kendisini olduğundan farklı gösterme eğilimi."
    }
};
