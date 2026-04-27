document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation Logic
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once it has faded in
                // observer.unobserve(entry.target);
            } else {
                // Optional: Remove class to animate again when scrolling back up
                // Let's keep it one-way for a smoother experience or two-way for dramatic effect.
                // We'll do two-way for MyGO!!!!! dramatic effect.
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with .fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Smooth Scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Dynamic Background on Hover
    const dynamicBg = document.querySelector('.dynamic-bg');
    const bgOverlay = document.querySelector('.background-overlay');
    const memberCards = document.querySelectorAll('.member-card');

    const themeColors = {
        'tomori': 'rgba(124, 199, 232, 0.4)',
        'anon': 'rgba(245, 142, 153, 0.4)',
        'rana': 'rgba(126, 169, 112, 0.4)',
        'soyo': 'rgba(242, 210, 114, 0.4)',
        'taki': 'rgba(110, 90, 123, 0.4)'
    };

    memberCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const member = card.getAttribute('data-member');
            if (themeColors[member]) {
                dynamicBg.style.backgroundColor = themeColors[member];
                bgOverlay.style.opacity = '0.1'; // Fade out original overlay slightly
            }
        });
        card.addEventListener('mouseleave', () => {
            dynamicBg.style.backgroundColor = 'transparent';
            bgOverlay.style.opacity = '1';
        });
    });

    // Particle Animation
    const particlesContainer = document.querySelector('.particles-container');

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Randomize size, position, and animation duration
        const size = Math.random() * 8 + 4; // 4px to 12px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;

        const duration = Math.random() * 5 + 5; // 5s to 10s
        particle.style.animationDuration = `${duration}s`;

        particlesContainer.appendChild(particle);

        // Remove particle after animation ends
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }

    // Create particles periodically
    setInterval(createParticle, 300);

    // Relationship Chart Hover
    const nodes = document.querySelectorAll('.node');
    const relationContainer = document.querySelector('.relation-container');

    nodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            const target = node.getAttribute('data-target');
            if (target !== 'tomori') {
                relationContainer.classList.add(`active-${target}`);
            }
        });
        node.addEventListener('mouseleave', () => {
            const target = node.getAttribute('data-target');
            if (target !== 'tomori') {
                relationContainer.classList.remove(`active-${target}`);
            }
        });
    });

    // Relation Popup Element
    const relationPopup = document.createElement('div');
    relationPopup.className = 'relation-popup';
    relationPopup.innerHTML = '<img src="" alt="Relation Image"><div class="popup-text"></div>';
    relationContainer.appendChild(relationPopup);

    const lineGroups = document.querySelectorAll('.line-group');

    // Placeholder images for relationships (can be replaced with real image URLs)
    const relationImages = {
        'taki': 'https://drive.miyago9267.com/d/file/img/searcher/mygo/4/%E6%88%91%E9%A1%98%E6%84%8F%E4%B8%80%E8%BC%A9%E5%AD%90%E5%92%8C%E7%87%88%E5%9C%A8%E4%B8%80%E8%B5%B7.jpg?t=1776916894980',
        'tomori taki': 'https://ave-mujica-images.pages.dev/assets/%E7%87%88%EF%BC%8C%E5%A6%B3%E6%B2%92%E4%BA%8B%E5%90%A7-5dJU45Go.jpg',
        'soyo': 'https://ave-mujica-images.pages.dev/assets/%E5%8F%AA%E8%A6%81%E6%9C%89%E5%B0%8F%E7%87%88%E5%9C%A8%E5%B0%B1%E5%A4%A0%E4%BA%86%E5%90%A7-CWEx3n27.jpg',
        'tomori soyo': 'https://ave-mujica-images.pages.dev/assets/%E5%A5%B9%E5%92%8C%E6%88%91%E7%B4%84%E5%A5%BD%E8%A6%81%E4%B8%80%E8%BC%A9%E5%AD%90%E7%B5%84%E6%A8%82%E5%9C%98%E4%BA%86-I-SXTdbM.jpg',
        'anon': 'https://ave-mujica-images.pages.dev/assets/Tomorin%E5%A5%BD%E5%8F%AF%E6%84%9B%E5%96%94-CZjIzZJv.jpg',
        'tomori anon': 'https://ave-mujica-images.pages.dev/assets/%E6%88%91%E9%9C%80%E8%A6%81%E6%84%9B%E9%9F%B3!-sMJ3Y_yt.jpg',
        'rana': 'https://ave-mujica-images.pages.dev/assets/%E6%9C%89%E8%B6%A3%E7%9A%84%E5%A5%B3%E5%AD%A9%E5%AD%90-BvYwbfQ6.jpg',
        'tomori rana': 'https://drive.miyago9267.com/d/file/img/searcher/mygo/3/%E9%80%99%E5%82%A2%E4%BC%99%E6%A0%B9%E6%9C%AC%E4%BB%80%E9%BA%BC%E4%B9%9F%E4%B8%8D%E6%87%82.jpg?t=1776916484127',
        'anon soyo': 'https://drive.miyago9267.com/d/file/img/searcher/mygo/2/%E5%A4%AA%E6%A3%92%E4%BA%86%EF%BC%8C%E7%88%BD%E4%B8%96%E5%90%8C%E5%AD%B8LOVE.jpg?t=1776917307792',
        'soyo anon': 'https://drive.miyago9267.com/d/file/img/searcher/mygo/10/%E5%A6%B3%E6%98%AF%E4%BE%86%E6%89%BE%E6%88%91%E5%90%B5%E6%9E%B6%E7%9A%84%E5%97%8E.jpg?t=1776917042324',
        'rana taki': 'https://ave-mujica-images.pages.dev/assets/%E6%8A%B9%E8%8C%B6%E7%99%BE%E5%8C%AF%E4%BA%94%E4%BB%BD-CZveWX7F.jpg',
        'taki rana': 'https://ave-mujica-images.pages.dev/assets/%E5%8F%AF%E4%BB%A5%E5%90%83%E4%BA%86%E5%97%8E%20-dBke6gHZ.jpg'
    };

    // Create thick transparent hitboxes for all lines to make them easily hoverable
    lineGroups.forEach(group => {
        const line = group.querySelector('line');
        if (line) {
            const hitLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            hitLine.setAttribute('x1', line.getAttribute('x1'));
            hitLine.setAttribute('y1', line.getAttribute('y1'));
            hitLine.setAttribute('x2', line.getAttribute('x2'));
            hitLine.setAttribute('y2', line.getAttribute('y2'));
            hitLine.setAttribute('stroke', 'rgba(255,255,255,0.01)'); // Practically invisible but guaranteed hit area
            hitLine.setAttribute('stroke-width', '40'); // Massive hit area
            hitLine.setAttribute('fill', 'none');
            hitLine.style.cursor = 'pointer';
            hitLine.style.pointerEvents = 'all'; // Capture everything
            group.appendChild(hitLine); // Add to group
        }
    });
    // Direct hover bindings to guarantee stability
    lineGroups.forEach(group => {
        // Direct event binding to bypass delegation bugs
        group.addEventListener('mouseenter', (e) => {
            relationContainer.classList.add('line-hover-active');

            // Add hovered class safely
            const currentClass = group.getAttribute('class') || '';
            if (!currentClass.includes('hovered')) {
                group.setAttribute('class', currentClass + ' hovered');
            }

            let members = group.getAttribute('data-group').split(' ');
            if (members.length === 1) members.push('tomori');

            members.forEach(member => {
                const node = document.querySelector(`.node[data-target="${member}"]`);
                if (node) node.classList.add('hovered');
            });

            const groupName = group.getAttribute('data-group');
            const imgUrl = relationImages[groupName] || 'https://placehold.co/400x250/2c2c2c/ffffff?text=MyGO!!!!!';
            relationPopup.querySelector('img').src = imgUrl;

            const textEl = group.querySelector('text');
            relationPopup.querySelector('.popup-text').innerText = textEl ? textEl.textContent : '';

            relationPopup.classList.add('active');
        });

        group.addEventListener('mouseleave', () => {
            relationContainer.classList.remove('line-hover-active');

            const currentClass = group.getAttribute('class') || '';
            group.setAttribute('class', currentClass.replace(' hovered', '').replace('hovered', '').trim());

            document.querySelectorAll('.node.hovered').forEach(n => n.classList.remove('hovered'));
            relationPopup.classList.remove('active');
        });
    });

    relationContainer.addEventListener('mousemove', (e) => {
        if (!relationPopup.classList.contains('active')) return;
        const rect = relationContainer.getBoundingClientRect();
        relationPopup.style.left = (e.clientX - rect.left) + 'px';
        relationPopup.style.top = (e.clientY - rect.top - 20) + 'px';
    });

    // YouTube Modal Logic
    const ytTriggers = document.querySelectorAll('.yt-trigger');
    const ytModal = document.getElementById('yt-modal');
    const closeModal = document.querySelector('.close-modal');
    const videoContainer = document.querySelector('.video-container');

    function openModal(videoId) {
        // Inject iframe dynamically
        videoContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        ytModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeVideoModal() {
        ytModal.classList.remove('active');
        videoContainer.innerHTML = ''; // Remove iframe to stop playing
        document.body.style.overflow = ''; // Restore scrolling
    }

    ytTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const videoId = trigger.getAttribute('data-video-id');
            if (videoId) {
                openModal(videoId);
            }
        });
    });

    closeModal.addEventListener('click', closeVideoModal);

    // Close modal on background click
    ytModal.addEventListener('click', (e) => {
        if (e.target === ytModal) {
            closeVideoModal();
        }
    });

    // Seiyuu Modal Logic
    const seiyuuCards = document.querySelectorAll('.seiyuu-card');
    seiyuuCards.forEach(card => {
        const inner = card.querySelector('.seiyuu-card-inner');
        const closeBtn = card.querySelector('.seiyuu-modal-close');

        // Open modal on clicking the card
        inner.addEventListener('click', () => {
            seiyuuCards.forEach(c => c.classList.remove('active')); // Close others
            card.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });

        // Close modal via close button
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                card.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Close modal via backdrop click (the pseudo-element captures clicks on the .seiyuu-card element itself)
        card.addEventListener('click', (e) => {
            if (e.target === card) {
                card.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
});
