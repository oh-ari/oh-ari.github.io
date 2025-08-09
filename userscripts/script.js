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
});

function toggleUpdateLog(button) {
    const userscriptItem = button.closest('.userscript-item');
    const dropdown = userscriptItem.querySelector('.update-log-dropdown');
    
    button.classList.toggle('expanded');
    dropdown.classList.toggle('expanded');
}