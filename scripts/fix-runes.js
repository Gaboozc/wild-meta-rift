const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./data/champions.json', 'utf8'));

// Classification for Aftershock keystone replacement
const ICE_OVERLORD = new Set([
  // CC-based engage tanks/supports
  'Alistar','Blitzcrank','Braum','Leona','Rell','Skarner','Nautilus','Thresh','Malphite'
]);
const GUARDIAN_KEY = new Set([
  'Rakan','Lulu','Karma'
]);
// Everyone else → Grasp of the Undying
// Exception: mages who had Aftershock → Arcane Comet
const ARCANE_COMET_KEY = new Set(['Galio','Lissandra']);

// Conditioning primary replacement
// primary[0] or primary[1] → Bone Plating (most cases) or Overgrowth for big tanks
const OVERGROWTH_COND = new Set(['Skarner','Mordekaiser','Sion','Ornn','Volibear','Nasus','Maokai']);

// Presence of Mind secondary replacement by category
const POM_EYEBALL = new Set([
  // ADCs and DPS
  'Ashe','Draven','Ezreal','Jinx','Kai\'Sa','Kalista','Kindred','Kog\'Maw','Lucian',
  'Miss Fortune','Nilah','Senna','Sivir','Smolder','Tristana','Twitch','Varus','Vayne',
  'Xayah','Zeri','Akshan','Nilah','Samira'
]);
const POM_GATHERING = new Set([
  // Mages
  'Aurelion Sol','Brand','Corki','Heimerdinger','Kassadin','Lux','Mel','Morgana',
  'Orianna','Ryze','Seraphine','Swain','Twisted Fate','Veigar','Vel\'Koz','Vex',
  'Viktor','Zoe','Ziggs','Karma'
]);
const POM_REVITALIZE = new Set([
  // Healers/shields supports
  'Soraka','Yuumi','Sona','Nami','Milio'
]);
// Default for support → Second Wind, for mid/adc → Eyeball Collection

// Waterwalking replacement
const CELERITY_WATER = new Set(['Hecarim','Lillia','Singed','Kassadin']);
// Others → Gathering Storm

let changes = 0;

data.forEach(champ => {
  (champ.roles || []).forEach(role => {
    const rn = role.runes;
    if (!rn) return;

    const name = champ.name;
    const r = role.role;

    // --- Fix Aftershock keystone ---
    if (rn.key === 'Aftershock') {
      let replacement;
      if (ICE_OVERLORD.has(name)) replacement = 'Ice Overlord';
      else if (GUARDIAN_KEY.has(name)) replacement = 'Guardian';
      else if (ARCANE_COMET_KEY.has(name)) replacement = 'Arcane Comet';
      else replacement = 'Grasp of the Undying';
      console.log(`[KEY] ${name} ${r}: Aftershock → ${replacement}`);
      rn.key = replacement;
      changes++;
    }

    // --- Fix Conditioning in primary ---
    if (rn.primary) {
      rn.primary = rn.primary.map((rune, i) => {
        if (rune === 'Conditioning') {
          const replacement = OVERGROWTH_COND.has(name) ? 'Overgrowth' : 'Bone Plating';
          console.log(`[P${i}] ${name} ${r}: Conditioning → ${replacement}`);
          changes++;
          return replacement;
        }
        if (rune === 'Ravenous Hunter') {
          console.log(`[P${i}] ${name} ${r}: Ravenous Hunter → Relentless Hunter`);
          changes++;
          return 'Relentless Hunter';
        }
        if (rune === 'Waterwalking') {
          const replacement = CELERITY_WATER.has(name) ? 'Celerity' : 'Gathering Storm';
          console.log(`[P${i}] ${name} ${r}: Waterwalking → ${replacement}`);
          changes++;
          return replacement;
        }
        return rune;
      });
    }

    // --- Fix Presence of Mind secondary ---
    if (rn.secondary === 'Presence of Mind') {
      let replacement;
      if (POM_REVITALIZE.has(name)) replacement = 'Revitalize';
      else if (POM_GATHERING.has(name)) replacement = 'Gathering Storm';
      else if (POM_EYEBALL.has(name)) replacement = 'Eyeball Collection';
      else if (['sup'].includes(r)) replacement = 'Second Wind';
      else if (['mid','jgl'].includes(r)) replacement = 'Gathering Storm';
      else replacement = 'Eyeball Collection'; // adc default
      console.log(`[SEC] ${name} ${r}: Presence of Mind → ${replacement}`);
      rn.secondary = replacement;
      changes++;
    }
  });
});

fs.writeFileSync('./data/champions.json', JSON.stringify(data, null, 2), 'utf8');
console.log(`\nTotal changes: ${changes}`);
