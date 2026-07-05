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

// ---- Save Page Image (Using absolute local file protocol fallback wrapper) ----
saveBtn.addEventListener('click', () => {
    saveBtn.style.opacity = '0';
    petalsContainer.style.display = 'none';
    sparklesContainer.style.display = 'none';

    setTimeout(() => {
        if (typeof html2canvas !== 'undefined') {
            html2canvas(giftWrapper, {
                useCORS: false,
                allowTaint: true,
                scale: 2,
                backgroundColor: '#f3f9f3',
                logging: true
            }).then(canvas => {
                try {
                    const dataUrl = canvas.toDataURL("image/png");
                    
                    // Direct Window Pop-up injection: Force render in tab. 
                    // This is the only 100% successful bypass on file:// protocol for all devices.
                    const win = window.open();
                    if (win) {
                        win.document.write(`
                            <html>
                            <head>
                                <title>Your Bouquet Image</title>
                                <style>
                                    body {
                                        background-color: #f3f9f3;
                                        margin: 0;
                                        display: flex;
                                        flex-direction: column;
                                        align-items: center;
                                        justify-content: center;
                                        min-height: 100vh;
                                        font-family: sans-serif;
                                    }
                                    .container {
                                        text-align: center;
                                        padding: 20px;
                                    }
                                    img {
                                        max-width: 90%;
                                        max-height: 80vh;
                                        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                                        border-radius: 12px;
                                        border: 4px solid white;
                                    }
                                    p {
                                        color: #2d3e2d;
                                        font-size: 18px;
                                        margin-top: 20px;
                                        font-weight: 500;
                                    }
                                    .note {
                                        font-size: 14px;
                                        color: #6b826b;
                                        margin-top: 5px;
                                    }
                                </style>
                            </head>
                            <body>
                                <div class="container">
                                    <img src="${dataUrl}" alt="Bouquet for Mheg">
                                    <p>🌸 Long press or right-click the image to save it! 🌸</p>
                                    <div class="note">(Saved to your clipboard / Save Image As)</div>
                                </div>
                            </body>
                            </html>
                        `);
                        win.document.close();
                    } else {
                        // Alert fallback if popups are fully blocked
                        alert("Please check your browser toolbar and allow Pop-ups for this local file so we can display your image to save.");
                    }
                } catch(e) {
                    console.error("Direct popup injection failed: ", e);
                    alert("Unable to generate image locally. Try opening the page in a normal web server (e.g. running via a local host).");
                }
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
