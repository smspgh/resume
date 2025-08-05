document.addEventListener('DOMContentLoaded', function() {
    // Add scroll animations for main content sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe main content sections
    document.querySelectorAll('.work-experience, .education').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // Add hover effects to job entries
    const jobEntries = document.querySelectorAll('.job-entry, .education-entry');
    jobEntries.forEach(entry => {
        entry.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        entry.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Create floating action buttons
    const createFloatingButton = (text, icon, action, position) => {
        const button = document.createElement('button');
        button.innerHTML = `${icon} ${text}`;
        button.style.cssText = `
            position: fixed;
            ${position};
            padding: 12px 20px;
            background-color: var(--accent-blue);
            color: white;
            border: none;
            border-radius: 25px;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(44, 90, 160, 0.3);
            z-index: 1000;
            font-family: 'Open Sans', sans-serif;
            font-weight: 500;
        `;
        
        button.addEventListener('click', action);
        button.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#1e4080';
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 16px rgba(44, 90, 160, 0.4)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'var(--accent-blue)';
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px rgba(44, 90, 160, 0.3)';
        });
        
        document.body.appendChild(button);
        return button;
    };

    // Create print button
    const printButton = createFloatingButton(
        'Print', 
        '🖨️', 
        () => window.print(), 
        'top: 30px; right: 30px;'
    );

    // Create back to top button
    const backToTopButton = createFloatingButton(
        'Top', 
        '↑', 
        () => window.scrollTo({ top: 0, behavior: 'smooth' }), 
        'bottom: 30px; right: 30px; opacity: 0; transform: scale(0.8);'
    );

    // Show/hide back to top button based on scroll
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                if (window.pageYOffset > 300) {
                    backToTopButton.style.opacity = '1';
                    backToTopButton.style.transform = 'scale(1)';
                } else {
                    backToTopButton.style.opacity = '0';
                    backToTopButton.style.transform = 'scale(0.8)';
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // Add dynamic timeline animation
    const timelineMarkers = document.querySelectorAll('.timeline-marker');
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'scale(1.2)';
                entry.target.style.backgroundColor = 'var(--accent-blue)';
                setTimeout(() => {
                    entry.target.style.transform = 'scale(1)';
                    entry.target.style.backgroundColor = 'var(--timeline-color)';
                }, 300);
            }
        });
    }, { threshold: 0.5 });

    timelineMarkers.forEach(marker => {
        marker.style.transition = 'all 0.3s ease';
        timelineObserver.observe(marker);
    });


    // Add profile image click effect
    const profileImage = document.querySelector('.profile-photo') || document.querySelector('.image-placeholder');
    if (profileImage) {
        profileImage.addEventListener('click', function() {
            this.style.transform = 'rotate(360deg)';
            this.style.transition = 'transform 0.6s ease';
            setTimeout(() => {
                this.style.transform = 'rotate(0deg)';
            }, 600);
        });

        profileImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });

        profileImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Hide floating buttons on mobile
    const handleResize = () => {
        if (window.innerWidth < 768) {
            printButton.style.display = 'none';
            backToTopButton.style.display = 'none';
        } else {
            printButton.style.display = 'block';
            backToTopButton.style.display = 'block';
        }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once on load

    // Add smooth scrolling for any internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation completion
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Toggle About Me section function
function toggleAbout() {
    const shortVersion = document.querySelector('.about-short');
    const fullVersion = document.querySelector('.about-full');
    const button = document.querySelector('.read-more-btn');
    
    if (fullVersion.style.display === 'none' || fullVersion.style.display === '') {
        // Show full version
        shortVersion.style.display = 'none';
        fullVersion.style.display = 'block';
        button.textContent = 'see less';
    } else {
        // Show short version
        shortVersion.style.display = 'block';
        fullVersion.style.display = 'none';
        button.textContent = 'see more';
    }
}
