const TREATY_TEMPLATES = {
    MDAP: {
        name: "Mutual Defense and Aggression Pact",
        articles: [
            {
                title: "Article I — Peace and Sovereignty",
                variations: [
                    "{ALLIANCE1} and {ALLIANCE2} recognize each other as two different alliances. Both shall abstain from any form of aggression against the other. Any mistakes or other issues between members shall be worked out between the parties.",
                    "{ALLIANCE1} and {ALLIANCE2} acknowledge each other as sovereign alliances. Neither shall engage in hostile actions against the other. Any disputes between members shall be resolved through diplomatic channels.",
                    "{ALLIANCE1} and {ALLIANCE2} respect each other's independence and territorial integrity. Both parties commit to peaceful coexistence and diplomatic resolution of conflicts.",
                    "This Mutual Defense Pact established between {ALLIANCE1} and {ALLIANCE2} aims to define the path towards social cohesion and mutual defense through the free movement of goods and people, as well as the establishment of commercial activities in the area, as well as the protection of both parties from external conflicts. This agreement defines the rights and obligations of the two contracting Parties for the collaboration period."
                ]
            },
            {
                title: "Article II — Mutual Defense, Mutual Respect",
                variations: [
                    "{ALLIANCE1} and {ALLIANCE2} agree that an attack against one is considered an attack against the other, and they are obligated to defend them. Should the engaged combatant alliance decide, they may refuse to activate this clause fully or at all, preferring instead to limit conflict as they see fit.",
                    "{ALLIANCE1} and {ALLIANCE2} pledge mutual defense against unprovoked aggression. Both parties are bound to provide military assistance when requested, though the defender may determine the scope of response.",
                    "An attack upon {ALLIANCE1} shall be considered an attack upon {ALLIANCE2}, and vice versa. Both alliances commit to immediate military response, subject to the discretion of the defending party.",
                    "{ALLIANCE1} undertakes to implement sustainable solutions oriented towards the definitive resolution of the protected status of {ALLIANCE2} from external parties, and to take part in activities to encourage populations concerned to create a culture of peace, tolerance, and cooperation. {ALLIANCE2} undertakes to implement sustainable solutions oriented towards the definitive resolution of the protected status of {ALLIANCE1} from external parties, and to take part in activities to encourage populations concerned to create a culture of peace, tolerance, and cooperation."
                ]
            },
            {
                title: "Article III — Aggression",
                variations: [
                    "Should either {ALLIANCE1} or {ALLIANCE2} initiate hostilities or get involved with conflict that is already taking place, the other may assist but has no obligation to do so.",
                    "In cases where {ALLIANCE1} or {ALLIANCE2} engages in offensive military action, the other party may provide support at their discretion but bears no mandatory obligation.",
                    "When either alliance pursues aggressive military action, the other may choose to participate but is not required to do so under this treaty.",
                    "{ALLIANCE1} and {ALLIANCE2} undertake to participate in the implementation of this Mutual Defense Pact and to provide their opposite populations human and material support. Both parties actively collaborate in securing regional stability and agree to not impede the free movement of goods and people in localities under their respective reigns."
                ]
            },
            {
                title: "Article IV — Disputes and Resolution",
                variations: [
                    "Any dispute relating to the interpretation of this Mutual Defense Pact or its implementation shall be resolved amicably or by any other method of settlement agreed upon by both parties. Any dispute addressed by either party shall be the subject of a live discussion in aim of a peaceful resolution.",
                    "All disagreements between {ALLIANCE1} and {ALLIANCE2} shall be addressed through diplomatic dialogue and peaceful negotiation, with both parties committed to finding mutually acceptable solutions.",
                    "Disputes arising from this agreement will be resolved through direct consultation between alliance leadership, with emphasis on maintaining the diplomatic relationship above all disagreements."
                ]
            },
            {
                title: "Article V — Duration and Termination",
                variations: [
                    "If either {ALLIANCE1} or {ALLIANCE2} decide to end this treaty, they may do so by providing private notice to the other and the treaty will end after 72 hours pass from that notice.",
                    "This treaty may be terminated by either party with 72 hours advance notice provided through private diplomatic channels.",
                    "Either {ALLIANCE1} or {ALLIANCE2} may withdraw from this agreement by giving 72 hours written notice to the other party.",
                    "This agreement comes into force on the date of signature and is in perpetuity, to be cancelled by either side with 30 days written notice."
                ]
            }
        ]
    },
    
    MDP: {
        name: "Mutual Defense Pact",
        articles: [
            {
                title: "Article I — Recognition and Respect",
                variations: [
                    "{ALLIANCE1} and {ALLIANCE2} recognize each other as sovereign alliances and pledge to maintain peaceful relations.",
                    "Both {ALLIANCE1} and {ALLIANCE2} acknowledge each other's legitimacy and commit to non-aggression.",
                    "{ALLIANCE1} and {ALLIANCE2} respect each other's independence and territorial claims."
                ]
            },
            {
                title: "Article II — Mutual Defense",
                variations: [
                    "An unprovoked attack against {ALLIANCE1} constitutes an attack against {ALLIANCE2}, and both parties are obligated to provide mutual defense.",
                    "{ALLIANCE1} and {ALLIANCE2} pledge to defend each other against external aggression with full military support.",
                    "Both alliances commit to immediate military assistance in the event of unprovoked attacks against either party."
                ]
            },
            {
                title: "Article III — Termination",
                variations: [
                    "This pact may be dissolved by either party with 48 hours advance notice.",
                    "Either alliance may terminate this agreement by providing 48 hours written notice to the other.",
                    "This treaty remains in effect until either party provides 48 hours notice of withdrawal."
                ]
            }
        ]
    },

    PIAT: {
        name: "Peace, Intelligence, and Aid Treaty",
        articles: [
            {
                title: "Article I — Peace",
                variations: [
                    "{ALLIANCE1} and {ALLIANCE2} agree to maintain peaceful relations and resolve disputes through diplomacy.",
                    "Both parties commit to non-aggression and peaceful coexistence.",
                    "{ALLIANCE1} and {ALLIANCE2} pledge to avoid conflict and pursue diplomatic solutions.",
                    "{ALLIANCE1} and {ALLIANCE2} hereby commit to mutual peace. Neither shall raise sword, sarcasm, nor sanction against the other. Disputes, should any arise, shall be resolved through dialogue, prayer, and ceremonial Platypus interpretive dance."
                ]
            },
            {
                title: "Article II — Intelligence",
                variations: [
                    "Both alliances agree to share relevant intelligence that may affect mutual security interests.",
                    "{ALLIANCE1} and {ALLIANCE2} commit to exchanging strategic information as deemed appropriate.",
                    "Intelligence sharing shall occur when it serves the mutual benefit of both parties.",
                    "Should either party receive news of plots, perils, or uprisings that may impact the other, they shall relay such intelligence swiftly and in good faith. Intelligence must be communicated clearly, preferably without riddles, unless the riddles are prophetically inspired or particularly amusing."
                ]
            },
            {
                title: "Article III — Aid",
                variations: [
                    "Economic and military aid may be provided between parties at their discretion.",
                    "{ALLIANCE1} and {ALLIANCE2} may offer assistance to each other as circumstances permit.",
                    "Both alliances may provide aid when requested and when resources allow."
                ]
            },
            {
                title: "Article IV — Duration",
                variations: [
                    "This treaty may be cancelled by either party with 24 hours notice.",
                    "Either alliance may withdraw from this agreement with 24 hours advance warning.",
                    "This pact remains active until terminated by either party with 24 hours notice."
                ]
            }
        ]
    },

    NAP: {
        name: "Non-Aggression Pact",
        articles: [
            {
                title: "Article I — Non-Aggression",
                variations: [
                    "{ALLIANCE1} and {ALLIANCE2} agree to refrain from any hostile actions against each other.",
                    "Both parties pledge not to engage in military conflict with one another.",
                    "{ALLIANCE1} and {ALLIANCE2} commit to peaceful coexistence and non-interference."
                ]
            },
            {
                title: "Article II — Cancellation",
                variations: [
                    "This pact may be terminated by either party with immediate effect upon notification.",
                    "Either alliance may end this agreement at any time with proper notice.",
                    "This non-aggression pact remains in effect until cancelled by either party."
                ]
            }
        ]
    },

    MDoAP: {
        name: "Mutual Defense and Optional Aggression Pact",
        articles: [
            {
                title: "Article I: Non-Aggression",
                variations: [
                    "Both {ALLIANCE1} and {ALLIANCE2} will hereafter refrain from any form of hostile activity, hereafter defined as military force, internal subversion or espionage of any kind, against the other.",
                    "{ALLIANCE1} and {ALLIANCE2} agree to cease all hostile activities, including but not limited to military action, covert operations, and espionage against each other.",
                    "Both signatories pledge to end the cold war between them, prohibiting military force, subversion, and intelligence operations against one another.",
                    "{ALLIANCE1} and {ALLIANCE2} acknowledge a shared respect for the pursuit of knowledge, self-improvement, and the betterment of society. Lines of communication shall be established and maintained for the fostering of mutual understanding and cooperation. Members of each party shall be encouraged to engage in respectful dialogue and collaboration on matters of common interest.",
                    "Both {ALLIANCE1} and {ALLIANCE2} agree that all of this, 100% of it, is Velocity's fault."
                ]
            },
            {
                title: "Article II: Mutual Respect",
                variations: [
                    "{ALLIANCE1} and {ALLIANCE2} pledge to show only respect and good will towards each other. While this will prohibit outright verbal hostility in all its forms, it will not restrict healthy debate or productive disagreement.",
                    "Both parties commit to maintaining respectful relations, avoiding verbal hostility while preserving the right to engage in constructive debate and diplomatic disagreement.",
                    "{ALLIANCE1} and {ALLIANCE2} agree to treat each other with respect and goodwill, prohibiting hostile rhetoric while allowing for healthy diplomatic discourse.",
                    "Both {ALLIANCE1} and {ALLIANCE2} agree that it is better to be homies and not rivals. As such, they agree to remain peaceful and share their alcohol with each other, and also their peyote."
                ]
            },
            {
                title: "Article III: Mutual Defense",
                variations: [
                    "Should either {ALLIANCE1} or {ALLIANCE2} be subject to an act of aggression, they are well within their rights to request military support, which the other signatory is obligated to provide.",
                    "In the event of unprovoked attack against either party, the threatened alliance may request mandatory military assistance from their treaty partner.",
                    "Both {ALLIANCE1} and {ALLIANCE2} are obligated to provide military defense when requested by the other in cases of external aggression.",
                    "In the event of an unprovoked attack upon the legitimate interests or sovereignty of either {ALLIANCE1} or {ALLIANCE2}, the other party shall offer its full diplomatic support and condemnation of the aggressor. Should diplomatic efforts fail, and either party suffers a direct assault, the other party agrees to provide material aid and assistance, including direct military intervention, at its own discretion. The nature and extent of such assistance will be determined through mutual consultation between the leadership of {ALLIANCE1} and {ALLIANCE2}.",
                    "Both {ALLIANCE1} and {ALLIANCE2} agree that if you attack their homies, they are coming for you. Unless specifically told otherwise, both parties agree that they will come to their homies aid within 72 hours. A violation of this Article makes this treaty null and void."
                ]
            },
            {
                title: "Article IV: Optional Aggression",
                variations: [
                    "Should either {ALLIANCE1} or {ALLIANCE2} find it necessary to commit an act of aggression upon a third party, they may request military support from the other signatory, though this request is under no circumstances an obligation.",
                    "When either party initiates offensive military action, they may seek voluntary military assistance from their treaty partner, though such support is not mandatory.",
                    "In cases of aggressive action by either {ALLIANCE1} or {ALLIANCE2}, military aid may be requested but is not required from the other party.",
                    "In the event of a clear and present danger posed by a third party that threatens the fundamental principles enshrined in the constitutions of both {ALLIANCE1} and {ALLIANCE2}, this pact allows for a joint response aimed at neutralizing said threat.",
                    "Both {ALLIANCE1} and {ALLIANCE2} agree that if their homies go to war, they are more than happy to share in killing all humans with each other, but this is not required. If their homies end up at war with the homies of their homies, then they do not have to get involved."
                ]
            },
            {
                title: "Article V: Aid",
                variations: [
                    "Should either {ALLIANCE1} or {ALLIANCE2} come into need of political or financial aid, they may request such support as is necessary from the other signatory. It is recognized, however, that this request is in no way an obligation.",
                    "Both parties may request political or economic assistance from each other during times of need, though such aid is provided at the discretion of the supporting alliance.",
                    "When either {ALLIANCE1} or {ALLIANCE2} requires political or financial support, they may make such requests, understanding that compliance is voluntary."
                ]
            },
            {
                title: "Article VI: Intelligence Sharing",
                variations: [
                    "Should vital knowledge of a political or military nature come to the attention of one signatory, they are required to share it with the other.",
                    "Both {ALLIANCE1} and {ALLIANCE2} are obligated to share critical political and military intelligence that may affect their mutual interests.",
                    "Any vital political or military information discovered by either party must be shared with their treaty partner.",
                    "Regular communication channels shall be established between {ALLIANCE1} and {ALLIANCE2} to ensure transparency and timely exchange of information. Any disagreements arising from the interpretation or implementation of this pact shall be resolved through good faith negotiations and mediation efforts.",
                    "Both {ALLIANCE1} and {ALLIANCE2} agree that they will share all intelligence regarding the other with each other. A violation of this Article makes this treaty null and void."
                ]
            },
            {
                title: "Article VII: Cancellation",
                variations: [
                    "It is the hope of both {ALLIANCE1} and {ALLIANCE2} that this pact may last forever, or until the bond it represents grows to the point where an upgrade is merited. Given the uncertainties of the future, however, it is recognized that should any of the above Articles be violated, or should some major irreparable disagreement arise, that this pact may be canceled after 72 hours notice.",
                    "This treaty shall remain in effect indefinitely, with hopes for future strengthening of relations, but may be terminated by either party with 72 hours notice in cases of violation or irreconcilable differences.",
                    "Both parties hope this agreement will endure and potentially evolve into stronger ties, while acknowledging that it may be cancelled with 72 hours notice if articles are violated or major disputes arise.",
                    "This pact shall come into effect upon the signing by the duly authorized representatives of {ALLIANCE1} and {ALLIANCE2}. This pact may be terminated by either party upon two (2) weeks written notice to the other party.",
                    "Both {ALLIANCE1} and {ALLIANCE2} agree that if either homie wants to cancel this treaty, then a 72 hour notice is required."
                ]
            }
        ]
    },

    ODAP: {
        name: "Optional Defense and Aggression Pact",
        articles: [
            {
                title: "Article I: Sovereignty",
                variations: [
                    "Both {ALLIANCE1} and {ALLIANCE2} recognize the Sovereignty of the other and hereby agree not to interfere in the conduct of Governance, or affairs of either party.",
                    "{ALLIANCE1} and {ALLIANCE2} acknowledge each other's sovereign rights and pledge non-interference in internal governance and domestic affairs.",
                    "Both parties respect the complete sovereignty of the other and commit to avoiding interference in governmental matters or internal alliance affairs.",
                    "{ALLIANCE1} and {ALLIANCE2} agree to share all relevant information with one another in a timely manner.",
                    "Both parties commit to exchanging intelligence and strategic information that may be of mutual interest or concern.",
                    "{ALLIANCE1} and {ALLIANCE2} may share info as needed."
                ]
            },
            {
                title: "Article II: Non-Aggression",
                variations: [
                    "{ALLIANCE1} and {ALLIANCE2} agree to refrain from engaging in all hostilities against one another.",
                    "Both parties pledge to avoid all forms of military conflict and aggressive action against each other.",
                    "{ALLIANCE1} and {ALLIANCE2} commit to maintaining peaceful relations and abstaining from hostile activities.",
                    "{ALLIANCE1} and {ALLIANCE2} agree to provide each other with aid as needed upon request.",
                    "Both parties pledge to offer assistance to one another when circumstances require and resources permit.",
                    "{ALLIANCE1} and {ALLIANCE2} agree not to attack each other for any reason."
                ]
            },
            {
                title: "Article III: Aid",
                variations: [
                    "In the event that either {ALLIANCE1} or {ALLIANCE2} find themselves in the position to aid the other party, both agree to do what is necessary to ensure the Financial and Diplomatic stability of the other.",
                    "When circumstances permit, both parties agree to provide financial and diplomatic assistance to maintain each other's stability and prosperity.",
                    "{ALLIANCE1} and {ALLIANCE2} commit to supporting each other's economic and diplomatic well-being when able to do so.",
                    "{ALLIANCE1} and {ALLIANCE2} agree to provide each other with aid as needed upon request.",
                    "Both alliances pledge mutual assistance in times of need, whether economic, diplomatic, or otherwise.",
                    "{ALLIANCE1} and {ALLIANCE2} may provide each other with aid as needed upon request."
                ]
            },
            {
                title: "Article IV: Optional Defense",
                variations: [
                    "If one party finds themselves being attacked, the other signatory is encouraged, but not required, to come to their defense.",
                    "In cases of unprovoked aggression against either {ALLIANCE1} or {ALLIANCE2}, military assistance may be provided at the discretion of the other party.",
                    "When either alliance faces external attack, defensive support is welcomed but remains voluntary for the treaty partner.",
                    "{ALLIANCE1} and {ALLIANCE2} may respond militarily to defend one another if attacked.",
                    "Both parties reserve the right to provide military defense when the other faces unprovoked aggression, though such response is optional.",
                    "{ALLIANCE1} and {ALLIANCE2} may provide each other with defensive military assistance upon request."
                ]
            },
            {
                title: "Article V: Optional Aggression",
                variations: [
                    "If one party is conducting aggressive warfare on another party, the other may, but is not required, to join in.",
                    "When either {ALLIANCE1} or {ALLIANCE2} initiates offensive military action, participation by the other party is optional and voluntary.",
                    "Aggressive military campaigns by either alliance may receive support from the other, though such assistance is not mandatory.",
                    "{ALLIANCE1} and {ALLIANCE2} may assist each other militarily if one attacks another alliance.",
                    "Both parties may choose to provide military support when the other engages in offensive operations, but such participation remains discretionary.",
                    "{ALLIANCE1} and {ALLIANCE2} may provide each other with aggressive military assistance upon request."
                ]
            },
            {
                title: "Article VI: Cancellation",
                variations: [
                    "In the event that either party no longer feels this document aligns with their current goals, termination of this document may take place within 48 hours after notification to the other party.",
                    "This agreement may be terminated by either {ALLIANCE1} or {ALLIANCE2} with 48 hours advance notice if it no longer serves their interests.",
                    "Should this pact cease to align with either party's objectives, it may be dissolved with 48 hours written notice.",
                    "Either {ALLIANCE1} or {ALLIANCE2} may terminate this treaty with at least 72 hours of advance notice to the other signatory.",
                    "This treaty may be cancelled by either party with 72 hours written notice, allowing for proper diplomatic closure.",
                    "Either {ALLIANCE1} or {ALLIANCE2} may destroy this agreement with at least 72 hours of advance notice to the other signatory."
                ]
            }
        ]
    },

    Protectorate: {
        name: "Protectorate Agreement",
        articles: [
            {
                title: "Article I: Sovereignty",
                variations: [
                    "{ALLIANCE2} shall remain a sovereign alliance, governing its internal affairs without interference from {ALLIANCE1}. However, {ALLIANCE2} acknowledges {ALLIANCE1} as their primary protectors and shall consult with them on matters of defense and foreign affairs that may impact the security of both alliances.",
                    "{ALLIANCE2} retains full internal sovereignty while recognizing {ALLIANCE1} as their protector. {ALLIANCE2} agrees to consult {ALLIANCE1} on defense matters and foreign policy decisions that could affect mutual security.",
                    "While {ALLIANCE2} maintains sovereign control over internal governance, they acknowledge {ALLIANCE1} as their protective partner and commit to consultation on defense and diplomatic matters affecting both parties."
                ]
            },
            {
                title: "Article II: Protection and Defense",
                variations: [
                    "{ALLIANCE1} commits to defending {ALLIANCE2} against acts of aggression from external threats. Any attack on {ALLIANCE2} shall be considered an attack on {ALLIANCE1}, warranting appropriate retaliation and diplomatic measures. {ALLIANCE2} shall not engage in aggressive wars without prior consultation and approval from {ALLIANCE1}.",
                    "{ALLIANCE1} pledges full military protection to {ALLIANCE2} against unprovoked aggression. Attacks against {ALLIANCE2} will be treated as attacks against {ALLIANCE1}. {ALLIANCE2} must seek approval from {ALLIANCE1} before initiating offensive military actions.",
                    "{ALLIANCE1} guarantees the defense of {ALLIANCE2} from external threats, treating any assault on {ALLIANCE2} as an assault on themselves. {ALLIANCE2} agrees not to pursue aggressive warfare without {ALLIANCE1}'s prior consent."
                ]
            },
            {
                title: "Article III: Economic Cooperation",
                variations: [
                    "{ALLIANCE1} shall have the first rights on all technology deals conducted by {ALLIANCE2}. {ALLIANCE2} shall make reasonable efforts to facilitate economic partnerships, trade, and aid between both alliances.",
                    "{ALLIANCE2} grants {ALLIANCE1} priority access to technology transfers and commits to promoting trade relationships and economic cooperation between the alliances.",
                    "{ALLIANCE1} receives preferential treatment in all technology agreements with {ALLIANCE2}, who will actively work to enhance economic ties and facilitate beneficial trade arrangements."
                ]
            },
            {
                title: "Article IV: Intelligence Sharing",
                variations: [
                    "Both parties agree to share intelligence related to security threats and potential risks affecting either alliance. Neither party shall withhold critical information that may impact the well-being of the other.",
                    "{ALLIANCE1} and {ALLIANCE2} commit to full intelligence cooperation, sharing all security-related information that could affect either party's safety and interests.",
                    "Both alliances pledge complete transparency in intelligence matters, ensuring that critical security information is shared promptly and without reservation."
                ]
            },
            {
                title: "Article V: Duration and Termination",
                variations: [
                    "This Agreement shall remain in effect until mutually dissolved by both parties. Either party may terminate this Agreement with a 72-hour notice, provided that diplomatic discussions have been exhausted. If {ALLIANCE2} violates the terms outlined in this Agreement, {ALLIANCE1} may terminate protection without prior notice.",
                    "This protectorate arrangement continues indefinitely until both parties agree to dissolution. Standard termination requires 72 hours notice after diplomatic efforts, though {ALLIANCE1} may immediately withdraw protection if {ALLIANCE2} breaches the agreement.",
                    "The agreement remains active until mutual termination or until {ALLIANCE2} violates its terms, allowing {ALLIANCE1} to end protection immediately. Normal termination requires 72-hour notice following exhausted diplomatic channels."
                ]
            }
        ]
    }
};

const MEME_TREATIES = {
    "Friendship Pact": {
        name: "Treaty of Eternal Friendship and Definitely Not Backstabbing",
        articles: [
            {
                title: "Article I — Friendship",
                variations: [
                    "{ALLIANCE1} and {ALLIANCE2} pinky promise to be best friends forever and ever (until someone gets bored).",
                    "Both alliances agree that they are totally BFFs and would never, ever betray each other (wink wink).",
                    "{ALLIANCE1} and {ALLIANCE2} solemnly swear they are up to only good things together."
                ]
            }
        ]
    },
    
    "Meme Defense Pact": {
        name: "Mutual Meme Defense Pact",
        articles: [
            {
                title: "Article I — Meme Defense",
                variations: [
                    "{ALLIANCE1} and {ALLIANCE2} agree to defend each other's honor in Discord arguments and forum flame wars.",
                    "Both parties pledge to upvote each other's posts and defend against mean comments.",
                    "An attack on {ALLIANCE1}'s memes is an attack on {ALLIANCE2}'s memes."
                ]
            }
        ]
    }
};

function getRandomTreatyType() {
    const types = Object.keys(TREATY_TEMPLATES);
    return types[Math.floor(Math.random() * types.length)];
}

function generateTreaty(treatyType, alliance1, alliance2, useMemes = false) {
    const templates = useMemes && Math.random() < 0.3 ? MEME_TREATIES : TREATY_TEMPLATES;
    const treaty = templates[treatyType];
    
    if (!treaty) {
        return null;
    }
    
    let result = `${treaty.name}\n\nBetween ${alliance1} and ${alliance2}\n\n`;
    
    treaty.articles.forEach(article => {
        const variation = article.variations[Math.floor(Math.random() * article.variations.length)];
        const text = variation
            .replace(/{ALLIANCE1}/g, alliance1)
            .replace(/{ALLIANCE2}/g, alliance2);
        
        result += `${article.title}\n\n${text}\n\n`;
    });
    
    return result.trim();
}
