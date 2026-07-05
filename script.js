/* ========================================
   Digital Bouquet - Light Green Responsive Script
   ======================================== */

// ---- DOM Elements ----
const petalsContainer = document.getElementById('petals-container');
const sparklesContainer = document.getElementById('sparkles-container');
const saveBtn = document.getElementById('save-btn');
const giftWrapper = document.getElementById('gift-page-wrapper');

// ---- Floating Petals ----
const petalEmojis = ['🌸', '🌺', '🌹', '💮', '🏵️', '✿', '🍃', '🌱'];

function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('petal');

    const emoji = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
    petal.textContent = emoji;

    const size = Math.random() * 14 + 10;
    petal.style.fontSize = size + 'px';
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.setProperty('--drift', (Math.random() * 160 - 80) + 'px');
    petal.style.setProperty('--rotation', (Math.random() * 720 - 360) + 'deg');

    const duration = Math.random() * 6 + 6;
    petal.style.animationDuration = duration + 's';

    petalsContainer.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, duration * 1000);
}

function startPetals() {
    for (let i = 0; i < 12; i++) {
        setTimeout(() => createPetal(), i * 200);
    }
    setInterval(createPetal, 1200);
}

// ---- Sparkles ----
function createSparkles() {
    const count = 25;
    for (let i = 0; i < count; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = (Math.random() * 2) + 's';
        sparkle.style.animationDuration = (Math.random() * 2 + 1) + 's';
        sparklesContainer.appendChild(sparkle);
    }
}

// ---- Save Page Image (Guaranteed Direct Download on Live GitHub Pages URL) ----
saveBtn.addEventListener('click', () => {
    saveBtn.style.opacity = '0';
    petalsContainer.style.display = 'none';
    sparklesContainer.style.display = 'none';

    setTimeout(() => {
        if (typeof html2canvas !== 'undefined') {
            html2canvas(giftWrapper, {
                useCORS: true,         // Enabled CORS - critical for downloading when hosted on github.io!
                allowTaint: false,      // Disabled taint so canvas remains secure and exportable
                scale: 2,
                backgroundColor: '#f3f9f3',
                logging: false
            }).then(canvas => {
                try {
                    // Standard Download method using anchor elements
                    const dataUrl = canvas.toDataURL("image/png");
                    const link = document.createElement("a");
                    link.download = "bouquet-for-mheg.png";
                    link.href = dataUrl;
                    
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } catch(e) {
                    console.error("Direct download link trigger failed: ", e);
                    // Fallback popup if browser blocks download
                    const win = window.open();
                    if (win) {
                        win.document.write('<p style="font-family:sans-serif; text-align:center; color:#2d3e2d;">🌸 Long-press or right-click to save your image! 🌸</p><img src="' + canvas.toDataURL("image/png") + '" style="display:block; margin:20px auto; max-width:90%; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.1); border:4px solid white;"/>');
                    }
                }
                restoreStyles();
            }).catch(err => {
                console.error("html2canvas generation error: ", err);
                restoreStyles();
            });
        } else {
            restoreStyles();
        }
    }, 150);
});

function restoreStyles() {
    saveBtn.style.opacity = '1';
    petalsContainer.style.display = 'block';
    sparklesContainer.style.display = 'block';
}

// ---- Initialize ----
startPetals();
createSparkles();
