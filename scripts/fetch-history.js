const https = require('https');
const fs = require('fs');
const path = require('path');

const HISTORY_DIR = path.join(__dirname, '..', 'data', 'history');

// Complete patch list from 4.2 onwards (sourced from riftpatchnotes.com + Riot tag page)
const PATCHES = [
  '4-2','4-2a','4-2b',
  '4-3','4-3a','4-3b','4-3c','4-3d',
  '4-4','4-4a','4-4b','4-4c','4-4d',
  '5-0','5-0a','5-0b','5-0c',
  '5-1','5-1a','5-1b','5-1c','5-1d',
  '5-2','5-2a','5-2b','5-2c','5-2d',
  '5-3','5-3a','5-3b','5-3c','5-3d',
  '6-0','6-0a','6-0b','6-0c','6-0d','6-0e',
  '6-1','6-1a','6-1b','6-1c','6-1d','6-1f',
  '6-2','6-2a','6-2b','6-2c','6-2d','6-2e','6-2g','6-2h','6-2k',
  '6-3','6-3a','6-3b','6-3c','6-3d','6-3e','6-3f',
  '7-0','7-0a','7-0b','7-0c','7-0d','7-0e','7-0f','7-0g',
  '7-1','7-1a','7-1b','7-1c','7-1d','7-1e','7-1f','7-1g',
];

// Try en-us first (works for old patches), then es-mx (works for new patches)
const BASES = [
  'https://wildrift.leagueoflegends.com/en-us/news/game-updates/',
  'https://wildrift.leagueoflegends.com/es-mx/news/game-updates/',
];

// Some patches use different slug format (no dash, trailing dash)
const SLUG_OVERRIDES = {
  '7-1a': '71a-',
  '7-1d': '71d-',
};

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function extractContent(body, url) {
  const titleMatch = body.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  const sections = [];
  const hRegex = /<h[234][^>]*>([\s\S]*?)<\/h[234]>/gi;
  let m;
  while ((m = hRegex.exec(body)) !== null) {
    const text = m[1].replace(/<[^>]+>/g, '').trim();
    if (text.length > 1) sections.push(text);
  }
  const paragraphs = [];
  const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  while ((m = pRegex.exec(body)) !== null) {
    const text = m[1]
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&nbsp;/g,' ').replace(/&#39;/g,"'").replace(/&quot;/g,'"')
      .trim();
    if (text.length > 20) paragraphs.push(text);
  }
  return { url, title, sections, paragraphs: paragraphs.slice(0, 200) };
}

async function fetchPatch(key) {
  const slug = SLUG_OVERRIDES[key] || `wild-rift-patch-notes-${key}`;
  for (const base of BASES) {
    const url = base + slug + '/';
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const { status, body } = await fetchUrl(url);
        if (status === 404) break; // try next base
        if (status === 200) return extractContent(body, url);
        await sleep(1500 * attempt);
      } catch {
        await sleep(1500 * attempt);
      }
    }
  }
  return null;
}

async function main() {
  const existing = new Set(fs.readdirSync(HISTORY_DIR).map(f => f.replace('.json', '')));
  const todo = PATCHES.filter(k => !existing.has(k));
  console.log(`Have: ${existing.size} | To fetch: ${todo.length}\n`);

  let ok = 0, notFound = 0;

  for (const key of todo) {
    process.stdout.write(`[${key}] `);
    const data = await fetchPatch(key);
    if (!data) {
      console.log('NOT FOUND');
      notFound++;
    } else {
      const out = { version: key.replace(/-/g, '.'), ...data };
      fs.writeFileSync(path.join(HISTORY_DIR, `${key}.json`), JSON.stringify(out, null, 2), 'utf8');
      console.log(`OK — "${data.title}" (${data.sections.length}s / ${data.paragraphs.length}p)`);
      ok++;
    }
    await sleep(400);
  }

  const total = fs.readdirSync(HISTORY_DIR).length;
  console.log(`\nDone. Saved: ${ok} | Not found: ${notFound} | Total: ${total} patches`);
}

main().catch(console.error);
