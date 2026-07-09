const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./data/champions.json', 'utf8'));

// ── TIER CHANGES ────────────────────────────────────────────────────────────
const TIER_CHANGES = [
  // Buffs → rise
  { name: "Darius",   role: "top", tier: "ss", reason: "Q refunds 50% CD + 100% mana on kill → unlimited Q spam in teamfights. S→SS" },
  { name: "Kai'Sa",   role: "adc", tier: "ss", reason: "Killer Instinct range 4→5.5 (37% increase) → much safer R initiations. S→SS" },
  { name: "Kayn",     role: "jgl", tier: "ss", reason: "R recovery lockout reduced + exit distance improved → more flexible and punishing. S→SS" },
  { name: "Varus",    role: "adc", tier: "ss", reason: "Chain of Corruption blight stack time 3s→1.5s → R combo far more reliable. S→SS" },
  { name: "Annie",    role: "mid", tier: "s",  reason: "Tibbers inherit Magic Pen → huge with Void Staff/Cryptbloom, shreds tanks. A→S" },
  { name: "Ryze",     role: "mid", tier: "a",  reason: "Seraph's AP 35→60 + Rod of Ages improved → core items massively buffed. B→A" },
  { name: "Ekko",     role: "mid", tier: "a",  reason: "Luden's AP 85→100, Lich Bane AP 80→100, general mage buffs. B→A" },
  // Nerfs → fall
  { name: "Lee Sin",  role: "jgl", tier: "s",  reason: "Tempest damage 90/140/190/240→35/70/105/140 (massive nerf to AoE). SS→S" },
  { name: "Zed",      role: "mid", tier: "a",  reason: "Death Mark CD 85/65/45→85/70/55 + 0.5s delay → reduced burst window. S→A" },
  { name: "Yasuo",    role: "mid", tier: "d",  reason: "Wind Wall CD nerfed early, Last Breath only bonus armor pen now. C→D" },
  { name: "K'Sante",  role: "top", tier: "b",  reason: "All Out armor pen changed to bonus only → weaker vs tanks. A→B" },
];

let changed = 0;
TIER_CHANGES.forEach(({ name, role, tier, reason }) => {
  const champ = data.find(c => c.name === name);
  if (!champ) { console.log(`SKIP: ${name} not found`); return; }
  const rd = champ.roles.find(r => r.role === role);
  if (!rd) { console.log(`SKIP: ${name} ${role} no entry`); return; }
  const old = rd.tier;
  rd.tier = tier;
  changed++;
  console.log(`✓ ${name} [${role}]: ${old} → ${tier} — ${reason}`);
});

// ── ADD YUNARA ──────────────────────────────────────────────────────────────
const yunara = {
  name: "Yunara",
  roles: [
    {
      role: "adc",
      tier: "b",
      wr: null,
      why: {
        es: "Nueva ADC marksman (La Fe Inquebrantable). Lanzada en el parche 7.2, su kit y sinergias aún están siendo definidos por la comunidad. Basada en las estadísticas de lanzamiento preliminares, se perfila como un carry de rango medio que escala bien con crit. Su jugabilidad requiere dominar un kit nuevo — B hasta que el meta la defina.",
        en: "New marksman ADC (The Unbroken Faith). Released in patch 7.2, her kit and synergies are still being defined by the community. Based on preliminary launch stats, she profiles as a medium-range carry that scales well with crit. Her gameplay requires mastering a new kit — B until the meta defines her."
      },
      build: ["Infinity Edge", "Kraken Slayer", "Runaan's Hurricane", "Stormrazor", "Guardian Angel"],
      buildNote: {
        es: "Build estándar crit. Infinity Edge primero para maximizar crit damage, Kraken contra tanques, Runaan's para teamfight AoE. Stormrazor da slow para kite. Guardian Angel como seguro de vida.",
        en: "Standard crit build. Infinity Edge first to maximize crit damage, Kraken vs tanks, Runaan's for teamfight AoE. Stormrazor gives kite slow. Guardian Angel as life insurance."
      },
      runes: ["Fleet Footwork", "Brutal", "Legend: Alacrity", "Cut Down"],
      counters: ["Caitlyn", "Ezreal", "Varus"],
      synergies: ["Thresh", "Nautilus", "Leona"],
      situational: [
        {
          es: "Vs tanques: Kraken Slayer segundo o tercero para penetrar HP.",
          en: "Vs tanks: Kraken Slayer second or third to penetrate HP."
        },
        {
          es: "Vs poke heavy: Dorans Shield + Fleet Footwork para sobrevivir early.",
          en: "Vs poke heavy: Dorans Shield + Fleet Footwork to survive early."
        },
        {
          es: "En teamfight: Runaan's Hurricane antes que Stormrazor para AoE inmediato.",
          en: "In teamfight: Runaan's Hurricane before Stormrazor for immediate AoE."
        },
        {
          es: "Con engage support (Leona/Nautilus): juega más agresivamente post-6.",
          en: "With engage support (Leona/Nautilus): play more aggressively post-6."
        }
      ]
    }
  ]
};

const alreadyExists = data.find(c => c.name === "Yunara");
if (!alreadyExists) {
  data.push(yunara);
  console.log(`✓ ADDED: Yunara [adc] B tier`);
} else {
  console.log(`SKIP: Yunara already exists`);
}

// ── SAVE ─────────────────────────────────────────────────────────────────────
fs.writeFileSync('./data/champions.json', JSON.stringify(data, null, 2), 'utf8');
console.log(`\nDone. Tier changes: ${changed}. Total champions: ${data.length}`);

// ── VERIFY ───────────────────────────────────────────────────────────────────
console.log('\n── Verification ──');
[...TIER_CHANGES, { name: "Yunara", role: "adc", tier: "b" }].forEach(({ name, role, tier }) => {
  const c = data.find(x => x.name === name);
  if (!c) { console.log(`  MISSING: ${name}`); return; }
  const rd = c.roles.find(r => r.role === role);
  console.log(`  ${name} [${role}]: ${rd?.tier} ${rd?.tier === tier ? '✓' : '✗ MISMATCH'}`);
});
