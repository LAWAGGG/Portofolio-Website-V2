let homeBg = document.getElementById("home-bg")
let moon = document.getElementById("moon-planet")
let earth = document.getElementById("earth-planet")
let heroTitle = document.getElementById("hero-title")
let heroDesc = document.getElementById("hero-desc")
let satelite = document.getElementById("satelite")
let meteor = document.getElementById("meteor");
let asteroid = document.getElementById("asteroid");
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

document.getElementById('footer-year').innerText = new Date().getFullYear()

window.addEventListener('scroll', function () {
    var value = window.scrollY;

    homeBg.style.transform = 'translateY(' + (value * 0.5) + 'px)'
    moon.style.top = -value * 0.5 + 'px'
    satelite.style.top = -value * 0.5 + 'px'
    earth.style.transform = 'translateY(' + (value * 0.30) + 'px)'
    heroTitle.style.transform = 'translateY(' + (value * 1) + 'px)'
    heroDesc.style.transform = 'translateY(' + (value * 1) + 'px)'
})

window.onload = function () {
    window.scrollTo(0, 0);

    if (window.location.hash) {
        history.replaceState(null, null, ' ');
    }
};

const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.navbar-links');

hamburger.addEventListener('click', (e) => {
    navLinks.classList.toggle('show');
});

const links = document.querySelectorAll('.navbar-links a');
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('show');
    });
});

document.addEventListener('click', (event) => {
    if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
        navLinks.classList.remove('show');
    }
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

const techIcons = {
    'HTML': 'fab fa-html5',
    'CSS': 'fab fa-css3-alt',
    'JavaScript': 'fab fa-js',
    'JS': 'fab fa-js',
    'Git': 'fab fa-git-alt',
    'Laravel': 'fab fa-laravel',
    'React': 'fab fa-react',
    'PHP': 'fab fa-php',
    'Tailwind': 'fab fa-tailwind',
    'MySQL': 'fas fa-database',
    'C#': 'fas fa-code',
    'Bootstrap': 'fab fa-bootstrap',
    'Node.js': 'fab fa-node-js',
    'Python': 'fab fa-python',
    'Express': 'fas fa-server',
    'Firebase': 'fas fa-fire',
    'API': 'fas fa-plug',
    'Next.js': 'fab fa-react',
    'TypeScript': 'fab fa-js',
};

function getTechIcon(tech) {
    return techIcons[tech] || 'fas fa-code';
}

const projectsData = [
    {
        title: "CommandSPES",
        description: "Class Website Portfolio",
        image: "./Images/projects/SPES.png",
        link: "https://github.com/LAWAGGG/CommandSPES-V2",
        demo: "https://commandspes58.vercel.app/",
        tech: ["React", "CSS"]
    },
    {
        title: "SkillPath",
        description: "Education platform with gemini ai integration",
        image: "./Images/projects/skillpath.png",
        link: "https://github.com/LAWAGGG/SkillPath",
        tech: ["React", "Tailwind", "Laravel"]
    },
    {
        title: "FormKraft",
        description: "Website form management",
        image: "./Images/projects/formKraft.png",
        link: "https://github.com/LAWAGGG/FormKraft",
        tech: ["Laravel", "React"]
    },
    {
        title: "RagdollWar",
        description: "Mini game made from c# and photon fusion",
        image: "./Images/projects/ragdoll.png",
        link: "https://github.com/LAWAGGG/RagdollWar",
        tech: ["C#"]
    },
    {
        title: "TenAspiration",
        description: "Place for students to giving their Aspiration",
        image: "./Images/projects/Aspiration.png",
        link: "https://github.com/LAWAGGG/TenAspiration",
        demo: "https://tenaspiration.site",
        tech: ["Laravel", "Tailwind", "Apline"]
    },
    {
        title: "Plant Vs Zombie",
        description: "Plant Vs Zombie game clone",
        image: "./Images/projects/pvz.png",
        link: "https://github.com/LAWAGGG/Plant-Vs-Zombie",
        demo: "https://lawaggg.github.io/Plant-Vs-Zombie/",
        tech: ["HTML", "CSS", "JS"]
    },
    {
        title: "Schopedia",
        description: "Marketplace website for school",
        image: "./Images/projects/schopedia.png",
        link: "https://github.com/LAWAGGG/Schopedia",
        tech: ["Laravel", "React", "Tailwind"]
    },
    {
        title: "DanTen",
        description: "marketplace webiste for Danusan OSIS",
        image: "./Images/projects/danten.png",
        link: "https://github.com/LAWAGGG/DanTen",
        demo: "https://dan-ten-osis.vercel.app/",
        tech: ["React", "Tailwind"]
    },
    {
        title: "SiJadwal",
        description: "Schedule information system website for teacher",
        image: "./Images/projects/sistemjadwal.png",
        link: "https://github.com/LAWAGGG/sistem_informasi_jadwal",
        demo: "https://sistem-informasi-jadwal.vercel.app/",
        tech: ["Laravel", "React", "Tailwind"]
    },
    {
        title: "Checker",
        description: "Checker game",
        image: "./Images/projects/checker.png",
        link: "https://github.com/LAWAGGG/Checker",
        demo: "https://lawaggg.github.io/Checker/",
        tech: ["HTML", "CSS", "JS"]
    },
    {
        title: "Design Illustrator",
        description: "cloning photoshop application in web",
        image: "./Images/projects/design.png",
        link: "https://github.com/LAWAGGG/Design-Illustrator",
        demo: "https://lawaggg.github.io/Design-Illustrator/",
        tech: ["HTML", "CSS", "JS"]
    },
];

function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    grid.innerHTML = projectsData.map(project => `
        <div class="project-card">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-details">
                <div class="detail-top">
                    <div class="detail-text">
                        <h4>${project.title}</h4>
                        <p>${project.description}</p>
                    </div>
                    <div class="project-actions">
                        <a href="${project.link}" class="project-link" target="_blank">
                            <i class="fab fa-github"></i>
                        </a>
                        ${project.demo ? `<a href="${project.demo}" class="project-link" target="_blank">
                            <i class="fas fa-external-link-alt"></i>
                        </a>` : ''}
                    </div>
                </div>
                <div class="project-tech">
                    ${project.tech.map(t => `<span class="tech-badge">${t}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('') + `
        <div class="project-card github-card">
            <div class="project-links">
                <h1>More projects on <a href="https://github.com/LAWAGGG" target="_blank">GitHub!</a></h1>
            </div>
        </div>
    `;
}

renderProjects();

const achievementsData = [
    {
        rank: 1,
        title: "LKS Web Technology",
        level: "National",
        year: "2026",
        description: "Won 1st place in LKS Web Technology National"
    },
    {
        rank: 1,
        title: "LKS Web Technology",
        level: "DKI Jakarta Province",
        year: "2026",
        description: "Won 1st place in LKS Web Technology DKI Jakarta Province"
    },
    {
        rank: 1,
        title: "LKS Web Technology",
        level: "Wilayah Jakarta Timur 2",
        year: "2026",
        description: "Won 1st place in LKS Web Technology wilayah Jakarta Timur 2"
    },
    {
        rank: 2,
        title: "Robotics Competition",
        level: "DKI Jakarta Province",
        year: "2024",
        description: "Won 2nd place in regional robotics competition with robot remoting and playing strategies."
    },
    {
        rank: 1,
        title: "MHQ Competition",
        level: "Kecamatan Kramat Jati",
        year: "2018",
        description: "First place winner in Kecamatan Kramat Jati level Qur'an memorization competition."
    },
    {
        rank: 2,
        title: "MHQ Competition",
        level: "DKI Jakarta Province",
        year: "2018",
        description: "Achieved 2nd place in Jakarta city-wide Qur'an memorization competition."
    }
];

function getRankBadge(rank) {
    const badges = {
        1: { label: '1st', className: 'rank-gold' },
        2: { label: '2nd', className: 'rank-silver' },
        3: { label: '3rd', className: 'rank-bronze' }
    };
    const badge = badges[rank] || badges[1];
    const medalSvg = `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61z"/></svg>`;
    return `<div class="rank-badge ${badge.className}"><span>${badge.label}</span></div>`;
}

function getAchievementIcon(rank) {
    const icons = {
        1: `<svg viewBox="0 0 24 24" fill="none" stroke="#FFD700" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M7 2h10l-1 8a5 5 0 0 1-8 0L7 2Z"/>
            <path d="M5 5a2 2 0 0 1-2-2 2 2 0 0 1 2-2"/>
            <path d="M19 5a2 2 0 0 0 2-2 2 2 0 0 0-2-2"/>
            <path d="M12 11v2"/>
            <path d="M9 17h6"/>
        </svg>`,
        2: `<svg viewBox="0 0 24 24" fill="none" stroke="#C0C0C0" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
             <path d="M7 2h10l-1 8a5 5 0 0 1-8 0L7 2Z"/>
            <path d="M5 5a2 2 0 0 1-2-2 2 2 0 0 1 2-2"/>
            <path d="M19 5a2 2 0 0 0 2-2 2 2 0 0 0-2-2"/>
            <path d="M12 11v2"/>
            <path d="M9 17h6"/>
        </svg>`,
        3: `<svg viewBox="0 0 24 24" fill="none" stroke="#CD7F32" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
             <path d="M7 2h10l-1 8a5 5 0 0 1-8 0L7 2Z"/>
            <path d="M5 5a2 2 0 0 1-2-2 2 2 0 0 1 2-2"/>
            <path d="M19 5a2 2 0 0 0 2-2 2 2 0 0 0-2-2"/>
            <path d="M12 11v2"/>
            <path d="M9 17h6"/>
        </svg>`
    };
    return icons[rank] || icons[3];
}

function renderAchievements() {
    const grid = document.querySelector('.achievements-grid');
    if (!grid) return;

    grid.innerHTML = achievementsData.map(achievement => `
        <div class="achievement-card">
            ${getRankBadge(achievement.rank)}
            <div class="achievement-card-top">
                <div class="achievement-icon rank-icon-${achievement.rank}">
                    ${getAchievementIcon(achievement.rank)}
                </div>
                <div class="achievement-info">
                    <h3>${achievement.title}</h3>
                    <div class="achievement-level-year">
                        <span class="achievement-level">${achievement.level}</span>
                        <span class="achievement-year">${achievement.year}</span>
                    </div>
                </div>
            </div>
            <div class="achievement-desc">
                <p>${achievement.description}</p>
            </div>
        </div>
    `).join('');

    grid.querySelectorAll('.achievement-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth > 768) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const angleX = (y - centerY) / 20;
                const angleY = (centerX - x) / 20;

                card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.03)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

renderAchievements();

(function initScrollytelling() {
    function initScrollytelling(track) {
        const cards = Array.from(track.querySelectorAll('.scrolly-card'));
        const dots = Array.from(track.parentElement.querySelectorAll('[data-scrolly-progress] .scrolly-progress-dot'));
        const hint = track.parentElement.querySelector('[data-scroll-hint]');
        const n = cards.length;
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

                const ty = distance * 350;

                const ry = progress * 35;

                const scale = Math.max(0.82, 1 - distance * 0.18);

                const opacity = Math.max(0.25, 1 - distance * 0.5);

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