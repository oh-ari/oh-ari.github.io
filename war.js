const WAR_TEMPLATES = {
    STANDARD_DECLARATION: {
        name: "War Declaration",
        formats: [
            "{ALLIANCE1} hereby declares war on {ALLIANCE2} for {REASON}.",
            "{ALLIANCE1} hereby recognizes a state of war with {ALLIANCE2} for {REASON}.",
            "The leadership of {ALLIANCE1} formally declares war upon {ALLIANCE2} for {REASON}.",
            "{ALLIANCE1} announces the commencement of hostilities against {ALLIANCE2} for {REASON}.",
            "By decree of {ALLIANCE1}, we hereby declare war on {ALLIANCE2} for {REASON}."
        ]
    },
    
    DEFENSE_DECLARATION: {
        name: "Defensive War Declaration", 
        formats: [
            "{ALLIANCE1} hereby declares war on {ALLIANCE2} in defense of {DEFENSE_TARGET}.",
            "{ALLIANCE1} hereby recognizes a state of war with {ALLIANCE2} in defense of {DEFENSE_TARGET}.",
            "The leadership of {ALLIANCE1} formally declares war upon {ALLIANCE2} in defense of {DEFENSE_TARGET}.",
            "{ALLIANCE1} announces the commencement of hostilities against {ALLIANCE2} in defense of {DEFENSE_TARGET}.",
            "By decree of {ALLIANCE1}, we hereby declare war on {ALLIANCE2} in defense of {DEFENSE_TARGET}."
        ]
    }
};

const WAR_REASONS = [
    "suspected spy operations",
    "the Majik Doctrine",
    "infiltration attempts",
    "poaching our members",
    "unauthorized recruitment efforts",
    "filling rogue slots",
    "a general dispute",
    "1v1",
    "brat summer",
    "Majik says hello",
    "Skulls for the Skull Throne",
    "Blood for the Blood God",
    "blame Velocity",
    "blame Smitty256",
    "Bad Tyga",
    "nothing lol",
    "Peace Mode",
    "the mcrib is back!",
    "the war boner",
    "A-O Lessgo",
    "shaking the rust off",
    "defending Legion",
    "harboring rogue nations",
    "providing safe haven to rogues",
    "refusing to expel rogue members",
    "supporting rogue activities",
    "OOC attacks on our members",
    "personal attacks against our leadership",
    "inappropriate conduct toward our alliance",
    "violations of diplomatic conduct",
    "staining our alliance flag",
    "insulting our alliance colors",
    "mocking our glorious leadership",
    "using Comic Sans in diplomatic correspondence",
    "sending us unsolicited pizza offers",
    "refusing to acknowledge our superiority",
    "questioning our fashion choices",
    "suggesting pineapple belongs on pizza",
    "using inferior memes in negotiations",
    "playing music too loudly during diplomatic meetings",
    "parking in our reserved spot",
    "leaving the diplomatic toilet seat up",
    "eating the last donut at the peace conference",
    "unprovoked aggression",
    "treaty violations",
    "breach of diplomatic agreements", 
    "attacks on our allies",
    "violation of sovereign territory",
    "spreading false propaganda",
    "interfering in our internal affairs",
    "supporting terrorist activities",
    "reasons that seemed important at the time",
    "because the RNG gods demanded it",
    "Tuesday being particularly annoying",
    "refusing to acknowledge Dave as the one true Dave",
    "existing while we had nothing better to do",
    "having a stupid face (allegedly)",
    "crimes against good taste in forum signatures",
    "casualties",
    "copying our flag",
    "sitting too long on a CB",
    "impacting our daily login bonus"
];

function getRandomWarFormat() {
    const templates = Object.keys(WAR_TEMPLATES);
    return templates[Math.floor(Math.random() * templates.length)];
}

function getRandomWarReason() {
    return WAR_REASONS[Math.floor(Math.random() * WAR_REASONS.length)];
}

function generateWarDeclaration(alliance1, alliance2, otherAlliances = []) {
    const useDefense = Math.random() < 0.3 && otherAlliances.length > 0;
    
    if (useDefense) {
        const template = WAR_TEMPLATES.DEFENSE_DECLARATION;
        const format = template.formats[Math.floor(Math.random() * template.formats.length)];
        const defenseTarget = otherAlliances[Math.floor(Math.random() * otherAlliances.length)];
        
        return format
            .replace(/{ALLIANCE1}/g, alliance1)
            .replace(/{ALLIANCE2}/g, alliance2)
            .replace(/{DEFENSE_TARGET}/g, defenseTarget);
    } else {
        const template = WAR_TEMPLATES.STANDARD_DECLARATION;
        const format = template.formats[Math.floor(Math.random() * template.formats.length)];
        const reason = getRandomWarReason();
        
        return format
            .replace(/{ALLIANCE1}/g, alliance1)
            .replace(/{ALLIANCE2}/g, alliance2)
            .replace(/{REASON}/g, reason);
    }
}

function generateFullWarDeclaration(alliance1, alliance2, otherAlliances = []) {
    return generateWarDeclaration(alliance1, alliance2, otherAlliances);
}
