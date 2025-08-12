document.addEventListener('DOMContentLoaded', function() {
    const footerCredit = document.querySelector('.footer-credit');
    
    if (footerCredit) {
        footerCredit.addEventListener('click', function() {
            this.classList.toggle('tapped');
        });
    }
    
    const navbar = document.querySelector('.navbar');
    const scrollIndicator = document.querySelector('.navbar-scroll-indicator');
    
    if (navbar && scrollIndicator) {
        function updateScrollIndicator() {
            const canScroll = navbar.scrollWidth > navbar.clientWidth;
            if (canScroll) {
                scrollIndicator.classList.add('visible');
            } else {
                scrollIndicator.classList.remove('visible');
            }
        }
        
        updateScrollIndicator();
        window.addEventListener('resize', updateScrollIndicator);
        
        navbar.addEventListener('scroll', function() {
            setTimeout(() => {
                scrollIndicator.classList.remove('visible');
            }, 1000);
        });
    }
    
    const tooltipTriggers = document.querySelectorAll('.update-info-tooltip');
    tooltipTriggers.forEach(tooltip => {
        tooltip.addEventListener('click', function() {
            const tooltipContent = this.querySelector('.tooltip-content');
            if (tooltipContent) {
                const isExpanded = tooltipContent.style.display === 'block';
                tooltipContent.style.display = isExpanded ? 'none' : 'block';
                this.classList.toggle('expanded', !isExpanded);
            }
        });
    });

    const showcases = document.querySelectorAll('.image-showcase');
    showcases.forEach(showcase => {
        const images = showcase.querySelectorAll('.preview-image');
        const nextBtn = showcase.querySelector('.showcase-next');
        let index = 0;
        if (!images.length || !nextBtn) return;
        images[0].classList.add('is-active');

        function advance() {
            images[index].classList.remove('is-active');
            index = (index + 1) % images.length;
            images[index].classList.add('is-active');
        }

        let autoTimer = null;
        function stopAuto() {
            if (autoTimer) {
                clearInterval(autoTimer);
                autoTimer = null;
            }
        }
        function startAuto() {
            stopAuto();
            autoTimer = setInterval(advance, 7000);
        }

        nextBtn.addEventListener('click', () => {
            advance();
            startAuto();
        });
        showcase.addEventListener('mouseenter', stopAuto);
        showcase.addEventListener('mouseleave', startAuto);
        startAuto();
    });
});

function toggleUpdateLog(button) {
    const userscriptItem = button.closest('.userscript-item');
    const dropdown = userscriptItem.querySelector('.update-log-dropdown');
    
    button.classList.toggle('expanded');
    dropdown.classList.toggle('expanded');
}

function toggleReadMore(button) {
    const header = button.closest('.header');
    const additionalSubtitles = header.querySelector('.additional-subtitles');
    const readMoreText = button.querySelector('.read-more-text');
    
    const isExpanded = additionalSubtitles.style.display === 'block';
    
    if (isExpanded) {
        additionalSubtitles.style.display = 'none';
        readMoreText.textContent = 'Read More';
        button.classList.remove('expanded');
    } else {
        additionalSubtitles.style.display = 'block';
        readMoreText.textContent = 'Read Less';
        button.classList.add('expanded');
    }
}