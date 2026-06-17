const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./data/champions.json', 'utf8'));

// ── Situational library by archetype ──────────────────────────────────────────
const SIT = {
  // TOP LANE
  top_tank: [
    { es: "Vs. mucho AP: Mercury's Treads en vez de Plated Steelcaps", en: "vs heavy AP: Mercury's Treads over Plated Steelcaps" },
    { es: "Vs. curación masiva rival: Thornmail como 3er item", en: "vs heavy enemy healing: Thornmail as 3rd item" },
    { es: "Vs. hard engage enemigo: Force of Nature para MR y movilidad", en: "vs heavy engage: Force of Nature for MR and mobility" },
    { es: "Si vas muy adelante: rush Sunfire antes que segundo tank item", en: "If snowballing: rush Sunfire before second tank item" },
  ],
  top_fighter: [
    { es: "Vs. mucho AP: Mercury's Treads + Maw of Malmortius en lugar de sit item", en: "vs heavy AP: Mercury's Treads + Maw of Malmortius over sit item" },
    { es: "Vs. curación rival: Mortal Reminder reemplaza Lord Dominik's", en: "vs enemy healing: Mortal Reminder replaces Lord Dominik's" },
    { es: "Vs. equipo muy tanky: rush Black Cleaver antes que item de sustain", en: "vs very tanky enemy: rush Black Cleaver before sustain item" },
    { es: "Partida larga: Overgrowth > Last Stand si te centran mucho", en: "Long game: Overgrowth > Last Stand if you're focused" },
  ],
  top_bruiser_ap: [
    { es: "Vs. full AD rival: Seeker's Armguard rush → Zhonya's más adelante", en: "vs full AD enemy: Seeker's Armguard rush → Zhonya's later" },
    { es: "Vs. engage pesado: Zhonya's como 3er item", en: "vs heavy engage: Zhonya's as 3rd item" },
    { es: "Vs. curación: Shadowflame reemplaza Cosmic Drive", en: "vs healing: Shadowflame replaces Cosmic Drive" },
    { es: "Si snowball: rush Rabadon's antes del 4to item", en: "If ahead: rush Rabadon's before 4th item" },
  ],
  top_split: [
    { es: "Vs. poke en línea: Second Wind + doble pot start", en: "vs lane poke: Second Wind + double pot start" },
    { es: "Rival con mucho disengage: Sterak's Gage rush para sobrevivir", en: "vs heavy disengage: Sterak's Gage rush to survive" },
    { es: "Si tu equipo necesita engage: abandona split, busca teamfight", en: "If team needs engage: drop split, look for teamfight" },
    { es: "Vs. AD pesado rival: Plated Steelcaps siempre, considera Dead Man's", en: "vs heavy AD: Plated Steelcaps always, consider Dead Man's" },
  ],
  // JUNGLE
  jgl_tank: [
    { es: "Vs. poke pesado rival: Oracle Lens desde nivel 9 para contrarrestar wards", en: "vs heavy poke: Oracle Lens from lvl 9 to counter wards" },
    { es: "Si tu adc/mid va adelante: prioriza dragon/baron sobre farm", en: "If your carry is ahead: prioritize dragon/baron over farming" },
    { es: "Vs. AP carry jungla rival: Mercury's Treads + Force of Nature", en: "vs AP enemy jungler: Mercury's Treads + Force of Nature" },
    { es: "Vs. equipo tanky rival: Thornmail early para hacer más daño con tu pasiva", en: "vs tanky enemy: Thornmail early to maximize passive damage" },
  ],
  jgl_assassin: [
    { es: "Vs. equipo tanky: Black Cleaver después del primer item de burst", en: "vs tanky team: Black Cleaver after first burst item" },
    { es: "Vs. control wards masivo: compra Oracle Lens en nivel 9", en: "vs heavy vision control: buy Oracle Lens at level 9" },
    { es: "Vs. equipo con muchos shields: Serpent's Fang como 2do item", en: "vs heavy shields: Serpent's Fang as 2nd item" },
    { es: "Si el rival jungla invade: ward río y flancos antes de hacer buff", en: "If enemy jungler invades: ward river and flanks before buffing" },
  ],
  jgl_ap: [
    { es: "Vs. equipo tanky: Shadowflame como 2do item para penetración", en: "vs tanky team: Shadowflame as 2nd item for pen" },
    { es: "Vs. engage pesado: Zhonya's como 3er item", en: "vs heavy engage: Zhonya's as 3rd item" },
    { es: "Si van muy adelante: Rabadon's 3er item para cerrar partida", en: "If snowballing: Rabadon's 3rd item to close game" },
    { es: "Vs. mucho AD: Seeker's Armguard early en jungle shop", en: "vs heavy AD: Seeker's Armguard early from jungle shop" },
  ],
  jgl_fighter: [
    { es: "Vs. equipo pesado en MR: Black Cleaver rush es obligatorio", en: "vs high MR team: Black Cleaver rush is mandatory" },
    { es: "Vs. equipo tanky: Lord Dominik's como 4to item", en: "vs tanky team: Lord Dominik's as 4th item" },
    { es: "Vs. curación rival: Mortal Reminder como item situacional", en: "vs enemy healing: Mortal Reminder as situational item" },
    { es: "Vs. mucho AP: Mercury's Treads + Maw of Malmortius", en: "vs heavy AP: Mercury's Treads + Maw of Malmortius" },
  ],
  // MID
  mid_mage: [
    { es: "Vs. asesino: Zhonya's Hourglass rush como 2do item", en: "vs assassin: Zhonya's Hourglass rush as 2nd item" },
    { es: "Vs. equipo tanky: Void Staff antes del 4to item", en: "vs tanky team: Void Staff before 4th item" },
    { es: "Vs. mucho AD: Seeker's Armguard + Zhonya's temprano", en: "vs heavy AD: Seeker's Armguard + early Zhonya's" },
    { es: "Si vas adelante: rush Rabadon's como 3er item para cerrar", en: "If ahead: rush Rabadon's as 3rd item to close out" },
  ],
  mid_assassin: [
    { es: "Vs. equipo tanky: Black Cleaver después de 1er item de burst", en: "vs tanky team: Black Cleaver after 1st burst item" },
    { es: "Vs. shields masivos rival: Serpent's Fang como 2do item", en: "vs heavy enemy shields: Serpent's Fang as 2nd item" },
    { es: "Vs. equipo con mucho MR: Void Staff / Last Whisper 3er item", en: "vs high MR team: Void Staff / Last Whisper 3rd item" },
    { es: "Vs. engage rival: Edge of Night para spellshield antes de entrar", en: "vs heavy engage: Edge of Night for spellshield before entering" },
  ],
  mid_battle_mage: [
    { es: "Vs. poke pesado: Rod of Ages rush para sustain de mana y vida", en: "vs heavy poke: Rod of Ages rush for mana and HP sustain" },
    { es: "Vs. engage + tanks: Zhonya's como 3er item obligatorio", en: "vs engage + tanks: Zhonya's as mandatory 3rd item" },
    { es: "Si snowball: Rabadon's 3er item en lugar de item de sustain", en: "If snowballing: Rabadon's 3rd item instead of sustain item" },
    { es: "Vs. curación rival: Demonic Embrace + Shadowflame juntos", en: "vs enemy healing: Demonic Embrace + Shadowflame together" },
  ],
  // ADC
  adc_crit: [
    { es: "Vs. curación masiva: compra Executioner's Calling, escala a Mortal Reminder", en: "vs heavy healing: buy Executioner's Calling, upgrade to Mortal Reminder" },
    { es: "Vs. equipo tanky: Kraken Slayer como 3er item", en: "vs tanky team: Kraken Slayer as 3rd item" },
    { es: "Vs. asesino fed: Guardian Angel rush después de 2do item", en: "vs fed assassin: Guardian Angel rush after 2nd item" },
    { es: "Si quieres mas kiting: Rapid Firecannon en vez de Phantom Dancer", en: "For more kiting: Rapid Firecannon over Phantom Dancer" },
  ],
  adc_onhit: [
    { es: "Vs. equipo muy tanky: Kraken Slayer como 2do item obligatorio", en: "vs very tanky team: Kraken Slayer as mandatory 2nd item" },
    { es: "Vs. curación masiva: Terminus para anti-heal + on-hit", en: "vs heavy healing: Terminus for anti-heal + on-hit" },
    { es: "Vs. asesino fed: Immortal Shieldbow rush para sobrevivir", en: "vs fed assassin: Immortal Shieldbow rush to survive" },
    { es: "Vs. mucho AP: Mercury's Treads + Wit's End como 3er item", en: "vs heavy AP: Mercury's Treads + Wit's End as 3rd item" },
  ],
  adc_poke: [
    { es: "Vs. engage pesado: Galeforce para dash de escape como 1er item", en: "vs heavy engage: Galeforce for escape dash as 1st item" },
    { es: "Vs. equipo tanky: Kraken Slayer como 3er item", en: "vs tanky team: Kraken Slayer as 3rd item" },
    { es: "Vs. curación rival: Mortal Reminder como 4to item", en: "vs enemy healing: Mortal Reminder as 4th item" },
    { es: "Vs. asesino: Guardian Angel rush después del 2do item", en: "vs assassin: Guardian Angel rush after 2nd item" },
  ],
  // SUPPORT
  sup_enchanter: [
    { es: "Vs. poke pesado rival: Second Wind + Revitalize sobre otras combinaciones", en: "vs heavy poke: Second Wind + Revitalize over other combos" },
    { es: "Vs. AD poke: Plated Steelcaps + Knight's Vow para tu adc", en: "vs AD poke: Plated Steelcaps + Knight's Vow for your ADC" },
    { es: "Vs. asesino: Knight's Vow rush para proteger tu carry", en: "vs assassin: Knight's Vow rush to protect your carry" },
    { es: "Si tu adc tiene mucho ataque: Ardent Censer antes que Redemption", en: "If your ADC is attack-speed based: Ardent Censer before Redemption" },
  ],
  sup_tank: [
    { es: "Vs. poke pesado rival: Second Wind temprano en línea", en: "vs heavy poke: Second Wind early in lane" },
    { es: "Vs. curación masiva rival: Thornmail como 3er item", en: "vs heavy enemy healing: Thornmail as 3rd item" },
    { es: "Vs. AP carry: Mercury's Treads + Force of Nature", en: "vs AP carry: Mercury's Treads + Force of Nature" },
    { es: "Si tu equipo necesita pelar: Knight's Vow en vez de Locket", en: "If team needs peel: Knight's Vow instead of Locket" },
  ],
  sup_mage: [
    { es: "Vs. tanky front line: Shadowflame como 2do item para penetración", en: "vs tanky frontline: Shadowflame as 2nd item for pen" },
    { es: "Vs. engage pesado: Zhonya's como 3er item para sobrevivir dives", en: "vs heavy engage: Zhonya's as 3rd item to survive dives" },
    { es: "Vs. asesino: Shurelya's Battlesong para acelerar al equipo y escapar", en: "vs assassin: Shurelya's Battlesong to speed team and escape" },
    { es: "Si tu equipo es full AP: considera Locket of Iron Solari para escudos", en: "If team is full AP: consider Locket of Iron Solari for shields" },
  ],
};

// ── Per-champion overrides (specific situational notes) ───────────────────────
const OVERRIDES = {
  "Aatrox|top":      [...SIT.top_fighter],
  "Ahri|mid":        [
    { es: "Vs. asesino: Banshee's Veil/Zhonya's rush 2do item", en: "vs assassin: Banshee's Veil/Zhonya's rush 2nd item" },
    { es: "Vs. shields: Serpent's Fang 2do item", en: "vs shields: Serpent's Fang 2nd item" },
    { es: "Si vas adelante: Rabadon's 3er en vez de Shadowflame", en: "If ahead: Rabadon's 3rd instead of Shadowflame" },
    { es: "Vs. tanky: Void Staff antes del 4to item", en: "vs tanky: Void Staff before 4th item" },
  ],
  "Akali|mid":       [...SIT.mid_assassin],
  "Akali|top":       [...SIT.mid_assassin],
  "Alistar|sup":     [...SIT.sup_tank],
  "Amumu|jgl":       [...SIT.jgl_tank],
  "Amumu|sup":       [...SIT.sup_tank],
  "Ashe|adc":        [...SIT.adc_crit],
  "Aurelion Sol|mid": [
    { es: "Vs. asesino: Zhonya's rush antes del 3er item", en: "vs assassin: Zhonya's rush before 3rd item" },
    { es: "Vs. tanky: Void Staff 3er item obligatorio", en: "vs tanky: Void Staff 3rd item mandatory" },
    { es: "Si snowball: Rabadon's 3er para one-shot potential", en: "If snowballing: Rabadon's 3rd for one-shot potential" },
    { es: "Vs. mucho CC: Mercury's Treads + Banshee's Veil", en: "vs heavy CC: Mercury's Treads + Banshee's Veil" },
  ],
  "Blitzcrank|sup":  [...SIT.sup_tank],
  "Brand|mid":       [...SIT.mid_mage],
  "Brand|sup":       [...SIT.sup_mage],
  "Braum|sup":       [...SIT.sup_tank],
  "Caitlyn|adc":     [
    { es: "Vs. engage: Galeforce rush para tener dash de escape", en: "vs engage: Galeforce rush for escape dash" },
    { es: "Vs. curación: Mortal Reminder 3er item", en: "vs healing: Mortal Reminder 3rd item" },
    { es: "Vs. tanky: Kraken Slayer 3er item", en: "vs tanky: Kraken Slayer 3rd item" },
    { es: "Vs. asesino: Guardian Angel rush 3er item", en: "vs assassin: Guardian Angel rush 3rd item" },
  ],
  "Camille|top":     [
    { es: "Vs. mucho AP: Mercury's Treads + Maw of Malmortius", en: "vs heavy AP: Mercury's Treads + Maw of Malmortius" },
    { es: "Vs. tanky: Black Cleaver antes que Sterak's", en: "vs tanky: Black Cleaver before Sterak's" },
    { es: "Vs. shields: Serpent's Fang como 3er item", en: "vs shields: Serpent's Fang as 3rd item" },
    { es: "Si snowball: rush Trinity Force + Death's Dance directamente", en: "If snowballing: rush Trinity Force + Death's Dance directly" },
  ],
  "Darius|top":      [
    { es: "Vs. curación rival: Mortal Reminder remplaza Lord Dominik's", en: "vs enemy healing: Mortal Reminder replaces Lord Dominik's" },
    { es: "Vs. tanky: Black Cleaver rush es obligatorio para máximo shred", en: "vs tanky: Black Cleaver rush mandatory for max shred" },
    { es: "Vs. mucho AP: Mercury's Treads + Maw of Malmortius", en: "vs heavy AP: Mercury's Treads + Maw of Malmortius" },
    { es: "Si snowball temprano: rush Overlord's Bloodmail antes que Sterak's", en: "If early snowball: rush Overlord's Bloodmail before Sterak's" },
  ],
  "Diana|jgl":       [
    { es: "Vs. tanky: Shadowflame 2do item para penetración mágica", en: "vs tanky: Shadowflame 2nd item for magic pen" },
    { es: "Vs. asesinos: Zhonya's 3er item para sobrevivir counterganks", en: "vs assassins: Zhonya's 3rd item to survive counterganks" },
    { es: "Si snowball: Rabadon's 3er item para one-shot potential", en: "If snowballing: Rabadon's 3rd item for one-shot potential" },
    { es: "Vs. mucho CC: Mercury's Treads obligatorio", en: "vs heavy CC: Mercury's Treads mandatory" },
  ],
  "Diana|mid":       [...SIT.mid_mage],
  "Draven|adc":      [
    { es: "Vs. curación: Executioner's Calling rush — escala a Mortal Reminder", en: "vs healing: Executioner's Calling rush — upgrade to Mortal Reminder" },
    { es: "Vs. tanky: Lord Dominik's 3er item", en: "vs tanky: Lord Dominik's 3rd item" },
    { es: "Si snowball: termina Bloodthirster antes que Infinity Edge", en: "If snowballing: finish Bloodthirster before Infinity Edge" },
    { es: "Vs. asesino: Immortal Shieldbow rush para sobrevivir", en: "vs assassin: Immortal Shieldbow rush to survive" },
  ],
  "Ekko|jgl":        [...SIT.jgl_ap],
  "Ekko|mid":        [...SIT.mid_battle_mage],
  "Evelynn|jgl":     [...SIT.jgl_assassin],
  "Ezreal|adc":      [...SIT.adc_poke],
  "Fiddlesticks|jgl": [...SIT.jgl_ap],
  "Fiora|top":       [
    { es: "Vs. mucho AP: Mercury's Treads + Maw of Malmortius", en: "vs heavy AP: Mercury's Treads + Maw of Malmortius" },
    { es: "Vs. tanky: Lord Dominik's como 4to item", en: "vs tanky: Lord Dominik's as 4th item" },
    { es: "Vs. poke pesado: Tiamat rush para wave clear y sustain en línea", en: "vs heavy poke: Tiamat rush for wave clear and lane sustain" },
    { es: "Si vas adelante: rush Ravenous Hydra para sustain de teamfight", en: "If ahead: rush Ravenous Hydra for teamfight sustain" },
  ],
  "Fizz|mid":        [...SIT.mid_assassin],
  "Galio|mid":       [...SIT.mid_mage],
  "Galio|sup":       [...SIT.sup_tank],
  "Garen|top":       [...SIT.top_fighter],
  "Gnar|top":        [...SIT.top_tank],
  "Gragas|jgl":      [...SIT.jgl_tank],
  "Gragas|sup":      [...SIT.sup_tank],
  "Graves|jgl":      [
    { es: "Vs. tanks: Black Cleaver rush 1er item para máximo shred", en: "vs tanks: Black Cleaver rush 1st item for max shred" },
    { es: "Vs. mucho AP: Mercury's Treads + Maw of Malmortius", en: "vs heavy AP: Mercury's Treads + Maw of Malmortius" },
    { es: "Vs. curación: Mortal Reminder 4to item", en: "vs healing: Mortal Reminder 4th item" },
    { es: "Si snowball: rush Infinity Edge antes que 3er item defensivo", en: "If snowballing: rush Infinity Edge before 3rd defensive item" },
  ],
  "Gwen|top":        [...SIT.top_bruiser_ap],
  "Hecarim|jgl":     [
    { es: "Vs. mucho AP: Mercury's Treads + Force of Nature", en: "vs heavy AP: Mercury's Treads + Force of Nature" },
    { es: "Si snowball: rush Trinity Force antes de Sterak's", en: "If snowballing: rush Trinity Force before Sterak's" },
    { es: "Vs. tanky: Black Cleaver rush como 1er item", en: "vs tanky: Black Cleaver rush as 1st item" },
    { es: "Vs. curación rival: Mortal Reminder como item situacional", en: "vs enemy healing: Mortal Reminder as situational item" },
  ],
  "Heimerdinger|mid": [
    { es: "Vs. asesino: Zhonya's rush 2do item para bloquear dives", en: "vs assassin: Zhonya's rush 2nd item to block dives" },
    { es: "Vs. engage: posiciónate más atrás, torretas hacen el trabajo", en: "vs engage: position further back, turrets do the work" },
    { es: "Vs. tanky: Void Staff antes del 4to item", en: "vs tanky: Void Staff before 4th item" },
    { es: "Si snowball: Rabadon's 3er item para daño masivo de torretas", en: "If snowballing: Rabadon's 3rd item for massive turret damage" },
  ],
  "Heimerdinger|sup": [
    { es: "Vs. pokeadora rival: juega muy atrás, usas a los turrets de zona", en: "vs poke support: play far back, use turrets for zoning" },
    { es: "Vs. engage: ward profundo y empuja la ola para presionar rivales", en: "vs engage: deep ward and push wave to pressure opponents" },
    { es: "Si tu adc lleva crit: Ardent Censer para attack speed", en: "If your ADC plays crit: Ardent Censer for attack speed" },
    { es: "Vs. tanky: Void Staff 3er item para penetrar tanques", en: "vs tanky: Void Staff 3rd item to pen tanks" },
  ],
  "Irelia|top":      [...SIT.top_fighter],
  "Irelia|mid":      [...SIT.top_fighter],
  "Janna|sup":       [
    { es: "Vs. poke: Second Wind + Revitalize para tu ADC y tú", en: "vs poke: Second Wind + Revitalize for you and your ADC" },
    { es: "Vs. dive: Knight's Vow rush para proteger a tu carry", en: "vs dive: Knight's Vow rush to protect your carry" },
    { es: "Si tu adc es crit: Ardent Censer temprano", en: "If your ADC plays crit: Ardent Censer early" },
    { es: "Vs. asesino: Locket of Iron Solari para escudo de área", en: "vs assassin: Locket of Iron Solari for area shield" },
  ],
  "Jarvan IV|top":   [...SIT.top_fighter],
  "Jarvan IV|jgl":   [...SIT.jgl_fighter],
  "Jax|top":         [
    { es: "Vs. poke pesado: Tiamat rush para wave clear rápido", en: "vs heavy poke: Tiamat rush for fast wave clear" },
    { es: "Vs. mucho AP: Mercury's Treads + Wit's End como 3er item", en: "vs heavy AP: Mercury's Treads + Wit's End as 3rd item" },
    { es: "Vs. tanky: Black Cleaver en vez de Trinity Force", en: "vs tanky: Black Cleaver instead of Trinity Force" },
    { es: "Si snowball: rush Ravenous Hydra para escalar más rápido", en: "If snowballing: rush Ravenous Hydra to scale faster" },
  ],
  "Jayce|top":       [...SIT.top_fighter],
  "Jhin|adc":        [...SIT.adc_poke],
  "Jinx|adc":        [...SIT.adc_crit],
  "K'Sante|top":     [...SIT.top_tank],
  "Kai'Sa|adc":      [
    { es: "Vs. tanky: Guinsoo's Rageblade en lugar de Phantom Dancer", en: "vs tanky: Guinsoo's Rageblade instead of Phantom Dancer" },
    { es: "Vs. curación masiva: Mortal Reminder como 4to item", en: "vs heavy healing: Mortal Reminder as 4th item" },
    { es: "Vs. asesino: Guardian Angel rush después del 2do item", en: "vs assassin: Guardian Angel rush after 2nd item" },
    { es: "Si snowball: rush Void Staff 3er item para one-shot AP builds", en: "If snowballing: rush Void Staff 3rd item for AP one-shot builds" },
  ],
  "Kalista|adc":     [
    { es: "Vs. curación: Executioner's Calling + Mortal Reminder rush", en: "vs healing: Executioner's Calling + Mortal Reminder rush" },
    { es: "Vs. engage: Galeforce para dash de emergencia", en: "vs engage: Galeforce for emergency dash" },
    { es: "Vs. tanky: Kraken Slayer 3er item obligatorio", en: "vs tanky: Kraken Slayer 3rd item mandatory" },
    { es: "Vs. asesino: juega pegada a tu support, evita aislamientos", en: "vs assassin: stay close to support, avoid isolation" },
  ],
  "Karma|mid":       [...SIT.mid_mage],
  "Karma|sup":       [...SIT.sup_enchanter],
  "Kassadin|mid":    [
    { es: "Vs. AD: Seeker's Armguard rush, escala a Zhonya's nivel 11+", en: "vs AD: Seeker's Armguard rush, upgrade to Zhonya's lvl 11+" },
    { es: "Vs. engage pesado: Banshee's Veil 3er item para spellshield", en: "vs heavy engage: Banshee's Veil 3rd item for spellshield" },
    { es: "Si snowball nivel 16+: Rabadon's para one-shot potential máximo", en: "If snowballing lvl 16+: Rabadon's for max one-shot potential" },
    { es: "Vs. vision masiva rival: Oracle Lens desde nivel 11 para roamear", en: "vs heavy vision: Oracle Lens from lvl 11 to roam safely" },
  ],
  "Katarina|mid":    [...SIT.mid_assassin],
  "Kayle|top":       [
    { es: "Vs. asesino: Seeker's Armguard rush, pide protección al jungla", en: "vs assassin: Seeker's Armguard rush, ask jungle for protection" },
    { es: "Vs. engage pesado nivel 11+: Zhonya's para jugar en teamfight", en: "vs heavy engage lvl 11+: Zhonya's to play in teamfights" },
    { es: "Si snowball: Guinsoo's Rageblade como 2do item para on-hit", en: "If snowballing: Guinsoo's Rageblade as 2nd item for on-hit" },
    { es: "Vs. tanky rival: Kraken Slayer 3er item obligatorio", en: "vs tanky: Kraken Slayer 3rd item mandatory" },
  ],
  "Kayn|jgl":        [
    { es: "Red Kayn vs tanky: Black Cleaver rush es obligatorio", en: "Red Kayn vs tanky: Black Cleaver rush mandatory" },
    { es: "Blue Kayn vs tanky: Zhonya's + Void Staff para penetración", en: "Blue Kayn vs tanky: Zhonya's + Void Staff for pen" },
    { es: "Red Kayn vs curación: Mortal Reminder 4to item", en: "Red Kayn vs healing: Mortal Reminder 4th item" },
    { es: "Blue Kayn vs asesino rival: prioriza Shadow Assassin para burst rápido", en: "Blue Kayn vs enemy assassin: prioritize Shadow Assassin for quick burst" },
  ],
  "Kennen|top":      [...SIT.top_bruiser_ap],
  "Kha'Zix|jgl":     [...SIT.jgl_assassin],
  "Kindred|jgl":     [
    { es: "Vs. tanky: Kraken Slayer como 2do item para % HP damage", en: "vs tanky: Kraken Slayer as 2nd item for % HP damage" },
    { es: "Vs. curación: Mortal Reminder 4to item", en: "vs healing: Mortal Reminder 4th item" },
    { es: "Si snowball: rush Infinity Edge 3er item para crit burst", en: "If snowballing: rush Infinity Edge 3rd item for crit burst" },
    { es: "Vs. engage: Guardian Angel rush después del 2do item", en: "vs engage: Guardian Angel rush after 2nd item" },
  ],
  "Kog'Maw|adc":     [...SIT.adc_onhit],
  "Lee Sin|jgl":     [
    { es: "Vs. tanky: Black Cleaver rush 1er item", en: "vs tanky: Black Cleaver rush 1st item" },
    { es: "Vs. mucho AP: Mercury's Treads + Maw of Malmortius", en: "vs heavy AP: Mercury's Treads + Maw of Malmortius" },
    { es: "Vs. curación: Mortal Reminder como 4to item", en: "vs healing: Mortal Reminder as 4th item" },
    { es: "Si snowball temprano: sigue haciendo early kills para ampliar ventaja", en: "If early snowball: keep making early kills to extend lead" },
  ],
  "Leona|sup":       [...SIT.sup_tank],
  "Lillia|jgl":      [...SIT.jgl_ap],
  "Lissandra|mid":   [
    { es: "Vs. asesino: Zhonya's rush 2do item — activa con tu ult", en: "vs assassin: Zhonya's rush 2nd item — activate with your ult" },
    { es: "Vs. tanky: Shadowflame 2do item para pen + Void Staff 4to", en: "vs tanky: Shadowflame 2nd for pen + Void Staff 4th" },
    { es: "Si snowball: Rabadon's 3er item para one-shot con combo completo", en: "If snowballing: Rabadon's 3rd item for one-shot with full combo" },
    { es: "Vs. mucho AD: Seeker's Armguard early antes del rush principal", en: "vs heavy AD: Seeker's Armguard early before main rush" },
  ],
  "Lucian|adc":      [...SIT.adc_poke],
  "Lucian|mid":      [...SIT.mid_assassin],
  "Lulu|sup":        [...SIT.sup_enchanter],
  "Lux|mid":         [...SIT.mid_mage],
  "Lux|sup":         [...SIT.sup_mage],
  "Malphite|top":    [
    { es: "Vs. mucho AP: Mercury's Treads + Force of Nature como 2do item", en: "vs heavy AP: Mercury's Treads + Force of Nature as 2nd item" },
    { es: "Si tu equipo necesita engage: prioriza Ult level 6 para iniciar", en: "If team needs engage: prioritize Ult at lvl 6 to initiate" },
    { es: "Vs. tanky rival: Thornmail para devolver daño físico", en: "vs tanky rival: Thornmail to reflect physical damage" },
    { es: "Si vas por split: Dead Man's Plate para presión y movimiento", en: "If split pushing: Dead Man's Plate for pressure and movement" },
  ],
  "Malphite|jgl":    [...SIT.jgl_tank],
  "Maokai|top":      [...SIT.top_tank],
  "Maokai|sup":      [...SIT.sup_tank],
  "Master Yi|jgl":   [
    { es: "Vs. tanky: Kraken Slayer como 2do item obligatorio", en: "vs tanky: Kraken Slayer as mandatory 2nd item" },
    { es: "Vs. curación masiva: Mortal Reminder como 4to item", en: "vs heavy healing: Mortal Reminder as 4th item" },
    { es: "Vs. CC pesado: Mercury's Treads + Guinsoo's para poke seguro", en: "vs heavy CC: Mercury's Treads + Guinsoo's for safe poke" },
    { es: "Si snowball: Ravenous Hydra rush para AoE y sustain", en: "If snowballing: Ravenous Hydra rush for AoE and sustain" },
  ],
  "Mel|mid":         [
    { es: "Vs. asesino: Banshee's Veil rush 2do item", en: "vs assassin: Banshee's Veil rush 2nd item" },
    { es: "Vs. engage pesado: Zhonya's 3er item", en: "vs heavy engage: Zhonya's 3rd item" },
    { es: "Vs. tanky: Void Staff antes del 4to item", en: "vs tanky: Void Staff before 4th item" },
    { es: "Si snowball: Rabadon's 3er item para maximizar reflejo de daño", en: "If snowballing: Rabadon's 3rd item to maximize damage reflection" },
  ],
  "Milio|sup":       [...SIT.sup_enchanter],
  "Miss Fortune|adc": [
    { es: "Vs. engage pesado: Ghost + Galeforce para ser más difícil de cazar", en: "vs heavy engage: Ghost + Galeforce to be harder to catch" },
    { es: "Vs. tanky: Kraken Slayer 3er item", en: "vs tanky: Kraken Slayer 3rd item" },
    { es: "Vs. curación: Mortal Reminder rush antes de teamfights", en: "vs healing: Mortal Reminder rush before teamfights" },
    { es: "Si snowball: Shadowflame 2do item para AP Bullet Time build", en: "If snowballing: Shadowflame 2nd item for AP Bullet Time build" },
  ],
  "Mordekaiser|jgl": [
    { es: "Vs. tanky rival: Shadowflame 2do item para penetración mágica", en: "vs tanky rival: Shadowflame 2nd item for magic pen" },
    { es: "Vs. curación masiva: Demonic Embrace para % HP burn pasivo", en: "vs heavy healing: Demonic Embrace for % HP burn passive" },
    { es: "Vs. mucho CC: Mercury's Treads obligatorio", en: "vs heavy CC: Mercury's Treads mandatory" },
    { es: "Si snowball: Rabadon's 3er item para one-shot en 1v1", en: "If snowballing: Rabadon's 3rd item for 1v1 one-shot" },
  ],
  "Mordekaiser|top": [...SIT.top_bruiser_ap],
  "Morgana|mid":     [...SIT.mid_mage],
  "Morgana|sup":     [
    { es: "Vs. engage pesado: prioriza E en tu carry fed más que en ti", en: "vs heavy engage: prioritize E on your fed carry over yourself" },
    { es: "Vs. poke pesado: Segunda Wind + Rylai's para slow y resistencia", en: "vs heavy poke: Second Wind + Rylai's for slow and resistance" },
    { es: "Vs. asesino fed: Locket of Iron Solari para escudo de área", en: "vs fed assassin: Locket of Iron Solari for area shield" },
    { es: "Si tu equipo va a teamfight: Shadowflame para más daño de W", en: "If team goes teamfight: Shadowflame for more W damage" },
  ],
  "Nami|sup":        [...SIT.sup_enchanter],
  "Nasus|top":       [
    { es: "Vs. poke pesado: Second Wind + Doran's Shield start", en: "vs heavy poke: Second Wind + Doran's Shield start" },
    { es: "Vs. mucho AP: Mercury's Treads + Spirit Visage/Force of Nature", en: "vs heavy AP: Mercury's Treads + Spirit Visage/Force of Nature" },
    { es: "Vs. ignite/dot pesado: Revitalize + Overgrowth para curación", en: "vs ignite/heavy dot: Revitalize + Overgrowth for healing" },
    { es: "Si vas muy adelante en stacks: rush Overlord's Bloodmail", en: "If way ahead on stacks: rush Overlord's Bloodmail" },
  ],
  "Nautilus|sup":    [...SIT.sup_tank],
  "Nautilus|jgl":    [...SIT.jgl_tank],
  "Nidalee|jgl":     [...SIT.jgl_ap],
  "Nilah|adc":       [
    { es: "Vs. poke: Immortal Shieldbow rush para mejor sustain en línea", en: "vs poke: Immortal Shieldbow rush for better lane sustain" },
    { es: "Vs. tanky: Kraken Slayer como 3er item", en: "vs tanky: Kraken Slayer as 3rd item" },
    { es: "Vs. curación: Mortal Reminder 4to item", en: "vs healing: Mortal Reminder 4th item" },
    { es: "Si snowball: Ravenous Hydra 2do item para AoE y sustain", en: "If snowballing: Ravenous Hydra 2nd item for AoE and sustain" },
  ],
  "Nocturne|jgl":    [...SIT.jgl_assassin],
  "Norra|sup":       [
    { es: "Vs. engage pesado: Knight's Vow para redirigir daño de tu carry", en: "vs heavy engage: Knight's Vow to redirect damage from carry" },
    { es: "Vs. poke rival: Second Wind + Revitalize para sustain en línea", en: "vs poke rival: Second Wind + Revitalize for lane sustain" },
    { es: "Si tu equipo es full AP: considera Shurelya's para rotación", en: "If team is full AP: consider Shurelya's for rotation speed" },
    { es: "Si tu ADC lleva attack speed: Ardent Censer antes de Redemption", en: "If ADC plays attack speed: Ardent Censer before Redemption" },
  ],
  "Nunu & Willump|jgl": [...SIT.jgl_tank],
  "Olaf|jgl":        [...SIT.jgl_fighter],
  "Orianna|mid":     [
    { es: "Vs. asesino: Zhonya's rush 2do item — activa inmediatamente al ser catado", en: "vs assassin: Zhonya's rush 2nd item — activate immediately when caught" },
    { es: "Vs. tanky: Void Staff 4to item obligatorio", en: "vs tanky: Void Staff 4th item mandatory" },
    { es: "Si tu equipo es engage heavy: posiciónate para dar la shockwave perfecta", en: "If team is engage heavy: position to deliver perfect shockwave" },
    { es: "Si snowball: Rabadon's 3er item para daño masivo de teamfight", en: "If snowballing: Rabadon's 3rd item for massive teamfight damage" },
  ],
  "Ornn|top":        [
    { es: "Vs. mucho AP: Mercury's Treads + Force of Nature rush", en: "vs heavy AP: Mercury's Treads + Force of Nature rush" },
    { es: "Prioriza upgradejar los items del equipo cuando alcances nivel 13+", en: "Prioritize upgrading team items when you reach level 13+" },
    { es: "Vs. split pusher rival: Dead Man's Plate para catch", en: "vs enemy split pusher: Dead Man's Plate for catch" },
    { es: "Vs. curación masiva: Thornmail como 3er item", en: "vs heavy healing: Thornmail as 3rd item" },
  ],
  "Pantheon|sup":    [...SIT.sup_tank],
  "Pantheon|top":    [...SIT.top_fighter],
  "Poppy|top":       [...SIT.top_tank],
  "Poppy|jgl":       [...SIT.jgl_tank],
  "Pyke|sup":        [
    { es: "Vs. tanky: Umbral Glaive para visión + Black Cleaver pen", en: "vs tanky: Umbral Glaive for vision + Black Cleaver pen" },
    { es: "Vs. curación masiva: Mortal Reminder como 4to item", en: "vs heavy healing: Mortal Reminder as 4th item" },
    { es: "Vs. CC pesado rival: Mercury's Treads + Edge of Night", en: "vs heavy CC rival: Mercury's Treads + Edge of Night" },
    { es: "Si tu ADC va adelante: sigue roameando mid para ampliar ventaja", en: "If ADC is ahead: keep roaming mid to extend lead" },
  ],
  "Rakan|sup":       [
    { es: "Vs. poke pesado: Second Wind + Revitalize para sobrevivir en línea", en: "vs heavy poke: Second Wind + Revitalize to survive lane" },
    { es: "Vs. asesino: Knight's Vow para proteger a tu ADC", en: "vs assassin: Knight's Vow to protect your ADC" },
    { es: "Si tu equipo necesita peel: Locket of Iron Solari en lugar de Shurelya's", en: "If team needs peel: Locket of Iron Solari instead of Shurelya's" },
    { es: "Si snowball: rush Shurelya's para ampliar ventaja con rotaciones", en: "If snowballing: rush Shurelya's to extend lead with rotations" },
  ],
  "Rammus|jgl":      [
    { es: "Vs. mucho AP: Mercury's Treads + Force of Nature — pasiva escala con MR", en: "vs heavy AP: Mercury's Treads + Force of Nature — passive scales with MR" },
    { es: "Vs. curación rival: Thornmail como 2do item para devolver daño", en: "vs healing: Thornmail as 2nd item to reflect damage" },
    { es: "Vs. AD pesado: Plated Steelcaps + Dead Man's Plate + Thornmail stack", en: "vs heavy AD: Plated Steelcaps + Dead Man's + Thornmail stack" },
    { es: "Si snowball: rush Warmog para regeneración masiva entre peleas", en: "If snowballing: rush Warmog for massive regen between fights" },
  ],
  "Rell|sup":        [...SIT.sup_tank],
  "Renekton|top":    [...SIT.top_fighter],
  "Rengar|jgl":      [...SIT.jgl_assassin],
  "Riven|top":       [
    { es: "Vs. mucho AP: Mercury's Treads + Maw of Malmortius obligatorio", en: "vs heavy AP: Mercury's Treads + Maw of Malmortius mandatory" },
    { es: "Vs. tanky: Black Cleaver rush antes de Death's Dance", en: "vs tanky: Black Cleaver rush before Death's Dance" },
    { es: "Vs. shields masivos rival: Serpent's Fang 3er item", en: "vs heavy shields: Serpent's Fang 3rd item" },
    { es: "Si snowball: rush Ravenous Hydra para waveclear + sustain combo", en: "If snowballing: rush Ravenous Hydra for waveclear + sustain combo" },
  ],
  "Rumble|top":      [...SIT.top_bruiser_ap],
  "Rumble|mid":      [...SIT.mid_mage],
  "Ryze|mid":        [...SIT.mid_battle_mage],
  "Samira|adc":      [
    { es: "Vs. curación masiva: Executioner's Calling rush antes de Infinity Edge", en: "vs heavy healing: Executioner's Calling rush before Infinity Edge" },
    { es: "Vs. tanky: Lord Dominik's rush como 3er item", en: "vs tanky: Lord Dominik's rush as 3rd item" },
    { es: "Vs. engage: Sterak's Gage como 3er item para escudo al recibir daño", en: "vs engage: Sterak's Gage as 3rd item for shield when taking damage" },
    { es: "Si snowball temprano: rush Infinity Edge 2do item directamente", en: "If early snowball: rush Infinity Edge as 2nd item directly" },
  ],
  "Senna|adc":       [
    { es: "Vs. tanky: Kraken Slayer como 3er item para % HP damage", en: "vs tanky: Kraken Slayer as 3rd item for % HP damage" },
    { es: "Vs. poke rival: Life steal rush para sustain en línea", en: "vs poke rival: Life steal rush for lane sustain" },
    { es: "Vs. mucho AP: Mercury's Treads + Wit's End", en: "vs heavy AP: Mercury's Treads + Wit's End" },
    { es: "Si tu equipo necesita healer: prioriza Moonstone Renewer + Redemption", en: "If team needs healer: prioritize Moonstone Renewer + Redemption" },
  ],
  "Senna|sup":       [
    { es: "Vs. poke rival: Second Wind para más sustain en línea", en: "vs poke rival: Second Wind for more lane sustain" },
    { es: "Si tu ADC necesita healer: Moonstone Renewer + Staff of Flowing Water", en: "If ADC needs healing: Moonstone Renewer + Staff of Flowing Water" },
    { es: "Vs. engage: Knight's Vow para proteger tu carry", en: "vs engage: Knight's Vow to protect your carry" },
    { es: "Si snowball: rush Eclipse para más daño personal + escudo", en: "If snowballing: rush Eclipse for more personal damage + shield" },
  ],
  "Seraphine|mid":   [...SIT.mid_mage],
  "Seraphine|sup":   [...SIT.sup_enchanter],
  "Sett|top":        [...SIT.top_fighter],
  "Sett|sup":        [...SIT.sup_tank],
  "Shen|top":        [
    { es: "Vs. mucho AP: Mercury's Treads + Force of Nature rush", en: "vs heavy AP: Mercury's Treads + Force of Nature rush" },
    { es: "Vs. tanky rival: Sunfire Aegis para DPS pasivo en split", en: "vs tanky rival: Sunfire Aegis for passive DPS in split" },
    { es: "Comunica siempre tu ult a tu equipo — decide quién necesita más el escudo", en: "Always communicate your ult to team — decide who needs shield most" },
    { es: "Si tu ADC va muy adelante: guarda ult para protegerle en teamfight", en: "If your ADC is very ahead: save ult to protect them in teamfight" },
  ],
  "Shyvana|jgl":     [...SIT.jgl_ap],
  "Singed|top":      [
    { es: "Vs. ranged pokeadora: Rylai's rush para slow en kiting", en: "vs ranged poke: Rylai's rush for slow in kiting" },
    { es: "Vs. mucho AP: Mercury's Treads + Force of Nature rush", en: "vs heavy AP: Mercury's Treads + Force of Nature rush" },
    { es: "Vs. CC pesado: Mercury's Treads obligatorio + Unflinching", en: "vs heavy CC: Mercury's Treads mandatory + Unflinching" },
    { es: "Vs. curación rival: Thornmail para devolver el poison damage", en: "vs enemy healing: Thornmail to boost poison damage" },
  ],
  "Sion|top":        [
    { es: "Vs. mucho AP: Mercury's Treads + Force of Nature rush", en: "vs heavy AP: Mercury's Treads + Force of Nature rush" },
    { es: "Vs. curación masiva: Thornmail como 3er item", en: "vs heavy healing: Thornmail as 3rd item" },
    { es: "Vs. poke ranged: Overgrowth + Second Wind para escalar HP en split", en: "vs ranged poke: Overgrowth + Second Wind to scale HP in split" },
    { es: "Si tu equipo necesita engage: prioriza Frostfire Gauntlet para slow en teamfight", en: "If team needs engage: prioritize Frostfire Gauntlet for teamfight slow" },
  ],
  "Sivir|adc":       [...SIT.adc_crit],
  "Skarner|jgl":     [
    { es: "Vs. carries con escudo: Serpent's Fang antes de usar Ult", en: "vs shielded carries: Serpent's Fang before using Ult" },
    { es: "Vs. mucho AP: Mercury's Treads + Force of Nature rush", en: "vs heavy AP: Mercury's Treads + Force of Nature rush" },
    { es: "Vs. curación rival: Thornmail como 3er item", en: "vs healing: Thornmail as 3rd item" },
    { es: "Comunica siempre tu Ult antes de usarla — arrastra hacia tu equipo", en: "Always communicate your Ult before using — drag toward your team" },
  ],
  "Skarner|top":     [...SIT.top_tank],
  "Smolder|adc":     [
    { es: "Vs. engage: Galeforce rush para dash de emergencia", en: "vs engage: Galeforce rush for emergency dash" },
    { es: "Vs. tanky: Kraken Slayer 3er item", en: "vs tanky: Kraken Slayer 3rd item" },
    { es: "Vs. curación: Mortal Reminder 4to item", en: "vs healing: Mortal Reminder 4th item" },
    { es: "Si snowball: rush IE 2do item — stacks de Q se acumulan más rápido", en: "If snowballing: rush IE 2nd item — Q stacks accumulate faster" },
  ],
  "Sona|sup":        [...SIT.sup_enchanter],
  "Soraka|sup":      [
    { es: "Vs. poke heavy: Revitalize obligatorio para maximizar curas", en: "vs heavy poke: Revitalize mandatory to maximize heals" },
    { es: "Vs. ignite/anti-heal: avisa a tu equipo, considera Mikael's para limpiar", en: "vs ignite/anti-heal: warn team, consider Mikael's for cleanse" },
    { es: "Vs. engage: posiciónate MUY atrás — no puedes hacer nada si te cogen", en: "vs engage: position VERY far back — you can't do anything if caught" },
    { es: "Si tu ADC es crit: Ardent Censer antes de Redemption", en: "If ADC plays crit: Ardent Censer before Redemption" },
  ],
  "Swain|mid":       [...SIT.mid_battle_mage],
  "Swain|sup":       [...SIT.sup_mage],
  "Syndra|mid":      [...SIT.mid_mage],
  "Taliyah|mid":     [...SIT.mid_mage],
  "Taliyah|jgl":     [...SIT.jgl_ap],
  "Talon|mid":       [...SIT.mid_assassin],
  "Talon|jgl":       [...SIT.jgl_assassin],
  "Teemo|top":       [
    { es: "Vs. engage: posiciona shrooms en rutas de gank para bloquear", en: "vs engage: place shrooms on gank routes to block" },
    { es: "Vs. tanky rival: Void Staff 3er item obligatorio", en: "vs tanky rival: Void Staff 3rd item mandatory" },
    { es: "Vs. curación rival: Mortal Reminder 4to item + Liandry's para % HP", en: "vs enemy healing: Mortal Reminder 4th + Liandry's for % HP" },
    { es: "Si vas muy adelante: rush Rabadon's 3er item para one-shot potential", en: "If way ahead: rush Rabadon's 3rd item for one-shot potential" },
  ],
  "Thresh|sup":      [...SIT.sup_tank],
  "Tristana|adc":    [
    { es: "Vs. tanky: Kraken Slayer como 3er item", en: "vs tanky: Kraken Slayer as 3rd item" },
    { es: "Vs. curación masiva: Mortal Reminder 4to item", en: "vs heavy healing: Mortal Reminder 4th item" },
    { es: "Vs. poke pesado en línea: Immortal Shieldbow en vez de IE como 1er item", en: "vs heavy lane poke: Immortal Shieldbow over IE as 1st item" },
    { es: "Si snowball: rush IE 2do directamente para maximizar daño de Ult", en: "If snowballing: rush IE 2nd directly to maximize Ult damage" },
  ],
  "Tryndamere|top":  [
    { es: "Vs. mucho AP: Mercury's Treads + Maw of Malmortius", en: "vs heavy AP: Mercury's Treads + Maw of Malmortius" },
    { es: "Vs. CC pesado: Mercury's Treads siempre — dependes de tu ult para sobrevivir", en: "vs heavy CC: Mercury's Treads always — you rely on ult to survive" },
    { es: "Vs. curación rival: Mortal Reminder como 4to item", en: "vs enemy healing: Mortal Reminder as 4th item" },
    { es: "Si snowball: Ravenous Hydra 2do item para waveclear + sustain", en: "If snowballing: Ravenous Hydra 2nd for waveclear + sustain" },
  ],
  "Twisted Fate|mid": [
    { es: "Vs. tanky: Shadowflame + Void Staff para máxima penetración", en: "vs tanky: Shadowflame + Void Staff for max pen" },
    { es: "Vs. asesino: Banshee's Veil 3er item para protección", en: "vs assassin: Banshee's Veil 3rd item for protection" },
    { es: "Si puedes roamear: Lucidez de Botas para más CDR y más cartas", en: "If roaming: Ionian Boots for more CDR and more cards" },
    { es: "Vs. engage rival: Zhonya's 3er item para usar ult de forma segura", en: "vs heavy engage: Zhonya's 3rd item to ult safely" },
  ],
  "Twitch|adc":      [...SIT.adc_onhit],
  "Urgot|top":       [...SIT.top_fighter],
  "Varus|adc":       [...SIT.adc_poke],
  "Vayne|adc":       [
    { es: "Vs. poke pesado en línea: Immortal Shieldbow rush para sustain", en: "vs heavy lane poke: Immortal Shieldbow rush for sustain" },
    { es: "Vs. CC pesado: Mercury's Treads + Banshee's Veil para sobrevivir", en: "vs heavy CC: Mercury's Treads + Banshee's Veil to survive" },
    { es: "Vs. curación rival: Mortal Reminder 4to item", en: "vs enemy healing: Mortal Reminder 4th item" },
    { es: "Vs. tanky: Guinsoo's Rageblade 2do item para % HP on-hit build", en: "vs tanky: Guinsoo's Rageblade 2nd item for % HP on-hit build" },
  ],
  "Veigar|mid":      [
    { es: "Vs. asesino: Zhonya's rush 2do item — activa al ser catado para AP infinito", en: "vs assassin: Zhonya's rush 2nd item — activate when caught for infinite AP" },
    { es: "Vs. tanky: Void Staff 3er item para penetración", en: "vs tanky: Void Staff 3rd item for pen" },
    { es: "Vs. mucho AD: Seeker's Armguard rush + Zhonya's temprano", en: "vs heavy AD: Seeker's Armguard rush + early Zhonya's" },
    { es: "Si snowball: Rabadon's 3er item para daño one-shot masivo", en: "If snowballing: Rabadon's 3rd item for massive one-shot damage" },
  ],
  "Vel'Koz|mid":     [...SIT.mid_mage],
  "Vel'Koz|sup":     [...SIT.sup_mage],
  "Vex|mid":         [...SIT.mid_mage],
  "Vi|jgl":          [...SIT.jgl_fighter],
  "Viego|jgl":       [...SIT.jgl_assassin],
  "Viktor|mid":      [
    { es: "Vs. asesino: Zhonya's rush 2do item — activa al ser catado", en: "vs assassin: Zhonya's rush 2nd item — activate when caught" },
    { es: "Vs. tanky: Shadowflame + Void Staff para penetración máxima", en: "vs tanky: Shadowflame + Void Staff for max pen" },
    { es: "Si snowball: Rabadon's 3er item para daño E masivo en teamfight", en: "If snowballing: Rabadon's 3rd item for massive E damage in teamfight" },
    { es: "Vs. mucho AD: Seeker's Armguard + Zhonya's temprano", en: "vs heavy AD: Seeker's Armguard + early Zhonya's" },
  ],
  "Vladimir|top":    [...SIT.top_bruiser_ap],
  "Vladimir|mid":    [...SIT.mid_battle_mage],
  "Volibear|top":    [...SIT.top_tank],
  "Volibear|jgl":    [...SIT.jgl_tank],
  "Warwick|jgl":     [
    { es: "Vs. curación masiva rival: Mortal Reminder como 4to item", en: "vs heavy enemy healing: Mortal Reminder as 4th item" },
    { es: "Vs. tanky: Black Cleaver rush antes de Sterak's", en: "vs tanky: Black Cleaver rush before Sterak's" },
    { es: "Vs. mucho AP: Mercury's Treads + Wit's End como 3er item", en: "vs heavy AP: Mercury's Treads + Wit's End as 3rd item" },
    { es: "Si snowball: rush Trinity Force para más daño en skirmishes", en: "If snowballing: rush Trinity Force for more skirmish damage" },
  ],
  "Wukong|top":      [...SIT.top_fighter],
  "Wukong|jgl":      [...SIT.jgl_fighter],
  "Xayah|adc":       [...SIT.adc_crit],
  "Xin Zhao|jgl":    [...SIT.jgl_fighter],
  "Yasuo|mid":       [
    { es: "Vs. poke pesado: Immortal Shieldbow rush 1er item para mejor escudo", en: "vs heavy poke: Immortal Shieldbow rush 1st for better shield" },
    { es: "Vs. tanky: Lord Dominik's 3er item para armor pen", en: "vs tanky: Lord Dominik's 3rd item for armor pen" },
    { es: "Vs. AP pesado: Mercury's Treads siempre", en: "vs heavy AP: Mercury's Treads always" },
    { es: "Si snowball: rush Phantom Dancer 2do para más crit y movilidad", en: "If snowballing: rush Phantom Dancer 2nd for more crit and mobility" },
  ],
  "Yone|mid":        [
    { es: "Vs. poke pesado: Immortal Shieldbow rush 1er item para sustain", en: "vs heavy poke: Immortal Shieldbow rush 1st for sustain" },
    { es: "Vs. tanky: Lord Dominik's 3er item para penetración", en: "vs tanky: Lord Dominik's 3rd item for pen" },
    { es: "Vs. mucho AP: Mercury's Treads + Maw of Malmortius", en: "vs heavy AP: Mercury's Treads + Maw of Malmortius" },
    { es: "Si snowball: rush Kraken Slayer 2do para % HP on-hit build", en: "If snowballing: rush Kraken Slayer 2nd for % HP on-hit build" },
  ],
  "Yone|top":        [
    { es: "Vs. AP: Mercury's Treads + Maw of Malmortius obligatorio", en: "vs AP: Mercury's Treads + Maw of Malmortius mandatory" },
    { es: "Vs. tanky: Black Cleaver rush antes que Sterak's", en: "vs tanky: Black Cleaver rush before Sterak's" },
    { es: "Si snowball: rush Phantom Dancer 2do para movilidad en split", en: "If snowballing: rush Phantom Dancer 2nd for split push mobility" },
    { es: "Vs. curación rival: Mortal Reminder como 4to item", en: "vs enemy healing: Mortal Reminder as 4th item" },
  ],
  "Yuumi|sup":       [
    { es: "Vs. asesino: monta solo a carries con escudo o dash, no Malphite", en: "vs assassin: mount only shielded/dash carries, not Malphite" },
    { es: "Vs. poke pesado: apégate a tu ADC desde el inicio, no explores", en: "vs heavy poke: stick to your ADC from the start, don't explore" },
    { es: "Si tu ADC lleva attack speed: Ardent Censer es tu primer item", en: "If ADC plays attack speed: Ardent Censer is your first item" },
    { es: "Si su ADC lleva AP: Staff of Flowing Water + Moonstone Renewer", en: "If ADC plays AP: Staff of Flowing Water + Moonstone Renewer" },
  ],
  "Zed|mid":         [...SIT.mid_assassin],
  "Zeri|adc":        [
    { es: "Vs. tanky: Kraken Slayer 2do item para % HP damage", en: "vs tanky: Kraken Slayer 2nd item for % HP damage" },
    { es: "Vs. asesino: Guardian Angel rush 3er item para sobrevivir", en: "vs assassin: Guardian Angel rush 3rd item to survive" },
    { es: "Vs. curación: Mortal Reminder como 4to item", en: "vs healing: Mortal Reminder as 4th item" },
    { es: "Si snowball: rush RFC 2do para rango máximo y daño en Q", en: "If snowballing: rush RFC 2nd for max range and Q damage" },
  ],
  "Ziggs|mid":       [...SIT.mid_mage],
  "Zilean|mid":      [
    { es: "Vs. asesino: Zhonya's rush 2do item — activa en cuanto te caten", en: "vs assassin: Zhonya's rush 2nd item — activate immediately when caught" },
    { es: "Vs. engage: posiciónate para salvar al carry con tu ult", en: "vs engage: position to save your carry with your ult" },
    { es: "Vs. poke: Banshee's Veil 3er item para protección extra", en: "vs poke: Banshee's Veil 3rd item for extra protection" },
    { es: "Si snowball: comunica siempre a quién vas a revivir con tu Ult", en: "If snowballing: always communicate who you're reviving with your Ult" },
  ],
  "Zilean|sup":      [
    { es: "Prioriza siempre guardar Ult para el carry más fed del equipo", en: "Always prioritize saving Ult for the most fed team carry" },
    { es: "Vs. poke rival: Second Wind + Revitalize para sobrevivir en línea", en: "vs poke rival: Second Wind + Revitalize to survive lane" },
    { es: "Vs. engage: comunica al equipo que guardes Ult antes de fight", en: "vs engage: communicate to team that you're saving Ult before fight" },
    { es: "Si tu ADC lleva crit: Ardent Censer antes de Redemption", en: "If ADC plays crit: Ardent Censer before Redemption" },
  ],
  "Zoe|mid":         [
    { es: "Vs. asesino: Zhonya's rush 2do item — posiciónate atrás siempre", en: "vs assassin: Zhonya's rush 2nd item — always position in back" },
    { es: "Vs. tanky: Shadowflame 2do item para penetración", en: "vs tanky: Shadowflame 2nd item for pen" },
    { es: "Si snowball: Rabadon's 3er item para one-shot con Q potenciado", en: "If snowballing: Rabadon's 3rd item for one-shot with empowered Q" },
    { es: "Vs. mucho engage: usa E para dormir antes de que entren", en: "vs heavy engage: use E to sleep before they engage" },
  ],
  "Zyra|sup":        [...SIT.sup_mage],
  "Zyra|mid":        [...SIT.mid_mage],
};

// ── Default fallback by role ───────────────────────────────────────────────────
function getDefault(role) {
  if (role === 'top')  return SIT.top_fighter;
  if (role === 'jgl')  return SIT.jgl_fighter;
  if (role === 'mid')  return SIT.mid_mage;
  if (role === 'adc')  return SIT.adc_crit;
  if (role === 'sup')  return SIT.sup_enchanter;
  return SIT.top_fighter;
}

// ── Apply ─────────────────────────────────────────────────────────────────────
let added = 0, updated = 0;
data.forEach(champ => {
  (champ.roles || []).forEach(roleData => {
    const key = `${champ.name}|${roleData.role}`;
    const notes = OVERRIDES[key] || getDefault(roleData.role);
    if (!roleData.situational) added++;
    else updated++;
    roleData.situational = notes;
  });
});

fs.writeFileSync('./data/champions.json', JSON.stringify(data, null, 2), 'utf8');
console.log(`Done. Added: ${added} | Updated: ${updated}`);

// Verify
const check = JSON.parse(fs.readFileSync('./data/champions.json', 'utf8'));
let total = 0, missing = 0;
check.forEach(c => c.roles.forEach(r => {
  if (!r.situational || r.situational.length === 0) { missing++; console.log('MISSING:', c.name, r.role); }
  else total += r.situational.length;
}));
console.log(`Total situational notes: ${total} | Missing: ${missing}`);
