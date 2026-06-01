import { useState } from "react";

const TIER_COLORS = {
  ss: { color: "#f0c96e", bg: "rgba(240,201,110,0.10)", border: "rgba(240,201,110,0.30)" },
  s:  { color: "#4ade80", bg: "rgba(74,222,128,0.08)",  border: "rgba(74,222,128,0.25)" },
  a:  { color: "#6bb3ff", bg: "rgba(74,144,217,0.10)",  border: "rgba(74,144,217,0.30)" },
  b:  { color: "#a0aec0", bg: "rgba(160,174,192,0.08)", border: "rgba(160,174,192,0.20)" },
  c:  { color: "#fb923c", bg: "rgba(251,146,60,0.08)",  border: "rgba(251,146,60,0.25)" },
  d:  { color: "#e05555", bg: "rgba(224,85,85,0.08)",   border: "rgba(224,85,85,0.25)" },
};

// ─── Traducciones de items ────────────────────────────────────────────────────
const ITEM_ES = {
  "Plated Steelcaps": "Pisadas Aceradas",
  "Ionian Boots of Lucidity": "Botas Jónicas de Lucidez",
  "Sorcerer's Shoes": "Zapatos de Hechicero",
  "Berserker's Greaves": "Grebas del Berserker",
  "Trinity Force": "Fuerza Trinidad",
  "Sterak's Gage": "Galga de Sterak",
  "Death's Dance": "Danza de la Muerte",
  "Black Cleaver": "Hacha Negra",
  "Sunfire Aegis": "Égida de Fuego Solar",
  "Frostfire Gauntlet": "Guantelete de Escarcha",
  "Warmog's Armor": "Armadura de Warmog",
  "Gargoyle Stoneplate": "Placa de Piedra Gárgola",
  "Force of Nature": "Fuerza de la Naturaleza",
  "Ravenous Hydra": "Hidra Voraz",
  "Lord Dominik's Regards": "Saludos de Lord Dominik",
  "Lord Dominik's": "Saludos de Lord Dominik",
  "Guardian Angel": "Ángel Guardián",
  "Maw of Malmortius": "Fauces de Malmortius",
  "Infinity Edge": "Filo al Infinito",
  "Immortal Shieldbow": "Escudoarco Inmortal",
  "Phantom Dancer": "Bailarín Fantasma",
  "Kraken Slayer": "Matacraken",
  "Wit's End": "Fin del Ingenio",
  "Guinsoo's Rageblade": "Hoja de Furia de Guinsoo",
  "Luden's Tempest": "Tempestad de Luden",
  "Shadowflame": "Llama Sombría",
  "Rabadon's Deathcap": "Sombrero de la Muerte de Rabadon",
  "Void Staff": "Bastón del Vacío",
  "Zhonya's Hourglass": "Reloj de Arena de Zhonya",
  "Cosmic Drive": "Impulso Cósmico",
  "Riftmaker": "Hacedor de Grietas",
  "Demonic Embrace": "Abrazo Demoníaco",
  "Liandry's Torment": "Tormento de Liandry",
  "Rod of Ages": "Vara de las Eras",
  "Hextech Gunblade": "Espadapistola Hextech",
  "Duskblade": "Hoja del Crepúsculo",
  "Edge of Night": "Filo de la Noche",
  "Serpent's Fang": "Colmillo de Serpiente",
  "Essence Reaver": "Saqueador de Esencia",
  "Manamune": "Manamune",
  "Galeforce": "Fuerza de Vendaval",
  "Rapid Firecannon": "Cañón de Fuego Rápido",
  "Bloodthirster": "Sedienta de Sangre",
  "Runaan's Hurricane": "Huracán de Runaan",
  "Terminus": "Terminus",
  "Locket of the Iron Solari": "Relicario de los Solari de Hierro",
  "Shurelya's Battlesong": "Canto de Batalla de Shurelya",
  "Redemption": "Redención",
  "Knight's Vow": "Voto del Caballero",
  "Ardent Censer": "Incensario Ardiente",
  "Staff of Flowing Water": "Bastón del Agua Fluyente",
  "Moonstone Renewer": "Piedra Lunar Renovadora",
  "Dead Man's Plate": "Placa del Hombre Muerto",
  "Overlord's Bloodmail": "Cota de Malla Sangrienta del Señor",
  "Rylai's Crystal Scepter": "Cetro de Cristal de Rylai",
  "Thornmail": "Cota de Espinas",
  "Frozen Heart": "Corazón Helado",
  "Umbral Glaive": "Glaive Umbral",
};

// ─── Traducciones de runas ────────────────────────────────────────────────────
const RUNE_ES = {
  "Conqueror": "Conquistador",
  "Electrocute": "Electrocutar",
  "Grasp of the Undying": "Agarre del Inmortal",
  "Lethal Tempo": "Tempo Letal",
  "Arcane Comet": "Cometa Arcano",
  "Phase Rush": "Precipitación de Fase",
  "Dark Harvest": "Cosecha Oscura",
  "Fleet Footwork": "Trabajo de Pies Ágil",
  "Aftershock": "Réplica",
  "Summon Aery": "Convocar a Aery",
  "First Strike": "Primer Golpe",
  "Triumph": "Triunfo",
  "Alacrity": "Presteza",
  "Last Stand": "Última Resistencia",
  "Legend: Alacrity": "Leyenda: Presteza",
  "Coup de Grace": "Golpe de Gracia",
  "Presence of Mind": "Presencia Mental",
  "Sudden Impact": "Impacto Repentino",
  "Eyeball Collection": "Colección de Globos Oculares",
  "Ravenous Hunter": "Cazador Voraz",
  "Manaflow Band": "Banda de Flujo de Maná",
  "Transcendence": "Trascendencia",
  "Scorch": "Chamuscar",
  "Waterwalking": "Caminar sobre el Agua",
  "Gathering Storm": "Tormenta en Formación",
  "Absolute Focus": "Enfoque Absoluto",
  "Demolish": "Demoler",
  "Conditioning": "Acondicionamiento",
  "Overgrowth": "Crecimiento Desmesurado",
  "Bone Plating": "Blindaje Óseo",
  "Unflinching": "Impasible",
  "Revitalize": "Revitalizar",
  "Nullifying Orb": "Orbe Anulador",
};

// ─── Imágenes de items (Data Dragon + Community Dragon para exclusivos WR) ────
const _D = "https://ddragon.leagueoflegends.com/cdn/16.11.1/img/item/";
const _C = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/";
const ITEM_IMG = {
  "Plated Steelcaps":          _D + "3047.png",
  "Sorcerer's Shoes":          _D + "3020.png",
  "Ionian Boots of Lucidity":  _D + "3158.png",
  "Berserker's Greaves":       _D + "3111.png",
  "Trinity Force":             _D + "3078.png",
  "Sterak's Gage":             _D + "3053.png",
  "Death's Dance":             _D + "6333.png",
  "Black Cleaver":             _D + "3071.png",
  "Ravenous Hydra":            _D + "3074.png",
  "Maw of Malmortius":         _D + "3156.png",
  "Wit's End":                 _D + "3091.png",
  "Guinsoo's Rageblade":       _D + "3124.png",
  "Sunfire Aegis":             _D + "3068.png",
  "Warmog's Armor":            _D + "3083.png",
  "Gargoyle Stoneplate":       _D + "3193.png",
  "Force of Nature":           _D + "3212.png",
  "Frostfire Gauntlet":        _D + "6664.png",
  "Dead Man's Plate":          _D + "3742.png",
  "Frozen Heart":              _D + "3110.png",
  "Thornmail":                 _D + "3075.png",
  "Luden's Tempest":           _D + "3285.png",
  "Shadowflame":               _D + "4645.png",
  "Rabadon's Deathcap":        _D + "3089.png",
  "Void Staff":                _D + "3135.png",
  "Zhonya's Hourglass":        _D + "3157.png",
  "Cosmic Drive":              _D + "4637.png",
  "Riftmaker":                 _D + "6653.png",
  "Demonic Embrace":           _D + "4638.png",
  "Liandry's Torment":         _D + "3100.png",
  "Rod of Ages":               _D + "3001.png",
  "Hextech Gunblade":          _D + "3152.png",
  "Rylai's Crystal Scepter":   _D + "3116.png",
  "Infinity Edge":             _D + "3031.png",
  "Immortal Shieldbow":        _D + "6673.png",
  "Phantom Dancer":            _D + "3046.png",
  "Galeforce":                 _D + "6035.png",
  "Rapid Firecannon":          _D + "3094.png",
  "Bloodthirster":             _D + "3072.png",
  "Runaan's Hurricane":        _D + "3085.png",
  "Kraken Slayer":             _D + "6695.png",
  "Essence Reaver":            _D + "3508.png",
  "Manamune":                  _D + "3004.png",
  "Duskblade":                 _D + "6691.png",
  "Edge of Night":             _D + "4636.png",
  "Serpent's Fang":            _D + "6694.png",
  "Umbral Glaive":             _D + "6693.png",
  "Locket of the Iron Solari": _D + "3190.png",
  "Redemption":                _D + "3107.png",
  "Knight's Vow":              _D + "3109.png",
  "Ardent Censer":             _D + "3504.png",
  "Moonstone Renewer":         _D + "6617.png",
  "Shurelya's Battlesong":     _D + "2065.png",
  "Staff of Flowing Water":    _D + "6616.png",
  "Lord Dominik's Regards":    _D + "3033.png",
  "Lord Dominik's":            _D + "3033.png",
  "Guardian Angel":            _D + "3026.png",
  "Overlord's Bloodmail":      _C + "7111_overlordsbloodmail.png",
  "Terminus":                  _C + "7014_terminus.png",
};

// ─── Imágenes de runas (Community Dragon) ────────────────────────────────────
const _R = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/";
const RUNE_IMG = {
  "Conqueror":            _R + "precision/conqueror/conqueror.png",
  "Electrocute":          _R + "domination/electrocute/electrocute.png",
  "Grasp of the Undying": _R + "resolve/graspoftheundying/graspoftheundying.png",
  "Lethal Tempo":         _R + "precision/lethaltempo/lethaltempoTemp.png",
  "Arcane Comet":         _R + "sorcery/arcanecomet/arcanecomet.png",
  "Phase Rush":           _R + "sorcery/phaserush/phaserush.png",
  "Dark Harvest":         _R + "domination/darkharvest/darkharvest.png",
  "Fleet Footwork":       _R + "precision/fleetfootwork/fleetfootwork.png",
  "Aftershock":           _R + "resolve/veteranaftershock/veteranaftershock.png",
  "Summon Aery":          _R + "sorcery/summonaery/summonaery.png",
  "First Strike":         _R + "inspiration/firststrike/firststrike.png",
  "Triumph":              _R + "precision/triumph.png",
  "Alacrity":             _R + "precision/legendalacrity/legendalacrity.png",
  "Last Stand":           _R + "precision/laststand/laststand.png",
  "Legend: Alacrity":     _R + "precision/legendalacrity/legendalacrity.png",
  "Coup de Grace":        _R + "precision/coupdegrace/coupdegrace.png",
  "Presence of Mind":     _R + "precision/presenceofmind/presenceofmind.png",
  "Sudden Impact":        _R + "domination/suddenimpact/suddenimpact.png",
  "Eyeball Collection":   _R + "domination/eyeballcollection/eyeballcollection.png",
  "Ravenous Hunter":      _R + "domination/relentlesshunter/relentlesshunter.png",
  "Manaflow Band":        _R + "sorcery/manaflowband/manaflowband.png",
  "Transcendence":        _R + "sorcery/transcendence/transcendence.png",
  "Scorch":               _R + "sorcery/scorch/scorch.png",
  "Waterwalking":         _R + "sorcery/waterwalking/waterwalking.png",
  "Gathering Storm":      _R + "sorcery/gatheringstorm/gatheringstorm.png",
  "Absolute Focus":       _R + "sorcery/absolutefocus/absolutefocus.png",
  "Demolish":             _R + "resolve/demolish/demolish.png",
  "Conditioning":         _R + "resolve/conditioning/conditioning.png",
  "Overgrowth":           _R + "resolve/overgrowth/overgrowth.png",
  "Bone Plating":         _R + "resolve/boneplating/boneplating.png",
  "Unflinching":          _R + "sorcery/unflinching/unflinching.png",
  "Revitalize":           _R + "resolve/revitalize/revitalize.png",
  "Nullifying Orb":       _R + "sorcery/nullifyingorb/nullifyingorb.png",
};

// ─── Imágenes de campeones (Data Dragon 16.11.1) ──────────────────────────────
const CHAMP_DD = {
  "Aurelion Sol": "AurelionSol", "Dr. Mundo": "DrMundo",
  "Jarvan IV": "JarvanIV",      "K'Sante": "KSante",
  "Kai'Sa": "Kaisa",            "Kha'Zix": "Khazix",
  "Kog'Maw": "KogMaw",          "Lee Sin": "LeeSin",
  "Master Yi": "MasterYi",      "Miss Fortune": "MissFortune",
  "Nunu & Willump": "Nunu",     "Twisted Fate": "TwistedFate",
  "Vel'Koz": "Velkoz",          "Xin Zhao": "XinZhao",
  "Wukong": "MonkeyKing",       "Norra": "Yuumi",
};

function champImg(name) {
  const dd = CHAMP_DD[name] ||
    name.replace(/ & .+/, "").replace(/'/g, "").replace(/\./g, "")
        .split(" ").map(w => w[0].toUpperCase() + w.slice(1)).join("");
  return `https://ddragon.leagueoflegends.com/cdn/16.11.1/img/champion/${dd}.png`;
}

function translateItem(name, lang) {
  if (lang === "en") return name;
  return ITEM_ES[name] || name;
}

function translateRune(name, lang) {
  if (lang === "en") return name;
  return RUNE_ES[name] || name;
}

function T({ obj, lang }) {
  if (!obj) return null;
  return <>{obj[lang] || obj.es || ""}</>;
}

export default function ChampCard({ champ, roleData, lang, isMine, onToggleMine, roleIcon }) {
  const [open, setOpen] = useState(false);
  const tc = TIER_COLORS[roleData.tier] || TIER_COLORS.b;

  return (
    <div
      className="champ-card"
      style={{
        borderColor: isMine ? "var(--gold)" : open ? tc.border : "var(--border)",
        background: isMine ? "rgba(201,168,76,0.04)" : "var(--surface)",
      }}
    >
      {/* HEADER */}
      <div className="card-header">
        <button className="card-toggle" onClick={() => setOpen(o => !o)}>
          <img
            className="champ-portrait"
            src={champImg(champ.name)}
            alt={champ.name}
            onError={e => { e.currentTarget.style.display = "none"; }}
          />
          <span className="tier-dot" style={{ background: tc.color }} />
          {roleIcon && <span className="role-chip">{roleIcon}</span>}
          <span className="champ-name">{champ.name}</span>
          {roleData.wr && roleData.wr !== "TBD" && <span className="champ-wr">{roleData.wr} WR</span>}
          <span className="chevron" style={{ transform: open ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
        </button>
        <button
          className={`mine-btn ${isMine ? "mine-active" : ""}`}
          onClick={() => onToggleMine(champ.name, roleData.role)}
          title={isMine ? (lang === "es" ? "Quitar de mis champs" : "Remove from my champs") : (lang === "es" ? "Agregar a mis champs" : "Add to my champs")}
        >
          {isMine ? "★" : "☆"}
        </button>
      </div>

      {/* BODY — collapsible */}
      {open && (
        <div className="card-body">
          <p className="why-text"><T obj={roleData.why} lang={lang} /></p>

          {/* BUILD */}
          <div className="info-section">
            <div className="section-label">{lang === "es" ? "Build" : "Build"}</div>
            <div className="items-row">
              {roleData.build.boots && (
                <span className="item-tag boots">
                  {ITEM_IMG[roleData.build.boots] && (
                    <img src={ITEM_IMG[roleData.build.boots]} className="item-icon" alt="" onError={e => { e.currentTarget.style.display = "none"; }} />
                  )}
                  {translateItem(roleData.build.boots, lang)}
                </span>
              )}
              {roleData.build.core.map(i => (
                <span key={i} className="item-tag core">
                  {ITEM_IMG[i] && <img src={ITEM_IMG[i]} className="item-icon" alt="" onError={e => { e.currentTarget.style.display = "none"; }} />}
                  {translateItem(i, lang)}
                </span>
              ))}
              {(roleData.build.sit || []).map(i => (
                <span key={i} className="item-tag sit">
                  {ITEM_IMG[i] && <img src={ITEM_IMG[i]} className="item-icon" alt="" onError={e => { e.currentTarget.style.display = "none"; }} />}
                  {translateItem(i, lang)}
                </span>
              ))}
            </div>
            {roleData.buildNote && (roleData.buildNote.es || roleData.buildNote.en) && (
              <p className="build-note"><T obj={roleData.buildNote} lang={lang} /></p>
            )}
          </div>

          {/* RUNES */}
          <div className="info-section">
            <div className="section-label">{lang === "es" ? "Runas" : "Runes"}</div>
            <div className="runes-row">
              <span className="rune keystone">
                {RUNE_IMG[roleData.runes.key] && (
                  <img src={RUNE_IMG[roleData.runes.key]} className="rune-icon" alt="" onError={e => { e.currentTarget.style.display = "none"; }} />
                )}
                {translateRune(roleData.runes.key, lang)}
              </span>
              {roleData.runes.primary.map(r => (
                <span key={r} className="rune primary">
                  {RUNE_IMG[r] && <img src={RUNE_IMG[r]} className="rune-icon" alt="" onError={e => { e.currentTarget.style.display = "none"; }} />}
                  {translateRune(r, lang)}
                </span>
              ))}
              <span className="rune secondary">
                {RUNE_IMG[roleData.runes.secondary] && (
                  <img src={RUNE_IMG[roleData.runes.secondary]} className="rune-icon" alt="" onError={e => { e.currentTarget.style.display = "none"; }} />
                )}
                {translateRune(roleData.runes.secondary, lang)}
              </span>
            </div>
            <p className="rune-structure">
              {lang === "es"
                ? "Keystone · 3 rama principal · 1 rama secundaria"
                : "Keystone · 3 primary branch · 1 secondary branch"}
            </p>
          </div>

          {/* COUNTERS */}
          <div className="info-section">
            <div className="section-label">Counters</div>
            <div className="matchup-list">
              {roleData.counters.map(c => (
                <div key={c.name} className="matchup-item">
                  <img
                    className="matchup-portrait"
                    src={champImg(c.name)}
                    alt={c.name}
                    onError={e => { e.currentTarget.style.display = "none"; }}
                  />
                  <span className="matchup-name counter-name">{c.name}</span>
                  <span className="matchup-why">
                    <T obj={{ es: c.es, en: c.en }} lang={lang} />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* SYNERGIES */}
          <div className="info-section">
            <div className="section-label">{lang === "es" ? "Synergies" : "Synergies"}</div>
            <div className="matchup-list">
              {roleData.synergies.map(s => (
                <div key={s.name} className="matchup-item">
                  <img
                    className="matchup-portrait"
                    src={champImg(s.name)}
                    alt={s.name}
                    onError={e => { e.currentTarget.style.display = "none"; }}
                  />
                  <span className="matchup-name synergy-name">{s.name}</span>
                  <span className="matchup-why">
                    <T obj={{ es: s.es, en: s.en }} lang={lang} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .champ-card {
          border: 1px solid var(--border);
          border-radius: 8px;
          overflow: hidden;
          transition: border-color .2s, box-shadow .2s;
        }
        .champ-card:hover { box-shadow: 0 2px 12px rgba(0,0,0,.3); }

        .card-header {
          display: flex;
          align-items: center;
          padding: 0;
        }
        .card-toggle {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          background: none;
          border: none;
          text-align: left;
          color: var(--text);
        }

        /* Champion portrait */
        .champ-portrait {
          width: 32px;
          height: 32px;
          border-radius: 4px;
          object-fit: cover;
          flex-shrink: 0;
          border: 1px solid rgba(255,255,255,0.08);
        }

        .tier-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .role-chip {
          font-size: 13px;
          flex-shrink: 0;
          opacity: 0.85;
        }
        .champ-name {
          font-family: 'Rajdhani', 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: .02em;
        }
        .champ-wr {
          font-size: 11px;
          color: var(--teal);
          background: rgba(46,196,160,.1);
          border: 1px solid rgba(46,196,160,.2);
          padding: 2px 7px;
          border-radius: 2px;
          font-weight: 600;
          white-space: nowrap;
        }
        .chevron {
          margin-left: auto;
          color: var(--dim);
          font-size: 16px;
          transition: transform .2s;
        }
        .mine-btn {
          padding: 10px 14px;
          background: none;
          border: none;
          color: var(--dim);
          font-size: 18px;
          transition: color .15s, transform .15s;
          flex-shrink: 0;
        }
        .mine-btn:hover { color: var(--gold); transform: scale(1.1); }
        .mine-btn.mine-active { color: var(--gold); }

        .card-body { border-top: 1px solid var(--border); }
        .why-text {
          padding: 10px 14px;
          font-size: 12px;
          color: var(--muted);
          line-height: 1.65;
        }
        .info-section {
          padding: 10px 14px;
          border-top: 1px solid var(--border);
        }
        .section-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .15em;
          text-transform: uppercase;
          color: var(--dim);
          margin-bottom: 7px;
        }

        /* ITEMS */
        .items-row { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 4px; }
        .item-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 3px;
          letter-spacing: .02em;
          border: 1px solid;
        }
        .item-tag.boots  { background: rgba(167,139,250,.08); border-color: rgba(167,139,250,.3); color: #c4b5fd; }
        .item-tag.core   { background: rgba(240,201,110,.07); border-color: rgba(240,201,110,.3); color: var(--gold2); }
        .item-tag.sit    { background: var(--surface2); border-color: var(--border2); color: var(--muted); }
        .item-icon {
          width: 16px;
          height: 16px;
          border-radius: 2px;
          object-fit: cover;
          flex-shrink: 0;
        }
        .build-note { font-size: 11px; color: var(--dim); margin-top: 5px; line-height: 1.5; }

        /* RUNES */
        .runes-row { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 4px; }
        .rune {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 3px;
          border: 1px solid;
          letter-spacing: .02em;
        }
        .rune.keystone  { background: rgba(240,201,110,.1); border-color: rgba(240,201,110,.3); color: var(--gold2); font-size: 12px; }
        .rune.primary   { background: rgba(74,144,217,.08); border-color: rgba(74,144,217,.2);  color: var(--blue2); }
        .rune.secondary { background: rgba(167,139,250,.08);border-color: rgba(167,139,250,.25);color: #c4b5fd; }
        .rune-icon {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
        }
        .rune-structure { font-size: 10px; color: var(--dim); margin-top: 3px; }

        /* MATCHUPS */
        .matchup-list { display: flex; flex-direction: column; gap: 5px; }
        .matchup-item { display: flex; gap: 8px; align-items: center; font-size: 12px; }
        .matchup-portrait {
          width: 22px;
          height: 22px;
          border-radius: 3px;
          object-fit: cover;
          flex-shrink: 0;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .matchup-name {
          font-size: 13px;
          font-weight: 700;
          white-space: nowrap;
          min-width: 80px;
          letter-spacing: .02em;
          flex-shrink: 0;
        }
        .counter-name { color: var(--red); }
        .synergy-name { color: var(--teal); }
        .matchup-why { color: var(--muted); line-height: 1.5; }
      `}</style>
    </div>
  );
}
