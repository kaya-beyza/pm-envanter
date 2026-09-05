/**
 * İşe Alım Psikolojik Envanteri - Hedef Pozisyon İdeal Kişilik Matrisim (Job Benchmarks)
 */

const JOB_ROLES = {
    software_engineer: {
        id: "software_engineer",
        title: "Yazılım Geliştirici",
        department: "Teknoloji",
        description: "Analitik düşünme, detay odaklılık ve yenilikçi çözümler üretme yetkinliği gerektirir.",
        benchmarks: {
            conscientiousness: 85,
            openness: 80,
            emotional_stability: 75,
            agreeableness: 70,
            extraversion: 55
        }
    },
    sales_specialist: {
        id: "sales_specialist",
        title: "Satış & Müşteri Yöneticisi",
        department: "Satış",
        description: "Yüksek ikna kabiliyeti, sosyal iletişim ve baskı altında hedef odaklı çalışma gerektirir.",
        benchmarks: {
            extraversion: 90,
            emotional_stability: 85,
            agreeableness: 75,
            conscientiousness: 70,
            openness: 75
        }
    },
    project_manager: {
        id: "project_manager",
        title: "Proje Yöneticisi",
        department: "Yönetim",
        description: "Liderlik, yüksek organize olma yeteneği, stres yönetimi ve çok yönlü iletişim gerektirir.",
        benchmarks: {
            conscientiousness: 90,
            emotional_stability: 85,
            extraversion: 80,
            agreeableness: 80,
            openness: 75
        }
    },
    hr_specialist: {
        id: "hr_specialist",
        title: "İnsan Kaynakları Uzmanı",
        department: "İK",
        description: "Yüksek empati, aktif dinleme, kurum kültürüne uyum ve etik duruş gerektirir.",
        benchmarks: {
            agreeableness: 90,
            extraversion: 80,
            conscientiousness: 80,
            emotional_stability: 80,
            openness: 75
        }
    },
    data_analyst: {
        id: "data_analyst",
        title: "Veri Analisti",
        department: "İş Zekası",
        description: "Derinlemesine veri inceleme, metodolojik yaklaşım ve objektif karar verme gerektirir.",
        benchmarks: {
            conscientiousness: 90,
            openness: 80,
            emotional_stability: 75,
            agreeableness: 65,
            extraversion: 55
        }
    }
};
