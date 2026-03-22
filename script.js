// Language Toggle Logic
const translations = {
    zh: {
        home: "首頁",
        trailer: "觀看預告",
        synopsis: "劇情簡介",
        gallery: "畫廊",
        production: "製作團隊",
        mute: "靜音閃電與雨聲效果",
        sfxMuted: "影片播放期間已自動靜音音效",
        synopsisDesc: "圖一：探索該區域的異常現象。",
        watchAnim: "觀看動畫",
        changeLang: "切換語言",
        whatWeKnow: "目前所知",
        galleryDesc: "描述",
        galleryDescText: "我們將這部動畫的環境場景製作得非常精緻，同時在避免過度空曠與不被次要物件塞滿之間，取得了完美的平衡。我們用來提升動畫場景美感的主要元素，在於冷暖光線的運用，以及為場景中的物件搭配高品質的材質貼圖。整體而言，在製作這部動畫的過程中，隨著時間的推移我們學到了很多並持續進步，例如與現實生活中的真實樣貌相比，我們更傾向於為這些環境營造出一種更「宏大／高品質」的氛圍。",
        synopsisDescTitle: "劇情大綱",
        galleryHeader: "畫廊",
        zoomOutMsg: "點擊相框外任意處即可縮小",
        synopsisText: "生活拮据的女主角在某夜抓住了翻身的機會，殊不知在背後卻有不法份子試圖利用這次的機會，做些不好的事情。最後主角也成功抓住了可以讓她從谷底翻身的票券，準備前往屬於她的星光航班，實現夢想。",
        roleWeb: "網頁設計",
        roleLight: "燈光設計",
        roleArt: "美術",
        roleAnim: "動畫",
        roleShoot: "攝影",
        rolePost: "後期製作",
        roleProj: "專案管理",
        roleProg: "程式設計",
        roleCam: "攝影機",
        roleMusic: "音樂/音效設計",
        roleFilmEdit: "影片剪輯",
        roleImageEdit: "影像編輯",
        roleSupervisor: "指導老師"
    }
};

let currentLang = 'en';

// Save original text immediately before any modifications
document.querySelectorAll('[data-key]').forEach(el => {
    el.dataset.originalText = el.innerText;
});
const langInd = document.querySelector('.lang-indicator');
if (langInd) langInd.dataset.originalText = langInd.innerText;

function setLanguage(lang) {
    currentLang = lang;
    const body = document.body;

    if (lang === 'zh') {
        body.classList.add('lang-zh');
        body.classList.remove('lang-en');
    } else {
        body.classList.add('lang-en');
        body.classList.remove('lang-zh');
    }

    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (lang === 'zh') {
            if (translations['zh'][key]) {
                typewriterEffect(el, translations['zh'][key]);
            }
        } else {
            if (el.dataset.originalText !== undefined) {
                typewriterEffect(el, el.dataset.originalText);
            }
        }
    });

    if (langInd) {
        if (lang === 'zh') {
            typewriterEffect(langInd, '中文');
        } else {
            if (langInd.dataset.originalText !== undefined) {
                typewriterEffect(langInd, langInd.dataset.originalText);
            }
        }
    }

    // Toggle Brand Logo on the Ticket with wipe effect
    const btnLogoImg = document.getElementById('ticket-logo-img');
    const btnLogoText = document.getElementById('ticket-logo-text');

    function wipeTransition(showEl, hideEl) {
        if (!hideEl || !showEl) return;

        if (hideEl.style.display !== 'none' && hideEl.style.display !== '') {
            hideEl.classList.remove('wipe-in');
            hideEl.classList.add('wipe-out');

            setTimeout(() => {
                hideEl.style.display = 'none';
                hideEl.classList.remove('wipe-out');

                showEl.style.display = 'block';
                showEl.classList.remove('wipe-out');
                showEl.classList.add('wipe-in');
            }, 350);
        } else if (hideEl.style.display === '') {
            // First time click, 'style.display' is empty for the image.
            hideEl.classList.remove('wipe-in');
            hideEl.classList.add('wipe-out');

            setTimeout(() => {
                hideEl.style.display = 'none';
                hideEl.classList.remove('wipe-out');

                showEl.style.display = 'block';
                showEl.classList.remove('wipe-out');
                showEl.classList.add('wipe-in');
            }, 350);
        } else {
            showEl.style.display = 'block';
            showEl.classList.add('wipe-in');
        }
    }

    if (lang === 'zh') {
        wipeTransition(btnLogoImg, btnLogoText);
    } else {
        wipeTransition(btnLogoText, btnLogoImg);
    }
}

function toggleLanguage() {
    setLanguage(currentLang === 'zh' ? 'en' : 'zh');
}

// Initialize to Chinese on load as requested
setLanguage('zh');

function typewriterEffect(element, text) {
    element.classList.remove('fade-text');
    if (element.typewriterTimeout) {
        clearTimeout(element.typewriterTimeout);
    }
    element.innerText = '';
    
    let delay = 800 / text.length;
    if (delay > 30) delay = 30; // Max 30ms per char for short words
    if (delay < 5) delay = 5; // Minimum 5ms
    
    let i = 0;
    let currentText = '';
    function typeNextChar() {
        if (i < text.length) {
            currentText += text.charAt(i);
            element.innerText = currentText;
            i++;
            element.typewriterTimeout = setTimeout(typeNextChar, delay);
        } else {
            // End of typing: add blinking cursor
            const cursor = document.createElement('span');
            cursor.className = 'blinking-cursor';
            cursor.innerText = '_';
            cursor.style.display = 'inline-block';
            cursor.style.marginLeft = '2px';
            cursor.style.transition = 'opacity 1s ease';
            element.appendChild(cursor);
            
            // Fade out after a few seconds
            setTimeout(() => {
                cursor.style.opacity = '0';
            }, 3000);
        }
    }
    typeNextChar();
}

const items = document.querySelectorAll('.nav-item');

// ================================================================
// NEON LIGHT RANDOMIZATION REMOVED
// ================================================================

// ================================================================
// LIGHTNING EFFECT
// ================================================================
function triggerSingleFlash(duration, isLast) {
    const flash = document.createElement('div');
    flash.className = 'lightning-flash';
    document.body.appendChild(flash);

    flash.style.animation = `lightningStrike ${duration}ms ease-out forwards`;

    setTimeout(() => {
        flash.remove();
        if (isLast) scheduleLightning(); // Wait for the whole sequence to finish before scheduling the next one
    }, duration + 100);
}

function createLightningSequence() {
    // 3 to 5 flashes
    const flashCount = Math.floor(Math.random() * 3) + 3;
    let accumulatedDelay = 0;

    for (let i = 0; i < flashCount; i++) {
        const isLast = (i === flashCount - 1);

        // Fast initial flashes (60ms - 150ms), much longer final flash (300ms - 500ms)
        const duration = isLast
            ? Math.floor(Math.random() * 200) + 300
            : Math.floor(Math.random() * 90) + 60;

        // Wait between flashes (40ms - 120ms gap)
        const gap = Math.floor(Math.random() * 80) + 40;

        setTimeout(() => {
            triggerSingleFlash(duration, isLast);
        }, accumulatedDelay);

        accumulatedDelay += duration + gap;
    }
}

const THUNDER_DELAY = 1000; // Delay thunder slightly after the flash
function playThunder() {
    if (isMuted) return;

    // TODO: Add audio logic here
    // Example:
    // const thunderSound = new Audio('sounds/thunder.mp3');
    // thunderSound.volume = 0.5;
    // thunderSound.play();
    console.log("Thunder plays!");
}

function scheduleLightning() {
    // Random interval between 15 seconds (15000ms) and 30 seconds (30000ms)
    const delay = Math.random() * (30000 - 15000) + 15000;
    setTimeout(() => {
        createLightningSequence();
        // Play thunder shortly after sequence starts
        setTimeout(playThunder, THUNDER_DELAY);
    }, delay);
}

// Start the first lightning cycle
scheduleLightning();

// ================================================================
// AUDIO MUTE / UNMUTE LOGIC
// ================================================================
const BASE_VOLUME = 0.375; // Lowered by 25% from 0.50
let isMuted = false; // Default to unmuted

let fadeInterval = null;

function fadeAudio(audioElement, targetVolume, durationMs) {
    if (!audioElement) return;
    clearInterval(fadeInterval);
    const startVolume = audioElement.volume;
    const volumeDiff = targetVolume - startVolume;
    const steps = 20; // 20 updates
    const stepTime = durationMs / steps;
    let currentStep = 0;

    fadeInterval = setInterval(() => {
        currentStep++;
        const newVolume = startVolume + (volumeDiff * (currentStep / steps));
        // Clamp volume between 0 and 1
        audioElement.volume = Math.max(0, Math.min(1, newVolume));

        if (currentStep >= steps) {
            clearInterval(fadeInterval);
            audioElement.volume = targetVolume;
            if (targetVolume === 0) {
                audioElement.pause();
            }
        }
    }, stepTime);
}

function toggleMute() {
    isMuted = !isMuted;

    const muteBtn = document.getElementById('mute-btn');
    const icon = muteBtn.querySelector('svg');
    const textSpan = muteBtn.querySelector('.mute-text');
    const rainAudio = document.getElementById('rain-audio');

    // Simple path swap for Speaker vs Speaker with Cross
    if (isMuted) {
        if (rainAudio) rainAudio.pause();
        // Mute icon (volume off) - Meaning it IS muted right now, click to unmute
        icon.innerHTML = '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>';
        // Change text to 'Unmute'
        textSpan.innerText = currentLang === 'zh' ? '取消靜音閃電與雨聲效果' : 'Unmute lightning and rain SFX';
    } else {
        if (rainAudio) {
            clearInterval(fadeInterval); // Stop any ongoing fade
            rainAudio.volume = BASE_VOLUME; // Default volume
            rainAudio.play().catch(e => console.log("Audio play failed:", e));
        }
        // Unmute icon (volume up) - Meaning audio is on, click to mute
        icon.innerHTML = '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>';
        // Change text back to 'Mute'
        textSpan.innerText = currentLang === 'zh' ? '靜音閃電與雨聲效果' : 'Mute lightning and rain SFX';
    }
}

// Attempt to play immediately on load
window.addEventListener('DOMContentLoaded', () => {
    // Delete the static website icon after animation, leaving the intro logo in its place
    setTimeout(() => {
        const siteIcon = document.querySelector('.brand-header .site-icon');
        if (siteIcon) {
            siteIcon.remove();
        }
    }, 3500);

    const rainAudio = document.getElementById('rain-audio');
    if (rainAudio) {
        rainAudio.volume = BASE_VOLUME;
        let playPromise = rainAudio.play();
        if (playPromise !== undefined) {
            playPromise.catch(e => {
                console.log("Audio autoplay prevented on load. Will wait for first user interaction.", e);
            });
        }
    }

    // Scroll-snap click logic for picture-mode roll
    const snapContainers = document.querySelectorAll('.snap-img-container');
    snapContainers.forEach(container => {
        container.addEventListener('click', () => {
            container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    });
});

// Bootstrap audio on first interaction if unmuted and autoplay was blocked
document.addEventListener('click', function initAudio() {
    if (!isMuted) {
        const rainAudio = document.getElementById('rain-audio');
        if (rainAudio && rainAudio.paused) {
            rainAudio.volume = BASE_VOLUME;
            rainAudio.play().catch(e => console.log("Audio playback prevented on init:", e));
        }
    }
    document.removeEventListener('click', initAudio);
}, { once: true });

// Fade out/in audio on window blur/focus
window.addEventListener('blur', () => {
    if (isMuted) return;
    const rainAudio = document.getElementById('rain-audio');
    if (rainAudio && !rainAudio.paused) {
        fadeAudio(rainAudio, 0, 1000); // fade out over 1s
    }
});

window.addEventListener('focus', () => {
    if (isMuted) return;
    const rainAudio = document.getElementById('rain-audio');
    if (rainAudio) {
        if (rainAudio.paused) {
            rainAudio.volume = 0; // ensure it starts from 0
            rainAudio.play().catch(e => console.log("Autoplay on focus prevented:", e));
        }
        fadeAudio(rainAudio, BASE_VOLUME, 1000); // fade in over 1s
    }
});

// ================================================================
// RAINDROPS GENERATOR
// ================================================================
function createRaindrop() {
    const rainContainer = document.getElementById('rain-layer');
    if (!rainContainer) return;

    const drop = document.createElement('div');
    drop.classList.add('raindrop');

    // Randomize initial position across the width and height of the 200vw/vh container
    const randomLeft = Math.random() * 100; // 0% to 100% width
    const randomTop = Math.random() * 100;  // 0% to 100% height

    // Varying speeds: Duration between 4s to 8s (includes pauses)
    const duration = (Math.random() * 4) + 4;
    // Small delay to prevent rigid clusters
    const delay = Math.random() * 1.5;

    drop.style.left = `${randomLeft}%`;
    drop.style.top = `${randomTop}%`;
    drop.style.setProperty('--duration', `${duration}s`);
    drop.style.setProperty('--delay', `${delay}s`);

    // Wide angle variation: -0.5 to 0.5 (representing ~ -25deg to +25deg from the 30deg global rotation)
    const randSlide = Math.random();
    let slideAngle = 0;
    let slideRotation = 0; // In degrees
    if (randSlide > 0.4) {
        // 60% of drops slide at an angle
        slideAngle = (Math.random() * 1.0) - 0.5; // -0.5 to 0.5
        // Convert the slideAngle (which represents a horizontal shift over a vertical drop) into a rotation angle
        // Math.atan(slideAngle) gives radians, convert to degrees. Since translateY is positive downwards, atan(x/y) where y=1 is roughly it.
        // Actually, since translateX = 140vh * slideAngle and translateY = 140vh, the ratio is slideAngle/1.
        slideRotation = -Math.atan(slideAngle) * (180 / Math.PI);
    }
    drop.style.setProperty('--slide-angle', slideAngle);
    drop.style.setProperty('--slide-rotation', `${slideRotation}deg`);

    // Varying sizes
    const scale = (Math.random() * 0.8) + 0.4;
    drop.style.transform = `scale(${scale})`;

    rainContainer.appendChild(drop);

    // Remove drop after animation completes
    setTimeout(() => {
        if (drop.parentNode) {
            drop.remove();
        }
    }, (duration + delay + 0.5) * 1000);
}

function spawnRain() {
    // Reduced by 50% from original: Spawn 3-6 drops instead of 8-16
    const spawnCount = Math.floor(Math.random() * 4) + 3;
    for (let i = 0; i < spawnCount; i++) {
        createRaindrop();
    }

    // Schedule next rain spawn
    const nextSpawn = Math.random() * 800 + 400; // Slower spawn rate
    setTimeout(spawnRain, nextSpawn);
}

// Start rain
spawnRain();
createFastRain(); // bootstrap if fastRain generator isn't already active
function createFastRain() {
    const fastRainContainer = document.getElementById('fast-rain-layer');
    if (!fastRainContainer) return;

    const drop = document.createElement('div');
    drop.classList.add('fast-raindrop');

    const randomLeft = Math.random() * 100;
    const randomTop = Math.random() * 100;

    // Very fast falling, no delay
    const duration = (Math.random() * 0.3) + 0.2;

    drop.style.left = `${randomLeft}%`;
    drop.style.top = `${randomTop}%`;
    drop.style.setProperty('--duration', `${duration}s`);

    fastRainContainer.appendChild(drop);

    setTimeout(() => {
        if (drop.parentNode) drop.remove();
    }, (duration + 0.1) * 1000);
}

function spawnFastRain() {
    // Reduced by 25%: 22-38 drops per tick strictly instead of 30-50
    const spawnCount = Math.floor(Math.random() * 17) + 22;
    for (let i = 0; i < spawnCount; i++) {
        createFastRain();
    }

    // Continuous fast spanwing (every 20ms - 40ms)
    const nextSpawn = Math.random() * 20 + 20;
    setTimeout(spawnFastRain, nextSpawn);
}

function createStaticRaindrop(clusterLeft = null, clusterTop = null) {
    const staticRainContainer = document.getElementById('static-rain-layer');
    if (!staticRainContainer) return;

    const drop = document.createElement('div');
    drop.classList.add('static-raindrop');

    // Make clusters more spread out to cover the entire lit area
    const isCluster = clusterLeft !== null && clusterTop !== null;
    // Spread radius increased to 40% (covers the whole window area)
    const randomLeft = isCluster ? clusterLeft + (Math.random() * 40 - 20) : Math.random() * 100;
    const randomTop = isCluster ? clusterTop + (Math.random() * 40 - 20) : Math.random() * 100;

    // Duration between 5s to 9s (slightly longer for clusters)
    const duration = (Math.random() * 4) + 5;

    drop.style.left = `${randomLeft}%`;
    drop.style.top = `${randomTop}%`;
    drop.style.setProperty('--duration', `${duration}s`);

    // Varying sizes: clusters can have bigger droplets
    const baseScale = isCluster && Math.random() > 0.7 ? (Math.random() * 2.5) + 1.0 : (Math.random() * 1.5) + 0.5;
    drop.style.setProperty('--scale-base', baseScale);

    // Random shapes to avoid perfect circles
    const w = Math.random() * 5 + 3; // 3px to 8px
    const h = Math.random() * 5 + 3; // 3px to 8px
    drop.style.width = `${w}px`;
    drop.style.height = `${h}px`;

    // Varying border radiuses for organic blob feel
    const br1 = Math.floor(Math.random() * 30 + 40); // 40-70%
    const br2 = Math.floor(Math.random() * 30 + 40);
    const br3 = Math.floor(Math.random() * 30 + 40);
    const br4 = Math.floor(Math.random() * 30 + 40);
    drop.style.borderRadius = `${br1}% ${br2}% ${br3}% ${br4}%`;

    staticRainContainer.appendChild(drop);

    // Remove drop after animation completes
    setTimeout(() => {
        if (drop.parentNode) {
            drop.remove();
        }
    }, (duration + 0.1) * 1000);
}

function spawnStaticRain() {
    // Increase previous halved amount by 25% (around 15-25 drops total)
    // Distributed widely across the screen
    const clusterCount = Math.floor(Math.random() * 4) + 3; // 3 to 6 clusters

    for (let c = 0; c < clusterCount; c++) {
        // Define cluster center
        const clusterLeft = Math.random() * 100;
        const clusterTop = Math.random() * 100;

        // 3 to 5 drops per area
        const dropsInCluster = Math.floor(Math.random() * 3) + 3;
        for (let i = 0; i < dropsInCluster; i++) {
            createStaticRaindrop(clusterLeft, clusterTop);
        }
    }

    // Plus more completely random scattered ones
    for (let i = 0; i < 4; i++) {
        createStaticRaindrop();
    }

    // Regular generation interval back to normal pace
    const nextSpawn = Math.random() * 400 + 400;
    setTimeout(spawnStaticRain, nextSpawn);
}

spawnStaticRain();
spawnFastRain();

// ================================================================
// VIDEO WINDOW LOGIC
// ================================================================
const btnTrailer = document.getElementById('btn-trailer-highlight');
const videoWindow = document.getElementById('video-window');
const closeVideoBtn = document.getElementById('close-video-btn');
const sfxNotification = document.getElementById('sfx-notification');
const youtubePlayer = document.getElementById('youtube-player');
let wasMutedBeforeVideo = false;

function togglePurpleLighting(isActive) {
    const body = document.body;
    if (isActive) {
        body.classList.add('video-active');
    } else {
        body.classList.remove('video-active');
    }
}

if (btnTrailer) {
    btnTrailer.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent ticket click event from triggering if docked

        videoWindow.classList.add('slide-in');
        youtubePlayer.src = "https://www.youtube.com/embed/TWo91PrbsUc?enablejsapi=1&autoplay=1&mute=0&controls=1";

        togglePurpleLighting(true);

        wasMutedBeforeVideo = isMuted;
        if (!isMuted) {
            toggleMute(); // Auto-mute
            sfxNotification.classList.remove('show');
            void sfxNotification.offsetWidth; // Reflow
            sfxNotification.classList.add('show');
        }
    });
}

if (closeVideoBtn) {
    closeVideoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        videoWindow.classList.remove('slide-in');
        youtubePlayer.src = "https://www.youtube.com/embed/TWo91PrbsUc?enablejsapi=1&autoplay=0&mute=0&controls=1";
        
        togglePurpleLighting(false);

        if (!wasMutedBeforeVideo && isMuted) {
            toggleMute(); // Restore unmute
        }
    });
}

// =====================// ================================================================
// NEWSPAPER WINDOWS LOGIC (Synopsis, Gallery, Team)
// ================================================================

function hideAllWindows() {
    const windows = document.querySelectorAll('.content-window');
    windows.forEach(win => {
        win.classList.remove('slide-in');
    });
}

// Synopsis Button
const btnSynopsis = document.getElementById('btn-synopsis');
const synopsisWindow = document.getElementById('synopsis-window');
const closeSynopsisBtn = document.getElementById('close-synopsis-btn');

if (btnSynopsis && synopsisWindow) {
    btnSynopsis.addEventListener('click', (e) => {
        e.preventDefault();
        hideAllWindows();
        synopsisWindow.classList.add('slide-in');
        togglePurpleLighting(true);
    });

    closeSynopsisBtn.addEventListener('click', () => {
        synopsisWindow.classList.remove('slide-in');
        togglePurpleLighting(false);
    });
}

// Gallery Button
const btnGallery = document.getElementById('btn-gallery');
const galleryWindow = document.getElementById('gallery-window');
const closeGalleryBtn = document.getElementById('close-gallery-btn');

if (btnGallery && galleryWindow) {
    btnGallery.addEventListener('click', (e) => {
        e.preventDefault();
        hideAllWindows();
        galleryWindow.classList.add('slide-in');
        togglePurpleLighting(true);
    });

    closeGalleryBtn.addEventListener('click', () => {
        galleryWindow.classList.remove('slide-in');
        const gdCol = document.getElementById('gallery-desc-column');
        if (gdCol) gdCol.classList.remove('fast-wipe');
        togglePurpleLighting(false);
    });
}

// Team Button
const btnTeam = document.getElementById('btn-team');
const teamWindow = document.getElementById('team-window');
const closeTeamBtn = document.getElementById('close-team-btn');

if (btnTeam && teamWindow) {
    btnTeam.addEventListener('click', (e) => {
        e.preventDefault();
        hideAllWindows();
        teamWindow.classList.add('slide-in');
        togglePurpleLighting(true);
    });

    closeTeamBtn.addEventListener('click', () => {
        teamWindow.classList.remove('slide-in');
        togglePurpleLighting(false);
    });
}

// Auto-moving Carousel Logic for Synopsis
const carouselSlides = document.querySelectorAll('#synopsis-window .carousel-slide');
let currentSlide = 0;

if (carouselSlides.length > 0) {
    setInterval(() => {
        carouselSlides[currentSlide].style.opacity = '0';
        carouselSlides[currentSlide].classList.remove('active');

        currentSlide = (currentSlide + 1) % carouselSlides.length;

        carouselSlides[currentSlide].style.opacity = '1';
        carouselSlides[currentSlide].classList.add('active');
    }, 3500); // Crossfade every 3.5 seconds
}

// ================================================================
// GALLERY SCROLL-SPY
// ================================================================

document.addEventListener("DOMContentLoaded", () => {
    const galleryDots = document.querySelectorAll('.g-dot');
    const galleryDescColumn = document.getElementById('gallery-desc-column');
    const snapContainers = document.querySelectorAll('.snap-img-container');

    // Store original HTML of description column directly for fallback
    if (galleryDescColumn) {
        galleryDescColumn.dataset.originalHtml = galleryDescColumn.innerHTML;
    }

    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
                const index = Array.from(snapContainers).indexOf(entry.target);
                if (index !== -1) {

                    // 0. Update active image class (push 20px up)
                    snapContainers.forEach(c => c.classList.remove('active'));
                    entry.target.classList.add('active');

                    // 1. Update active dot
                    galleryDots.forEach(dot => dot.classList.remove('active'));
                    if (galleryDots[index]) galleryDots[index].classList.add('active');
                }
            }
        });
    }, {
        root: document.querySelector('.image-roll'),
        threshold: 0.1 // Trigger even faster
    });

    snapContainers.forEach(container => {
        galleryObserver.observe(container);
    });

    // Initialize first image as active
    if (snapContainers.length > 0) {
        snapContainers[0].classList.add('active');
    }

    // Zoom Logic
    const zoomOverlay = document.getElementById('image-zoom-overlay');
    const zoomedImage = document.getElementById('zoomed-image');
    const closeZoomBtn = document.getElementById('close-zoom-btn');

    document.querySelectorAll('.zoomable-img').forEach(imgContainer => {
        imgContainer.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent the container scroll-into-view
            const bgImage = imgContainer.style.backgroundImage;
            if (bgImage && bgImage !== 'none') {
                const url = bgImage.slice(4, -1).replace(/["']/g, "");
                zoomedImage.src = url;
                zoomOverlay.classList.add('show');

                const zoomNotif = document.getElementById('zoom-notification');
                if (zoomNotif) {
                    zoomNotif.classList.remove('show');
                    void zoomNotif.offsetWidth; // Reflow
                    zoomNotif.classList.add('show');
                }
            }
        });
    });

    if (closeZoomBtn) {
        closeZoomBtn.addEventListener('click', () => {
            zoomOverlay.classList.remove('show');
        });
    }

    if (zoomOverlay) {
        zoomOverlay.addEventListener('click', (e) => {
            if (e.target === zoomOverlay) {
                zoomOverlay.classList.remove('show');
            }
        });
    }
});
