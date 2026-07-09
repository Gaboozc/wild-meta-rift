import { useState, useMemo } from "react";
import CompCard from "./CompCard";

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
  return `https://ddragon.leagueoflegends.com/cdn/16.13.1/img/champion/${dd}.png`;
}

const ALL_TAGS = ["teamfight","AOE","engage","dive","pick","poke","siege","protect",
  "scaling","late-game","early-game","snowball","CC","AP","split","sustain","roam",
  "global","carry-jungla","stealth","assassin","crit","aggression","synergy","mobility",
  "control","gold","healing","invade","objective","all-in","burst","flank","1v1"];

export default function CompsPanel({ lang, compositionsData, metaData }) {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [activeDiff, setActiveDiff] = useState("");

  // Unique tags actually used
  const usedTags = useMemo(() => {
    const t = new Set();
    compositionsData.forEach(c => c.tags.forEach(tag => t.add(tag)));
    return ALL_TAGS.filter(t2 => t.has(t2));
  }, [compositionsData]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return compositionsData.filter(comp => {
      const nameMatch = !q ||
        (comp.name.es || comp.name).toLowerCase().includes(q) ||
        (comp.name.en || "").toLowerCase().includes(q) ||
        comp.team.some(m =>
          m.champ.toLowerCase().includes(q) ||
          (m.alts || []).some(a => a.toLowerCase().includes(q)));
      const tagMatch = !activeTag || comp.tags.includes(activeTag);
      const diffMatch = !activeDiff || comp.difficulty === activeDiff;
      return nameMatch && tagMatch && diffMatch;
    });
  }, [compositionsData, search, activeTag, activeDiff]);

  // Champ suggestions when query matches a champ name
  const matchedChamp = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q || q.length < 2) return null;
    const found = compositionsData
      .flatMap(c => c.team.flatMap(m => [m.champ, ...(m.alts || [])]))
      .find(n => n.toLowerCase().includes(q));
    return found || null;
  }, [search, compositionsData]);

  const hasFilters = search || activeTag || activeDiff;

  return (
    <div className="cp-wrap">
      {/* Header */}
      <div className="comps-header">
        <h2 className="comps-title">
          {lang === "es" ? "Composiciones de Equipo" : "Team Compositions"}
        </h2>
        <p className="comps-sub">
          {lang === "es"
            ? `${compositionsData.length} comps · Patch ${metaData.patch} · Busca por campeón o filtra por estilo`
            : `${compositionsData.length} comps · Patch ${metaData.patch} · Search by champion or filter by style`}
        </p>
      </div>

      {/* Search bar */}
      <div className="cp-search-wrap">
        <span className="cp-search-icon">🔍</span>
        <input
          className="cp-search-input"
          type="text"
          placeholder={lang === "es"
            ? "Buscar por campeón o nombre de comp..."
            : "Search by champion or comp name..."}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button className="cp-search-clear" onClick={() => setSearch("")}>✕</button>
        )}
      </div>

      {/* Champion match banner */}
      {matchedChamp && search && (
        <div className="cp-champ-banner">
          <img
            className="cp-champ-portrait"
            src={champImg(matchedChamp)}
            alt={matchedChamp}
            onError={e => { e.currentTarget.style.display = "none"; }}
          />
          <span className="cp-champ-info">
            <strong>{matchedChamp}</strong>
            {" — "}
            {filtered.length > 0
              ? (lang === "es"
                  ? `aparece en ${filtered.length} comp${filtered.length !== 1 ? "s" : ""}`
                  : `appears in ${filtered.length} comp${filtered.length !== 1 ? "s" : ""}`)
              : (lang === "es" ? "no aparece en ninguna comp" : "not in any comp")}
          </span>
        </div>
      )}

      {/* Tag filters */}
      <div className="cp-filters">
        <div className="cp-tag-row">
          <button
            className={`cp-tag-btn ${!activeTag && !activeDiff ? "active" : ""}`}
            onClick={() => { setActiveTag(""); setActiveDiff(""); }}
          >
            {lang === "es" ? "Todos" : "All"} ({compositionsData.length})
          </button>
          {usedTags.slice(0, 12).map(tag => (
            <button
              key={tag}
              className={`cp-tag-btn ${activeTag === tag ? "active" : ""}`}
              onClick={() => setActiveTag(activeTag === tag ? "" : tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="cp-diff-row">
          {["fácil","media","alta"].map(d => (
            <button
              key={d}
              className={`cp-diff-btn cp-diff-${d} ${activeDiff === d ? "active" : ""}`}
              onClick={() => setActiveDiff(activeDiff === d ? "" : d)}
            >
              {d === "fácil" ? (lang === "es" ? "Fácil" : "Easy")
               : d === "media" ? (lang === "es" ? "Media" : "Medium")
               : (lang === "es" ? "Alta" : "Hard")}
            </button>
          ))}
          {hasFilters && (
            <button className="cp-clear-btn" onClick={() => { setSearch(""); setActiveTag(""); setActiveDiff(""); }}>
              {lang === "es" ? "Limpiar filtros" : "Clear filters"}
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      {hasFilters && (
        <p className="cp-results-count">
          {filtered.length === 0
            ? (lang === "es" ? "Sin resultados" : "No results")
            : (lang === "es"
                ? `${filtered.length} comp${filtered.length !== 1 ? "s" : ""} encontrada${filtered.length !== 1 ? "s" : ""}`
                : `${filtered.length} comp${filtered.length !== 1 ? "s" : ""} found`)}
        </p>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="cp-empty">
          <span style={{fontSize:"2rem",opacity:.3}}>🧩</span>
          <p>{lang === "es" ? "Sin comps para esa búsqueda" : "No comps for that search"}</p>
        </div>
      ) : (
        <div className="comps-grid">
          {filtered.map(comp => (
            <CompCard key={comp.id} comp={comp} lang={lang} searchChamp={search.trim().toLowerCase()} />
          ))}
        </div>
      )}

      <style jsx>{`
        .cp-wrap { display: flex; flex-direction: column; gap: 14px; }

        /* Search */
        .cp-search-wrap {
          position: relative;
          display: flex;
          align-items: center;
          max-width: 480px;
        }
        .cp-search-icon {
          position: absolute;
          left: 12px;
          font-size: 13px;
          pointer-events: none;
        }
        .cp-search-input {
          width: 100%;
          background: var(--surface);
          border: 1px solid var(--border2);
          border-radius: 8px;
          padding: 10px 36px;
          color: var(--text);
          font-size: 13px;
          outline: none;
          transition: border-color .15s;
        }
        .cp-search-input:focus { border-color: var(--gold); }
        .cp-search-input::placeholder { color: var(--dim); }
        .cp-search-clear {
          position: absolute;
          right: 10px;
          background: none;
          border: none;
          color: var(--dim);
          font-size: 12px;
          cursor: pointer;
        }

        /* Champ banner */
        .cp-champ-banner {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 14px;
          background: rgba(201,168,76,.07);
          border: 1px solid rgba(201,168,76,.25);
          border-radius: 8px;
          max-width: 480px;
        }
        .cp-champ-portrait {
          width: 32px;
          height: 32px;
          border-radius: 5px;
          object-fit: cover;
          border: 1px solid rgba(255,255,255,.08);
        }
        .cp-champ-info { font-size: 13px; color: var(--muted); }
        .cp-champ-info strong { color: var(--gold2); }

        /* Tag filters */
        .cp-filters { display: flex; flex-direction: column; gap: 6px; }
        .cp-tag-row { display: flex; flex-wrap: wrap; gap: 5px; }
        .cp-diff-row { display: flex; flex-wrap: wrap; gap: 5px; align-items: center; }

        .cp-tag-btn {
          font-size: 11px;
          font-weight: 600;
          padding: 5px 11px;
          border-radius: 4px;
          border: 1px solid var(--border2);
          background: var(--surface);
          color: var(--muted);
          cursor: pointer;
          transition: all .15s;
          letter-spacing: .04em;
        }
        .cp-tag-btn:hover { color: var(--text); border-color: var(--gold); }
        .cp-tag-btn.active { background: rgba(201,168,76,.1); border-color: var(--gold); color: var(--gold2); }

        .cp-diff-btn {
          font-size: 11px;
          font-weight: 700;
          padding: 5px 12px;
          border-radius: 4px;
          border: 1px solid;
          cursor: pointer;
          transition: all .15s;
          letter-spacing: .06em;
          text-transform: uppercase;
        }
        .cp-diff-fácil  { color: #4ade80; background: rgba(74,222,128,.08);  border-color: rgba(74,222,128,.3); }
        .cp-diff-media  { color: #f0c96e; background: rgba(240,201,110,.08); border-color: rgba(240,201,110,.3); }
        .cp-diff-alta   { color: #fb923c; background: rgba(251,146,60,.08);  border-color: rgba(251,146,60,.3); }
        .cp-diff-fácil.active  { background: rgba(74,222,128,.2); }
        .cp-diff-media.active  { background: rgba(240,201,110,.2); }
        .cp-diff-alta.active   { background: rgba(251,146,60,.2); }

        .cp-clear-btn {
          font-size: 11px;
          padding: 5px 11px;
          border-radius: 4px;
          border: 1px solid rgba(224,85,85,.3);
          background: rgba(224,85,85,.07);
          color: #e05555;
          cursor: pointer;
          transition: all .15s;
          margin-left: 4px;
        }
        .cp-clear-btn:hover { background: rgba(224,85,85,.15); }

        /* Results */
        .cp-results-count { font-size: 12px; color: var(--dim); margin: 0; }
        .cp-empty { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 3rem; color: var(--muted); font-size: 14px; }
      `}</style>
    </div>
  );
}
