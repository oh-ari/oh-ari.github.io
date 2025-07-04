class CobwebbyLeaderboard {
    constructor() {
        this.cobwebbyData = [];
        this.filteredData = [];
        this.isLoading = false;
        this.currentPage = 1;
        this.itemsPerPage = 50;
        this.rulerSearch = '';
        this.allianceSearch = '';
        
        this.init();
    }
    
    async init() {
        console.log('Initializing Cobwebby Leaderboard');
        await this.loadLeaderboard();
    }
    
    async loadLeaderboard() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.showLoadingState();
        
        try {
            await this.loadCobwebbyData();
            this.displayLeaderboard();
            this.showLeaderboardState();
            
        } catch (error) {
            console.error('Error loading cobwebby leaderboard:', error);
            this.showErrorState();
        } finally {
            this.isLoading = false;
        }
    }
    
    async loadCobwebbyData() {
        try {
            const response = await fetch('../daily/CN_Nation_Stats.csv');
            if (!response.ok) throw new Error('Failed to load nation stats data');
            
            const csvText = await response.text();
            this.cobwebbyData = this.processCsvData(csvText);
            this.filteredData = [...this.cobwebbyData];
            
            console.log('Cobwebby data loaded:', this.cobwebbyData.length, 'entries');
        } catch (error) {
            console.error('Error loading cobwebby data:', error);
            throw error;
        }
    }
    
    processCsvData(csvText) {
        const lines = csvText.split('\n');
        const results = [];
        
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            const columns = line.split('|');
            if (columns.length < 37) continue;
            
            const nationId = columns[0]?.trim();
            const ruler = columns[1]?.trim();
            const alliance = columns[3]?.trim();
            const createdDate = columns[10]?.trim();
            const attackingCasualties = parseInt(columns[35]?.trim() || '0');
            const defensiveCasualties = parseInt(columns[36]?.trim() || '0');
            
            if (!nationId || !ruler || !alliance || !createdDate) continue;
            const created = new Date(createdDate);
            const now = new Date();
            const ageInDays = Math.floor((now - created) / (1000 * 60 * 60 * 24));
            
            if (ageInDays <= 0) continue;
            const totalCasualties = attackingCasualties + defensiveCasualties;
            const cpdi = totalCasualties / ageInDays;
            
            results.push({
                nationId,
                ruler,
                alliance,
                attackingCasualties,
                defensiveCasualties,
                cpdi
            });
        }
        

        const sortedResults = results.sort((a, b) => b.cpdi - a.cpdi);
        sortedResults.forEach((entry, index) => {
            entry.globalRank = index + 1;
        });
        
        return sortedResults;
    }
    
    formatNumber(num) {
        return num.toLocaleString('en-US');
    }
    
    updatePaginationControls() {
        const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
        const prevButton = document.getElementById('prev-page');
        const nextButton = document.getElementById('next-page');
        const pageNumbersContainer = document.getElementById('page-numbers');
        
        if (!prevButton || !nextButton || !pageNumbersContainer) return;
        prevButton.disabled = this.currentPage === 1;
        nextButton.disabled = this.currentPage === totalPages;
        pageNumbersContainer.innerHTML = '';
        
        const maxVisiblePages = 7;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        if (startPage > 1) {
            this.createPageButton(1, pageNumbersContainer);
            if (startPage > 2) {
                const ellipsis = document.createElement('span');
                ellipsis.className = 'page-ellipsis';
                ellipsis.textContent = '...';
                pageNumbersContainer.appendChild(ellipsis);
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            this.createPageButton(i, pageNumbersContainer);
        }
        
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const ellipsis = document.createElement('span');
                ellipsis.className = 'page-ellipsis';
                ellipsis.textContent = '...';
                pageNumbersContainer.appendChild(ellipsis);
            }
            this.createPageButton(totalPages, pageNumbersContainer);
        }
    }
    
    createPageButton(pageNum, container) {
        const button = document.createElement('button');
        button.className = 'page-number';
        button.textContent = pageNum;
        if (pageNum === this.currentPage) {
            button.classList.add('active');
        }
        button.addEventListener('click', () => this.goToPage(pageNum));
        container.appendChild(button);
    }
    
    goToPage(pageNum) {
        const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
        if (pageNum < 1 || pageNum > totalPages) return;
        
        this.currentPage = pageNum;
        this.displayLeaderboard();
    }
    
    setupPaginationEventListeners() {
        const prevButton = document.getElementById('prev-page');
        const nextButton = document.getElementById('next-page');
        
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                if (this.currentPage > 1) {
                    this.goToPage(this.currentPage - 1);
                }
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
                if (this.currentPage < totalPages) {
                    this.goToPage(this.currentPage + 1);
                }
            });
        }
    }
    
    filterData() {
        this.filteredData = this.cobwebbyData.filter(entry => {
            const rulerMatch = this.rulerSearch === '' || 
                entry.ruler.toLowerCase().includes(this.rulerSearch.toLowerCase());
            const allianceMatch = this.allianceSearch === '' || 
                entry.alliance.toLowerCase().includes(this.allianceSearch.toLowerCase());
            
            return rulerMatch && allianceMatch;
        });
        
        this.currentPage = 1;
    }
    
    setupSearchEventListeners() {
        const rulerSearchInput = document.getElementById('ruler-search');
        const allianceSearchInput = document.getElementById('alliance-search');
        const clearSearchBtn = document.getElementById('clear-search');
        
        if (rulerSearchInput) {
            rulerSearchInput.addEventListener('input', (e) => {
                this.rulerSearch = e.target.value;
                this.filterData();
                this.displayLeaderboard();
            });
        }
        
        if (allianceSearchInput) {
            allianceSearchInput.addEventListener('input', (e) => {
                this.allianceSearch = e.target.value;
                this.filterData();
                this.displayLeaderboard();
            });
        }
        
        if (clearSearchBtn) {
            clearSearchBtn.addEventListener('click', () => {
                this.rulerSearch = '';
                this.allianceSearch = '';
                if (rulerSearchInput) rulerSearchInput.value = '';
                if (allianceSearchInput) allianceSearchInput.value = '';
                this.filterData();
                this.displayLeaderboard();
            });
        }
    }
    
    displayLeaderboard() {
        const tbody = document.getElementById('leaderboard-tbody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageData = this.filteredData.slice(startIndex, endIndex);
        
        pageData.forEach((entry, index) => {
            const row = document.createElement('tr');
            let cpdiClass = 'cpdi-poor';
            if (entry.cpdi >= 1000) cpdiClass = 'cpdi-excellent';
            else if (entry.cpdi >= 500) cpdiClass = 'cpdi-very-high';
            else if (entry.cpdi >= 200) cpdiClass = 'cpdi-high';
            else if (entry.cpdi >= 100) cpdiClass = 'cpdi-medium-high';
            else if (entry.cpdi >= 50) cpdiClass = 'cpdi-medium';
            else if (entry.cpdi >= 20) cpdiClass = 'cpdi-medium-low';
            else if (entry.cpdi >= 10) cpdiClass = 'cpdi-low';
            else if (entry.cpdi >= 5) cpdiClass = 'cpdi-very-low';
            
            row.innerHTML = `
                <td>${entry.globalRank}</td>
                <td class="ruler-name"><a href="https://www.cybernations.net/nation_drill_display.asp?Nation_ID=${entry.nationId}" target="_blank" rel="noopener noreferrer">${entry.ruler}</a></td>
                <td class="alliance-name">${entry.alliance}</td>
                <td class="casualties-number">${this.formatNumber(entry.attackingCasualties)}</td>
                <td class="casualties-number">${this.formatNumber(entry.defensiveCasualties)}</td>
                <td class="cpdi-score ${cpdiClass}">${this.formatNumber(Math.round(entry.cpdi))}</td>
            `;
            
            tbody.appendChild(row);
        });
        
        this.updatePaginationControls();
        
        const lastUpdatedElement = document.getElementById('last-updated-time');
        if (lastUpdatedElement) {
            lastUpdatedElement.textContent = this.formatLastUpdated();
        }
        
        const paginationInfoElement = document.getElementById('pagination-info');
        if (paginationInfoElement) {
            const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
            const showingStart = startIndex + 1;
            const showingEnd = Math.min(endIndex, this.filteredData.length);
            const isFiltered = this.rulerSearch !== '' || this.allianceSearch !== '';
            const filterText = isFiltered ? ' (filtered)' : '';
            paginationInfoElement.textContent = `Showing ${showingStart}-${showingEnd} of ${this.filteredData.length} rulers${filterText}`;
        }
        
        console.log('Cobwebby leaderboard displayed with', pageData.length, 'entries on page', this.currentPage);
    }
    
    formatLastUpdated() {
        const now = new Date();
        
        const centralTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Chicago"}));
        
        const dateOptions = {
            timeZone: "America/Chicago",
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        };
        const formattedDate = centralTime.toLocaleDateString('en-US', dateOptions);
        
        const hour = centralTime.getHours();
        let dataFile;
        let lastUpdateTime;
        
        if (hour >= 6 && hour < 18) {
            dataFile = "6AM";
            lastUpdateTime = new Date(centralTime);
            lastUpdateTime.setHours(6, 0, 0, 0);
        } else {
            dataFile = "6PM";
            lastUpdateTime = new Date(centralTime);
            lastUpdateTime.setHours(18, 0, 0, 0);
            
            if (hour < 6) {
                lastUpdateTime.setDate(lastUpdateTime.getDate() - 1);
            }
        }
        
        const hoursSinceUpdate = Math.floor((centralTime - lastUpdateTime) / (1000 * 60 * 60));
        const hoursText = hoursSinceUpdate === 1 ? "1 hour ago" : `${hoursSinceUpdate} hours ago`;
        
        return `Updated: ${dataFile} (${hoursText}) | ${formattedDate}`;
    }
    
    showLoadingState() {
        document.querySelector('.loading-state').style.display = 'block';
        document.querySelector('.leaderboard-table-container').style.display = 'none';
        document.querySelector('.error-state').style.display = 'none';
    }
    
    showLeaderboardState() {
        document.querySelector('.loading-state').style.display = 'none';
        document.querySelector('.leaderboard-table-container').style.display = 'block';
        document.querySelector('.search-controls').style.display = 'flex';
        document.querySelector('.error-state').style.display = 'none';
        this.setupPaginationEventListeners();
        this.setupSearchEventListeners();
    }
    
    showErrorState() {
        document.querySelector('.loading-state').style.display = 'none';
        document.querySelector('.leaderboard-table-container').style.display = 'none';
        document.querySelector('.error-state').style.display = 'block';
    }
}

function setupNavbarScrollIndicator() {
    const navbar = document.querySelector('.navbar');
    const scrollIndicator = document.querySelector('.navbar-scroll-indicator');
    
    if (!navbar || !scrollIndicator) return;
    
    function updateScrollIndicator() {
        if (window.innerWidth <= 768) {
            const canScroll = navbar.scrollWidth > navbar.clientWidth;
            const isAtEnd = navbar.scrollLeft >= (navbar.scrollWidth - navbar.clientWidth - 5);
            
            if (canScroll && !isAtEnd) {
                scrollIndicator.classList.add('visible');
            } else {
                scrollIndicator.classList.remove('visible');
            }
        } else {
            scrollIndicator.classList.remove('visible');
        }
    }
    
    navbar.addEventListener('scroll', updateScrollIndicator);
    window.addEventListener('resize', updateScrollIndicator);
    updateScrollIndicator();
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Cobwebby Leaderboard page loaded');
    setupNavbarScrollIndicator();
    new CobwebbyLeaderboard();
    
    const footerCredit = document.querySelector('.footer-credit');
    if (footerCredit) {
        footerCredit.addEventListener('click', function() {
            if (window.matchMedia('(hover: none)').matches) {
                this.classList.toggle('tapped');
                
                setTimeout(() => {
                    this.classList.remove('tapped');
                }, 3000);
            }
        });
    }
}); 