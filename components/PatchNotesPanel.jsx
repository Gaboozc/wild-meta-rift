import { useState } from "react";

const CHAMP_DD = {
  "Aurelion Sol":"AurelionSol","Dr. Mundo":"DrMundo","Jarvan IV":"JarvanIV",
  "K'Sante":"KSante","Kai'Sa":"Kaisa","Kha'Zix":"Khazix","Kog'Maw":"KogMaw",
  "Lee Sin":"LeeSin","Master Yi":"MasterYi","Miss Fortune":"MissFortune",
  "Nunu & Willump":"Nunu","Twisted Fate":"TwistedFate","Vel'Koz":"Velkoz",
  "Xin Zhao":"XinZhao","Wukong":"MonkeyKing","Norra":"Yuumi",
};
function champImg(name) {
  const dd = CHAMP_DD[name] ||
    name.replace(/ & .+/,"").replace(/'/g,"").replace(/\./g,"")
        .split(" ").map(w=>w[0].toUpperCase()+w.slice(1)).join("");
  return `https://ddragon.leagueoflegends.com/cdn/16.11.1/img/champion/${dd}.png`;
}

const ITEM_IMG = {
  "Kraken Slayer":"https://ddragon.leagueoflegends.com/cdn/16.11.1/img/item/6695.png",
  "Randuin's Omen":"https://ddragon.leagueoflegends.com/cdn/16.11.1/img/item/3143.png",
  "Sundered Sky":"https://ddragon.leagueoflegends.com/cdn/16.11.1/img/item/6694.png",
};

const TYPE_CONFIG = {
  buff:      { label:"BUFF",    color:"#4ade80", bg:"rgba(74,222,128,0.12)",  border:"rgba(74,222,128,0.35)",  icon:"▲" },
  nerf:      { label:"NERF",    color:"#e05555", bg:"rgba(224,85,85,0.12)",   border:"rgba(224,85,85,0.35)",   icon:"▼" },
  adjust:    { label:"AJUSTE",  color:"#f0c96e", bg:"rgba(240,201,110,0.12)", border:"rgba(240,201,110,0.35)", icon:"~" },
  new:       { label:"NUEVO",   color:"#c4b5fd", bg:"rgba(167,139,250,0.12)", border:"rgba(167,139,250,0.35)", icon:"✦" },
  "item-buff":{ label:"ITEM ▲", color:"#4ade80", bg:"rgba(74,222,128,0.12)",  border:"rgba(74,222,128,0.35)",  icon:"▲" },
  "item-nerf":{ label:"ITEM ▼", color:"#e05555", bg:"rgba(224,85,85,0.12)",   border:"rgba(224,85,85,0.35)",   icon:"▼" },
};

const FILTERS = [
  { key:"all",       label:{ es:"Todos", en:"All" } },
  { key:"buff",      label:{ es:"Buffs",    en:"Buffs"    } },
  { key:"nerf",      label:{ es:"Nerfs",    en:"Nerfs"    } },
  { key:"adjust",    label:{ es:"Ajustes",  en:"Adjusts"  } },
  { key:"new",       label:{ es:"Nuevos",   en:"New"      } },
  { key:"items",     label:{ es:"Items",    en:"Items"    } },
];

function ChangeCard({ change, lang }) {
  const [open, setOpen] = useState(false);
  const tc = TYPE_CONFIG[change.type] || TYPE_CONFIG.adjust;
  const isItem = change.targetType === "item";
  const imgSrc = isItem ? ITEM_IMG[change.target] : champImg(change.target);

  return (
    <button className={`change-card ${open ? "open" : ""}`} onClick={() => setOpen(o => !o)}>
      <div className="change-header">
        <div className="change-left">
          {imgSrc && (
            <img
              className={`change-portrait ${isItem ? "item-portrait" : ""}`}
              src={imgSrc}
              alt={change.target}
              onError={e => { e.currentTarget.style.display = "none"; }}
            />
          )}
          <div className="change-info">
            <span className="change-target">{change.target}</span>
            <span className="change-summary">{change.summary[lang] || change.summary.es}</span>
          </div>
        </div>
        <div className="change-right">
          <span className="change-badge" style={{ color: tc.color, background: tc.bg, borderColor: tc.border }}>
            {tc.icon} {tc.label}
          </span>
          <span className="change-chevron" style={{ transform: open ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
        </div>
      </div>
      {open && (
        <div className="change-detail">
          {change.detail[lang] || change.detail.es}
        </div>
      )}
      <style jsx>{`
        .change-card {
          width: 100%;
          text-align: left;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 12px 14px;
          cursor: pointer;
          transition: border-color .15s, background .15s;
          display: block;
        }
        .change-card:hover, .change-card.open {
          border-color: var(--border2);
          background: var(--surface2);
        }
        .change-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }
        .change-left {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
          min-width: 0;
        }
        .change-portrait {
          width: 36px;
          height: 36px;
          border-radius: 6px;
          object-fit: cover;
          flex-shrink: 0;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .item-portrait {
          border-radius: 4px;
          background: rgba(255,255,255,0.05);
        }
        .change-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }
        .change-target {
          font-family: 'Rajdhani', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: var(--text);
          letter-spacing: .02em;
        }
        .change-summary {
          font-size: 12px;
          color: var(--muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .change-right {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .change-badge {
          font-family: 'Rajdhani', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .1em;
          padding: 3px 8px;
          border-radius: 3px;
          border: 1px solid;
          white-space: nowrap;
        }
        .change-chevron {
          color: var(--dim);
          font-size: 14px;
          transition: transform .2s;
        }
        .change-detail {
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px solid var(--border);
          font-size: 12px;
          color: var(--muted);
          line-height: 1.7;
          text-align: left;
        }
      `}</style>
    </button>
  );
}

export default function PatchNotesPanel({ patchnotes, lang }) {
  const [activePatch, setActivePatch] = useState(0);
  const [filter, setFilter] = useState("all");

  const current = patchnotes[activePatch];
  if (!current) return null;

  const filtered = current.changes.filter(c => {
    if (filter === "all") return true;
    if (filter === "items") return c.targetType === "item";
    return c.type === filter;
  });

  const countByType = (type) => {
    if (type === "items") return current.changes.filter(c => c.targetType === "item").length;
    return current.changes.filter(c => c.type === type).length;
  };

  return (
    <div className="pn-wrap">
      {/* Patch selector */}
      <div className="patch-selector">
        {patchnotes.map((p, i) => (
          <button
            key={p.patch}
            className={`patch-btn ${activePatch === i ? "active" : ""}`}
            onClick={() => { setActivePatch(i); setFilter("all"); }}
          >
            <span className="patch-num">Patch {p.patch}</span>
            <span className="patch-date">{p.date}</span>
          </button>
        ))}
      </div>

      {/* Summary pills */}
      <div className="summary-row">
        {[
          { type:"buff",   label:"BUFFS",   color:"#4ade80" },
          { type:"nerf",   label:"NERFS",   color:"#e05555" },
          { type:"adjust", label:"AJUSTES", color:"#f0c96e" },
          { type:"new",    label:"NUEVOS",  color:"#c4b5fd" },
        ].map(({ type, label, color }) => {
          const count = countByType(type);
          if (!count) return null;
          return (
            <span key={type} className="summary-pill" style={{ color, borderColor: color + "55", background: color + "18" }}>
              {label}: {count}
            </span>
          );
        })}
      </div>

      {/* Filter tabs */}
      <div className="filter-row">
        {FILTERS.map(f => (
          <button
            key={f.key}
            className={`filter-btn ${filter === f.key ? "active" : ""}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label[lang] || f.label.es}
            {f.key !== "all" && countByType(f.key) > 0 && (
              <span className="filter-count">{countByType(f.key)}</span>
            )}
          </button>
        ))}
      </div>

      {/* Changes list */}
      <div className="changes-list">
        {filtered.length === 0 ? (
          <p className="no-changes">
            {lang === "es" ? "Sin cambios en esta categoría" : "No changes in this category"}
          </p>
        ) : (
          filtered.map((c, i) => (
            <ChangeCard key={`${c.target}-${i}`} change={c} lang={lang} />
          ))
        )}
      </div>

      <style jsx>{`
        .pn-wrap { display: flex; flex-direction: column; gap: 16px; }

        /* Patch selector */
        .patch-selector {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .patch-btn {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 10px 16px;
          background: var(--surface);
          border: 1px solid var(--border2);
          border-radius: 8px;
          cursor: pointer;
          transition: all .15s;
          min-width: 120px;
        }
        .patch-btn:hover { border-color: var(--gold); }
        .patch-btn.active {
          background: rgba(201,168,76,.08);
          border-color: var(--gold);
        }
        .patch-num {
          font-family: 'Rajdhani', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: var(--text);
          letter-spacing: .04em;
        }
        .patch-btn.active .patch-num { color: var(--gold2); }
        .patch-date {
          font-size: 10px;
          color: var(--dim);
          letter-spacing: .05em;
        }

        /* Summary row */
        .summary-row { display: flex; gap: 8px; flex-wrap: wrap; }
        .summary-pill {
          font-family: 'Rajdhani', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .1em;
          padding: 4px 10px;
          border-radius: 4px;
          border: 1px solid;
        }

        /* Filter row */
        .filter-row {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
          padding-bottom: 4px;
          border-bottom: 1px solid var(--border);
        }
        .filter-btn {
          font-family: 'Rajdhani', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .06em;
          text-transform: uppercase;
          padding: 6px 12px;
          background: var(--surface);
          border: 1px solid var(--border2);
          border-radius: 4px;
          color: var(--muted);
          cursor: pointer;
          transition: all .15s;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .filter-btn:hover { color: var(--text); border-color: var(--gold); }
        .filter-btn.active {
          background: rgba(201,168,76,.1);
          border-color: var(--gold);
          color: var(--gold2);
        }
        .filter-count {
          background: var(--gold);
          color: #1a1200;
          font-size: 9px;
          font-weight: 800;
          padding: 0 5px;
          border-radius: 8px;
          min-width: 14px;
          text-align: center;
        }

        /* Changes list */
        .changes-list { display: flex; flex-direction: column; gap: 6px; }
        .no-changes { color: var(--muted); font-size: 13px; padding: 2rem 0; text-align: center; }
      `}</style>
    </div>
  );
}
