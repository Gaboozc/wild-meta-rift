import { useState } from "react";

const TIER_COLORS = {
  ss: { color: "#f0c96e", bg: "rgba(240,201,110,0.10)", border: "rgba(240,201,110,0.30)" },
  s:  { color: "#4ade80", bg: "rgba(74,222,128,0.08)",  border: "rgba(74,222,128,0.25)" },
  a:  { color: "#6bb3ff", bg: "rgba(74,144,217,0.10)",  border: "rgba(74,144,217,0.30)" },
  b:  { color: "#a0aec0", bg: "rgba(160,174,192,0.08)", border: "rgba(160,174,192,0.20)" },
  c:  { color: "#fb923c", bg: "rgba(251,146,60,0.08)",  border: "rgba(251,146,60,0.25)" },
  d:  { color: "#e05555", bg: "rgba(224,85,85,0.08)",   border: "rgba(224,85,85,0.25)" },
};

function T({ obj, lang }) {
  if (!obj) return null;
  return <>{obj[lang] || obj.es || ""}</>;
}

export default function ChampCard({ champ, roleData, lang, isMine, onToggleMine }) {
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
      {/* HEADER — always visible */}
      <div className="card-header">
        <button className="card-toggle" onClick={() => setOpen(o => !o)}>
          <span className="tier-dot" style={{ background: tc.color }} />
          <span className="champ-name">{champ.name}</span>
          {roleData.wr && <span className="champ-wr">{roleData.wr} WR</span>}
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
                <span className="item-tag boots">{roleData.build.boots}</span>
              )}
              {roleData.build.core.map(i => (
                <span key={i} className="item-tag core">{i}</span>
              ))}
              {(roleData.build.sit || []).map(i => (
                <span key={i} className="item-tag sit">{i}</span>
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
              <span className="rune keystone">{roleData.runes.key}</span>
              {roleData.runes.primary.map(r => (
                <span key={r} className="rune primary">{r}</span>
              ))}
              <span className="rune secondary">{roleData.runes.secondary}</span>
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
            <div className="section-label">
              {lang === "es" ? "Synergies" : "Synergies"}
            </div>
            <div className="matchup-list">
              {roleData.synergies.map(s => (
                <div key={s.name} className="matchup-item">
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
          padding: 11px 14px;
          background: none;
          border: none;
          text-align: left;
          color: var(--text);
        }
        .tier-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
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
          font-size: 11px;
          font-weight: 600;
          padding: 3px 9px;
          border-radius: 3px;
          letter-spacing: .02em;
          border: 1px solid;
        }
        .item-tag.boots  { background: rgba(167,139,250,.08); border-color: rgba(167,139,250,.3); color: #c4b5fd; }
        .item-tag.core   { background: rgba(240,201,110,.07); border-color: rgba(240,201,110,.3); color: var(--gold2); }
        .item-tag.sit    { background: var(--surface2); border-color: var(--border2); color: var(--muted); }
        .build-note { font-size: 11px; color: var(--dim); margin-top: 5px; line-height: 1.5; }

        /* RUNES */
        .runes-row { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 4px; }
        .rune {
          font-size: 11px;
          font-weight: 600;
          padding: 3px 9px;
          border-radius: 3px;
          border: 1px solid;
          letter-spacing: .02em;
        }
        .rune.keystone  { background: rgba(240,201,110,.1); border-color: rgba(240,201,110,.3); color: var(--gold2); font-size: 12px; }
        .rune.primary   { background: rgba(74,144,217,.08); border-color: rgba(74,144,217,.2);  color: var(--blue2); }
        .rune.secondary { background: rgba(167,139,250,.08);border-color: rgba(167,139,250,.25);color: #c4b5fd; }
        .rune-structure { font-size: 10px; color: var(--dim); margin-top: 3px; }

        /* MATCHUPS */
        .matchup-list { display: flex; flex-direction: column; gap: 5px; }
        .matchup-item { display: flex; gap: 8px; align-items: baseline; font-size: 12px; }
        .matchup-name {
          font-size: 13px;
          font-weight: 700;
          white-space: nowrap;
          min-width: 88px;
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
