/**
 * İşe Alım Psikolojik Envanteri - Puanlama ve Analiz Motorum (Scoring Engine)
 */

const ScoringEngine = {
    // Aday yanıtlarını ve verilerini alıp detaylı psikometrik rapor üretiyorum
    calculateFullReport(candidateData) {
        const { answers, targetRole, durationSeconds } = candidateData;
        
        // 1. Kategorilere göre ham puanları topluyorum
        const categoryScores = {
            emotional_stability: { rawTotal: 0, maxPossible: 0, count: 0 },
            conscientiousness: { rawTotal: 0, maxPossible: 0, count: 0 },
            extraversion: { rawTotal: 0, maxPossible: 0, count: 0 },
            agreeableness: { rawTotal: 0, maxPossible: 0, count: 0 },
            openness: { rawTotal: 0, maxPossible: 0, count: 0 },
            lie_scale: { rawTotal: 0, maxPossible: 0, count: 0 }
        };

        PSYCHOMETRIC_QUESTIONS.forEach(question => {
            const userAnswer = answers[question.id];
            if (userAnswer === undefined || userAnswer === null) return;

            const category = question.category;
            if (!categoryScores[category]) return;

            let scoreValue = 0;
            const maxScoreValue = 5;

            if (question.type === "likert") {
                const rawValue = Number(userAnswer);
                if (question.isReversed) {
                    // Ters puanlama uyguluyorum: 5 -> 1, 4 -> 2...
                    scoreValue = 6 - rawValue;
                } else {
                    scoreValue = rawValue;
                }
            } else if (question.type === "multiple") {
                const selectedOption = question.options[userAnswer];
                if (selectedOption) {
                    scoreValue = selectedOption.score || 3;
                }
            }

            categoryScores[category].rawTotal += scoreValue;
            categoryScores[category].maxPossible += maxScoreValue;
            categoryScores[category].count += 1;
        });

        // 2. Yüzdesel skorları hesaplıyorum (%0 - %100)
        const dimensionPercentages = {};
        Object.keys(categoryScores).forEach(cat => {
            const data = categoryScores[cat];
            if (data.maxPossible > 0) {
                dimensionPercentages[cat] = Math.round((data.rawTotal / data.maxPossible) * 100);
            } else {
                dimensionPercentages[cat] = 50;
            }
        });

        // 3. Samimiyet (Lie Scale) durumunu analiz ediyorum
        const liePercentage = dimensionPercentages.lie_scale || 50;
        let sincerityStatus = "Yüksek (Güvenilir Yanıtlar)";
        let sincerityColor = "#10B981";
        let isReliable = true;

        if (liePercentage > 75) {
            sincerityStatus = "Düşük (Sosyal Beğenirlik / Kendini Mükemmel Gösterme Eğilimi)";
            sincerityColor = "#EF4444";
            isReliable = false;
        } else if (liePercentage > 55) {
            sincerityStatus = "Orta (Kısmen Dikkatli Yanıtlar)";
            sincerityColor = "#F59E0B";
        }

        // 4. Pozisyon hedef profili ile uyum skorunu hesaplıyorum
        const selectedRoleObj = JOB_ROLES[targetRole] || JOB_ROLES.software_engineer;
        const benchmarks = selectedRoleObj.benchmarks;
        
        let totalDifferenceSum = 0;
        let evaluatedDimensionsCount = 0;

        Object.keys(benchmarks).forEach(dim => {
            const candidateScore = dimensionPercentages[dim] || 50;
            const targetBenchmark = benchmarks[dim];
            const diff = Math.abs(candidateScore - targetBenchmark);
            totalDifferenceSum += diff;
            evaluatedDimensionsCount += 1;
        });

        const averageDiff = totalDifferenceSum / (evaluatedDimensionsCount || 1);
        let jobMatchPercentage = Math.round(100 - (averageDiff * 0.85));
        jobMatchPercentage = Math.max(10, Math.min(99, jobMatchPercentage));

        // 5. Güçlü yönleri ve gelişime açık alanları tespit ediyorum
        const strengths = [];
        const growthAreas = [];

        if (dimensionPercentages.conscientiousness >= 75) {
            strengths.push("Yüksek sorumluluk bilinci, planlama ve detaycı çalışma disiplini.");
        } else if (dimensionPercentages.conscientiousness < 55) {
            growthAreas.push("Zaman yönetimi, takip ve organizasyonel detaylara verilen önem artırılabilir.");
        }

        if (dimensionPercentages.emotional_stability >= 75) {
            strengths.push("Stres altında yüksek duygusal denge, kriz anlarında soğukkanlı yaklaşım.");
        } else if (dimensionPercentages.emotional_stability < 55) {
            growthAreas.push("Yüksek baskı veya belirsizlik anlarında duygu düzenleme desteğine ihtiyaç duyabilir.");
        }

        if (dimensionPercentages.extraversion >= 75) {
            strengths.push("Güçlü iletişim, sosyal etki yaratma ve fikirleri etkiyle ifade etme becerisi.");
        } else if (dimensionPercentages.extraversion < 55) {
            strengths.push("Derin odaklanma gerektiren bağımsız görevlerde yüksek konsantrasyon.");
        }

        if (dimensionPercentages.agreeableness >= 75) {
            strengths.push("Yüksek empati, yapıcı takım çalışması ve uzlaşmacı tutum.");
        } else if (dimensionPercentages.agreeableness < 55) {
            growthAreas.push("Eleştirel ve doğrudan yaklaşımı bazen takım içi iletişim esnekliği gerektirebilir.");
        }

        if (strengths.length === 0) {
            strengths.push("Genel profil dengeli dağılım sergilemektedir.");
        }

        if (growthAreas.length === 0) {
            growthAreas.push("Belirgin bir düşük puanlı risk alanı saptanmadı. Dengeli gelişime açık profil.");
        }

        // 6. İK mülakatı için özel soru ipuçları hazırlıyorum
        const interviewQuestions = [];
        if (dimensionPercentages.emotional_stability < 65) {
            interviewQuestions.push("Geçmişte beklenmedik bir krizle karşılaştığınızda hissettiğiniz baskıyı ve bunu nasıl aştığınızı örneklendirir misiniz?");
        }
        if (dimensionPercentages.conscientiousness < 65) {
            interviewQuestions.push("Birden fazla sıkışık teslim tarihi olduğunda görevlerinizi nasıl önceliklendirirsiniz?");
        }
        if (dimensionPercentages.agreeableness < 65) {
            interviewQuestions.push("Takım arkadaşınızla belirgin bir fikir ayrılığına düştüğünüz bir durumu ve sonucu nasıl yönettiğinizi anlatır mısınız?");
        }
        if (interviewQuestions.length < 2) {
            interviewQuestions.push("Kariyerinizde en çok gurur duyduğunuz ve en çok zorlandığınız iki farklı projeden bahseder misiniz?");
            interviewQuestions.push("Yeni bir teknoloji veya metodoloji öğrenirken izlediğiniz bireysel çalışma adımları nelerdir?");
        }

        return {
            id: 'REP-' + Date.now().toString(36).toUpperCase(),
            completedAt: new Date().toISOString(),
            durationSeconds: durationSeconds || 0,
            candidate: {
                name: candidateData.name || "Arayan Aday",
                email: candidateData.email || "aday@example.com",
                experience: candidateData.experience || "3-5 Yıl",
                targetRoleKey: targetRole,
                targetRoleTitle: selectedRoleObj.title
            },
            scores: dimensionPercentages,
            jobMatchPercentage,
            sincerity: {
                score: liePercentage,
                status: sincerityStatus,
                color: sincerityColor,
                isReliable
            },
            strengths,
            growthAreas,
            interviewQuestions
        };
    }
};
