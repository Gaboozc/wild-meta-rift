const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./data/champions.json', 'utf8'));

// ── Tier changes based on cumulative patch history 4.2b → 7.1g ────────────────
const TIER_CHANGES = [
  // Patch 7.1 nerfs (direct champion nerfs or Trinity/IE rework fallout)
  { name: "Fiora",     role: "top", tier: "a",
    note: "7.1 true damage nerf — menos dominante en duelos" },
  { name: "Renekton", role: "top", tier: "a",
    note: "7.1 fury rework + 7.0 change — reducción de intercambios early" },
  { name: "Rakan",    role: "sup", tier: "a",
    note: "7.1 burst damage nerf — sigue siendo buen engage pero menos one-shot" },
  { name: "Yasuo",    role: "mid", tier: "c",
    note: "7.1 Q damage + armor pen nerf — pierde dominancia early y mid" },

  // Patch 7.0 energy regen buff (Akali, Kennen, Lee Sin, Shen, Zed +10 energy regen)
  // Lee Sin and Shen already at SS/S, Kennen no mid entry — apply to Zed and Akali
  { name: "Zed",      role: "mid", tier: "s",
    note: "7.0 energy regen +20% → más sombras y combos por pelea" },
  { name: "Akali",    role: "mid", tier: "s",
    note: "7.0 energy regen buff → más rotaciones de shroud en teamfight" },

  // Patch 7.0 nerfs
  { name: "Kayle",      role: "top", tier: "b",
    note: "7.0 on-hit damage + health scaling nerf — menos snowball late" },
  { name: "Master Yi", role: "jgl", tier: "c",
    note: "7.0 true damage nerf significativo — pierde one-shot potential en skirmish" },

  // Patch 6.x accumulation of buffs
  { name: "Kindred",  role: "jgl", tier: "s",
    note: "6.2 mark cooldown 50→40s / same-champ cooldown 150→120s — escala muchísimo más rápido" },
  { name: "Corki",    role: "mid", tier: "s",
    note: "Múltiples buffs 6.0, 6.1 y 7.1 compensatory — mana, daño y paquetes mejorados" },
  { name: "Teemo",    role: "top", tier: "a",
    note: "6.0 poison +60% / 6.2 regen upgrade — sustain y poke considerablemente mejorados" },

  // Patch 6.x nerfs
  { name: "Vayne",   role: "adc", tier: "b",
    note: "6.2 Q attack speed + healing reducidos, 7.0 ult cooldown extendido — menos dominante" },
  { name: "Singed",  role: "top", tier: "c",
    note: "6.0 base MR 38→32 + movimiento nerf + desplazamiento nerf — perdió tankiness y utilidad" },
];

// ── Hidden Gems (2 per role) — off-meta high skill/situational picks ──────────
const HIDDEN_GEMS = [
  // TOP
  { name: "Singed",   role: "top",
    hiddenGemNote: {
      es: "Contra comps con mucho dive o engage (Malphite/Zac/Hecarim), Singed es inmortal: fardea, envenena a todos y el equipo rival no sabe qué hacer con él. Requiere conocer los límites del veneno y el proxy farming.",
      en: "Against dive/engage-heavy comps (Malphite/Zac/Hecarim), Singed is unkillable: he farms everywhere, poisons everyone, and the enemy team doesn't know how to deal with him. Requires mastery of poison limits and proxy farming.",
    }
  },
  { name: "Rumble",   role: "top",
    hiddenGemNote: {
      es: "AP bruiser subestimado con una de las mejores ults de teamfight del juego. Machaca melee comps en split y en mid su ult puede ganar teamfights por sí sola. Pocos jugadores saben manejar el heat mechanic.",
      en: "Underrated AP bruiser with one of the best teamfight ults in the game. Destroys melee comps in split and his ult can single-handedly win teamfights. Few players can manage the heat mechanic properly.",
    }
  },
  // JUNGLE
  { name: "Nidalee",  role: "jgl",
    hiddenGemNote: {
      es: "Con buen aim de lanza, Nidalee es el mejor early invader del juego. Sus trampas dan visión invisible y su movilidad en forma puma hace imposible castigar una buena Nidalee. Requiere +200 horas para ser efectiva.",
      en: "With good spear aim, Nidalee is the best early invader in the game. Her invisible traps provide vision and her puma form mobility makes a skilled Nidalee nearly unpunishable. Requires 200+ hours to be effective.",
    }
  },
  { name: "Fiddlesticks", role: "jgl",
    hiddenGemNote: {
      es: "Si tu equipo tiene engage, el ult de Fiddlesticks desde un bush en un teamfight es instantáneamente ganador. AP de teamfight puro. Su farm de jungla es el mejor del juego en late. Débil si detectan el canal del ult.",
      en: "If your team has engage, Fiddlesticks ulting from a bush in a teamfight is an instant win condition. Pure teamfight AP. His jungle farm is the best in the game in late game. Weak if the channel is detected.",
    }
  },
  // MID
  { name: "Aurelion Sol", role: "mid",
    hiddenGemNote: {
      es: "Maestro de control de zona olvidado. Con Phase Rush y CDR, sus estrellas zoning hacen imposible acercarse. Destruye comps teamfight lentas. Requiere entender el radio exacto de las estrellas y roaming constante.",
      en: "Forgotten zone control master. With Phase Rush and CDR, his orbiting stars make approaching impossible. Destroys slow teamfight comps. Requires understanding the exact star radius and constant roaming.",
    }
  },
  { name: "Vel'Koz",  role: "mid",
    hiddenGemNote: {
      es: "Poke de largo alcance casi imposible de esquivar cuando predicts el movimiento. Su true damage con el pasivo deshace tanks. Perfecto contra comps lentas o sin dash. Completamente inútil contra asesinos móviles.",
      en: "Long-range poke nearly impossible to dodge when movement is predicted. True damage from passive shreds tanks. Perfect against slow or dash-less comps. Completely useless against mobile assassins.",
    }
  },
  // ADC
  { name: "Twitch",   role: "adc",
    hiddenGemNote: {
      es: "Hyperscale de on-hit invisible. En late game con Guinsoo's + Runaan's puede matar a todo un equipo desde el flanco invisible. La invisibilidad y el posicionamiento son críticos — si te ven antes de atacar, perdiste.",
      en: "Invisible on-hit hyperscaler. In late game with Guinsoo's + Runaan's can kill an entire team from an invisible flank. Invisibility and positioning are critical — if they see you before you attack, you've lost.",
    }
  },
  { name: "Kalista",  role: "adc",
    hiddenGemNote: {
      es: "Requiere sinergia perfecta con su support (Rakan, Thresh, Nautilus) para lanzarlos a engage. Con el duo correcto es el ADC más difícil de matar del juego gracias al dash en cada ataque. Sin sincronía, es un ADC débil.",
      en: "Requires perfect synergy with support (Rakan, Thresh, Nautilus) for the ult toss engage. With the right duo, she's the hardest ADC to kill thanks to attack-cancel dashes. Without synergy, she's a weak ADC.",
    }
  },
  // SUPPORT
  { name: "Sona",     role: "sup",
    hiddenGemNote: {
      es: "Encantadora de poke+escala muy infravalorada. En late con Ardent + Staff, acelera y cura a todo el equipo mientras hace daño de lejos. Su ult en teamfight es ganador de partidas. Extremadamente débil si la prioriza el rival.",
      en: "Highly undervalued poke+scaling enchanter. In late with Ardent + Staff, she speeds and heals the whole team while dealing poke damage. Her teamfight ult is a game-winner. Extremely weak if the enemy prioritizes her.",
    }
  },
  { name: "Zyra",     role: "sup",
    hiddenGemNote: {
      es: "Control de zona AP que los soportes de engage odian. Sus plantas hit-scan deshacen a ADC posicionados mal. Perfecto contra comps con engage lento sin dash. Completamente inutilizable si te focusean con CC al instante.",
      en: "AP zone control that engage supports hate. Her hitscan plants shred poorly positioned ADCs. Perfect against slow engage comps without dashes. Completely unusable if they CC you the moment you place plants.",
    }
  },
];

// ── Apply tier changes ─────────────────────────────────────────────────────────
let tierChanges = 0;
const tierLog = [];

TIER_CHANGES.forEach(({ name, role, tier: newTier, note }) => {
  const champ = data.find(c => c.name === name);
  if (!champ) { console.log(`SKIP (not found): ${name}`); return; }
  const rd = champ.roles.find(r => r.role === role);
  if (!rd) { console.log(`SKIP (no role): ${name} ${role}`); return; }
  if (rd.tier === newTier) { console.log(`SAME: ${name} ${role} already ${newTier}`); return; }
  tierLog.push(`${name} ${role}: ${rd.tier} → ${newTier}  (${note})`);
  rd.tier = newTier;
  tierChanges++;
});

// ── Apply hidden gem flags ─────────────────────────────────────────────────────
let gemCount = 0;

HIDDEN_GEMS.forEach(({ name, role, hiddenGemNote }) => {
  const champ = data.find(c => c.name === name);
  if (!champ) { console.log(`GEM SKIP: ${name} not found`); return; }
  const rd = champ.roles.find(r => r.role === role);
  if (!rd) { console.log(`GEM SKIP: ${name} ${role} no entry`); return; }
  rd.hiddenGem = true;
  rd.hiddenGemNote = hiddenGemNote;
  gemCount++;
  console.log(`GEM: ${name} ${role} (${rd.tier})`);
});

fs.writeFileSync('./data/champions.json', JSON.stringify(data, null, 2), 'utf8');

console.log('\n── Tier changes ──────────────────────────');
tierLog.forEach(l => console.log(l));
console.log(`\nTotal tier changes: ${tierChanges}`);
console.log(`Total hidden gems:  ${gemCount}`);
