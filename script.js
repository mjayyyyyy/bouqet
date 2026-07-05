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

// ---- Save Page Image (Clean, high-fidelity capture config) ----
saveBtn.addEventListener('click', () => {
    saveBtn.style.opacity = '0';
    petalsContainer.style.display = 'none';
    sparklesContainer.style.display = 'none';

    // Small delay to let UI updates register
    setTimeout(() => {
        if (typeof html2canvas !== 'undefined') {
            html2canvas(giftWrapper, {
                useCORS: true,         // Allows loading images correctly on GitHub Pages
                allowTaint: false,      // Disabling allowTaint prevents distorted canvas contexts
                scale: 2,              // Double resolution
                backgroundColor: '#f3f9f3',
                logging: false,
                scrollX: 0,
                scrollY: -window.scrollY, // Corrects offset coordinates when scrolled down
                windowWidth: document.documentElement.offsetWidth,
                windowHeight: document.documentElement.offsetHeight
            }).then(canvas => {
                // Instantly generate and trigger direct file download 
                const image = canvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.download = "bouquet-for-mheg.png";
                link.href = image;
                
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                restoreStyles();
            }).catch(err => {
                console.error("Capture failure: ", err);
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
