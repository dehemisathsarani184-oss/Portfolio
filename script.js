// Mobile Menu Toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// Resume Download Button
const resumeBtn = document.getElementById('resumeBtn');
if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
        alert('Resume download feature: Add your actual PDF file path.');
    });
}

// Contact Form Handling (FIXED 🔥)
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const subject = document.getElementById('subject')?.value || '';
        const message = document.getElementById('message')?.value || '';

        // Validation
        if (!name || !email || !message) {
            formStatus.innerHTML = '<span style="color:#f87171;">⚠️ Please fill all required fields.</span>';
            setTimeout(() => formStatus.innerHTML = '', 3000);
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            formStatus.innerHTML = '<span style="color:#f87171;">⚠️ Please enter a valid email address.</span>';
            setTimeout(() => formStatus.innerHTML = '', 3000);
            return;
        }

        // Loading
        formStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending message...';

        try {
            const res = await fetch(
                "https://formsubmit.co/ajax/dehemisathsarani184@gmail.com",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        subject,
                        message
                    })
                }
            );

            if (!res.ok) {
                throw new Error("Server error");
            }

            const result = await res.json().catch(() => ({}));

            formStatus.innerHTML =
                '<span style="color:#4ade80;">✓ Message sent successfully!</span>';

            contactForm.reset();

            setTimeout(() => formStatus.innerHTML = '', 5000);

        } catch (error) {
            console.error(error);

            formStatus.innerHTML =
                '<span style="color:#f87171;">❌ Failed to send message. Please try again.</span>';
        }
    });
}

// Active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href').substring(1);
        if (href === current) {
            item.classList.add('active');
        }
    });
});

// Skill bars animation
const skillProgressBars = document.querySelectorAll('.skill-progress');

const getTargetWidth = (element) => {
    if (element.classList.contains('python')) return '78%';
    if (element.classList.contains('sql')) return '85%';
    if (element.classList.contains('powerbi')) return '88%';
    if (element.classList.contains('excel')) return '90%';
    if (element.classList.contains('web')) return '80%';
    if (element.classList.contains('react')) return '65%';
    if (element.classList.contains('node')) return '65%';
    if (element.classList.contains('ml')) return '70%';
    return '0%';
};

let skillsAnimated = false;

const isElementPartiallyVisible = (el) => {
    const rect = el.getBoundingClientRect();
    const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;

    return rect.top < windowHeight - 50 && rect.bottom > 0;
};

const animateSkills = () => {
    if (skillsAnimated) return;

    let allVisible = true;

    skillProgressBars.forEach(bar => {
        if (isElementPartiallyVisible(bar)) {
            const targetWidth = getTargetWidth(bar);
            const currentWidth = bar.style.width;

            if (
                !currentWidth ||
                currentWidth === '0px' ||
                currentWidth === '0%'
            ) {
                setTimeout(() => {
                    bar.style.transition = 'width 1.2s ease';
                    bar.style.width = targetWidth;
                }, 100);
            }
        } else {
            allVisible = false;
        }
    });

    if (allVisible && skillProgressBars.length > 0) {
        skillsAnimated = true;
    }
};

const resetSkillsAnimation = () => {
    const skillsSection = document.querySelector('.skills-section');

    if (skillsSection) {
        const sectionPosition =
            skillsSection.getBoundingClientRect().top;

        const windowHeight = window.innerHeight;

        if (
            sectionPosition > windowHeight + 300 ||
            sectionPosition < -300
        ) {
            skillsAnimated = false;
        }
    }
};

setTimeout(() => {
    animateSkills();
}, 500);

let scrollTimeout;

window.addEventListener('scroll', () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
        animateSkills();
        resetSkillsAnimation();
    }, 100);
});

// Page load animations
document.addEventListener('DOMContentLoaded', () => {

    const heroText = document.querySelector('.hero-text');
    const heroPhoto = document.querySelector('.hero-photo');

    if (heroText) {
        heroText.style.opacity = '0';
        heroText.style.transform = 'translateX(-30px)';

        setTimeout(() => {
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateX(0)';
        }, 200);
    }

    if (heroPhoto) {
        heroPhoto.style.opacity = '0';
        heroPhoto.style.transform = 'translateX(30px)';

        setTimeout(() => {
            heroPhoto.style.opacity = '1';
            heroPhoto.style.transform = 'translateX(0)';
        }, 400);
    }

});
