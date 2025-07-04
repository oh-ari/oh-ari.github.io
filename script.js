let selectedValue = '';
let selectedAllianceName = '';
let allAlliances = [];
let currentTreatyType = '';
let currentTreatyText = '';

function showDropdown() {
    const dropdown = document.querySelector('.dropdown-options');
    dropdown.classList.add('show');
}

function hideDropdown() {
    const dropdown = document.querySelector('.dropdown-options');
    dropdown.classList.remove('show');
}

function filterAlliances(searchTerm) {
    const options = document.querySelectorAll('.dropdown-option');
    const dropdown = document.querySelector('.dropdown-options');
    
    let hasVisibleOptions = false;
    
    options.forEach(option => {
        const allianceName = option.textContent.toLowerCase();
        const matches = allianceName.includes(searchTerm.toLowerCase());
        
        if (matches || searchTerm === '') {
            option.style.display = 'block';
            hasVisibleOptions = true;
        } else {
            option.style.display = 'none';
        }
    });
    
    if (hasVisibleOptions && searchTerm !== '') {
        showDropdown();
    } else if (searchTerm === '') {
        hideDropdown();
    }
}

function transitionToActionSelection() {
    const alliancePhase = document.querySelector('.alliance-selection-phase');
    const actionPhase = document.querySelector('.action-selection-phase');
    const selectedAllianceNameEl = document.querySelector('.selected-alliance-name');
    
    selectedAllianceNameEl.textContent = selectedAllianceName;
    
    alliancePhase.classList.add('fade-out');
    
    setTimeout(() => {
        alliancePhase.style.display = 'none';
        actionPhase.style.display = 'block';
        actionPhase.classList.add('fade-in');
        
        setTimeout(() => {
            actionPhase.classList.remove('fade-in');
        }, 500);
    }, 250);
}

function resetToAllianceSelection() {
    const alliancePhase = document.querySelector('.alliance-selection-phase');
    const actionPhase = document.querySelector('.action-selection-phase');
    const treatyPhase = document.querySelector('.treaty-display-phase');
    const allianceInput = document.querySelector('.alliance-input');
    
    allianceInput.value = '';
    selectedValue = '';
    selectedAllianceName = '';
    currentTreatyType = '';
    currentTreatyText = '';
    
    document.querySelectorAll('.dropdown-option').forEach(opt => {
        opt.classList.remove('selected');
        opt.style.display = 'block';
    });
    
    hideDropdown();
    
    [actionPhase, treatyPhase].forEach(phase => {
        if (phase && phase.style.display !== 'none') {
            phase.classList.add('fade-out');
            setTimeout(() => {
                phase.style.display = 'none';
                phase.classList.remove('fade-out');
            }, 250);
        }
    });
    
    setTimeout(() => {
        alliancePhase.style.display = 'block';
        alliancePhase.classList.remove('fade-out');
        alliancePhase.classList.add('fade-in');
        
        setTimeout(() => {
            alliancePhase.classList.remove('fade-in');
        }, 500);
    }, 250);
}

function transitionToTreatyDisplay(treatyType, treatyText) {
    const actionPhase = document.querySelector('.action-selection-phase');
    const treatyPhase = document.querySelector('.treaty-display-phase');
    const treatyTypeLabel = document.querySelector('.treaty-type-label');
    const treatyTextElement = document.querySelector('.treaty-text');
    
    currentTreatyType = treatyType;
    currentTreatyText = treatyText;
    
    treatyTypeLabel.textContent = TREATY_TEMPLATES[treatyType]?.name || treatyType;
    treatyTextElement.textContent = treatyText;
    
    actionPhase.classList.add('fade-out');
    
    setTimeout(() => {
        actionPhase.style.display = 'none';
        actionPhase.classList.remove('fade-out');
        treatyPhase.style.display = 'block';
        treatyPhase.classList.add('fade-in');
        
        setTimeout(() => {
            treatyPhase.classList.remove('fade-in');
        }, 500);
    }, 250);
}

function generateRandomTreaty() {
    const treatyTypes = Object.keys(TREATY_TEMPLATES);
    const randomType = treatyTypes[Math.floor(Math.random() * treatyTypes.length)];
    
    const otherAlliances = allAlliances.filter(alliance => alliance.name !== selectedAllianceName);
    const randomAlliance = otherAlliances[Math.floor(Math.random() * otherAlliances.length)];
    
    const treatyText = generateTreaty(randomType, selectedAllianceName, randomAlliance.name);
    
    return {
        type: randomType,
        text: treatyText
    };
}

document.addEventListener('DOMContentLoaded', function() {
    const options = document.querySelectorAll('.dropdown-option');
    const allianceInput = document.querySelector('.alliance-input');
    const dropdown = document.querySelector('.dropdown-options');
    
    options.forEach(option => {
        allAlliances.push({
            value: option.getAttribute('data-value'),
            name: option.textContent
        });
    });
    
    allianceInput.addEventListener('input', function() {
        const searchTerm = this.value;
        filterAlliances(searchTerm);
    });
    
    allianceInput.addEventListener('focus', function() {
        if (this.value) {
            filterAlliances(this.value);
        }
    });
    
    options.forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.dropdown-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            this.classList.add('selected');
            allianceInput.value = this.textContent;
            selectedValue = this.getAttribute('data-value');
            selectedAllianceName = this.textContent;
            
            hideDropdown();
            
            setTimeout(() => {
                transitionToActionSelection();
            }, 300);
        });
    });
    
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.custom-dropdown')) {
            hideDropdown();
        }
    });
    
    const rngButton = document.querySelector('.rng-button');
    if (rngButton) {
        rngButton.addEventListener('click', function() {
            const randomIndex = Math.floor(Math.random() * allAlliances.length);
            const randomAlliance = allAlliances[randomIndex];
            
            selectedValue = randomAlliance.value;
            selectedAllianceName = randomAlliance.name;
            allianceInput.value = randomAlliance.name;
            
            document.querySelectorAll('.dropdown-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            const randomOption = document.querySelector(`[data-value="${randomAlliance.value}"]`);
            if (randomOption) {
                randomOption.classList.add('selected');
            }
            
            const actions = ['treaty', 'war'];
            const randomAction = actions[Math.floor(Math.random() * actions.length)];
            
            let content, contentType;
            
            if (randomAction === 'treaty') {
                const treaty = generateRandomTreaty();
                content = treaty.text;
                contentType = treaty.type;
            } else {
                const otherAlliances = allAlliances.filter(alliance => alliance.name !== selectedAllianceName);
                const targetAlliance = otherAlliances[Math.floor(Math.random() * otherAlliances.length)];
                
                const potentialDefenseTargets = otherAlliances
                    .filter(alliance => alliance.name !== targetAlliance.name)
                    .map(alliance => alliance.name);
                
                content = generateFullWarDeclaration(
                    selectedAllianceName, 
                    targetAlliance.name, 
                    potentialDefenseTargets
                );
                contentType = 'WAR';
            }
            
            showDropdown();
            setTimeout(() => {
                if (randomOption) {
                    randomOption.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                
                setTimeout(() => {
                    hideDropdown();
                    
                    setTimeout(() => {
                        transitionToTreatyDisplay(contentType, content);
                    }, 300);
                }, 1000);
            }, 100);
        });
    }
    
    const treatyButton = document.querySelector('.treaty-button');
    const warButton = document.querySelector('.war-button');
    
    if (treatyButton) {
        treatyButton.addEventListener('click', function() {
            const treaty = generateRandomTreaty();
            transitionToTreatyDisplay(treaty.type, treaty.text);
        });
    }
    
    if (warButton) {
        warButton.addEventListener('click', function() {
            const otherAlliances = allAlliances.filter(alliance => alliance.name !== selectedAllianceName);
            const targetAlliance = otherAlliances[Math.floor(Math.random() * otherAlliances.length)];
            
            const potentialDefenseTargets = otherAlliances
                .filter(alliance => alliance.name !== targetAlliance.name)
                .map(alliance => alliance.name);
            
            const warDeclaration = generateFullWarDeclaration(
                selectedAllianceName, 
                targetAlliance.name, 
                potentialDefenseTargets
            );
            
            transitionToTreatyDisplay('WAR', warDeclaration);
        });
    }
    
    const rngActionButton = document.querySelector('.rng-action-button');
    if (rngActionButton) {
        rngActionButton.addEventListener('click', function() {
            const actions = ['treaty', 'war'];
            const randomAction = actions[Math.floor(Math.random() * actions.length)];
            
            if (randomAction === 'treaty') {
                treatyButton.click();
            } else {
                warButton.click();
            }
            
            const targetButton = randomAction === 'treaty' ? treatyButton : warButton;
            targetButton.style.transform = 'scale(1.05)';
            setTimeout(() => {
                targetButton.style.transform = '';
            }, 200);
        });
    }
    
    const changeAllianceBtn = document.querySelector('.change-alliance-btn');
    if (changeAllianceBtn) {
        changeAllianceBtn.addEventListener('click', resetToAllianceSelection);
    }
    
    const backToSelectionBtn = document.querySelector('.back-to-selection-btn');
    const copyTreatyBtn = document.querySelector('.copy-treaty-btn');
    const regenerateTreatyBtn = document.querySelector('.regenerate-treaty-btn');
    
    if (backToSelectionBtn) {
        backToSelectionBtn.addEventListener('click', function() {
            const treatyPhase = document.querySelector('.treaty-display-phase');
            const actionPhase = document.querySelector('.action-selection-phase');
            
            treatyPhase.classList.add('fade-out');
            
            setTimeout(() => {
                treatyPhase.style.display = 'none';
                actionPhase.style.display = 'block';
                actionPhase.classList.add('fade-in');
                
                setTimeout(() => {
                    actionPhase.classList.remove('fade-in');
                }, 500);
            }, 250);
        });
    }
    
    if (copyTreatyBtn) {
        copyTreatyBtn.addEventListener('click', async function() {
            try {
                await navigator.clipboard.writeText(currentTreatyText);
                
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                this.style.color = '#3fb950';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.color = '';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
                
                const textArea = document.createElement('textarea');
                textArea.value = currentTreatyText;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    const originalText = this.textContent;
                    this.textContent = 'Copied!';
                    this.style.color = '#3fb950';
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.color = '';
                    }, 2000);
                } catch (fallbackErr) {
                    console.error('Fallback copy failed: ', fallbackErr);
                }
                document.body.removeChild(textArea);
            }
        });
    }
    
    if (regenerateTreatyBtn) {
        regenerateTreatyBtn.addEventListener('click', function() {
            if (currentTreatyType === 'WAR') {
                const otherAlliances = allAlliances.filter(alliance => alliance.name !== selectedAllianceName);
                const targetAlliance = otherAlliances[Math.floor(Math.random() * otherAlliances.length)];
                
                const potentialDefenseTargets = otherAlliances
                    .filter(alliance => alliance.name !== targetAlliance.name)
                    .map(alliance => alliance.name);
                
                const warDeclaration = generateFullWarDeclaration(
                    selectedAllianceName, 
                    targetAlliance.name, 
                    potentialDefenseTargets
                );
                
                currentTreatyText = warDeclaration;
                document.querySelector('.treaty-text').textContent = warDeclaration;
            } else {
                const treaty = generateRandomTreaty();
                currentTreatyType = treaty.type;
                currentTreatyText = treaty.text;
                
                document.querySelector('.treaty-type-label').textContent = TREATY_TEMPLATES[treaty.type]?.name || treaty.type;
                document.querySelector('.treaty-text').textContent = treaty.text;
            }
        });
    }
    
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