let bg = document.getElementById("bg")
let moon = document.getElementById("moon-planet")
let earth = document.getElementById("earth-planet")
let text = document.getElementById("text")
let desc = document.getElementById("desc")
let satelite = document.getElementById("satelite")
let meteor = document.getElementById("meteor");
let asteroid = document.getElementById("asteroid");
let bgMpk = document.getElementById("bgMpk");
let nowYear = document.getElementById("nowYear");

function calculateAge(birthDateString) {
    const today = new Date()
    const birthDate = new Date(birthDateString)

    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age
}

nowYear.innerText = calculateAge("2008-12-5")

window.addEventListener('scroll', function () {
    var value = window.scrollY;

    bg.style.top = value * 0.5 + 'px'
    moon.style.top = -value * 0.5 + 'px'
    satelite.style.top = -value * 0.5 + 'px'
    earth.style.top = value * 0.30 + 'px'
    text.style.top = value * 1 + 'px'
    desc.style.top = value * 1 + 'px'
})

window.onload = function () {
    // Scroll ke atas saat halaman dimuat
    window.scrollTo(0, 0);

    // Pastikan tidak ada hash di URL yang menyebabkan scroll
    if (window.location.hash) {
        history.replaceState(null, null, ' ');
    }
};

const gatau = document.querySelector('.Gatau');
const light = document.querySelector('.mouse-light');

gatau.addEventListener('mousemove', function (e) {
    const rect = gatau.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    light.style.left = `${x}px`;
    light.style.top = `${y}px`;
    light.style.opacity = 1;
});

gatau.addEventListener('mouseleave', function () {
    light.style.opacity = 0;
});

const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.right');

// Toggle saat hamburger diklik
hamburger.addEventListener('click', (e) => {
    e.stopPropagation(); // Cegah bubbling ke document
    navLinks.classList.toggle('show');
});

// Tutup dropdown saat klik link navigasi
const links = document.querySelectorAll('.right a');
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('show');
    });
});

// Tutup dropdown saat klik di luar nav
document.addEventListener('click', (event) => {
    if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
        navLinks.classList.remove('show');
    }
});

// Update the achievement cards interaction for mobile
const achievementCards = document.querySelectorAll('.achievement-card');

achievementCards.forEach(card => {
    // For mouse devices
    card.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) { // Only apply on desktop
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;

            const glowX = (x / rect.width) * 100;
            const glowY = (y / rect.height) * 100;
            card.style.setProperty('--glow-x', `${glowX}%`);
            card.style.setProperty('--glow-y', `${glowY}%`);
        }
    });

    // For touch devices
    card.addEventListener('touchmove', (e) => {
        if (window.innerWidth <= 768) { // Only apply on mobile
            const touch = e.touches[0];
            const rect = card.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;

            const glowX = (x / rect.width) * 100;
            const glowY = (y / rect.height) * 100;
            card.style.setProperty('--glow-x', `${glowX}%`);
            card.style.setProperty('--glow-y', `${glowY}%`);
        }
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });

    card.addEventListener('touchend', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

document.querySelectorAll('.stars-container').forEach(container => {
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');

        star.classList.add('twinkle');
        star.style.top = Math.random() * 100 + '%';
        star.style.left = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 5 + 's';

        container.appendChild(star);
    }
});

document.querySelectorAll('.shooting-stars-container').forEach(shootingContainer => {

    for (let i = 0; i < 10; i++) {

        const star = document.createElement('div');
        star.classList.add('shooting-star');

        star.style.top = Math.random() * 100 + '%';
        star.style.left = Math.random() * 100 + '%';

        const delay = Math.random() * 10 + 1;
        const duration = Math.random() * 3 + 2;

        star.style.animationDelay = `${delay}s`;
        star.style.animationDuration = `${duration}s`;

        shootingContainer.appendChild(star);
    }

});

// Carousel functionality
const carouselContainer = document.querySelector('.carousel-container');
const projectCards = document.querySelectorAll('.project-card');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentIndex = 0;

function updateCarousel() {
    projectCards.forEach((card, index) => {
        card.classList.remove('active', 'prev', 'next');

        if (index === currentIndex) {
            card.classList.add('active');
        } else if (index === currentIndex - 1 ||
            (currentIndex === 0 && index === projectCards.length - 1)) {
            card.classList.add('prev');
        } else if (index === currentIndex + 1 ||
            (currentIndex === projectCards.length - 1 && index === 0)) {
            card.classList.add('next');
        }
    });


}

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % projectCards.length; // maju & loop
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + projectCards.length) % projectCards.length; // mundur & loop
    updateCarousel();
});

// Initialize carousel
updateCarousel();

// Optional: Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevBtn.click();
    } else if (e.key === 'ArrowRight') {
        nextBtn.click();
    }
});

setInterval(() => {
    nextBtn.click();
}, 5000);

// ─── Scrollytelling Engine ───
(function initScrollytelling() {
    function initScrollytelling(track) {
        const cards = Array.from(track.querySelectorAll('.scrolly-card'));
        const dots = Array.from(track.parentElement.querySelectorAll('[data-scrolly-progress] .scrolly-progress-dot'));
        const hint = track.parentElement.querySelector('[data-scroll-hint]');
        const n = cards.length;
        // const ENTER = 0.35;
        // const EXIT_START = 0.65;
        let ticking = false;
        let isMobile = window.matchMedia('(max-width: 768px)').matches;
        let smoothT = 0;

        function update() {
            isMobile = window.matchMedia('(max-width: 768px)').matches;
            if (isMobile) return;

            const rect = track.getBoundingClientRect();
            const scrollableDistance = track.offsetHeight - window.innerHeight;
            const scrolled = Math.min(scrollableDistance, Math.max(0, -rect.top));
            const targetT = scrollableDistance > 0 ? scrolled / scrollableDistance : 0;
            smoothT += (targetT - smoothT) * 0.15;
            const globalT = smoothT;

            let activeIndex = Math.round(globalT * (n - 1));

            cards.forEach((card, i) => {

                const progress = i - globalT * (n - 1);

                const distance = Math.abs(progress);

                const tx = progress * 60;

                // sedikit naik turun
                const ty = distance * 350;

                // rotasi tetap mengikuti posisi
                const ry = progress * 35;

                // card tengah lebih besar
                const scale = Math.max(0.82, 1 - distance * 0.18);

                // jangan pernah hilang
                const opacity = Math.max(0.25, 1 - distance * 0.5);

                // card tengah selalu paling depan
                const z = 100 - Math.round(distance * 100);

                card.style.transform =
                    `translateX(${tx}vw)
             translateY(${ty}px)
             rotate(${ry}deg)
             scale(${scale})`;

                card.style.opacity = opacity;
                card.style.zIndex = z;
                card.style.visibility = "visible";
                card.style.pointerEvents = distance < 0.5 ? "auto" : "none";
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle("active", i === activeIndex);
            });

            if (hint) {
                hint.style.opacity = globalT > 0.02 ? "0" : "1";
                hint.style.pointerEvents = "none";
            }
        }

        function animate() {
            update();
            requestAnimationFrame(animate);
        }

        animate();

        dots.forEach(function (dot, i) {
            dot.addEventListener('click', function () {
                const segSize = 1 / n;
                const scrollableDistance = track.offsetHeight - window.innerHeight;
                const targetScroll = track.offsetTop + (i * segSize + segSize * 0.5) * scrollableDistance;
                window.scrollTo({ top: targetScroll, behavior: 'smooth' });
            });
        });
    }

    document.querySelectorAll('[data-scrolly]').forEach(initScrollytelling);
})();