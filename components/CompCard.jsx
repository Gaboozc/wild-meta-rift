const ROLES = {
  top: { icon: "🛡", label: { es: "Baron", en: "Baron" } },
  jgl: { icon: "🌿", label: { es: "Jungla", en: "Jungle" } },
  mid: { icon: "⚡", label: { es: "Mid", en: "Mid" } },
  adc: { icon: "🏹", label: { es: "ADC", en: "ADC" } },
  sup: { icon: "💙", label: { es: "Supp", en: "Supp" } },
};

const DIFF_CONFIG = {
  "fácil":  { color: "#4ade80", bg: "rgba(74,222,128,0.1)",  border: "rgba(74,222,128,0.3)",  label: { es: "Fácil", en: "Easy" } },
  "easy":   { color: "#4ade80", bg: "rgba(74,222,128,0.1)",  border: "rgba(74,222,128,0.3)",  label: { es: "Fácil", en: "Easy" } },
  "media":  { color: "#f0c96e", bg: "rgba(240,201,110,0.1)", border: "rgba(240,201,110,0.3)", label: { es: "Media", en: "Medium" } },
  "medium": { color: "#f0c96e", bg: "rgba(240,201,110,0.1)", border: "rgba(240,201,110,0.3)", label: { es: "Media", en: "Medium" } },
  "alta":   { color: "#fb923c", bg: "rgba(251,146,60,0.1)",  border: "rgba(251,146,60,0.3)",  label: { es: "Alta",  en: "Hard" } },
  "hard":   { color: "#fb923c", bg: "rgba(251,146,60,0.1)",  border: "rgba(251,146,60,0.3)",  label: { es: "Alta",  en: "Hard" } },
};

const TAG_COLORS = {
  teamfight: { bg: "rgba(240,201,110,0.1)", border: "rgba(240,201,110,0.3)", color: "#f0c96e" },
  AOE:       { bg: "rgba(240,201,110,0.1)", border: "rgba(240,201,110,0.3)", color: "#f0c96e" },
  engage:    { bg: "rgba(74,144,217,0.1)",  border: "rgba(74,144,217,0.3)",  color: "#6bb3ff" },
  dive:      { bg: "rgba(251,146,60,0.1)",  border: "rgba(251,146,60,0.3)",  color: "#fb923c" },
  pick:      { bg: "rgba(251,146,60,0.1)",  border: "rgba(251,146,60,0.3)",  color: "#fb923c" },
  snowball:  { bg: "rgba(251,146,60,0.1)",  border: "rgba(251,146,60,0.3)",  color: "#fb923c" },
  assassin:  { bg: "rgba(224,85,85,0.1)",   border: "rgba(224,85,85,0.3)",   color: "#e05555" },
  poke:      { bg: "rgba(46,196,160,0.1)",  border: "rgba(46,196,160,0.3)",  color: "#2ec4a0" },
  siege:     { bg: "rgba(46,196,160,0.1)",  border: "rgba(46,196,160,0.3)",  color: "#2ec4a0" },
  control:   { bg: "rgba(46,196,160,0.1)",  border: "rgba(46,196,160,0.3)",  color: "#2ec4a0" },
  protect:   { bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.3)", color: "#c4b5fd" },
  scaling:   { bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.3)", color: "#c4b5fd" },
  "late-game":{ bg: "rgba(167,139,250,0.1)",border: "rgba(167,139,250,0.3)", color: "#c4b5fd" },
  CC:        { bg: "rgba(74,144,217,0.1)",  border: "rgba(74,144,217,0.3)",  color: "#6bb3ff" },
  AP:        { bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.3)", color: "#c4b5fd" },
  burst:     { bg: "rgba(224,85,85,0.1)",   border: "rgba(224,85,85,0.3)",   color: "#e05555" },
  split:     { bg: "rgba(74,222,128,0.1)",  border: "rgba(74,222,128,0.3)",  color: "#4ade80" },
  "1v1":     { bg: "rgba(74,222,128,0.1)",  border: "rgba(74,222,128,0.3)",  color: "#4ade80" },
  "presión": { bg: "rgba(74,222,128,0.1)",  border: "rgba(74,222,128,0.3)",  color: "#4ade80" },
};

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

export default function CompCard({ comp, lang }) {
  const diff = DIFF_CONFIG[comp.difficulty] || DIFF_CONFIG["media"];
  const name = typeof comp.name === "object" ? (comp.name[lang] || comp.name.es) : comp.name;
  const winCond = comp.winCondition[lang] || comp.winCondition.es;

  return (
    <div className="comp-card">
      {/* HEADER */}
      <div className="comp-header">
        <div className="comp-tags">
          {comp.tags.map(tag => {
            const tc = TAG_COLORS[tag] || TAG_COLORS["engage"];
            return (
              <span key={tag} className="comp-tag" style={{ background: tc.bg, borderColor: tc.border, color: tc.color }}>
                {tag}
              </span>
            );
          })}
        </div>
        <span
          className="comp-diff"
          style={{ background: diff.bg, borderColor: diff.border, color: diff.color }}
        >
          {diff.label[lang] || diff.label.es}
        </span>
      </div>

      <h3 className="comp-name">{name}</h3>

      {/* TEAM */}
      <div className="comp-team">
        {comp.team.map(({ role, champ }) => {
          const r = ROLES[role];
          return (
            <div key={role} className="comp-member">
              <div className="comp-portrait-wrap">
                <img
                  className="comp-portrait"
                  src={champImg(champ)}
                  alt={champ}
                  onError={e => { e.currentTarget.style.display = "none"; }}
                />
                <span className="comp-role-icon">{r.icon}</span>
              </div>
              <span className="comp-champ-name">{champ}</span>
              <span className="comp-role-label">{r.label[lang] || r.label.es}</span>
            </div>
          );
        })}
      </div>

      {/* WIN CONDITION */}
      <div className="comp-wincond">
        <span className="comp-wincond-label">
          {lang === "es" ? "🎯 Win condition" : "🎯 Win condition"}
        </span>
        <p className="comp-wincond-text">{winCond}</p>
      </div>

      <style jsx>{`
        .comp-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: border-color .2s, box-shadow .2s;
        }
        .comp-card:hover {
          border-color: var(--border2);
          box-shadow: 0 4px 20px rgba(0,0,0,.35);
        }

        /* Header row */
        .comp-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          flex-wrap: wrap;
        }
        .comp-tags { display: flex; gap: 5px; flex-wrap: wrap; }
        .comp-tag {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          padding: 2px 8px;
          border-radius: 2px;
          border: 1px solid;
        }
        .comp-diff {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          padding: 2px 10px;
          border-radius: 2px;
          border: 1px solid;
          white-space: nowrap;
        }

        /* Name */
        .comp-name {
          font-family: 'Rajdhani', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--text);
          margin: 0;
          letter-spacing: .04em;
        }

        /* Team row */
        .comp-team {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 8px;
        }
        .comp-member {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .comp-portrait-wrap {
          position: relative;
          width: 52px;
          height: 52px;
        }
        .comp-portrait {
          width: 52px;
          height: 52px;
          border-radius: 8px;
          object-fit: cover;
          border: 2px solid var(--border2);
          display: block;
        }
        .comp-role-icon {
          position: absolute;
          bottom: -4px;
          right: -4px;
          background: var(--bg2);
          border: 1px solid var(--border2);
          border-radius: 4px;
          font-size: 11px;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .comp-champ-name {
          font-family: 'Rajdhani', sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: var(--text);
          text-align: center;
          line-height: 1.2;
        }
        .comp-role-label {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: var(--dim);
        }

        /* Win condition */
        .comp-wincond {
          background: rgba(255,255,255,.03);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 10px 12px;
        }
        .comp-wincond-label {
          display: block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--dim);
          margin-bottom: 5px;
        }
        .comp-wincond-text {
          font-size: 12px;
          color: var(--muted);
          line-height: 1.65;
          margin: 0;
        }

        /* Responsive */
        @media (max-width: 420px) {
          .comp-portrait-wrap { width: 42px; height: 42px; }
          .comp-portrait { width: 42px; height: 42px; }
          .comp-champ-name { font-size: 10px; }
        }
      `}</style>
    </div>
  );
}
