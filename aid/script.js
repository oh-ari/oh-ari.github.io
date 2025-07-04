class SlotLeaderboard {
    constructor() {
        this.allianceConfig = null;
        this.slotUsageData = {};
        this.isLoading = false;
        
        this.init();
    }
    
    normalizeAllianceName(name) {
        if (!name) return '';
        return name.toLowerCase()
            .replace(/\s+/g, ' ')
            .trim()
            .replace(/\bof\b/g, 'of')
            .replace(/\band\b/g, 'and') 
            .replace(/\bthe\b/g, 'the')
            .replace(/\bin\b/g, 'in')
            .replace(/\bto\b/g, 'to')
            .replace(/[.,;:!?]/g, '');
    }
    
    async init() {
        console.log('Initializing Slot Usage Leaderboard');
        await this.loadLeaderboard();
    }
    
    async loadLeaderboard() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.showLoadingState();
        
        try {
            await this.loadAllianceConfig();
            await this.loadCSVData();

            this.calculateSlotUsage();
            this.displayLeaderboard();
            this.showLeaderboardState();
            
        } catch (error) {
            console.error('Error loading leaderboard:', error);
            this.showErrorState();
        } finally {
            this.isLoading = false;
        }
    }
    
    async loadAllianceConfig() {
        try {
            const response = await fetch('alliance-slots.json');
            if (!response.ok) throw new Error('Failed to load alliance configuration');
            
            this.allianceConfig = await response.json();
            console.log('Alliance configuration loaded:', this.allianceConfig.alliances.length, 'alliances');
        } catch (error) {
            console.error('Error loading alliance config:', error);
            throw error;
        }
    }
    
    async loadCSVData() {
        try {
            const aidResponse = await fetch('../daily/CN_Foreign_Aid.csv');
            if (!aidResponse.ok) throw new Error('Failed to load foreign aid data');
            
            const aidText = await aidResponse.text();
            this.processForeignAidData(aidText);
            
            console.log('Foreign aid data processed');
        } catch (error) {
            console.error('Error loading CSV data:', error);
            throw error;
        }
    }
    
    processForeignAidData(csvText) {
        const lines = csvText.split('\n');
        const headers = lines[0].split('|');
        
        const declaringAllianceIndex = headers.indexOf('Declaring Alliance');
        const receivingAllianceIndex = headers.indexOf('Receiving Alliance');
        const statusIndex = headers.indexOf('Status');
        const dateIndex = headers.indexOf('Date');
        
        console.log('CSV Headers:', headers);
        console.log('Column indices:', { declaringAllianceIndex, receivingAllianceIndex, statusIndex, dateIndex });
        
        this.slotUsageData = {};
        this.normalizedToDisplayName = {};
        if (this.allianceConfig && this.allianceConfig.alliances) {
            this.allianceConfig.alliances.forEach(alliance => {
                const normalizedName = this.normalizeAllianceName(alliance.name);
                this.normalizedToDisplayName[normalizedName] = alliance.name;
            });
        }
        
        const now = new Date();
        const centralTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Chicago"}));
        
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            const columns = line.split('|');
            if (columns.length < headers.length) continue;
            
            const declaringAlliance = columns[declaringAllianceIndex]?.trim();
            const receivingAlliance = columns[receivingAllianceIndex]?.trim();
            const status = columns[statusIndex]?.trim();
            const dateString = columns[dateIndex]?.trim();
            
            if (status !== 'Pending' && status !== 'Approved') continue;
            
            if (dateString) {
                try {
                    const datePart = dateString.split(' ')[0];
                    const slotDate = new Date(datePart);
                    
                    const timeDiff = centralTime.getTime() - slotDate.getTime();
                    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
                    
                    if (daysDiff > 10) {
                        continue;
                    }
                } catch (error) {
                    console.warn('Error parsing date:', dateString, error);
                    continue;
                }
            } else {
                continue;
            }
            
            if (declaringAlliance) {
                const normalizedName = this.normalizeAllianceName(declaringAlliance);
                this.slotUsageData[normalizedName] = (this.slotUsageData[normalizedName] || 0) + 1;
            }
            
            if (receivingAlliance) {
                const normalizedName = this.normalizeAllianceName(receivingAlliance);
                this.slotUsageData[normalizedName] = (this.slotUsageData[normalizedName] || 0) + 1;
            }
        }
        
        console.log('Slot usage data calculated with expiration logic:', Object.keys(this.slotUsageData).length, 'alliances');
        console.log('Normalized name mappings:', Object.keys(this.normalizedToDisplayName).length, 'configured alliances');
    }
    
    calculateSlotUsage() {
        console.log('Calculating slot usage for top alliances');
    }
    
    displayLeaderboard() {
        const tbody = document.getElementById('leaderboard-tbody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        const leaderboardData = this.allianceConfig.alliances.map((alliance, index) => {
            const normalizedName = this.normalizeAllianceName(alliance.name);
            const usedSlots = this.slotUsageData[normalizedName] || 0;
            const maxSlots = alliance.maxSlots;
            const percentage = maxSlots > 0 ? ((usedSlots / maxSlots) * 100).toFixed(2) : 0;
            
            return {
                rank: index + 1,
                name: alliance.name,
                members: alliance.members,
                usedSlots: usedSlots,
                maxSlots: maxSlots,
                percentage: parseFloat(percentage)
            };
        });
        
        leaderboardData.sort((a, b) => b.percentage - a.percentage);
        
        const maxPercentage = leaderboardData.length > 0 ? leaderboardData[0].percentage : 0;
        
        leaderboardData.forEach((alliance, index) => {
            const row = document.createElement('tr');
            
            const relativePercentage = maxPercentage > 0 ? (alliance.percentage / maxPercentage) * 100 : 0;
            
            let usageClass = 'usage-poor';
            if (relativePercentage >= 90) usageClass = 'usage-excellent';
            else if (relativePercentage >= 80) usageClass = 'usage-very-high';
            else if (relativePercentage >= 70) usageClass = 'usage-high';
            else if (relativePercentage >= 60) usageClass = 'usage-medium-high';
            else if (relativePercentage >= 50) usageClass = 'usage-medium';
            else if (relativePercentage >= 40) usageClass = 'usage-medium-low';
            else if (relativePercentage >= 30) usageClass = 'usage-low';
            else if (relativePercentage >= 20) usageClass = 'usage-very-low';
            
            row.innerHTML = `
                <td>${index + 1}</td>
                <td class="alliance-name">${alliance.name}</td>
                <td>${alliance.members}</td>
                <td>${alliance.usedSlots}</td>
                <td>${alliance.maxSlots}</td>
                <td class="usage-percentage ${usageClass}">${alliance.percentage}%</td>
            `;
            
            tbody.appendChild(row);
        });
        
        const lastUpdatedElement = document.getElementById('last-updated-time');
        if (lastUpdatedElement) {
            lastUpdatedElement.textContent = this.formatDataFileInfo();
        }
        
        console.log('Leaderboard displayed with', leaderboardData.length, 'entries');
    }
    
    formatDataFileInfo() {
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
        document.querySelector('.error-state').style.display = 'none';
    }
    
    showErrorState() {
        document.querySelector('.loading-state').style.display = 'none';
        document.querySelector('.leaderboard-table-container').style.display = 'none';
        document.querySelector('.error-state').style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Slot Usage Leaderboard page loaded');
    new SlotLeaderboard();
    
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