/**
 * İşe Alım Psikolojik Envanteri - Ana Uygulama Kontrolcüm (App Controller)
 */

document.addEventListener("DOMContentLoaded", () => {
    AppController.init();
});

const AppController = {
    // Uygulamamın durum (state) yönetimi
    state: {
        currentView: "welcomeView",
        candidate: null,
        currentQuestionIndex: 0,
        answers: {}, // soruId -> cevap (1..5 veya secenekIndex)
        startTime: null,
        timerInterval: null,
        elapsedSeconds: 0,
        currentReport: null,
        history: []
    },

    // Başlangıç kurulumlarını yapıyorum
    init() {
        this.populateRoleOptions();
        this.loadHistoryFromStorage();
        this.bindEvents();
        this.showView("welcomeView");
    },

    // Pozisyon seçeneklerini roles.js verisinden dinamik dolduruyorum
    populateRoleOptions() {
        const select = document.getElementById("targetRoleSelect");
        if (!select) return;

        select.innerHTML = "";
        Object.keys(JOB_ROLES).forEach(key => {
            const role = JOB_ROLES[key];
            const option = document.createElement("option");
            option.value = role.id;
            option.textContent = `${role.title} (${role.department})`;
            select.appendChild(option);
        });
    },

    // Etkinlik dinleyicilerimi bağlıyorum
    bindEvents() {
        // Form gönderilince testi başlatıyorum
        const candidateForm = document.getElementById("candidateForm");
        if (candidateForm) {
            candidateForm.addEventListener("submit", (e) => {
                e.preventDefault();
                this.startTest();
            });
        }

        // Test navigasyon butonlarım
        const prevBtn = document.getElementById("prevBtn");
        const nextBtn = document.getElementById("nextBtn");

        if (prevBtn) prevBtn.addEventListener("click", () => this.previousQuestion());
        if (nextBtn) nextBtn.addEventListener("click", () => this.nextQuestion());

        // Sekmeler arası geçiş (Aday Testi / İK Paneli)
        document.querySelectorAll(".nav-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const targetView = e.target.getAttribute("data-target");
                if (targetView === "hrDashboardView") {
                    this.renderHRDashboard();
                }
                this.showView(targetView);
                document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
                e.target.classList.add("active");
            });
        });
    },

    // İstenen ekranı gösterip diğerlerini gizliyorum
    showView(viewId) {
        document.querySelectorAll(".view").forEach(view => {
            view.classList.remove("active");
        });

        const targetViewEl = document.getElementById(viewId);
        if (targetViewEl) {
            targetViewEl.classList.add("active");
            this.state.currentView = viewId;
        }
    },

    // Aday testi ve zamanlayıcıyı başlatıyorum
    startTest() {
        const name = document.getElementById("candidateName").value.trim();
        const email = document.getElementById("candidateEmail").value.trim();
        const experience = document.getElementById("experienceSelect").value;
        const targetRole = document.getElementById("targetRoleSelect").value;

        if (!name || !email) {
            alert("Lütfen adınız ve e-posta adresinizi eksiksiz girin.");
            return;
        }

        this.state.candidate = { name, email, experience, targetRole };
        this.state.currentQuestionIndex = 0;
        this.state.answers = {};
        this.state.elapsedSeconds = 0;
        this.state.startTime = Date.now();

        // Sayacı sıfırlayıp başlatıyorum
        if (this.state.timerInterval) clearInterval(this.state.timerInterval);
        this.state.timerInterval = setInterval(() => {
            this.state.elapsedSeconds++;
            this.updateTimerDisplay();
        }, 1000);

        this.showView("testView");
        this.renderQuestion();
    },

    // Geçen süreyi dak:sn formatında güncelliyorum
    updateTimerDisplay() {
        const timerEl = document.getElementById("timerDisplay");
        if (!timerEl) return;
        const mins = Math.floor(this.state.elapsedSeconds / 60).toString().padStart(2, '0');
        const secs = (this.state.elapsedSeconds % 60).toString().padStart(2, '0');
        timerEl.textContent = `${mins}:${secs}`;
    },

    // Aktif soruyu ve seçeneklerini ekrana basıyorum
    renderQuestion() {
        const question = PSYCHOMETRIC_QUESTIONS[this.state.currentQuestionIndex];
        if (!question) return;

        // Sayac ve ilerleme çubuğu
        document.getElementById("currentQNum").textContent = this.state.currentQuestionIndex + 1;
        document.getElementById("totalQNum").textContent = PSYCHOMETRIC_QUESTIONS.length;
        
        const progressPct = ((this.state.currentQuestionIndex + 1) / PSYCHOMETRIC_QUESTIONS.length) * 100;
        document.getElementById("progressFill").style.width = `${progressPct}%`;

        // Kategori ve soru metni
        const categoryMeta = DIMENSION_METADATA[question.category] || {};
        document.getElementById("categoryTag").textContent = categoryMeta.title || question.category;
        document.getElementById("questionText").textContent = question.text;

        // Seçenekler konteynerini temizliyorum
        const optionsContainer = document.getElementById("questionOptions");
        optionsContainer.innerHTML = "";

        const savedAnswer = this.state.answers[question.id];

        if (question.type === "likert") {
            const likertDiv = document.createElement("div");
            likertDiv.className = "likert-container";

            for (let i = 1; i <= 5; i++) {
                const btn = document.createElement("button");
                btn.className = "likert-btn" + (savedAnswer === i ? " selected" : "");
                btn.type = "button";
                btn.textContent = i;
                btn.onclick = () => this.selectLikertAnswer(question.id, i);
                likertDiv.appendChild(btn);
            }

            const labelsRow = document.createElement("div");
            labelsRow.className = "likert-labels-row";
            labelsRow.innerHTML = `
                <span>Kesinlikle Katılmıyorum (1)</span>
                <span>Kararsızım (3)</span>
                <span>Kesinlikle Katılıyorum (5)</span>
            `;

            optionsContainer.appendChild(likertDiv);
            optionsContainer.appendChild(labelsRow);
        } else if (question.type === "multiple") {
            const stackDiv = document.createElement("div");
            stackDiv.className = "options-stack";

            question.options.forEach((opt, idx) => {
                const optCard = document.createElement("div");
                optCard.className = "option-card" + (savedAnswer === idx ? " selected" : "");
                optCard.onclick = () => this.selectMultipleAnswer(question.id, idx);

                optCard.innerHTML = `
                    <div class="radio-indicator"></div>
                    <span>${opt.text}</span>
                `;
                stackDiv.appendChild(optCard);
            });

            optionsContainer.appendChild(stackDiv);
        }

        // Buton durumlarını güncelliyorum
        document.getElementById("prevBtn").disabled = this.state.currentQuestionIndex === 0;
        const isAnswered = this.state.answers[question.id] !== undefined;
        document.getElementById("nextBtn").disabled = !isAnswered;

        // Son sorudaysam buton etiketini değiştiriyorum
        if (this.state.currentQuestionIndex === PSYCHOMETRIC_QUESTIONS.length - 1) {
            document.getElementById("nextBtn").textContent = "Testi Tamamla ve Raporla";
        } else {
            document.getElementById("nextBtn").textContent = "Sonraki Soru →";
        }
    },

    // Likert ölçeği cevabını kaydediyorum
    selectLikertAnswer(questionId, value) {
        this.state.answers[questionId] = value;
        this.renderQuestion();
    },

    // Çoktan seçmeli cevabı kaydediyorum
    selectMultipleAnswer(questionId, index) {
        this.state.answers[questionId] = index;
        this.renderQuestion();
    },

    // Önceki soruya geçiyorum
    previousQuestion() {
        if (this.state.currentQuestionIndex > 0) {
            this.state.currentQuestionIndex--;
            this.renderQuestion();
        }
    },

    // Sonraki soruya geçiyorum veya testi bitiriyorum
    nextQuestion() {
        if (this.state.currentQuestionIndex < PSYCHOMETRIC_QUESTIONS.length - 1) {
            this.state.currentQuestionIndex++;
            this.renderQuestion();
        } else {
            this.finishTest();
        }
    },

    // Testi sonlandırıp raporu hesaplıyorum
    finishTest() {
        if (this.state.timerInterval) clearInterval(this.state.timerInterval);

        const candidateData = {
            name: this.state.candidate.name,
            email: this.state.candidate.email,
            experience: this.state.candidate.experience,
            targetRole: this.state.candidate.targetRole,
            answers: this.state.answers,
            durationSeconds: this.state.elapsedSeconds
        };

        const report = ScoringEngine.calculateFullReport(candidateData);
        this.state.currentReport = report;

        // Raporu geçmişe kaydediyorum
        this.saveReportToHistory(report);

        // Rapor ekranını basıp gösteriyorum
        this.renderReportView(report);
        this.showView("resultsView");
    },

    // Değerlendirme raporu verilerini ekrana yerleştiriyorum
    renderReportView(report) {
        // Aday bilgileri
        document.getElementById("repCandidateName").textContent = report.candidate.name;
        document.getElementById("repCandidateDetails").textContent = `${report.candidate.targetRoleTitle} • ${report.candidate.experience} Deneyim • ${report.candidate.email}`;
        
        // Özet kartlar
        document.getElementById("repJobMatchScore").textContent = `%${report.jobMatchPercentage}`;
        document.getElementById("repSincerityStatus").textContent = report.sincerity.status;
        document.getElementById("repSincerityStatus").style.color = report.sincerity.color;

        const durationMins = Math.ceil(report.durationSeconds / 60);
        document.getElementById("repDuration").textContent = `${durationMins} Dakika`;

        // Boyut ilerleme çubuklarını çiziyorum
        const dimListContainer = document.getElementById("dimensionBarsList");
        if (dimListContainer) {
            dimListContainer.innerHTML = "";

            Object.keys(report.scores).forEach(key => {
                if (key === "lie_scale") return;
                const meta = DIMENSION_METADATA[key];
                if (!meta) return;
                const scorePct = report.scores[key];

                const barItem = document.createElement("div");
                barItem.className = "dim-bar-item";
                barItem.innerHTML = `
                    <div class="dim-bar-label">
                        <span>${meta.title}</span>
                        <span>%${scorePct}</span>
                    </div>
                    <div class="dim-bar-track">
                        <div class="dim-bar-fill" style="width: ${scorePct}%"></div>
                    </div>
                `;
                dimListContainer.appendChild(barItem);
            });
        }

        // Radar grafiğimi oluşturuyorum
        this.renderRadarChart(report.scores, report.candidate.targetRoleKey);

        // Niteliksel analizleri yerleştiriyorum (Güçlü Yönler & Gelişim Alanları)
        const strengthsList = document.getElementById("strengthsList");
        if (strengthsList) {
            let combinedHtml = (report.strengths || []).map(s => `<li><strong style="color:var(--success);">[Güçlü]</strong> ${s}</li>`).join("");
            if (report.growthAreas && report.growthAreas.length > 0) {
                combinedHtml += report.growthAreas.map(g => `<li><strong style="color:var(--warning);">[Gelişim]</strong> ${g}</li>`).join("");
            }
            strengthsList.innerHTML = combinedHtml;
        }

        // İK Not Alanını yüklüyorum ve canlı kaydetme dinleyicisi bağlıyorum
        const hrNotesInput = document.getElementById("hrNotesInput");
        if (hrNotesInput) {
            hrNotesInput.value = report.hrNotes || "";
            hrNotesInput.oninput = () => {
                report.hrNotes = hrNotesInput.value;
                this.saveReportToHistory(report);
            };
        }
    },

    // Chart.js kullanarak Big Five radar grafiğini çiziyorum
    renderRadarChart(scores, targetRoleKey) {
        const canvas = document.getElementById("radarChartCanvas");
        if (!canvas) return;

        const roleObj = JOB_ROLES[targetRoleKey] || JOB_ROLES.software_engineer;
        const benchmarks = roleObj.benchmarks;

        const labels = [
            "Duygusal Denge",
            "Sorumluluk",
            "Dışa Dönüklük",
            "Uyumluluk",
            "Deneyime Açıklık"
        ];

        const candidateData = [
            scores.emotional_stability || 50,
            scores.conscientiousness || 50,
            scores.extraversion || 50,
            scores.agreeableness || 50,
            scores.openness || 50
        ];

        const benchmarkData = [
            benchmarks.emotional_stability || 75,
            benchmarks.conscientiousness || 85,
            benchmarks.extraversion || 65,
            benchmarks.agreeableness || 75,
            benchmarks.openness || 80
        ];

        if (window.Chart) {
            if (this.radarChartInstance) {
                this.radarChartInstance.destroy();
            }

            this.radarChartInstance = new Chart(canvas, {
                type: 'radar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Aday Profili',
                            data: candidateData,
                            backgroundColor: 'rgba(79, 70, 229, 0.25)',
                            borderColor: '#4F46E5',
                            borderWidth: 3,
                            pointBackgroundColor: '#4F46E5'
                        },
                        {
                            label: 'Pozisyon Hedef Profili',
                            data: benchmarkData,
                            backgroundColor: 'rgba(14, 165, 233, 0.15)',
                            borderColor: '#0EA5E9',
                            borderWidth: 2,
                            borderDash: [5, 5],
                            pointBackgroundColor: '#0EA5E9'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            angleLines: { color: '#E2E8F0' },
                            grid: { color: '#E2E8F0' },
                            suggestedMin: 0,
                            suggestedMax: 100,
                            ticks: { display: false }
                        }
                    },
                    plugins: {
                        legend: { position: 'bottom' }
                    }
                }
            });
        }
    },

    // Raporu hafızaya ve localStorage'a kaydediyorum
    saveReportToHistory(report) {
        this.state.history.unshift(report);
        try {
            localStorage.setItem("psych_eval_history", JSON.stringify(this.state.history.slice(0, 50)));
        } catch (e) {
            console.error("Depolama hatası:", e);
        }
    },

    // Geçmiş değerlendirmeleri localStorage'dan yüklüyorum
    loadHistoryFromStorage() {
        try {
            const raw = localStorage.getItem("psych_eval_history");
            if (raw) {
                this.state.history = JSON.parse(raw);
            }
        } catch (e) {
            this.state.history = [];
        }
    },

    // İK yönetim tablosunu aday verileriyle dolduruyorum
    renderHRDashboard() {
        const tbody = document.getElementById("hrTableBody");
        if (!tbody) return;

        tbody.innerHTML = "";

        if (this.state.history.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:30px; color:#94A3B8;">Henüz kaydedilmiş aday değerlendirmesi bulunmuyor.</td></tr>`;
            return;
        }

        this.state.history.forEach(item => {
            const tr = document.createElement("tr");
            const dateStr = new Date(item.completedAt).toLocaleDateString("tr-TR");

            tr.innerHTML = `
                <td><strong>${item.candidate.name}</strong><br><small style="color:#64748B;">${item.candidate.email}</small></td>
                <td>${item.candidate.targetRoleTitle}</td>
                <td><span style="font-weight:800; color:#4F46E5;">%${item.jobMatchPercentage}</span></td>
                <td><span style="color:${item.sincerity.color}; font-weight:700;">%${item.sincerity.score}</span></td>
                <td>${dateStr}</td>
                <td>
                    <button class="btn btn-secondary" style="padding:6px 12px; font-size:0.8rem;" onclick="AppController.viewPastReport('${item.id}')">Raporu Gör</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    },

    // Geçmiş aday raporunu seçip gösteriyorum
    viewPastReport(reportId) {
        const found = this.state.history.find(r => r.id === reportId);
        if (found) {
            this.renderReportView(found);
            this.showView("resultsView");
        }
    }
};

// Sayfa yazdırma yardımcım
function printResults() {
    window.print();
}
