const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./data/champions.json', 'utf8'));

let tierChanges = 0, gemChanges = 0, buildChanges = 0;

// ── HELPERS ─────────────────────────────────────────────────────────────────
function champ(name) {
  return data.find(c => c.name === name);
}
function role(champName, roleName) {
  const c = champ(champName);
  return c ? c.roles.find(r => r.role === roleName) : null;
}
function setTier(champName, roleName, tier, reason) {
  const rd = role(champName, roleName);
  if (!rd) { console.log(`SKIP: ${champName}[${roleName}]`); return; }
  const old = rd.tier;
  rd.tier = tier;
  tierChanges++;
  console.log(`✓ TIER  ${champName}[${roleName}]: ${old} → ${tier}  — ${reason}`);
}
function addGem(champName, roleName, es, en) {
  const rd = role(champName, roleName);
  if (!rd) { console.log(`SKIP: ${champName}[${roleName}]`); return; }
  rd.hiddenGem = true;
  rd.hiddenGemNote = { es, en };
  gemChanges++;
  console.log(`✓ GEM+  ${champName}[${roleName}] (${rd.tier})`);
}
function removeGem(champName, roleName) {
  const rd = role(champName, roleName);
  if (!rd || !rd.hiddenGem) { console.log(`SKIP-GEM: ${champName}[${roleName}]`); return; }
  rd.hiddenGem = false;
  delete rd.hiddenGemNote;
  gemChanges++;
  console.log(`✓ GEM-  ${champName}[${roleName}]`);
}
function addSit(champName, roleName, es, en) {
  const rd = role(champName, roleName);
  if (!rd) { console.log(`SKIP: ${champName}[${roleName}]`); return; }
  rd.situational = rd.situational || [];
  rd.situational.push({ es, en });
  buildChanges++;
  console.log(`✓ SIT   ${champName}[${roleName}]: +sit note`);
}
function addSitItem(champName, roleName, item) {
  const rd = role(champName, roleName);
  if (!rd) { console.log(`SKIP: ${champName}[${roleName}]`); return; }
  rd.build.sit = rd.build.sit || [];
  if (!rd.build.sit.includes(item)) {
    rd.build.sit.push(item);
    buildChanges++;
    console.log(`✓ ITEM  ${champName}[${roleName}]: +${item}`);
  }
}
function updateBuildNote(champName, roleName, appendEs, appendEn) {
  const rd = role(champName, roleName);
  if (!rd) return;
  rd.buildNote = rd.buildNote || { es: '', en: '' };
  rd.buildNote.es = (rd.buildNote.es ? rd.buildNote.es + ' ' : '') + appendEs;
  rd.buildNote.en = (rd.buildNote.en ? rd.buildNote.en + ' ' : '') + appendEn;
  buildChanges++;
}

// ────────────────────────────────────────────────────────────────────────────
// 1. TIER CHANGES — Patch 7.2 impact
// ────────────────────────────────────────────────────────────────────────────
console.log('\n── Tier Changes ──');

// Phase Rush nerf: AH 25→10, ranged MS nerfed, CD 12s→21-7s (worse early)
setTier('Hecarim', 'jgl', 's',  'Phase Rush pierde 15 AH y CD sube a 21s early → su spam de Q y ganks early se debilitan. SS→S');
setTier('Lillia',  'jgl', 'b',  'Phase Rush ranged MS 30-50%→20-35% + AH 25→10 destruye su kit de kite. La movilidad era su identidad. A→B');

// AP item buffs: Rabadon's +30 AP, Luden's +15 AP, Void Staff buffed, Arcane Comet synergy
setTier('Lux',    'mid', 's',  'Luden\'s +15 AP + Rabadon\'s +30 AP + Void Staff buff → escala absurda. A→S');
setTier('Veigar', 'mid', 's',  'Hyperscaler AP: Rabadon\'s +30 AP en late = daño imposible. Void Staff + Horizon Focus buffed. A→S');

// Zyra: plants inherit Magic Pen → huge buff
setTier('Zyra',   'sup', 's',  'Plants now inherit Magic Pen — con Void Staff/Cryptbloom destruye tanks. A→S (deja de ser joya)');

// Kayle: Dusk and Dawn new item (70 AP, 350 HP, 20 AH, 25% AS) perfectly suits her hybrid kit
setTier('Kayle',  'top', 'a',  'Dusk and Dawn (AP+AS+HP) es su ítem ideal — cubre exactamente lo que necesitaba. B→A');

// ────────────────────────────────────────────────────────────────────────────
// 2. HIDDEN GEM CHANGES
// ────────────────────────────────────────────────────────────────────────────
console.log('\n── Hidden Gem Changes ──');

// Remove: Yasuo[mid] D tier — D tier no puede ser SSS potential, está roto post-7.2
removeGem('Yasuo', 'mid');

// Remove: Zyra[sup] — sube a S tier, ya no es "oculta"
removeGem('Zyra', 'sup');

// Add: Irelia[mid] — A tier, en las manos correctas es el mid más devastador del juego
addGem('Irelia', 'mid',
  'La mid más ignorada con el techo más alto. Sus resets de Q en teamfight son literalmente ilimitados si mata — puede limpiar al equipo rival entera empezando desde cualquier objetivo. Construida con Conqueror + Riftmaker hace daño verdadero en pelea extendida. La mayoría la juega mal (sin resets) — quienes la dominan convierten cualquier teamfight en un 1v5 ganado.',
  'The most ignored mid with the highest ceiling. Her Q resets in teamfights are literally unlimited if she gets kills — she can clean the entire enemy team starting from any target. Built with Conqueror + Riftmaker she deals true damage in extended fights. Most players use her wrong (no resets) — those who master her turn any teamfight into a won 1v5.'
);

// Add: Morgana[sup] — A tier, Black Shield completely shuts down engage meta
addGem('Morgana', 'sup',
  'El counter absoluto del meta de engage que nadie juega. Su Escudo Negro hace que los CC de Leona, Nautilus, Braum y Thresh sean literalmente inútiles — un ADC con Escudo Negro es inmune al engage. En late, su ult con empowerado encadena a todos los rivales si tiene Flash o ya está entre ellos. Requiere timing perfecto del escudo — darlo tarde o al objetivo equivocado la hace inútil.',
  'The absolute counter to the engage meta that nobody plays. Her Black Shield makes the CC from Leona, Nautilus, Braum, and Thresh literally useless — an ADC with Black Shield is immune to engage. In late, her empowered ult chains all nearby enemies when she already has Flash or is positioned between them. Requires perfect shield timing — giving it late or to the wrong target makes her useless.'
);

// ────────────────────────────────────────────────────────────────────────────
// 3. BUILD ADDITIONS — New 7.2 items
// ────────────────────────────────────────────────────────────────────────────
console.log('\n── Build Additions ──');

// Dusk and Dawn: 3100g — 70 AP, 350 HP, 20 AH, 25% AS → perfect for AP/AS hybrids
addSitItem('Kayle',   'top', 'Dusk and Dawn');
addSitItem('Kog\'Maw', 'adc', 'Dusk and Dawn');
addSitItem('Teemo',   'top', 'Dusk and Dawn');

// Seraph's Embrace: AP 35→60 (huge buff) — situational for sustained late-game mages
addSitItem('Lux',    'mid', "Seraph's Embrace");
addSitItem('Viktor', 'mid', "Seraph's Embrace");

// Void Amethyst: new 1000g component (20 AP, 10% Magic Pen Rate)
// Already handled implicitly through Void Staff build paths

// Dusk and Dawn situational notes
addSit('Kayle', 'top',
  'Dusk and Dawn en partidas largas: da 70 AP + 25% AS + 350 HP — cubre exactamente sus tres stats clave en un solo ítem. Reemplaza Lich Bane cuando el rival tiene mucho HP y necesitas los básicos potenciados más rápido.',
  'Dusk and Dawn in long games: gives 70 AP + 25% AS + 350 HP — covers exactly her three key stats in one item. Replaces Lich Bane when the enemy has too much HP and you need empowered basics faster.'
);
addSit('Kog\'Maw', 'adc',
  'Dusk and Dawn (3100g): 70 AP + 25% AS + 350 HP en un ítem — acelera su build on-hit AP significativamente. Segundo ítem en lugar de Guinsoo si el rival es squishier y necesitas the AS burst.',
  'Dusk and Dawn (3100g): 70 AP + 25% AS + 350 HP in one item — significantly accelerates his AP on-hit build. Second item instead of Guinsoo if enemies are squishier and you need the AS burst.'
);
addSit('Teemo', 'top',
  'Dusk and Dawn (3100g): complementa perfectamente su kit (AS para shrooms + AP para veneno). Ítem situacional cuando el rival tiene mucho HP y necesitas más burst de básicos envenenados.',
  'Dusk and Dawn (3100g): perfectly complements his kit (AS for shrooms + AP for poison). Situational item when the enemy has lots of HP and you need more burst from poisoned basics.'
);

// Seraph's notes
addSit('Lux', 'mid',
  "Seraph's Embrace (60 AP, 25 AH) post-7.2: buffeado masivamente (+25 AP). Segundo ítem si la partida va a ser larga y necesitas AP sustain con mana infinito. Core build alternativa para full late-game scaling.",
  "Seraph's Embrace (60 AP, 25 AH) post-7.2: massively buffed (+25 AP). Second item if the game will go long and you need AP sustain with infinite mana. Alternative core for full late-game scaling."
);
addSit('Viktor', 'mid',
  "Seraph's Embrace (60 AP, 25 AH) ahora da +25 AP extra post-7.2. Tercer ítem situacional cuando la partida va muy larga y ya tienes todo el mana que necesitas de tu build core.",
  "Seraph's Embrace (60 AP, 25 AH) now gives +25 extra AP post-7.2. Situational third item when the game goes very long and you already have all the mana you need from your core build."
);

// ────────────────────────────────────────────────────────────────────────────
// 4. BUILD NOTES — Tier 3 boots upgrade references
//    (Solo los campeones donde el upgrade es más impactante)
// ────────────────────────────────────────────────────────────────────────────
console.log('\n── Boot T3 Build Notes ──');

// Key champions where T3 boots have outsized impact
const bootNotes = [
  // ADC Berserker's → Gunmetal Greaves (+Physical Vamp makes them self-sustain)
  ['Jinx',         'adc', 'Upgrade: Gunmetal Greaves (2200g) cuando tengas 3 ítems core — el Physical Vamp te da sustain en teamfight.', 'Upgrade: Gunmetal Greaves (2200g) once you have 3 core items — Physical Vamp gives teamfight sustain.'],
  ['Caitlyn',      'adc', 'Upgrade: Gunmetal Greaves (2200g) en late game para Physical Vamp y más AS.', 'Upgrade: Gunmetal Greaves (2200g) in late game for Physical Vamp and more AS.'],
  ['Kai\'Sa',      'adc', 'Upgrade: Gunmetal Greaves (2200g) en late — Physical Vamp la hace más difícil de matar en dives.', "Upgrade: Gunmetal Greaves (2200g) in late — Physical Vamp makes her harder to kill during dives."],
  ['Varus',        'adc', 'Upgrade: Gunmetal Greaves (2200g) para Physical Vamp en teamfight — complementa su necesidad de mantenerse vivo mientras canaliza R.', 'Upgrade: Gunmetal Greaves (2200g) for Physical Vamp in teamfight — complements his need to stay alive while channeling R.'],
  // Mid/AP Sorcerer's → Spellslinger's Shoes (+18 Magic Pen, 8% Magic Pen Rate = enorme)
  ['Orianna',      'mid', 'Upgrade: Spellslinger\'s Shoes (2200g) — añade 18 Magic Pen plana + 8% pen rate. Aumenta su daño de bola masivamente en late.', "Upgrade: Spellslinger's Shoes (2200g) — adds 18 flat Magic Pen + 8% pen rate. Massively increases ball damage in late."],
  ['Syndra',       'mid', 'Upgrade: Spellslinger\'s Shoes (2200g) — la penetración extra hace que su R sea aún más difícil de absorber.', "Upgrade: Spellslinger's Shoes (2200g) — the extra pen makes her R even harder to absorb."],
  ['Lux',          'mid', 'Upgrade: Spellslinger\'s Shoes (2200g) — 18 pen + 8% rate encajan perfecto con su rol de poke/burst de largo rango.', "Upgrade: Spellslinger's Shoes (2200g) — 18 pen + 8% rate fit perfectly with her long-range poke/burst role."],
  ['Annie',        'mid', 'Upgrade: Spellslinger\'s Shoes (2200g) — la penetración extra hace que Tibbers (que ya hereda Magic Pen) sea aún más devastador.', "Upgrade: Spellslinger's Shoes (2200g) — extra pen makes Tibbers (which already inherits Magic Pen) even more devastating."],
  ['Diana',        'jgl', 'Upgrade: Spellslinger\'s Shoes (2200g) — penetración mágica para sus dives AP, especialmente potente con Electrocute + Rabadon\'s.', "Upgrade: Spellslinger's Shoes (2200g) — magic pen for her AP dives, especially potent with Electrocute + Rabadon's."],
  // Tank/Fighter Plated → Armored Advance (+150 HP, +35 Armor)
  ['Darius',       'top', 'Upgrade: Armored Advance (2200g) en late — 150 HP + 35 Armor lo convierte en un muro aún más imposible de derribar.', 'Upgrade: Armored Advance (2200g) in late — 150 HP + 35 Armor makes him an even more impossible wall to bring down.'],
  ['Skarner',      'jgl', 'Upgrade: Armored Advance (2200g) — 150 HP + 35 Armor adicional encaja perfecto con su build tanque.', 'Upgrade: Armored Advance (2200g) — 150 HP + 35 Armor additional fits perfectly with his tank build.'],
  ['Ornn',         'top', 'Upgrade: Armored Advance (2200g) — su pasivo amplifica los stats del upgrade.', 'Upgrade: Armored Advance (2200g) — his passive amplifies the stats of the upgrade.'],
  ['Malphite',     'top', 'Upgrade: Armored Advance (2200g) — más armor = más daño de pasivo. Sube su scaling absurdamente.', 'Upgrade: Armored Advance (2200g) — more armor = more passive damage. Scales his kit absurdly.'],
  // Ionian → Crimson Lucidity (75% Mana Regen, 25 AH = enorme para encantadores y CC tanks)
  ['Thresh',       'sup', 'Upgrade: Crimson Lucidity (2000g) — 25 AH adicional reduce CDs de Q y E a niveles de spam constante.', 'Upgrade: Crimson Lucidity (2000g) — 25 extra AH reduces Q and E CDs to constant-spam levels.'],
  ['Leona',        'sup', 'Upgrade: Crimson Lucidity (2000g) — 25 AH hace que pueda iniciar peleas con Q+W+E+R mucho más seguido.', 'Upgrade: Crimson Lucidity (2000g) — 25 AH lets her engage with Q+W+E+R much more frequently.'],
  ['Jhin',         'adc', 'Upgrade: Crimson Lucidity (2000g) — AH reduce CD de W y R significativamente, más oportunidades de trampas y ult.', 'Upgrade: Crimson Lucidity (2000g) — AH significantly reduces W and R CD, more trap and ult opportunities.'],
  ['Akali',        'mid', 'Upgrade: Crimson Lucidity (2000g) — Akali es resource-free pero el AH acelera su rotación de habilidades completa.', 'Upgrade: Crimson Lucidity (2000g) — Akali is resource-free but the AH speeds up her full skill rotation.'],
];

bootNotes.forEach(([name, roleKey, appendEs, appendEn]) => {
  const rd = role(name, roleKey);
  if (!rd) { console.log(`SKIP boot note: ${name}[${roleKey}]`); return; }
  rd.buildNote = rd.buildNote || { es: '', en: '' };
  const sep = rd.buildNote.es ? ' ' : '';
  rd.buildNote.es += sep + appendEs;
  rd.buildNote.en += sep + appendEn;
  buildChanges++;
  console.log(`✓ BOOT  ${name}[${roleKey}]: T3 note added`);
});

// ────────────────────────────────────────────────────────────────────────────
// SAVE
// ────────────────────────────────────────────────────────────────────────────
fs.writeFileSync('./data/champions.json', JSON.stringify(data, null, 2), 'utf8');

console.log(`
══════════════════════════════════════════
  Tier changes:  ${tierChanges}
  Gem changes:   ${gemChanges}
  Build changes: ${buildChanges}
  Total:         ${tierChanges + gemChanges + buildChanges}
══════════════════════════════════════════`);

// Verify gems per role
console.log('\n── Gems per role ──');
['top','jgl','mid','adc','sup'].forEach(r => {
  const gems = data.filter(c => c.roles.some(rd => rd.role===r && rd.hiddenGem));
  console.log(`  ${r}: ${gems.length} — ${gems.map(c=>c.name+'('+c.roles.find(rd=>rd.role===r).tier+')').join(', ')}`);
});
