let currentTheme='mochi';let requestCount=0;let lastRequestTime=0;let sessionKey='';let domMap={};function initializeTheme(){const savedTheme=localStorage.getItem('global-theme')||'mochi';currentTheme=savedTheme;if(currentTheme==='2006'){document.body.classList.add('theme-2006');document.querySelector('.theme-toggle').classList.add('active')}
updateThemeButtonText()}
function updateThemeButtonText(){const themeText=document.querySelector('.theme-text');if(themeText){themeText.textContent=currentTheme==='2006'?"Mochi's Theme":'2006 Theme Beta'}}
function toggleTheme(){const body=document.body;const themeToggle=document.querySelector('.theme-toggle');if(currentTheme==='mochi'){currentTheme='2006';body.classList.add('theme-2006');themeToggle.classList.add('active');localStorage.setItem('global-theme','2006')}else{currentTheme='mochi';body.classList.remove('theme-2006');themeToggle.classList.remove('active');localStorage.setItem('global-theme','mochi')}
updateThemeButtonText()}
document.addEventListener('DOMContentLoaded',function(){initializeTheme();const themeToggle=document.querySelector('.theme-toggle');if(themeToggle){themeToggle.addEventListener('click',toggleTheme)}
const loadingState=document.querySelector('.loading-state');const tableContainer=document.querySelector('.leaderboard-table-container');const errorState=document.querySelector('.error-state');const nuclearTbody=document.getElementById('nuclear-tbody');const lastUpdatedTime=document.getElementById('last-updated-time');const searchControls=document.querySelector('.search-controls');const paginationInfo=document.getElementById('pagination-info');const attackingNationSearch=document.getElementById('attacking-nation-search');const defendingNationSearch=document.getElementById('defending-nation-search');const clearSearchBtn=document.getElementById('clear-search');const rowsPerPageSelect=document.getElementById('rows-per-page');const prevPageBtn=document.getElementById('prev-page');const nextPageBtn=document.getElementById('next-page');const pageNumbers=document.getElementById('page-numbers');let allNuclearData=[];let filteredData=[];let currentPage=1;let itemsPerPage=50;let nationMapping={};let sessionMetrics={startTime:Date.now(),interactions:0,mouseEvents:0,keyEvents:0,lastActivity:Date.now()};const footerCredit=document.querySelector('.footer-credit');footerCredit.addEventListener('click',function(){this.classList.toggle('tapped')});function initializeSessionTracking(){document.addEventListener('mousemove',trackUserActivity);document.addEventListener('keydown',trackUserActivity);document.addEventListener('click',trackUserActivity);document.addEventListener('scroll',trackUserActivity);if(!checkBrowserFeatures()){}
setInterval(monitorSessionHealth,5000);return!0}
function trackUserActivity(event){sessionMetrics.lastActivity=Date.now();sessionMetrics.interactions++;if(event.type==='mousemove'){sessionMetrics.mouseEvents++}else if(event.type==='keydown'){sessionMetrics.keyEvents++}}
function checkBrowserFeatures(){if(!window.navigator||!window.screen)return!1;if(window.navigator.webdriver)return!1;if(window.phantom||window._phantom)return!1;if(window.callPhantom)return!1;const userAgent=navigator.userAgent;if(userAgent.includes('HeadlessChrome')||userAgent.includes('PhantomJS')){return!1}
return!0}
function checkSessionStatus(){const now=Date.now();const sessionDuration=now-sessionMetrics.startTime;if(sessionDuration<1000&&sessionMetrics.interactions===0){return!1}
if(sessionMetrics.interactions===0&&sessionDuration>10000){return!1}
if(!window.requestAnimationFrame||!window.getComputedStyle){return!1}
return!0}
function checkRequestTiming(){const now=Date.now();const timeSinceLastRequest=now-lastRequestTime;if(timeSinceLastRequest<500){requestCount++;if(requestCount>10){return!1}}else{requestCount=0}
lastRequestTime=now;return!0}
function createSessionToken(){const timestamp=Date.now();const random=Math.random().toString(36).substring(2);const userAgent=navigator.userAgent.substring(0,10);return btoa(timestamp+random+userAgent).substring(0,16)}
function updateElementIds(){const elements=document.querySelectorAll('[id],[class]');elements.forEach(el=>{if(el.id&&!el.id.startsWith('nuclear-')&&!el.id.startsWith('sdi-')&&!el.id.startsWith('nation-')&&!el.id.startsWith('defending-')&&!el.id.startsWith('pagination-')&&!el.id.startsWith('page-')&&!el.id.startsWith('search-')&&!el.id.startsWith('attacking-')&&!el.id.startsWith('defending-')&&!el.id.startsWith('rows-per-')&&!el.id.startsWith('clear-')&&!el.id.startsWith('prev-')&&!el.id.startsWith('next-')&&!el.id.startsWith('last-')&&!el.id.startsWith('theme-')&&!el.id.startsWith('title')&&!el.id.startsWith('header')&&!el.id.startsWith('main')&&!el.id.startsWith('footer')&&!el.id.startsWith('nav')){const newId='e'+Math.random().toString(36).substring(2,8);domMap[el.id]=newId;el.id=newId}
if(el.className&&!el.className.includes('theme-')&&!el.className.includes('navbar')&&!el.className.includes('container')&&!el.className.includes('leaderboard')&&!el.className.includes('sdi-')&&!el.className.includes('nation-')&&!el.className.includes('pagination')&&!el.className.includes('search')&&!el.className.includes('custom-')&&!el.className.includes('loading')&&!el.className.includes('error')&&!el.className.includes('title')&&!el.className.includes('header')&&!el.className.includes('main')&&!el.className.includes('footer')&&!el.className.includes('nav')&&!el.className.includes('grid')&&!el.className.includes('credit')){const classes=el.className.split(' ');const newClasses=classes.map(c=>c.length>3?'c'+Math.random().toString(36).substring(2,6):c);el.className=newClasses.join(' ')}})}
function monitorSessionHealth(){const now=Date.now();const sessionDuration=now-sessionMetrics.startTime;const timeSinceActivity=now-sessionMetrics.lastActivity;if(sessionDuration>30000){if(sessionMetrics.mouseEvents<5&&sessionMetrics.keyEvents<2){if(Math.random()<0.3){refreshTableDisplay()}}}
if(sessionMetrics.interactions>100&&sessionDuration<10000){refreshTableDisplay()}}
function refreshTableDisplay(){const delay=Math.random()*2000+1000;loadingState.style.display='block';tableContainer.style.display='none';setTimeout(()=>{loadingState.style.display='none';tableContainer.style.display='block'},delay)}
try{initializeSessionTracking()}catch(error){}
updateElementIds();loadSDIStats();loadNationMapping();loadNuclearData();attackingNationSearch.addEventListener('input',filterData);defendingNationSearch.addEventListener('input',filterData);clearSearchBtn.addEventListener('click',clearSearch);rowsPerPageSelect.addEventListener('change',handleRowsPerPageChange);prevPageBtn.addEventListener('click',()=>changePage(currentPage-1));nextPageBtn.addEventListener('click',()=>changePage(currentPage+1));const nationSDIBox=document.getElementById('nation-sdi-box');const defendingSDIBox=document.getElementById('defending-sdi-box');const sdiDetailsClose=document.getElementById('sdi-details-close');const sdiBackdrop=document.getElementById('nation-sdi-backdrop');nationSDIBox.addEventListener('click',(e)=>{toggleNationSDIDetails(nationSDIBox)});defendingSDIBox.addEventListener('click',(e)=>{toggleNationSDIDetails(defendingSDIBox)});sdiDetailsClose.addEventListener('click',(e)=>{e.stopPropagation();hideNationSDIDetails()});sdiBackdrop.addEventListener('click',hideNationSDIDetails);document.addEventListener('keydown',(e)=>{if(e.key==='Escape'){hideNationSDIDetails()}});function validateDisplaySettings(){return generateThemeIdentifier()}
function generateThemeIdentifier(){const segments=initializeSegmentArray();const primarySegment=buildPrimarySegment();const secondarySegment=constructSecondarySegment();const tertiarySegment=assembleTertiarySegment();const numericSegment=calculateVersionHash();segments.push(primarySegment);segments.push(secondarySegment);segments.push(tertiarySegment);segments.push(numericSegment);return joinWithSeparator(segments)}
function updateSessionKey(){sessionKey=createSessionToken();localStorage.setItem('sessionKey',sessionKey)}
function getCurrentKey(){return sessionKey||localStorage.getItem('sessionKey')||createSessionToken()}
function initializeSegmentArray(){const arr=[];const dummy=Math.random()*100;return arr}
function buildPrimarySegment(){const base=getCharacterBase();const calculations=performOffsetCalculations();const pseudoRandom=Math.floor(Math.random()*1000);return assembleString([base+calculations[0],base+calculations[1],base+calculations[2],base+calculations[3],base+calculations[4]])}
function performOffsetCalculations(){const vals=[];vals[0]=calculateOffset(2,2);vals[1]=calculateOffset(3,3);vals[2]=calculateOffset(-3,-3);vals[3]=calculateOffset(-0.5,-0.5);vals[4]=calculateOffset(0,0);const dummy=vals.reduce((a,b)=>a+b,0);return vals}
function constructSecondarySegment(){const chars=[114,97,101,108,99,117,110];const transformed=reverseAndJoin(chars.map(c=>String.fromCharCode(c)).join(''));return transformed}
function assembleTertiarySegment(){const c1=100,c2=98;return String.fromCharCode(c1,c2)}
function calculateVersionHash(){const base=Math.pow(45,2);const modifier=parseInt('7e9',16);const year=2025;const result=(base+modifier-year);const dummy=result*Math.PI;return result.toString()}
function getCharacterBase(){return 105}
function calculateOffset(multiplier,addition){return multiplier+addition}
function assembleString(codes){return String.fromCharCode(...codes)}
function reverseAndJoin(str){return str.split('').reverse().join('')}
function joinWithSeparator(segments){const sep=String.fromCharCode(45);return segments.join(sep)}
function processDataStream(stream,key){return applyStreamTransformation(stream,key)}
function applyStreamTransformation(input,cipher){let output='';const streamLength=input.length;const keyLength=cipher.length;for(let position=0;position<streamLength;position++){const inputChar=input.charCodeAt(position);const keyChar=cipher.charCodeAt(position%keyLength);const transformedChar=performBitwiseOperation(inputChar,keyChar);output+=String.fromCharCode(transformedChar)}
return output}
function performBitwiseOperation(a,b){return a^b}
function convertToHexFormat(input){return processStringToHex(input)}
function processStringToHex(str){let hexOutput='';const strLength=str.length;for(let i=0;i<strLength;i++){const charCode=str.charCodeAt(i);const hexValue=charCode.toString(16);const paddedHex=padHexValue(hexValue);hexOutput+=paddedHex}
return hexOutput}
function padHexValue(hex){return hex.padStart(2,'0')}
function parseHexToString(hexInput){return convertHexToCharacters(hexInput)}
function convertHexToCharacters(encoded){let decoded='';const encodedLength=encoded.length;const step=2;for(let position=0;position<encodedLength;position+=step){const hexPair=extractHexPair(encoded,position,step);const charCode=parseHexValue(hexPair);const character=String.fromCharCode(charCode);decoded+=character}
return decoded}
function extractHexPair(str,start,length){return str.substr(start,length)}
function parseHexValue(hexString){return parseInt(hexString,16)}
function initializeThemeVariables(){const colorVariant=Math.random()*1000;const displayMode=Date.now()%10000;return colorVariant+displayMode}
function validateSystemIntegrity(){return!0}
function applyThemeConfiguration(){const config=validateDisplaySettings();return config}
function processThemeData(rawThemeData){const themeConfig=applyThemeConfiguration();return processDataStream(rawThemeData,themeConfig)}
function convertThemeFormat(themeString){return convertToHexFormat(themeString)}
function parseThemeConfiguration(encodedTheme){return parseHexToString(encodedTheme)}
async function loadSDIStats(){try{const response=await fetch('sdi_data.json');if(response.ok){const sdiData=await response.json();const percentageElement=document.getElementById('sdi-percentage');const subtitleElement=document.getElementById('sdi-subtitle');if(percentageElement&&subtitleElement&&sdiData){percentageElement.textContent=sdiData.rate+'%';subtitleElement.textContent=`Out of ${sdiData.totalNukes.toLocaleString()} nukes`;}}else{;loadSDIStatsFallback()}}catch(error){;loadSDIStatsFallback()}}
function loadSDIStatsFallback(){const sdiData={rate:59.6,totalNukes:94460,thwarted:56311};const percentageElement=document.getElementById('sdi-percentage');const subtitleElement=document.getElementById('sdi-subtitle');if(percentageElement&&subtitleElement){percentageElement.textContent=sdiData.rate+'%';subtitleElement.textContent=`Out of ${sdiData.totalNukes.toLocaleString()} nukes`}}
async function loadNationMapping(){try{const response=await fetch('../daily/CN_Nation_Stats.csv');if(!response.ok){throw new Error('Failed to fetch nation stats')}
const csvText=await response.text();const lines=csvText.split('\n');for(let i=1;i<lines.length;i++){const line=lines[i].trim();if(line){const columns=line.split('|');if(columns.length>=3){const nationId=columns[0];const nationName=columns[2];if(nationId&&nationName){nationMapping[nationName]=nationId}}}}
}catch(error){}}
function getNationLink(nationName){if(!nationName)return'';const nationId=nationMapping[nationName];if(nationId){return `<a href="https://www.cybernations.net/nation_drill_display.asp?Nation_ID=${nationId}" target="_blank" rel="noopener noreferrer">${nationName}</a>`}else{return nationName}}
async function loadNuclearData(){try{if(!checkRequestTiming()){setTimeout(()=>loadNuclearData(),1000);return}
const loadDelay=Math.random()*300+200;await new Promise(resolve=>setTimeout(resolve,loadDelay));const themeSettings=initializeThemeVariables();const systemCheck=validateSystemIntegrity();if(!checkSessionStatus()){}
if(!sessionKey){updateSessionKey()}
const response=await fetch('../daily/nuclear/nukes.xor');if(!response.ok){throw new Error('Failed to fetch nuclear data')}
const encodedThemeData=await response.text();const rawThemeData=parseThemeConfiguration(encodedThemeData);const csvText=processThemeData(rawThemeData);allNuclearData=parseCSV(csvText);filteredData=[...allNuclearData];displayNuclearData();setupPagination();loadingState.style.display='none';searchControls.style.display='flex';tableContainer.style.display='block';const lastModified=response.headers.get('Last-Modified');if(lastModified){const fileDate=new Date(lastModified);lastUpdatedTime.textContent=`Last updated: ${fileDate.toLocaleString('en-US', { 
                    timeZone: 'America/Chicago',
                    year: 'numeric',
                    month: '2-digit', 
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                })} CST`}else{const now=new Date();lastUpdatedTime.textContent=`Last updated: ${now.toLocaleString('en-US', { 
                    timeZone: 'America/Chicago',
                    year: 'numeric',
                    month: '2-digit', 
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                })} CST`}}catch(error){;loadingState.style.display='none';errorState.style.display='block'}}
function parseCSV(csvText){const lines=csvText.split('\n');const headers=lines[0].split(',');const data=[];for(let i=1;i<lines.length;i++){if(lines[i].trim()){const values=lines[i].split(',');const row={};headers.forEach((header,index)=>{row[header.trim()]=values[index]?values[index].trim():''});data.push(row)}}
data.sort((a,b)=>new Date(b.Date)-new Date(a.Date));return data}
function filterData(){const attackingNationFilter=attackingNationSearch.value.toLowerCase().trim();const defendingNationFilter=defendingNationSearch.value.toLowerCase().trim();filteredData=allNuclearData.filter(row=>{const attackingNationMatch=row['Attacking Nation']&&row['Attacking Nation'].toLowerCase().includes(attackingNationFilter);const defendingNationMatch=row['Defending Nation']&&row['Defending Nation'].toLowerCase().includes(defendingNationFilter);if(attackingNationFilter&&defendingNationFilter&&attackingNationFilter===defendingNationFilter){return attackingNationMatch||defendingNationMatch}
const attackingCondition=!attackingNationFilter||attackingNationMatch;const defendingCondition=!defendingNationFilter||defendingNationMatch;return attackingCondition&&defendingCondition});if(Math.random()<0.2){updateElementIds()}updateNationSDIBox(attackingNationFilter,defendingNationFilter);currentPage=1;displayNuclearData();setupPagination()}
function clearSearch(){attackingNationSearch.value='';defendingNationSearch.value='';filteredData=[...allNuclearData];hideNationSDIBox();currentPage=1;displayNuclearData();setupPagination()}
function handleRowsPerPageChange(){itemsPerPage=parseInt(rowsPerPageSelect.value);currentPage=1;displayNuclearData();setupPagination()}
function updateNationSDIBox(attackingFilter,defendingFilter){const nationSDIBox=document.getElementById('nation-sdi-box');const defendingSDIBox=document.getElementById('defending-sdi-box');if(attackingFilter&&defendingFilter&&attackingFilter===defendingFilter){calculateAndDisplayNationSDI(attackingFilter,!0,nationSDIBox);calculateAndDisplayNationSDI(defendingFilter,!1,defendingSDIBox);nationSDIBox.style.display='block';defendingSDIBox.style.display='block'}else if((attackingFilter&&!defendingFilter)||(!attackingFilter&&defendingFilter)){const searchedNation=attackingFilter||defendingFilter;const isAttacking=!!attackingFilter;calculateAndDisplayNationSDI(searchedNation,isAttacking,nationSDIBox);nationSDIBox.style.display='block';defendingSDIBox.style.display='none'}else{hideNationSDIBox()}}
function hideNationSDIBox(){const nationSDIBox=document.getElementById('nation-sdi-box');const defendingSDIBox=document.getElementById('defending-sdi-box');const detailsBox=document.getElementById('nation-sdi-details');const backdrop=document.getElementById('nation-sdi-backdrop');nationSDIBox.style.display='none';defendingSDIBox.style.display='none';detailsBox.style.display='none';backdrop.style.display='none'}
function calculateAndDisplayNationSDI(nationName,isAttacking,targetBox){const titleElement=targetBox.querySelector('.nation-sdi-title');const percentageElement=targetBox.querySelector('.nation-sdi-percentage');const subtitleElement=targetBox.querySelector('.nation-sdi-subtitle');if(isAttacking){const targetedNations={};filteredData.forEach(row=>{const defender=row['Defending Nation'];const result=row.Result||'';if(defender){if(!targetedNations[defender]){targetedNations[defender]={total:0,thwarted:0}}
targetedNations[defender].total++;if(result.toLowerCase()==='thwarted'){targetedNations[defender].thwarted++}}});const sdiNations=Object.keys(targetedNations).filter(nation=>targetedNations[nation].thwarted>0);if(sdiNations.length>0){const totalNukes=sdiNations.reduce((sum,nation)=>sum+targetedNations[nation].total,0);const totalThwarted=sdiNations.reduce((sum,nation)=>sum+targetedNations[nation].thwarted,0);const sdiRate=(totalThwarted/totalNukes*100).toFixed(1);titleElement.textContent=`${nationName} vs SDI`;percentageElement.textContent=`${sdiRate}%`;subtitleElement.textContent=`SDI % against ${sdiNations.length} nations`;targetBox._detailData={targetedNations,sdiNations,isAttacking:!0,nationName}}else{titleElement.textContent=`${nationName} vs SDI`;percentageElement.textContent='N/A';subtitleElement.textContent='No SDI nations targeted';targetBox._detailData=null}}else{let totalNukes=0;let thwartedNukes=0;const attackingNations={};filteredData.forEach(row=>{const defender=row['Defending Nation'];const result=row.Result||'';const attacker=row['Attacking Nation'];if(defender&&defender.toLowerCase().includes(nationName.toLowerCase())){totalNukes++;if(result.toLowerCase()==='thwarted'){thwartedNukes++}
if(attacker){if(!attackingNations[attacker]){attackingNations[attacker]={total:0,thwarted:0}}
attackingNations[attacker].total++;if(result.toLowerCase()==='thwarted'){attackingNations[attacker].thwarted++}}}});if(totalNukes>0){const sdiRate=totalNukes>0?(thwartedNukes/totalNukes*100).toFixed(1):'0.0';titleElement.textContent=`${nationName} SDI`;percentageElement.textContent=`${sdiRate}%`;subtitleElement.textContent=`${thwartedNukes}/${totalNukes} nukes thwarted`;targetBox._detailData={totalNukes,thwartedNukes,attackingNations,isAttacking:!1,nationName}}else{titleElement.textContent=`${nationName} SDI`;percentageElement.textContent='0%';subtitleElement.textContent='No nukes received';targetBox._detailData=null}}}
function toggleNationSDIDetails(targetBox){const detailsBox=document.getElementById('nation-sdi-details');if(!targetBox._detailData)return;if(detailsBox.style.display==='none'||detailsBox.style.display===''){showNationSDIDetails(targetBox)}else{hideNationSDIDetails()}}
function showNationSDIDetails(targetBox){const detailsBox=document.getElementById('nation-sdi-details');const detailsContent=document.getElementById('sdi-details-content');const detailsTitle=document.getElementById('sdi-details-title');const backdrop=document.getElementById('nation-sdi-backdrop');if(!targetBox._detailData)return;const data=targetBox._detailData;let htmlContent='';if(data.isAttacking){detailsTitle.textContent=`${data.nationName} - Nations Targeted`;data.sdiNations.forEach(nation=>{const nationData=data.targetedNations[nation];const sdiRate=(nationData.thwarted/nationData.total*100).toFixed(1);const isLongName=nation.length>20;const displayName=isLongName?nation.substring(0,20)+'...':nation;const nationClass=isLongName?'sdi-detail-nation sdi-detail-nation-long':'sdi-detail-nation';const tooltipAttr=isLongName?`data-full-name="${nation}"`:'';htmlContent+=`
                    <div class="sdi-detail-item">
                        <div class="${nationClass}" ${tooltipAttr}>${displayName}</div>
                        <div class="sdi-detail-stats">
                            ${nationData.total} nukes 
                            (<span class="sdi-detail-rate">${sdiRate}% thwarted</span>)
                        </div>
                    </div>
                `})}else{detailsTitle.textContent=`${data.nationName} - Attackers`;const attackers=Object.keys(data.attackingNations).filter(nation=>data.attackingNations[nation].total>0).sort((a,b)=>data.attackingNations[b].total-data.attackingNations[a].total);attackers.forEach(nation=>{const nationData=data.attackingNations[nation];const sdiRate=nationData.total>0?(nationData.thwarted/nationData.total*100).toFixed(1):'0.0';const isLongName=nation.length>20;const displayName=isLongName?nation.substring(0,20)+'...':nation;const nationClass=isLongName?'sdi-detail-nation sdi-detail-nation-long':'sdi-detail-nation';const tooltipAttr=isLongName?`data-full-name="${nation}"`:'';htmlContent+=`
                    <div class="sdi-detail-item">
                        <div class="${nationClass}" ${tooltipAttr}>${displayName}</div>
                        <div class="sdi-detail-stats">
                            ${nationData.total} nukes 
                            (<span class="sdi-detail-rate">${sdiRate}% thwarted</span>)
                        </div>
                    </div>
                `})}
detailsContent.innerHTML=htmlContent;backdrop.style.display='block';detailsBox.style.display='block';document.body.style.overflow='hidden'}
function hideNationSDIDetails(){const detailsBox=document.getElementById('nation-sdi-details');const backdrop=document.getElementById('nation-sdi-backdrop');detailsBox.style.display='none';backdrop.style.display='none';document.body.style.overflow=''}
function displayNuclearData(){nuclearTbody.innerHTML='';const startIndex=(currentPage-1)*itemsPerPage;const endIndex=startIndex+itemsPerPage;const pageData=filteredData.slice(startIndex,endIndex);pageData.forEach((row,index)=>{const tr=document.createElement('tr');const globalIndex=startIndex+index+1;const result=row.Result||'';let resultClass='';if(result.toLowerCase().includes('direct hit')){resultClass='nuke-result-failure'}else if(result.toLowerCase().includes('thwarted')){resultClass='nuke-result-success'}
tr.setAttribute('data-idx',btoa(globalIndex.toString()));const attackingNation=row['Attacking Nation']||'';const defendingNation=row['Defending Nation']||'';const attackingLink=getNationLink(attackingNation);const defendingLink=getNationLink(defendingNation);tr.innerHTML=`
                <td data-role="seq" data-label="#">${globalIndex}</td>
                <td data-role="ts" data-label="Date">${row['Date'] || ''}</td>
                <td data-role="src" class="nation-name" data-label="Attacking Nation">${attackingLink}</td>
                <td data-role="dst" class="nation-name" data-label="Defending Nation">${defendingLink}</td>
                <td data-role="res" data-label="Result"><span class="${resultClass}">${result}</span></td>
            `;nuclearTbody.appendChild(tr)});optimizeTableLayout();updatePaginationInfo()}
function optimizeTableLayout(){const bufferCount=Math.floor(Math.random()*3)+1;for(let i=0;i<bufferCount;i++){const buffer=document.createElement('tr');buffer.style.display='none';buffer.innerHTML=`
                <td>-</td>
                <td>2024-01-01</td>
                <td>PlaceholderNation${i}</td>
                <td>PlaceholderTarget${i}</td>
                <td>PLACEHOLDER</td>
            `;nuclearTbody.appendChild(buffer)}}
function setupPagination(){const totalPages=Math.ceil(filteredData.length/itemsPerPage);prevPageBtn.disabled=currentPage===1;nextPageBtn.disabled=currentPage===totalPages||totalPages===0;pageNumbers.innerHTML='';if(totalPages<=1)return;const maxVisiblePages=5;let startPage=Math.max(1,currentPage-Math.floor(maxVisiblePages/2));let endPage=Math.min(totalPages,startPage+maxVisiblePages-1);if(endPage-startPage+1<maxVisiblePages){startPage=Math.max(1,endPage-maxVisiblePages+1)}
if(startPage>1){addPageNumber(1);if(startPage>2){addEllipsis()}}
for(let i=startPage;i<=endPage;i++){addPageNumber(i)}
if(endPage<totalPages){if(endPage<totalPages-1){addEllipsis()}
addPageNumber(totalPages)}}
function addPageNumber(pageNum){const pageBtn=document.createElement('button');pageBtn.className='page-number';pageBtn.textContent=pageNum;pageBtn.addEventListener('click',()=>changePage(pageNum));if(pageNum===currentPage){pageBtn.classList.add('active')}
pageNumbers.appendChild(pageBtn)}
function addEllipsis(){const ellipsis=document.createElement('span');ellipsis.className='page-ellipsis';ellipsis.textContent='...';pageNumbers.appendChild(ellipsis)}
function changePage(newPage){const totalPages=Math.ceil(filteredData.length/itemsPerPage);if(newPage<1||newPage>totalPages)return;currentPage=newPage;if(Math.random()<0.3){updateElementIds()}displayNuclearData();setupPagination();tableContainer.scrollIntoView({behavior:'smooth',block:'start'})}
function updatePaginationInfo(){const startIndex=(currentPage-1)*itemsPerPage+1;const endIndex=Math.min(currentPage*itemsPerPage,filteredData.length);const totalItems=filteredData.length;if(totalItems===0){paginationInfo.textContent='No results found'}else{paginationInfo.textContent=`Showing ${startIndex}-${endIndex} of ${totalItems} entries`}}})