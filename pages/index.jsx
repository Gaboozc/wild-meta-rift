import { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import ChampCard from "../components/ChampCard";
import CompCard from "../components/CompCard";
import CompsPanel from "../components/CompsPanel";
import PatchNotesPanel from "../components/PatchNotesPanel";
import { useMyChamps } from "../hooks/useMyChamps";
import championsData from "../data/champions.json";
import metaData from "../data/meta.json";
import compositionsData from "../data/compositions.json";
import patchnotesData from "../data/patchnotes.json";

// ─── Constants ────────────────────────────────────────────────────────────────
const TIER_ORDER = ["ss", "s", "a", "b", "c", "d"];
const TIER_LABELS = {
  ss: { es: "Win Conditions", en: "Win Conditions", color: "#f0c96e", bg: "rgba(240,201,110,0.10)", border: "rgba(240,201,110,0.30)" },
  s:  { es: "Muy Fuertes",    en: "Very Strong",    color: "#4ade80", bg: "rgba(74,222,128,0.08)",  border: "rgba(74,222,128,0.25)" },
  a:  { es: "Sólidos",        en: "Solid",          color: "#6bb3ff", bg: "rgba(74,144,217,0.10)",  border: "rgba(74,144,217,0.30)" },
  b:  { es: "Jugables",       en: "Playable",       color: "#a0aec0", bg: "rgba(160,174,192,0.08)", border: "rgba(160,174,192,0.20)" },
  c:  { es: "Situacionales",  en: "Situational",    color: "#fb923c", bg: "rgba(251,146,60,0.08)",  border: "rgba(251,146,60,0.25)" },
  d:  { es: "No Recomendados",en: "Not Recommended",color: "#e05555", bg: "rgba(224,85,85,0.08)",   border: "rgba(224,85,85,0.25)" },
};
const ROLES = [
  { key: "top", icon: "🛡", label: { es: "Baron", en: "Baron" } },
  { key: "jgl", icon: "🌿", label: { es: "Jungle", en: "Jungle" } },
  { key: "mid", icon: "⚡", label: { es: "Mid", en: "Mid" } },
  { key: "adc", icon: "🏹", label: { es: "ADC", en: "ADC" } },
  { key: "sup", icon: "💙", label: { es: "Support", en: "Support" } },
];
const TABS = [
  { key: "tier",     icon: "📋", label: { es: "Tier List", en: "Tier List" } },
  { key: "mychamps", icon: "⭐", label: { es: "Mis Champs", en: "My Champs" } },
  { key: "comps",    icon: "🧩", label: { es: "Comps",  en: "Comps"  } },
  { key: "patch",    icon: "📋", label: { es: "Parche", en: "Patch"  } },
];

// ─── Lang hook ────────────────────────────────────────────────────────────────
function useLang() {
  const [lang, setLangState] = useState("es");
  useEffect(() => {
    const s = localStorage.getItem("wr_lang");
    if (s === "en" || s === "es") setLangState(s);
  }, []);
  const setLang = (l) => {
    setLangState(l);
    localStorage.setItem("wr_lang", l);
  };
  return [lang, setLang];
}

// ─── T helper ────────────────────────────────────────────────────────────────
function T({ obj, lang }) {
  if (!obj) return null;
  return <>{obj[lang] || obj.es || ""}</>;
}

// ─── Build flat list: one entry per (champ, role) ────────────────────────────
function buildFlatList(data) {
  const result = [];
  for (const champ of data) {
    for (const rd of champ.roles) {
      result.push({ champ, roleData: rd });
    }
  }
  return result;
}
const FLAT = buildFlatList(championsData);

// ─── TierSection ─────────────────────────────────────────────────────────────
function TierSection({ tier, entries, lang, isMine, onToggleMine, showMineHighlight }) {
  if (!entries.length) return null;
  const t = TIER_LABELS[tier];
  return (
    <div className="tier-section">
      <div className="tier-header">
        <div className="tier-badge" style={{ background: t.bg, color: t.color, borderColor: t.border }}>
          {tier.toUpperCase()}
        </div>
        <span className="tier-label-text">
          <T obj={t} lang={lang} />
          <span className="tier-count"> ({entries.length})</span>
        </span>
      </div>
      <div className="champ-grid">
        {entries.map(({ champ, roleData, roleIcon }) => (
          <ChampCard
            key={`${champ.name}|${roleData.role}`}
            champ={champ}
            roleData={roleData}
            lang={lang}
            isMine={isMine(champ.name, roleData.role)}
            onToggleMine={onToggleMine}
            roleIcon={roleIcon}
          />
        ))}
      </div>
      <style jsx>{`
        .tier-section { margin-bottom: 2.5rem; }
        .tier-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-bottom: 10px;
          margin-bottom: 14px;
          border-bottom: 1px solid var(--border);
        }
        .tier-badge {
          font-family: 'Rajdhani', sans-serif;
          font-size: 16px;
          font-weight: 700;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          border: 1px solid;
          flex-shrink: 0;
        }
        .tier-label-text {
          font-family: 'Rajdhani', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: var(--dim);
        }
        .tier-count { color: var(--dim); font-weight: 400; }
        .champ-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 10px;
        }
      `}</style>
    </div>
  );
}

// ─── MyChamps panel ──────────────────────────────────────────────────────────
function MyChampsPanel({ lang, isMine, onToggleMine, myChamps, clearAll }) {
  const [filterRole, setFilterRole] = useState("all");

  // Derive myList directly from myChamps object so it's always reactive
  const myList = useMemo(() => {
    return Object.keys(myChamps).map(key => {
      const [name, role] = key.split("|");
      return { name, role };
    });
  }, [myChamps]);

  const byTier = useMemo(() => {
    const filtered = filterRole === "all"
      ? myList
      : myList.filter(x => x.role === filterRole);

    const grouped = {};
    for (const { name, role } of filtered) {
      const champ = championsData.find(c => c.name === name);
      if (!champ) continue;
      const rd = champ.roles.find(r => r.role === role);
      if (!rd) continue;
      const roleInfo = ROLES.find(r => r.key === role);
      if (!grouped[rd.tier]) grouped[rd.tier] = [];
      grouped[rd.tier].push({
        champ,
        roleData: rd,
        roleIcon: filterRole === "all" ? roleInfo?.icon : null,
      });
    }
    return grouped;
  }, [myList, filterRole]);

  if (myList.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">⭐</div>
        <p className="empty-title">
          {lang === "es" ? "No tienes champs marcados todavía" : "No champs marked yet"}
        </p>
        <p className="empty-sub">
          {lang === "es"
            ? "En la Tier List, toca ☆ en cualquier campeón para agregarlo aquí."
            : "In the Tier List, tap ☆ on any champion to add them here."}
        </p>
        <style jsx>{`
          .empty-state {
            display: flex; flex-direction: column; align-items: center;
            gap: 12px; padding: 4rem 1rem; text-align: center;
          }
          .empty-icon { font-size: 48px; opacity: .3; }
          .empty-title { font-size: 16px; font-weight: 600; color: var(--muted); }
          .empty-sub { font-size: 13px; color: var(--dim); max-width: 320px; line-height: 1.6; }
        `}</style>
      </div>
    );
  }

  return (
    <div>
      {/* Filter row */}
      <div className="myfilter-row">
        <button className={`myrole-btn ${filterRole === "all" ? "active" : ""}`} onClick={() => setFilterRole("all")}>
          {lang === "es" ? "Todos" : "All"} ({myList.length})
        </button>
        {ROLES.map(r => {
          const count = myList.filter(x => x.role === r.key).length;
          if (!count) return null;
          return (
            <button
              key={r.key}
              className={`myrole-btn ${filterRole === r.key ? "active" : ""}`}
              onClick={() => setFilterRole(r.key)}
            >
              {r.icon} <T obj={r.label} lang={lang} /> ({count})
            </button>
          );
        })}
        <button className="clear-btn" onClick={clearAll}>
          {lang === "es" ? "Limpiar todo" : "Clear all"}
        </button>
      </div>

      {/* Grouped by tier (global across roles in "Todos", by role otherwise) */}
      {TIER_ORDER.filter(t => byTier[t]?.length).map(t => (
        <TierSection
          key={t}
          tier={t}
          entries={byTier[t]}
          lang={lang}
          isMine={isMine}
          onToggleMine={onToggleMine}
        />
      ))}

      <style jsx>{`
        .myfilter-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 2rem;
          align-items: center;
        }
        .myrole-btn {
          font-size: 12px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 4px;
          border: 1px solid var(--border2);
          background: var(--surface);
          color: var(--muted);
          transition: all .15s;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .myrole-btn:hover { color: var(--text); border-color: var(--gold); }
        .myrole-btn.active { background: rgba(201,168,76,.1); border-color: var(--gold); color: var(--gold2); }
        .clear-btn {
          margin-left: auto;
          font-size: 11px;
          padding: 6px 12px;
          border-radius: 4px;
          border: 1px solid rgba(224,85,85,.3);
          background: rgba(224,85,85,.07);
          color: #e05555;
          transition: all .15s;
        }
        .clear-btn:hover { background: rgba(224,85,85,.15); }
      `}</style>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [lang, setLang] = useLang();
  const [tab, setTab] = useState("tier");
  const [role, setRole] = useState("top");
  const [search, setSearch] = useState("");
  const [showMineOnly, setShowMineOnly] = useState(false);
  const { loaded, myChamps, toggle, isMine, getMyList, clearAll } = useMyChamps();

  const myCount = useMemo(() => Object.keys(myChamps).length, [myChamps]);

  // Filtered entries for current role
  const entries = useMemo(() => {
    return FLAT.filter(({ champ, roleData }) => {
      if (roleData.role !== role) return false;
      if (search && !champ.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (showMineOnly && !isMine(champ.name, roleData.role)) return false;
      return true;
    });
  }, [role, search, showMineOnly, isMine]);

  const grouped = useMemo(() => {
    const g = {};
    TIER_ORDER.forEach(t => { g[t] = entries.filter(e => e.roleData.tier === t); });
    return g;
  }, [entries]);

  const totalInRole = FLAT.filter(e => e.roleData.role === role).length;
  const myInRole = useMemo(() => {
    return FLAT.filter(e => e.roleData.role === role && isMine(e.champ.name, e.roleData.role)).length;
  }, [role, myChamps]);

  return (
    <>
      <Head>
        <title>Wild Rift Meta {metaData.patch}</title>
        <link rel="icon" type="image/png" href="/faviconWR.png" />
        <link rel="apple-touch-icon" href="/faviconWR.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Wild Rift tier list with My Champs — builds, runes, counters, synergies" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      {/* LANG TOGGLE */}
      <div className="lang-toggle">
        <button className={`lang-btn ${lang === "es" ? "active" : ""}`} onClick={() => setLang("es")}>ES</button>
        <button className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>EN</button>
      </div>

      {/* HEADER */}
      <header className="header">
        <div className="header-inner">
          <span className="patch-chip">Wild Rift · Patch {metaData.patch} · {metaData.date}</span>
          <h1>
            {lang === "es"
              ? <>Meta <span>Completo</span> + Mis Champs</>
              : <>Full <span>Meta</span> + My Champs</>}
          </h1>
          <p className="header-sub">
            {lang === "es"
              ? `${championsData.length} campeones · ${FLAT.length} picks · flex roles · builds + runas + counters + synergies`
              : `${championsData.length} champions · ${FLAT.length} picks · flex roles · builds + runes + counters + synergies`}
          </p>
          <div className="meta-banner">
            <T obj={metaData.headline} lang={lang} />
          </div>
        </div>
      </header>

      {/* MAIN TABS */}
      <div className="main-tabs">
        <div className="main-tabs-inner">
          {TABS.map(t => (
            <button
              key={t.key}
              className={`main-tab ${tab === t.key ? "active" : ""}`}
              onClick={() => setTab(t.key)}
            >
              {t.icon} <T obj={t.label} lang={lang} />
              {t.key === "mychamps" && myCount > 0 && (
                <span className="my-count">{myCount}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── TIER LIST TAB ────────────────────────────────────────────────── */}
      {tab === "tier" && (
        <>
          {/* ROLE NAV */}
          <nav className="role-nav">
            <div className="role-nav-inner">
              {ROLES.map(r => {
                const count = FLAT.filter(e => e.roleData.role === r.key).length;
                const mine = loaded ? FLAT.filter(e => e.roleData.role === r.key && isMine(e.champ.name, e.roleData.role)).length : 0;
                return (
                  <button
                    key={r.key}
                    className={`role-tab ${role === r.key ? "active" : ""}`}
                    onClick={() => { setRole(r.key); setSearch(""); setShowMineOnly(false); }}
                  >
                    <span className="role-icon">{r.icon}</span>
                    <span className="role-label"><T obj={r.label} lang={lang} /></span>
                    {mine > 0 && <span className="role-mine-dot" />}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* SEARCH + FILTERS */}
          <div className="filter-bar">
            <div className="filter-bar-inner">
              <div className="search-wrap">
                <span className="search-icon">🔍</span>
                <input
                  className="search-input"
                  type="text"
                  placeholder={lang === "es" ? "Buscar campeón..." : "Search champion..."}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                {search && (
                  <button className="search-clear" onClick={() => setSearch("")}>✕</button>
                )}
              </div>
              <button
                className={`mine-filter-btn ${showMineOnly ? "active" : ""}`}
                onClick={() => setShowMineOnly(v => !v)}
              >
                {showMineOnly ? "★" : "☆"}{" "}
                {lang === "es" ? "Solo mis champs" : "My champs only"}
                {myInRole > 0 && <span className="filter-count">{myInRole}</span>}
              </button>
            </div>
          </div>

          {/* TIER SECTIONS */}
          <main className="main-content">
            {entries.length === 0 ? (
              <div className="no-results">
                {search
                  ? (lang === "es" ? `Sin resultados para "${search}"` : `No results for "${search}"`)
                  : (lang === "es" ? "No hay champs marcados en este rol" : "No champs marked in this role")}
              </div>
            ) : (
              TIER_ORDER.map(t => (
                <TierSection
                  key={t}
                  tier={t}
                  entries={grouped[t]}
                  lang={lang}
                  isMine={isMine}
                  onToggleMine={toggle}
                />
              ))
            )}
          </main>
        </>
      )}

      {/* ── MY CHAMPS TAB ────────────────────────────────────────────────── */}
      {tab === "mychamps" && (
        <main className="main-content">
          <MyChampsPanel
            lang={lang}
            isMine={isMine}
            onToggleMine={toggle}
            myChamps={myChamps}
            clearAll={clearAll}
          />
        </main>
      )}

      {/* ── COMPS TAB ────────────────────────────────────────────────────── */}
      {tab === "comps" && (
        <main className="main-content">
          <CompsPanel lang={lang} compositionsData={compositionsData} metaData={metaData} />
        </main>
      )}
      {tab === "comps_PLACEHOLDER" && (
        <main className="main-content">
          <div className="comps-grid">
          </div>
        </main>
      )}

      {/* ── PATCH NOTES TAB ──────────────────────────────────────────────── */}
      {tab === "patch" && (
        <main className="main-content">
          <div className="comps-header">
            <h2 className="comps-title">
              {lang === "es" ? "Notas de Parche" : "Patch Notes"}
            </h2>
            <p className="comps-sub">
              {lang === "es"
                ? "Buffs, nerfs y ajustes · Haz click en cualquier cambio para ver los detalles"
                : "Buffs, nerfs and adjusts · Click any change to see details"}
            </p>
          </div>
          <PatchNotesPanel patchnotes={patchnotesData} lang={lang} />
        </main>
      )}

      <footer className="footer">
        <span>Wild Rift Meta {metaData.patch} · {metaData.date}</span>
        <span>
          {lang === "es"
            ? "Riot Games patch notes 6.3c–7.1g · wildriftcore.com · Los tiers pueden variar según elo"
            : "Riot Games patch notes 6.3c–7.1g · wildriftcore.com · Tiers may vary by elo"}
        </span>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Inter:wght@300;400;500;600&display=swap');

        /* LANG TOGGLE */
        .lang-toggle {
          position: fixed;
          top: 12px;
          right: 14px;
          z-index: 300;
          display: flex;
          border: 1px solid var(--border2);
          border-radius: 4px;
          overflow: hidden;
        }
        .lang-btn {
          font-family: 'Rajdhani', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .08em;
          padding: 6px 14px;
          border: none;
          background: var(--surface2);
          color: var(--muted);
          transition: all .15s;
        }
        .lang-btn.active { background: var(--gold); color: #1a1200; }

        /* HEADER */
        .header {
          background: linear-gradient(135deg, #0a0d14, #111827 50%, #0d1520);
          border-bottom: 1px solid var(--border2);
          padding: 2.5rem 1.5rem 1.5rem;
          position: relative;
          overflow: hidden;
        }
        .header::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 20% 50%, rgba(74,144,217,.07) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 50%, rgba(201,168,76,.05) 0%, transparent 60%);
          pointer-events: none;
        }
        .header-inner { position: relative; max-width: 1200px; margin: 0 auto; }
        .patch-chip {
          display: inline-block;
          font-family: 'Rajdhani', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .12em;
          color: var(--gold);
          border: 1px solid rgba(201,168,76,.3);
          padding: 3px 10px;
          border-radius: 2px;
          margin-bottom: 10px;
        }
        h1 {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(1.8rem, 5vw, 3rem);
          font-weight: 700;
          line-height: 1.1;
          color: var(--text);
        }
        h1 span { color: var(--gold); }
        .header-sub { font-size: 12px; color: var(--muted); margin-top: 6px; }
        .meta-banner {
          margin-top: 1rem;
          padding: 10px 16px;
          background: rgba(201,168,76,.06);
          border-left: 3px solid var(--gold);
          border-radius: 0 4px 4px 0;
          font-size: 12px;
          color: #b8a060;
          max-width: 860px;
          line-height: 1.7;
        }

        /* MAIN TABS */
        .main-tabs {
          background: var(--bg2);
          border-bottom: 2px solid var(--border2);
        }
        .main-tabs-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          padding-right: 110px;
        }
        .main-tab {
          font-family: 'Rajdhani', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: .06em;
          text-transform: uppercase;
          padding: 14px 24px;
          border: none;
          background: none;
          color: var(--muted);
          border-bottom: 3px solid transparent;
          margin-bottom: -2px;
          transition: all .15s;
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .main-tab:hover { color: var(--text); background: rgba(255,255,255,.03); }
        .main-tab.active { color: var(--gold2); border-bottom-color: var(--gold); }
        .my-count {
          background: var(--gold);
          color: #1a1200;
          font-size: 10px;
          font-weight: 800;
          padding: 1px 6px;
          border-radius: 10px;
        }

        /* ROLE NAV */
        .role-nav {
          background: var(--bg2);
          border-bottom: 1px solid var(--border);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .role-nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          overflow-x: auto;
          padding-right: 110px;
        }
        .role-tab {
          font-family: 'Rajdhani', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: .05em;
          text-transform: uppercase;
          padding: 12px 18px;
          border: none;
          background: none;
          color: var(--muted);
          border-bottom: 2px solid transparent;
          white-space: nowrap;
          transition: all .15s;
          display: flex;
          align-items: center;
          gap: 5px;
          position: relative;
        }
        .role-tab:hover { color: var(--text); background: rgba(255,255,255,.03); }
        .role-tab.active { color: var(--gold); border-bottom-color: var(--gold); background: rgba(201,168,76,.04); }
        .role-icon { font-size: 14px; }
        .role-mine-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--gold);
          flex-shrink: 0;
        }

        /* FILTER BAR */
        .filter-bar {
          background: rgba(18,21,28,.8);
          border-bottom: 1px solid var(--border);
          padding: 10px 1.5rem;
          backdrop-filter: blur(8px);
        }
        .filter-bar-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
        }
        .search-wrap {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1;
          max-width: 360px;
          min-width: 180px;
        }
        .search-icon {
          position: absolute;
          left: 10px;
          font-size: 12px;
          pointer-events: none;
        }
        .search-input {
          width: 100%;
          background: var(--surface);
          border: 1px solid var(--border2);
          border-radius: 6px;
          padding: 7px 32px 7px 32px;
          color: var(--text);
          font-size: 13px;
          outline: none;
          transition: border-color .15s;
        }
        .search-input:focus { border-color: var(--gold); }
        .search-input::placeholder { color: var(--dim); }
        .search-clear {
          position: absolute;
          right: 8px;
          background: none;
          border: none;
          color: var(--dim);
          font-size: 12px;
          padding: 2px;
        }
        .mine-filter-btn {
          font-size: 12px;
          font-weight: 600;
          padding: 7px 14px;
          border-radius: 6px;
          border: 1px solid var(--border2);
          background: var(--surface);
          color: var(--muted);
          transition: all .15s;
          display: flex;
          align-items: center;
          gap: 5px;
          white-space: nowrap;
        }
        .mine-filter-btn:hover { color: var(--gold2); border-color: var(--gold); }
        .mine-filter-btn.active {
          background: rgba(201,168,76,.1);
          border-color: var(--gold);
          color: var(--gold2);
        }
        .filter-count {
          background: var(--gold);
          color: #1a1200;
          font-size: 10px;
          font-weight: 800;
          padding: 1px 6px;
          border-radius: 10px;
        }

        /* MAIN CONTENT */
        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
        }
        .no-results {
          padding: 3rem 0;
          text-align: center;
          color: var(--muted);
          font-size: 14px;
        }

        /* FOOTER */
        .footer {
          max-width: 1200px;
          margin: 3rem auto 2rem;
          padding: 1.5rem;
          border-top: 1px solid var(--border);
          font-size: 11px;
          color: var(--dim);
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: space-between;
        }

        /* COMPS */
        .comps-header { margin-bottom: 1.5rem; }
        .comps-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(1.4rem, 4vw, 2rem);
          font-weight: 700;
          color: var(--text);
          margin: 0 0 6px;
        }
        .comps-sub { font-size: 12px; color: var(--muted); margin: 0; }
        .comps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 16px;
        }

        /* RESPONSIVE */
        @media (max-width: 640px) {
          .header { padding: 1.5rem 1rem 1rem; }
          .main-content { padding: 1rem; }
          .role-label { display: none; }
          .filter-bar { padding: 8px 1rem; }
          .search-wrap { max-width: 100%; }
          .main-tab { padding: 12px 16px; font-size: 12px; }
          .comps-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
