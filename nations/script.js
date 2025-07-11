let allNations = [];
let allAidDeals = [];
let selectedNation = null;

document.addEventListener('DOMContentLoaded', function() {
    const footerCredit = document.querySelector('.footer-credit');
    if (footerCredit) {
        footerCredit.addEventListener('click', function() {
            this.classList.toggle('tapped');
        });
    }
    
    loadNationData();
    loadAidData();
    
    const searchInput = document.getElementById('nation-search');
    const dropdown = document.querySelector('.custom-dropdown');
    const dropdownOptions = document.getElementById('dropdown-options');
    const loadingState = document.querySelector('.loading-state');
    const nationResults = document.getElementById('nation-results');
    const errorState = document.getElementById('error-state');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim();
        filterNations(searchTerm);
    });
    
    searchInput.addEventListener('focus', function() {
        dropdown.classList.add('open');
        filterNations(this.value.trim());
    });
    
    searchInput.addEventListener('blur', function() {
        setTimeout(() => {
            dropdown.classList.remove('open');
            dropdownOptions.classList.remove('show');
        }, 200);
    });
    
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
            dropdownOptions.classList.remove('show');
        }
    });
    
    async function loadNationData() {
        try {
            const response = await fetch('../daily/CN_Nation_Stats.csv');
            const csvText = await response.text();
            parseCSVData(csvText);
        } catch (error) {
            console.error('Error loading nation data:', error);
        }
    }
    
    async function loadAidData() {
        try {
            const response = await fetch('../daily/CN_Foreign_Aid.csv');
            const csvText = await response.text();
            parseAidData(csvText);
        } catch (error) {
            console.error('Error loading aid data:', error);
        }
    }
    
    function parseCSVData(csvText) {
        const lines = csvText.split('\n');
        const headers = lines[0].split('|');
        
        allNations = [];
        
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line) {
                const data = line.split('|');
                if (data.length >= 4) {
                    const nation = {
                        id: data[0],
                        ruler: data[1],
                        name: data[2],
                        alliance: data[3],
                        allianceId: data[4],
                        allianceDate: data[5],
                        allianceStatus: data[6],
                        government: data[7],
                        religion: data[8],
                        team: data[9],
                        created: data[10],
                        technology: data[11],
                        infrastructure: data[12],
                        baseLand: data[13],
                        warStatus: data[14],
                        resource1: data[15],
                        resource2: data[16],
                        votes: data[17],
                        strength: data[18],
                                                 defcon: data[19],
                         baseSoldiers: data[20],
                         tanks: data[21],
                         cruise: data[22],
                         nukes: data[23],
                         activity: data[24],
                         attackingCasualties: data[35],
                         defensiveCasualties: data[36]
                    };
                    allNations.push(nation);
                }
            }
        }
        
        console.log(`Loaded ${allNations.length} nations`);
    }
    
    function parseAidData(csvText) {
        const lines = csvText.split('\n');
        const headers = lines[0].split('|');
        
        allAidDeals = [];
        
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line) {
                const data = line.split('|');
                if (data.length >= 19) {
                    const deal = {
                        id: data[0],
                        declaringRuler: data[1],
                        declaringNation: data[2],
                        receivingRuler: data[7],
                        receivingNation: data[8],
                        status: data[12],
                        money: data[13],
                        technology: data[14],
                        soldiers: data[15],
                        date: data[16]
                    };
                    
                    if (deal.status === 'Pending' || deal.status === 'Approved') {
                        allAidDeals.push(deal);
                    }
                }
            }
        }
        
        console.log(`Loaded ${allAidDeals.length} active aid deals`);
    }
    
    function filterNations(searchTerm) {
        if (!searchTerm) {
            dropdownOptions.classList.remove('show');
            return;
        }
        
        const filtered = allNations.filter(nation => {
            const rulerMatch = nation.ruler.toLowerCase().includes(searchTerm.toLowerCase());
            const nationMatch = nation.name.toLowerCase().includes(searchTerm.toLowerCase());
            return rulerMatch || nationMatch;
        });
        
        const limitedResults = filtered.slice(0, 50);
        
        displayDropdownOptions(limitedResults);
    }
    
    function displayDropdownOptions(nations) {
        dropdownOptions.innerHTML = '';
        
        if (nations.length === 0) {
            dropdownOptions.classList.remove('show');
            return;
        }
        
        nations.forEach(nation => {
            const option = document.createElement('div');
            option.className = 'dropdown-option';
            option.innerHTML = `
                <div class="nation-info">
                    <div class="nation-name">${escapeHtml(nation.name)}</div>
                    <div class="ruler-name">Ruler: ${escapeHtml(nation.ruler)}</div>
                    <div class="alliance-name">${escapeHtml(nation.alliance)}</div>
                </div>
            `;
            
            option.addEventListener('click', function() {
                selectNation(nation);
            });
            
            dropdownOptions.appendChild(option);
        });
        
        dropdownOptions.classList.add('show');
    }
    
    function selectNation(nation) {
        selectedNation = nation;
        searchInput.value = `${nation.name} (${nation.ruler})`;
        dropdown.classList.remove('open');
        dropdownOptions.classList.remove('show');
        
        displayNationResults(nation);
    }
    
    function displayNationResults(nation) {
        loadingState.style.display = 'none';
        errorState.style.display = 'none';
        
        document.getElementById('nation-name').textContent = nation.name;
        document.getElementById('nation-ruler').textContent = `${nation.ruler} of ${nation.alliance}`;
        document.getElementById('nation-strength').textContent = formatNumber(parseNumber(nation.strength), 2);
        document.getElementById('nation-infrastructure').textContent = formatNumber(parseNumber(nation.infrastructure), 2);
        document.getElementById('nation-technology').textContent = formatNumber(parseNumber(nation.technology), 2);
        document.getElementById('nation-last-active').textContent = nation.activity || '--';
        document.getElementById('nation-defcon').textContent = nation.defcon || '--';
        document.getElementById('nation-soldiers').textContent = formatNumber(parseNumber(nation.baseSoldiers, true));
        document.getElementById('nation-tanks').textContent = formatNumber(parseNumber(nation.tanks, true));
        document.getElementById('nation-nukes').textContent = formatNumber(parseNumber(nation.nukes, true));
        
        const attackingCasualties = parseNumber(nation.attackingCasualties, true);
        const defensiveCasualties = parseNumber(nation.defensiveCasualties, true);
        const totalCasualties = attackingCasualties + defensiveCasualties;
        
        const cpdi = calculateCPDI(nation.created, totalCasualties);
        
        document.getElementById('nation-attacking-casualties').textContent = formatNumber(attackingCasualties);
        document.getElementById('nation-defensive-casualties').textContent = formatNumber(defensiveCasualties);
        document.getElementById('nation-total-casualties').textContent = formatNumber(totalCasualties);
        document.getElementById('nation-cpdi').textContent = cpdi;
        
        displayAidDeals(nation.ruler, nation.name);
        
        nationResults.style.display = 'block';
    }
    
    function parseNumber(value, isInteger = false) {
        if (!value || value === '--') return 0;
        const cleaned = value.toString().replace(/,/g, '');
        return isInteger ? parseInt(cleaned) || 0 : parseFloat(cleaned) || 0;
    }
    
    function formatNumber(value, decimals = 0) {
        if (value === 0) return '0';
        return decimals > 0 ? value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : value.toLocaleString();
    }
    
    function calculateCPDI(createdDate, totalCasualties) {
        if (!createdDate || totalCasualties === 0) return '0.00';
        
        try {
            const created = new Date(createdDate);
            const now = new Date();
            
            const ageInDays = Math.floor((now - created) / (1000 * 60 * 60 * 24));
            
            if (ageInDays <= 0) return '0.00';
            
            const cpdi = Math.round(totalCasualties / ageInDays);
            
            return formatNumber(cpdi, 0);
        } catch (error) {
            console.error('Error calculating CPDI:', error);
            return '--';
        }
    }
    
    function displayAidDeals(rulerName, nationName) {
        const container = document.getElementById('nation-aid-deals');
        container.innerHTML = '';
        
        const relevantDeals = allAidDeals.filter(deal => {
            const isDeclaring = deal.declaringRuler === rulerName && deal.declaringNation === nationName;
            const isReceiving = deal.receivingRuler === rulerName && deal.receivingNation === nationName;
            return isDeclaring || isReceiving;
        });
        
        if (relevantDeals.length === 0) {
            container.innerHTML = '<p class="no-deals">No active aid deals</p>';
            return;
        }
        
        relevantDeals.forEach(deal => {
            const isDeclaring = deal.declaringRuler === rulerName && deal.declaringNation === nationName;
            const partnerRuler = isDeclaring ? deal.receivingRuler : deal.declaringRuler;
            const partnerNation = isDeclaring ? deal.receivingNation : deal.declaringNation;
            
            const dealElement = document.createElement('div');
            dealElement.className = 'aid-deal';
            
            const money = parseNumber(deal.money, false);
            const tech = parseNumber(deal.technology, false);
            const soldiers = parseNumber(deal.soldiers, true);
            
            dealElement.innerHTML = `
                <div class="aid-deal-header">
                    <span class="aid-deal-type ${isDeclaring ? 'aid-deal-sending' : 'aid-deal-receiving'}">
                        ${isDeclaring ? 'Sending' : 'Receiving'}
                    </span>
                    <span class="aid-deal-status ${deal.status.toLowerCase() === 'pending' ? 'aid-deal-pending' : 'aid-deal-approved'}">
                        ${deal.status}
                    </span>
                </div>
                <div class="aid-deal-partner">
                    ${isDeclaring ? 'To' : 'From'}: ${escapeHtml(partnerRuler)} of ${escapeHtml(partnerNation)}
                </div>
                <div class="aid-deal-amounts">
                    ${money > 0 ? `
                        <div class="aid-amount">
                            <div class="aid-amount-label">Money</div>
                            <div class="aid-amount-value">$${formatNumber(money, 2)}</div>
                        </div>
                    ` : ''}
                    ${tech > 0 ? `
                        <div class="aid-amount">
                            <div class="aid-amount-label">Technology</div>
                            <div class="aid-amount-value">${formatNumber(tech, 2)}</div>
                        </div>
                    ` : ''}
                    ${soldiers > 0 ? `
                        <div class="aid-amount">
                            <div class="aid-amount-label">Soldiers</div>
                            <div class="aid-amount-value">${formatNumber(soldiers)}</div>
                        </div>
                    ` : ''}
                </div>
            `;
            
            container.appendChild(dealElement);
        });
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    const navbar = document.querySelector('.navbar');
    const scrollIndicator = document.querySelector('.navbar-scroll-indicator');
    
    if (navbar && scrollIndicator) {
        let scrollTimeout;
        
        navbar.addEventListener('scroll', function() {
            if (window.innerWidth <= 768) {
                scrollIndicator.classList.add('visible');
                
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(function() {
                    scrollIndicator.classList.remove('visible');
                }, 1000);
            }
        });
        
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                scrollIndicator.classList.remove('visible');
            }
        });
    }
}); 