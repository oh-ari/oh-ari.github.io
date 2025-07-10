class CobwebbyLeaderboard {
    constructor() {
        this.cobwebbyData = [];
        this.allianceData = [];
        this.filteredData = [];
        this.isLoading = false;
        this.currentPage = 1;
        this.itemsPerPage = 50;
        this.rulerSearch = '';
        this.allianceSearch = '';
        this.resizeTimeout = null;
        this.currentTab = 'nation';
        
        this.init();
        this.setupResizeListener();
    }
    
    async init() {
        console.log('Initializing Cobwebby Leaderboard');
        this.setupTabEventListeners();
        await this.loadLeaderboard();
    }
    
    setupTabEventListeners() {
        const nationTab = document.getElementById('nation-tab');
        const allianceTab = document.getElementById('alliance-tab');
        
        if (nationTab) {
            nationTab.addEventListener('click', () => this.switchTab('nation'));
        }
        
        if (allianceTab) {
            allianceTab.addEventListener('click', () => this.switchTab('alliance'));
        }
    }
    
    switchTab(tab) {
        if (this.currentTab === tab) return;
        
        this.currentTab = tab;
        this.currentPage = 1;
        
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`${tab}-tab`).classList.add('active');
        
        this.updateTableHeaders();
        this.updateSearchLabels();
        this.clearSearchInputs();
        this.filterData();
        this.displayLeaderboard();
    }
    
    updateTableHeaders() {
        const thead = document.getElementById('leaderboard-thead');
        if (!thead) return;
        
        if (this.currentTab === 'nation') {
            thead.innerHTML = `
                <tr>
                    <th>#</th>
                    <th>Ruler</th>
                    <th>Alliance</th>
                    <th>Att. Casualties</th>
                    <th>Def. Casualties</th>
                    <th>CPDI</th>
                </tr>
            `;
        } else {
            thead.innerHTML = `
                <tr>
                    <th>#</th>
                    <th>Alliance</th>
                    <th>Nations</th>
                    <th>Att. Casualties</th>
                    <th>Def. Casualties</th>
                    <th>CPDI</th>
                </tr>
            `;
        }
    }
    
    updateSearchLabels() {
        const rulerLabel = document.querySelector('label[for="ruler-search"]');
        const allianceLabel = document.querySelector('label[for="alliance-search"]');
        const allianceGroup = allianceLabel?.parentElement;
        
        if (this.currentTab === 'nation') {
            if (rulerLabel) rulerLabel.textContent = 'Search Ruler:';
            if (allianceLabel) {
                allianceLabel.textContent = 'Search Alliance:';
                allianceLabel.style.display = '';
            }
            if (allianceGroup) allianceGroup.style.display = '';
        } else {
            if (rulerLabel) rulerLabel.textContent = 'Search Alliance:';
            if (allianceLabel) allianceLabel.style.display = 'none';
            if (allianceGroup) allianceGroup.style.display = 'none';
        }
    }
    
    clearSearchInputs() {
        const rulerInput = document.getElementById('ruler-search');
        const allianceInput = document.getElementById('alliance-search');
        
        if (rulerInput) rulerInput.value = '';
        if (allianceInput) allianceInput.value = '';
        
        this.rulerSearch = '';
        this.allianceSearch = '';
    }
    
    setupResizeListener() {
        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {
                if (this.cobwebbyData.length > 0) {
                    this.displayLeaderboard();
                }
            }, 250);
        });
    }
    
    async loadLeaderboard() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.showLoadingState();
        
        try {
            await this.loadCobwebbyData();
            this.processAllianceData();
            this.filterData();
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
            
            console.log('Cobwebby data loaded:', this.cobwebbyData.length, 'entries');
        } catch (error) {
            console.error('Error loading cobwebby data:', error);
            throw error;
        }
    }
    
    normalizeAllianceName(allianceName) {
        if (!allianceName) return '';
        
        let normalized = allianceName.trim();
        
        const replacements = {
            ' Of ': ' of ',
            ' And ': ' and ',
            ' The ': ' the ',
            ' A ': ' a ',
            ' An ': ' an ',
            ' In ': ' in ',
            ' On ': ' on ',
            ' For ': ' for ',
            ' With ': ' with ',
            ' To ': ' to ',
            ' From ': ' from ',
            ' By ': ' by ',
            ' At ': ' at ',
            
            'Independent Republic Of Orange Nations': 'Independent Republic of Orange Nations',
            'Global Alliance And Treaty Organization': 'Global Alliance and Treaty Organization',
            'Knights Of The Round Table': 'Knights of the Round Table',
            'Federation Of Armed Nations': 'Federation of Armed Nations',
            'New Pacific Order': 'New Pacific Order',
            'Orange Defense Network': 'Orange Defense Network'
        };
        
        for (const [search, replace] of Object.entries(replacements)) {
            normalized = normalized.replace(new RegExp(search, 'g'), replace);
        }
        
        return normalized;
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
            const rawAlliance = columns[3]?.trim();
            const allianceId = columns[4]?.trim();
            const createdDate = columns[10]?.trim();
            const attackingCasualties = parseInt(columns[35]?.trim() || '0');
            const defensiveCasualties = parseInt(columns[36]?.trim() || '0');
            
            if (!nationId || !ruler || !rawAlliance || !createdDate) continue;
            
            const alliance = this.normalizeAllianceName(rawAlliance);
            
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
                allianceId,
                attackingCasualties,
                defensiveCasualties,
                cpdi,
                ageInDays
            });
        }
        
        const sortedResults = results.sort((a, b) => b.cpdi - a.cpdi);
        sortedResults.forEach((entry, index) => {
            entry.globalRank = index + 1;
        });
        
        return sortedResults;
    }
    
    processAllianceData() {
        const allianceMap = new Map();
        
        this.cobwebbyData.forEach(nation => {
            if (!allianceMap.has(nation.alliance)) {
                allianceMap.set(nation.alliance, {
                    alliance: nation.alliance,
                    allianceId: nation.allianceId,
                    nations: [],
                    totalAttackingCasualties: 0,
                    totalDefensiveCasualties: 0,
                    totalDays: 0
                });
            }
            
            const allianceData = allianceMap.get(nation.alliance);
            allianceData.nations.push(nation);
            allianceData.totalAttackingCasualties += nation.attackingCasualties;
            allianceData.totalDefensiveCasualties += nation.defensiveCasualties;
            allianceData.totalDays += nation.ageInDays;
        });
        
        this.allianceData = Array.from(allianceMap.values())
            .filter(alliance => alliance.nations.length > 5)
            .map(alliance => {
                const totalCasualties = alliance.totalAttackingCasualties + alliance.totalDefensiveCasualties;
                const cpdi = alliance.totalDays > 0 ? totalCasualties / alliance.totalDays : 0;
                
                return {
                    alliance: alliance.alliance,
                    allianceId: alliance.allianceId,
                    nationCount: alliance.nations.length,
                    attackingCasualties: alliance.totalAttackingCasualties,
                    defensiveCasualties: alliance.totalDefensiveCasualties,
                    cpdi: cpdi,
                    totalDays: alliance.totalDays
                };
            })
            .sort((a, b) => b.cpdi - a.cpdi);
        
        this.allianceData.forEach((alliance, index) => {
            alliance.globalRank = index + 1;
        });
        
        console.log('Alliance data processed:', this.allianceData.length, 'alliances');
    }
    
    formatNumber(num) {
        return num.toLocaleString('en-US');
    }
    
    getCurrentData() {
        return this.currentTab === 'nation' ? this.cobwebbyData : this.allianceData;
    }
    
    filterData() {
        const sourceData = this.getCurrentData();
        
        if (this.currentTab === 'nation') {
            this.filteredData = sourceData.filter(entry => {
                const rulerMatch = this.rulerSearch === '' || 
                    entry.ruler.toLowerCase().includes(this.rulerSearch.toLowerCase());
                const allianceMatch = this.allianceSearch === '' || 
                    entry.alliance.toLowerCase().includes(this.allianceSearch.toLowerCase());
                
                return rulerMatch && allianceMatch;
            });
        } else {
            this.filteredData = sourceData.filter(entry => {
                const allianceMatch = this.rulerSearch === '' || 
                    entry.alliance.toLowerCase().includes(this.rulerSearch.toLowerCase());
                
                return allianceMatch;
            });
        }
        
        this.currentPage = 1;
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
            
            if (this.currentTab === 'nation') {
                this.renderNationRow(row, entry);
            } else {
                this.renderAllianceRow(row, entry);
            }
            
            tbody.appendChild(row);
        });
        
        this.updatePaginationControls();
        this.updateLastUpdated();
        this.updatePaginationInfo();
        
        console.log(`${this.currentTab} leaderboard displayed with`, pageData.length, 'entries on page', this.currentPage);
    }
    
    renderNationRow(row, entry) {
        let cpdiClass = this.getCpdiClass(entry.cpdi);
        const isMobile = window.innerWidth <= 480;
        
        if (isMobile) {
            row.innerHTML = `
                <td data-label="#">${entry.globalRank}</td>
                <td class="ruler-name" data-label="Ruler"><a href="https://www.cybernations.net/nation_drill_display.asp?Nation_ID=${entry.nationId}" target="_blank" rel="noopener noreferrer">${entry.ruler}</a></td>
                <td class="alliance-name" data-label="Alliance">${entry.alliance}</td>
                <td class="card-row-container">
                    <div class="card-row">
                        <div class="card-item casualties-number" data-label="Att. Casualties">${this.formatNumber(entry.attackingCasualties)}</div>
                        <div class="card-item casualties-number" data-label="Def. Casualties">${this.formatNumber(entry.defensiveCasualties)}</div>
                    </div>
                </td>
                <td class="cpdi-score ${cpdiClass}" data-label="CPDI">${this.formatNumber(Math.round(entry.cpdi))}</td>
            `;
        } else {
            row.innerHTML = `
                <td data-label="#">${entry.globalRank}</td>
                <td class="ruler-name" data-label="Ruler"><a href="https://www.cybernations.net/nation_drill_display.asp?Nation_ID=${entry.nationId}" target="_blank" rel="noopener noreferrer">${entry.ruler}</a></td>
                <td class="alliance-name" data-label="Alliance">${entry.alliance}</td>
                <td class="casualties-number" data-label="Att. Casualties">${this.formatNumber(entry.attackingCasualties)}</td>
                <td class="casualties-number" data-label="Def. Casualties">${this.formatNumber(entry.defensiveCasualties)}</td>
                <td class="cpdi-score ${cpdiClass}" data-label="CPDI">${this.formatNumber(Math.round(entry.cpdi))}</td>
            `;
        }
    }
    
    renderAllianceRow(row, entry) {
        let cpdiClass = this.getCpdiClass(entry.cpdi);
        const isMobile = window.innerWidth <= 480;
        const allianceLink = entry.allianceId ? 
            `<a href="https://www.cybernations.net/alliance_display.asp?ID=${entry.allianceId}" target="_blank" rel="noopener noreferrer">${entry.alliance}</a>` :
            entry.alliance;
        
        if (isMobile) {
            row.innerHTML = `
                <td data-label="#">${entry.globalRank}</td>
                <td class="alliance-name" data-label="Alliance">${allianceLink}</td>
                <td class="nation-count" data-label="Nations">${entry.nationCount}</td>
                <td class="card-row-container">
                    <div class="card-row">
                        <div class="card-item casualties-number" data-label="Att. Casualties">${this.formatNumber(entry.attackingCasualties)}</div>
                        <div class="card-item casualties-number" data-label="Def. Casualties">${this.formatNumber(entry.defensiveCasualties)}</div>
                    </div>
                </td>
                <td class="cpdi-score ${cpdiClass}" data-label="CPDI">${this.formatNumber(Math.round(entry.cpdi))}</td>
            `;
        } else {
            row.innerHTML = `
                <td data-label="#">${entry.globalRank}</td>
                <td class="alliance-name" data-label="Alliance">${allianceLink}</td>
                <td class="nation-count" data-label="Nations">${entry.nationCount}</td>
                <td class="casualties-number" data-label="Att. Casualties">${this.formatNumber(entry.attackingCasualties)}</td>
                <td class="casualties-number" data-label="Def. Casualties">${this.formatNumber(entry.defensiveCasualties)}</td>
                <td class="cpdi-score ${cpdiClass}" data-label="CPDI">${this.formatNumber(Math.round(entry.cpdi))}</td>
            `;
        }
    }
    
    getCpdiClass(cpdi) {
        if (cpdi >= 1000) return 'cpdi-excellent';
        else if (cpdi >= 500) return 'cpdi-very-high';
        else if (cpdi >= 200) return 'cpdi-high';
        else if (cpdi >= 100) return 'cpdi-medium-high';
        else if (cpdi >= 50) return 'cpdi-medium';
        else if (cpdi >= 20) return 'cpdi-medium-low';
        else if (cpdi >= 10) return 'cpdi-low';
        else if (cpdi >= 5) return 'cpdi-very-low';
        else return 'cpdi-poor';
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
                this.clearSearchInputs();
                this.filterData();
                this.displayLeaderboard();
            });
        }
    }
    
    updateLastUpdated() {
        const lastUpdatedElement = document.getElementById('last-updated-time');
        if (lastUpdatedElement) {
            lastUpdatedElement.textContent = this.formatLastUpdated();
        }
    }
    
    updatePaginationInfo() {
        const paginationInfoElement = document.getElementById('pagination-info');
        if (paginationInfoElement) {
            const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            const showingStart = startIndex + 1;
            const showingEnd = Math.min(endIndex, this.filteredData.length);
            const isFiltered = this.rulerSearch !== '' || this.allianceSearch !== '';
            const filterText = isFiltered ? ' (filtered)' : '';
            const itemType = this.currentTab === 'nation' ? 'rulers' : 'alliances';
            paginationInfoElement.textContent = `Showing ${showingStart}-${showingEnd} of ${this.filteredData.length} ${itemType}${filterText}`;
        }
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
    
    const hasDiscoveredScroll = localStorage.getItem('navbar-scroll-discovered') === 'true';
    
    function updateScrollIndicator() {
        if (window.innerWidth <= 768) {
            const canScroll = navbar.scrollWidth > navbar.clientWidth;
            
            if (canScroll && !hasDiscoveredScroll) {
                scrollIndicator.classList.add('visible');
            } else {
                scrollIndicator.classList.remove('visible');
            }
        } else {
            scrollIndicator.classList.remove('visible');
        }
    }
    
    function handleNavbarScroll() {
        if (navbar.scrollLeft > 0 && !hasDiscoveredScroll) {
            localStorage.setItem('navbar-scroll-discovered', 'true');
            scrollIndicator.classList.remove('visible');
            navbar.removeEventListener('scroll', handleNavbarScroll);
        }
    }
    
    navbar.addEventListener('scroll', handleNavbarScroll);
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