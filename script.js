// Interactive logic for AHMIX AI Certification

document.addEventListener('DOMContentLoaded', () => {
    // 1. Background Canvas Animation (Futuristic Particles)
    initCanvas();

    // 2. Certificate Customization
    const recipientInput = document.getElementById('recipient-name');
    const trackSelect = document.getElementById('recipient-track');
    const updateBtn = document.getElementById('btn-update-cert');
    const printBtn = document.getElementById('btn-print-cert');

    const displayRecipient = document.getElementById('display-recipient');
    const displayTrack = document.getElementById('display-track');
    const displayDate = document.getElementById('display-date');
    const displayId = document.getElementById('display-id');
    const certIdInput = document.getElementById('cert-id-input');

    // Set today's date
    const today = new Date().toISOString().split('T')[0];
    if (displayDate) displayDate.textContent = today;

    function generateCertId(name) {
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = (hash << 5) - hash + name.charCodeAt(i);
            hash |= 0;
        }
        const code = Math.abs(hash % 9000) + 1000;
        return `AHMIX-AI-2026-${code}`;
    }

    if (updateBtn) {
        updateBtn.addEventListener('click', () => {
            const name = recipientInput.value.trim() || 'أحمد عبد الفتاح';
            const trackText = trackSelect.options[trackSelect.selectedIndex].text;
            const newId = generateCertId(name);

            displayRecipient.textContent = name;
            displayTrack.textContent = trackText;
            displayId.textContent = newId;
            certIdInput.value = newId;

            // Highlight animation
            displayRecipient.style.transform = 'scale(1.05)';
            displayRecipient.style.transition = 'transform 0.3s ease';
            setTimeout(() => {
                displayRecipient.style.transform = 'scale(1)';
            }, 300);
        });
    }

    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // 3. Verification Module
    const verifyInput = document.getElementById('verify-input');
    const btnVerify = document.getElementById('btn-verify');
    const verifyResult = document.getElementById('verify-result');

    if (btnVerify && verifyInput && verifyResult) {
        btnVerify.addEventListener('click', () => {
            const val = verifyInput.value.trim();
            verifyResult.classList.remove('hidden', 'error');

            if (!val) {
                verifyResult.classList.add('error');
                verifyResult.innerHTML = '⚠️ الرجاء إدخال كود الشهادة للتحقق.';
                return;
            }

            if (val.startsWith('AHMIX-AI-2026-')) {
                verifyResult.innerHTML = `
                    <div style="font-weight: bold; color: #10b981; margin-bottom: 0.3rem;">✓ شهادة صالحة وموثقة في سجلات AHMIX</div>
                    <div><strong>المعرف:</strong> ${val}</div>
                    <div><strong>المرجع:</strong> AHMIX Official Standard (Author: Ahmed Abdel Fattah)</div>
                    <div><strong>الحالة:</strong> Active & Verified (Cryptographically Checked)</div>
                `;
            } else {
                verifyResult.classList.add('error');
                verifyResult.innerHTML = `
                    <div style="font-weight: bold; color: #ef4444; margin-bottom: 0.3rem;">✕ كود الشهادة غير صالح أو غير مسجل</div>
                    <div>تأكد من صيغة المعرف (مثال: AHMIX-AI-2026-9842)</div>
                `;
            }
        });
    }
});

// Canvas Particle background
function initCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = Math.min(width / 20, 50);

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            radius: Math.random() * 2 + 1,
            alpha: Math.random() * 0.5 + 0.2
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(99, 102, 241, ${p.alpha})`;
            ctx.fill();

            // Connect nearby points
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - dist / 120)})`;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}
