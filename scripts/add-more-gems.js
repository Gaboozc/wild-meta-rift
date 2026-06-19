const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./data/champions.json', 'utf8'));

const NEW_GEMS = [
  // ── TOP ────────────────────────────────────────────────────────────────────
  { name: "Kennen", role: "top",
    hiddenGemNote: {
      es: "AP poke que destruye el meta de melee top. Su stun en área con la ult hace que teamfights enteras se caigan si está en la primera línea. Perfecto cuando el rival lleva Darius/Malphite/Aatrox — ellos no pueden acercarse. Inútil contra ranged tops que lo outpokean.",
      en: "AP poke that destroys the melee top meta. His AoE stun with ult causes entire teamfights to collapse when he's in frontline. Perfect when the enemy runs Darius/Malphite/Aatrox — they simply can't reach him. Useless against ranged tops that outpoke him.",
    }
  },
  { name: "Mordekaiser", role: "top",
    hiddenGemNote: {
      es: "El rey del 1v1 olvidado. Su ult saca a cualquier carry o tanque fuera del teamfight y lo derrota en un reino 1v1 donde Morde siempre gana si va adelante. Contra Garen, Darius o Sett metidos, Morde los devora. Requiere saber cuándo y a quién ultar.",
      en: "The forgotten 1v1 king. His ult removes any carry or tank from the teamfight and defeats them in a 1v1 realm where Morde always wins if ahead. Against fed Garen, Darius or Sett, Morde devours them. Requires knowing when and who to ult.",
    }
  },
  { name: "Tryndamere", role: "top",
    hiddenGemNote: {
      es: "Split pusher invulnerable en comps sin CC. Con su ult activa es literalmente inmortal 5 segundos — suficiente para matar a cualquiera. Contra equipos sin crowd control (Akali/Talon/Aatrox sin CC duro), Tryndamere split pushea inhibidores sin que puedan pararlo.",
      en: "Invulnerable split pusher in CC-less comps. With his ult active he's literally unkillable for 5 seconds — enough to kill anyone. Against teams with no hard CC (Akali/Talon/Aatrox without hard CC), Tryndamere split pushes inhibitors with nothing to stop him.",
    }
  },
  { name: "Vladimir", role: "top",
    hiddenGemNote: {
      es: "AP sustain de escala infinita que nunca muere en línea. Su pool hace que todo el daño pase de largo. Con Riftmaker escala en mid/late a niveles absurdos mientras se cura a sí mismo y al equipo. Muy débil early — necesita sobrevivir los primeros 10 minutos.",
      en: "Infinite-scaling AP sustain that never dies in lane. His pool dodges all damage. With Riftmaker he scales to absurd levels in mid/late while healing himself and the team. Very weak early — needs to survive the first 10 minutes.",
    }
  },

  // ── JGL ────────────────────────────────────────────────────────────────────
  { name: "Rengar", role: "jgl",
    hiddenGemNote: {
      es: "One-shot desde el bush más difícil de trackear del juego. Con Lethality stacked, salta sobre un ADC o mago y lo mata antes de que puedan reaccionar. Requiere trackear al rival jungla para invadirlo antes de que esté fuerte y saber cuándo emboscar en mid/late.",
      en: "One-shot from bush that's the hardest to track in the game. With stacked Lethality, he leaps onto an ADC or mage and kills them before they can react. Requires tracking the enemy jungler to invade before they're strong and knowing when to ambush in mid/late.",
    }
  },
  { name: "Rammus", role: "jgl",
    hiddenGemNote: {
      es: "Hard counter absoluto a equipos full AD. Sus escamas reflectan daño físico y su armor pasivo escala ridículamente con ítems. Contra Graves/Jinx/Caitlyn/Darius, Rammus es literalmente inmortal. Completamente inútil contra equipos con mucho AP — saber quándo pickearle es la habilidad.",
      en: "Absolute hard counter to full AD teams. His armor passive scales absurdly with items and he reflects physical damage. Against Graves/Jinx/Caitlyn/Darius, Rammus is literally unkillable. Completely useless against heavy AP teams — knowing when to pick him is the skill.",
    }
  },
  { name: "Olaf", role: "jgl",
    hiddenGemNote: {
      es: "El asesino de comps dependientes de CC. Con su ult activa es inmune a todo crowd control — Leona, Nautilus, Amumu, Malphite no pueden hacer nada. Perfecto contra el meta de engage tanky. Requiere lanzamiento de hacha preciso para kite en teamfight.",
      en: "The executioner of CC-dependent comps. With his ult active he's immune to all crowd control — Leona, Nautilus, Amumu, Malphite can't do anything. Perfect against the tanky engage meta. Requires precise axe throwing for teamfight kiting.",
    }
  },

  // ── MID ────────────────────────────────────────────────────────────────────
  { name: "Ryze", role: "mid",
    hiddenGemNote: {
      es: "Mago hyperscale con el portal más rompedor de objetivos del juego. En late con Rod of Ages + Seraph's, hace daño infinito. Su portal para robar dragón/barón con el equipo es insuperable si se coordina bien. Requiere 300+ horas solo para manejar el mana + rotaciones.",
      en: "Hyperscale mage with the most objective-breaking portal in the game. In late with Rod of Ages + Seraph's, his damage is infinite. His portal to steal dragon/baron with the team is unmatched when coordinated. Requires 300+ hours just to manage mana + rotations.",
    }
  },
  { name: "Ekko", role: "mid",
    hiddenGemNote: {
      es: "Asesino AP con seguro de vida incorporado. Su ult le permite entrar, destruir al rival, y si va a morir — retrocede en el tiempo 4 segundos con vida completa. Perfecto para outplay masivo. Requiere conocer exactamente dónde quedará el echo antes de cada fight.",
      en: "AP assassin with a built-in life insurance policy. His ult allows him to go in, destroy the enemy, and if he's about to die — rewind 4 seconds with full HP. Perfect for massive outplays. Requires knowing exactly where the echo will be before every fight.",
    }
  },
  { name: "Karma", role: "mid",
    hiddenGemNote: {
      es: "AP mid de poke e hypermovilidad completamente infrautilizada. Con Phase Rush + Mantra, acelera a todo el equipo mientras hace daño masivo a rango seguro. Destruye comps lentas sin dash. Muy infravalorada porque la mayoría la juega solo de support sin explotar su daño AP.",
      en: "AP mid poke and hyper-mobility champion that's completely underutilized. With Phase Rush + Mantra, she speeds the entire team while dealing massive damage at safe range. Destroys slow dash-less comps. Hugely undervalued because most only play her as support without exploiting her AP damage.",
    }
  },

  // ── ADC ────────────────────────────────────────────────────────────────────
  { name: "Draven", role: "adc",
    hiddenGemNote: {
      es: "El ADC con más daño bruto del juego cuando se domina el eje. Sus hachas duplican el AD y con Bloodthirster/IE hace el daño de dos ADC normales. Contra equipos sin CC confiable es imposible de matar. Requiere coger 100 hachas para saber el ángulo de rebote perfecto.",
      en: "The ADC with the highest raw damage in the game when axes are mastered. His axes double AD and with Bloodthirster/IE he deals the damage of two normal ADCs. Against teams without reliable CC he's unkillable. Requires catching 100 axes to understand the perfect bounce angle.",
    }
  },
  { name: "Senna", role: "adc",
    hiddenGemNote: {
      es: "ADC de escala infinita — cuanto más tiempo dure la partida y más almas tenga, más daño, rango y curación hace. A 100 almas, su rango y daño son absurdos. Perfecto en partidas largas contra comps dive que no pueden matarla rápido. Requiere acumular almas sin morir.",
      en: "Infinite-scaling ADC — the longer the game and more souls she has, the more damage, range and healing she deals. At 100 souls her range and damage are absurd. Perfect in long games against dive comps that can't kill her fast. Requires stacking souls without dying.",
    }
  },
  { name: "Nilah", role: "adc",
    hiddenGemNote: {
      es: "ADC melee que, con el support correcto (Leona, Nautilus, Braum), se convierte en una pesadilla. Su evasión y cura en teamfight son imposibles si el rival no tiene burst instantáneo. Requiere el más alto nivel de posicionamiento del juego — un paso mal dado y muere al instante.",
      en: "Melee ADC that, with the right support (Leona, Nautilus, Braum), becomes a nightmare. Her dodge and teamfight healing are unstoppable without instant burst. Requires the highest level of positioning in the game — one wrong step and she dies instantly.",
    }
  },
  { name: "Vayne", role: "adc",
    hiddenGemNote: {
      es: "Hypercarry de tercer item contra equipos muy tanky. Con Guinsoo's + Kraken, su % HP on-hit deshace a Ornn/Sion/Maokai independientemente de cuánto armor tengan. Extremadamente débil en early y contra poke. Solo viable cuando el equipo puede protegerla los primeros 20 minutos.",
      en: "Third-item hypercarry against very tanky teams. With Guinsoo's + Kraken, her % HP on-hit shreds Ornn/Sion/Maokai regardless of how much armor they stack. Extremely weak early and against poke. Only viable when the team can protect her the first 20 minutes.",
    }
  },

  // ── SUPPORT ────────────────────────────────────────────────────────────────
  { name: "Yuumi", role: "sup",
    hiddenGemNote: {
      es: "El support más roto del juego en el duo correcto — mientras está montada es INVULNERABLE. Con Kai'Sa, Zeri o Samira, Yuumi convierte a su carry en un tanque y un one-shot al mismo tiempo. Completamente inútil si su ADC muere o si la separan. Requiere entender qué carry potencia más.",
      en: "The most broken support in the game with the right duo — while mounted she's INVULNERABLE. With Kai'Sa, Zeri or Samira, Yuumi turns her carry into both a tank and a one-shot threat simultaneously. Completely useless if her ADC dies or she gets separated. Requires understanding which carry she empowers most.",
    }
  },
  { name: "Swain", role: "sup",
    hiddenGemNote: {
      es: "Support AP offensivo completamente fuera del meta que sorprende a todos. Su root con W + full combo hace daño de mago completo. En late, su ult drena vida de todos en área haciendo que los teamfights sean imposibles de ganar para el rival. Requiere ignorar las métricas tradicionales de support.",
      en: "Completely off-meta offensive AP support that surprises everyone. His W root + full combo deals full mage damage. In late, his ult drains life from everyone in an area making teamfights impossible for the enemy to win. Requires ignoring traditional support metrics.",
    }
  },
  { name: "Heimerdinger", role: "sup",
    hiddenGemNote: {
      es: "Control de zona total en botlane. Sus 3 torretas niegan el acceso a toda el área debajo de ellas — el rival simplemente no puede pelear en ese espacio. Perfecto contra supports de engage que necesitan acercarse. En late, su ult en teamfight puede cambiar el resultado de una pelea entera.",
      en: "Total zone control in bot lane. His 3 turrets deny access to the entire area under them — the enemy simply cannot fight in that space. Perfect against engage supports that need to get close. In late game, his upgraded turret in a teamfight can single-handedly change a fight's outcome.",
    }
  },
  { name: "Vel'Koz", role: "sup",
    hiddenGemNote: {
      es: "Support de poke AP con true damage que destruye tanks. Su true damage de pasivo ignora todo el armor y MR — Malphite y Ornn no tienen cura contra él en late. En línea tiene más daño que la mayoría de mages. Perfecto contra comps defensivas que confían en su resistencia.",
      en: "AP poke support with true damage that destroys tanks. His passive true damage ignores all armor and MR — Malphite and Ornn have no answer to him in late game. In lane he deals more damage than most mages. Perfect against defensive comps that rely on their resistances.",
    }
  },
];

let added = 0;
NEW_GEMS.forEach(({ name, role, hiddenGemNote }) => {
  const champ = data.find(c => c.name === name);
  if (!champ) { console.log(`SKIP: ${name} not found`); return; }
  const rd = champ.roles.find(r => r.role === role);
  if (!rd) { console.log(`SKIP: ${name} ${role} no entry`); return; }
  if (rd.hiddenGem) { console.log(`ALREADY GEM: ${name} ${role}`); return; }
  rd.hiddenGem = true;
  rd.hiddenGemNote = hiddenGemNote;
  added++;
  console.log(`✓ GEM: ${name} ${role} (${rd.tier})`);
});

fs.writeFileSync('./data/champions.json', JSON.stringify(data, null, 2), 'utf8');

// Verify count per role
console.log('\n── Gems per role ──');
const roles = ['top','jgl','mid','adc','sup'];
roles.forEach(role => {
  const count = data.reduce((n, c) => {
    const rd = c.roles.find(r => r.role === role);
    return n + (rd?.hiddenGem ? 1 : 0);
  }, 0);
  console.log(`  ${role}: ${count} gems`);
});
console.log(`\nAdded: ${added}`);
