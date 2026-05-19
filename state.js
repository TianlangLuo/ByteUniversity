/* ── STATE ── */
const STATE_KEY = 'cs5_v3';

let App = {
  currentST: 0,
  stProgress: SUBTOPICS.map(() => ({ shown: 0, cpDone: [], allDone: false })),
  learned: new Set(),
  sr: {},               // { topicId: { level, nextReview, lastReviewed } }
  calMonth: new Date().getMonth(),
  calYear: new Date().getFullYear(),
};

function loadState() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (!raw) return;
    const s = JSON.parse(raw);
    App.stProgress = s.stProgress || App.stProgress;
    App.learned = new Set(s.learned || []);
    App.sr = s.sr || {};
    App.stProgress.forEach((sp, i) => {
      if (sp.allDone) App.learned.add(SUBTOPICS[i].id);
    });
  } catch (e) {}
}

function saveState() {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify({
      stProgress: App.stProgress,
      learned: [...App.learned],
      sr: App.sr,
    }));
  } catch (e) {}
}

/* ── SPACED REPETITION ── */
function markReviewed(topicId) {
  if (!App.sr[topicId]) App.sr[topicId] = { level: 0 };
  const sr = App.sr[topicId];
  sr.level = Math.min(sr.level + 1, SR_INTERVALS.length - 1);
  sr.lastReviewed = todayStr();
  const d = new Date();
  d.setDate(d.getDate() + SR_INTERVALS[sr.level]);
  sr.nextReview = d.toISOString().slice(0, 10);
  saveState();
}

function todayStr() { return new Date().toISOString().slice(0, 10); }

/* ── NAV ── */
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('on'));
  document.querySelectorAll('.ntab').forEach(t => t.classList.remove('on'));
  document.getElementById('page-' + name).classList.add('on');
  document.querySelector(`.ntab[data-page="${name}"]`).classList.add('on');

  if (name === 'flashcards') initFC();
  if (name === 'quiz')       initQuiz();
  if (name === 'calendar')   renderCalendar();
}

function tryPage(name) {
  if (App.learned.size === 0) {
    toast('Complete at least one subtopic in Learn first! 📚');
    return;
  }
  showPage(name);
}

function refreshLocks() {
  const unlocked = App.learned.size > 0;
  ['flashcards', 'quiz', 'games'].forEach(n => {
    const el = document.querySelector(`.ntab[data-page="${n}"]`);
    if (el) el.classList.toggle('locked', !unlocked);
  });
}

/* ── TOAST ── */
let toastTimer;
function toast(msg, col) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.style.borderColor = col === 'pk' ? 'var(--pk)' : col === 'ye' ? 'var(--ye)' : 'var(--gn)';
  el.style.color = col === 'pk' ? 'var(--pk)' : col === 'ye' ? 'var(--ye)' : 'var(--gn)';
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 3200);
}

/* ── DIAGRAMS (inline SVG) ── */
function getDiagram(id) {
  const D = {
    lifecycle: `<svg viewBox="0 0 540 140" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,sans-serif">
      <defs><marker id="a1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0L0,6L8,3z" fill="#6366f1"/></marker></defs>
      <rect x="10" y="30" width="110" height="68" rx="12" fill="#13152e" stroke="#6366f1" stroke-width="1.5"/>
      <text x="65" y="60" text-anchor="middle" fill="#a5b4fc" font-size="12" font-weight="800">Manufacturing</text>
      <text x="65" y="78" text-anchor="middle" fill="#64748b" font-size="10">High energy & materials</text>
      <rect x="215" y="30" width="110" height="68" rx="12" fill="#1f1a0e" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="270" y="60" text-anchor="middle" fill="#fde68a" font-size="12" font-weight="800">Daily Use</text>
      <text x="270" y="78" text-anchor="middle" fill="#64748b" font-size="10">Electricity &amp; data storage</text>
      <rect x="420" y="30" width="110" height="68" rx="12" fill="#1f1120" stroke="#f472b6" stroke-width="1.5"/>
      <text x="475" y="60" text-anchor="middle" fill="#fbcfe8" font-size="12" font-weight="800">Disposal</text>
      <text x="475" y="78" text-anchor="middle" fill="#64748b" font-size="10">E-waste, toxins, landfill</text>
      <path d="M120 64 L215 64" stroke="#6366f1" stroke-width="1.5" marker-end="url(#a1)"/>
      <path d="M325 64 L420 64" stroke="#fbbf24" stroke-width="1.5" marker-end="url(#a1)"/>
      <text x="270" y="125" text-anchor="middle" fill="#64748b" font-size="10">Every stage of a device's life has significant environmental impact</text>
    </svg>`,
    ewaste: `<svg viewBox="0 0 500 130" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,sans-serif">
      <rect x="10" y="20" width="100" height="70" rx="10" fill="#1f1120" stroke="#f472b6" stroke-width="1.5"/>
      <text x="60" y="52" text-anchor="middle" fill="#fbcfe8" font-size="11" font-weight="800">📱 Old Device</text>
      <text x="60" y="70" text-anchor="middle" fill="#64748b" font-size="9">Not recycled</text>
      <rect x="200" y="10" width="100" height="45" rx="10" fill="#0d1f18" stroke="#34d399" stroke-width="1.5"/>
      <text x="250" y="30" text-anchor="middle" fill="#6ee7b7" font-size="10" font-weight="800">♻️ Recycled</text>
      <text x="250" y="46" text-anchor="middle" fill="#64748b" font-size="9">Metals recovered</text>
      <rect x="200" y="75" width="100" height="45" rx="10" fill="#1f1120" stroke="#f472b6" stroke-width="1.5"/>
      <text x="250" y="95" text-anchor="middle" fill="#fbcfe8" font-size="10" font-weight="800">🗑️ Landfill</text>
      <text x="250" y="111" text-anchor="middle" fill="#64748b" font-size="9">Lead &amp; mercury leak</text>
      <rect x="390" y="10" width="100" height="45" rx="10" fill="#0d1f18" stroke="#34d399" stroke-width="1.5"/>
      <text x="440" y="30" text-anchor="middle" fill="#6ee7b7" font-size="10" font-weight="800">✅ WEEE</text>
      <text x="440" y="46" text-anchor="middle" fill="#64748b" font-size="9">Regulations help</text>
      <rect x="390" y="75" width="100" height="45" rx="10" fill="#1f0a0a" stroke="#f472b6" stroke-width="1.5"/>
      <text x="440" y="95" text-anchor="middle" fill="#fbcfe8" font-size="10" font-weight="800">⚠️ Toxic</text>
      <text x="440" y="111" text-anchor="middle" fill="#64748b" font-size="9">Pollution &amp; health risk</text>
      <line x1="110" y1="55" x2="200" y2="33" stroke="#34d399" stroke-width="1" stroke-dasharray="4,3"/>
      <line x1="110" y1="65" x2="200" y2="97" stroke="#f472b6" stroke-width="1" stroke-dasharray="4,3"/>
      <line x1="300" y1="33" x2="390" y2="33" stroke="#34d399" stroke-width="1" stroke-dasharray="4,3"/>
      <line x1="300" y1="97" x2="390" y2="97" stroke="#f472b6" stroke-width="1" stroke-dasharray="4,3"/>
    </svg>`,
    replacement:`<svg viewBox="0 0 520 110" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,sans-serif">
      <g><circle cx="60" cy="55" r="36" fill="#1f1a0e" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="60" y="50" text-anchor="middle" fill="#fde68a" font-size="18">📱</text>
      <text x="60" y="68" text-anchor="middle" fill="#fde68a" font-size="9" font-weight="800">New device</text></g>
      <line x1="96" y1="55" x2="150" y2="55" stroke="#64748b" stroke-width="1.5" stroke-dasharray="5,4"/>
      <text x="123" y="48" text-anchor="middle" fill="#64748b" font-size="9">Year 1</text>
      <g><circle cx="190" cy="55" r="30" fill="#131313" stroke="#2d4060" stroke-width="1.5"/>
      <text x="190" y="50" text-anchor="middle" fill="#94a3b8" font-size="16">📱</text>
      <text x="190" y="68" text-anchor="middle" fill="#64748b" font-size="9">Still used</text></g>
      <line x1="220" y1="55" x2="270" y2="55" stroke="#64748b" stroke-width="1.5" stroke-dasharray="5,4"/>
      <text x="245" y="48" text-anchor="middle" fill="#64748b" font-size="9">Year 2</text>
      <g><circle cx="305" cy="55" r="30" fill="#131313" stroke="#2d4060" stroke-width="1.5"/>
      <text x="305" y="50" text-anchor="middle" fill="#64748b" font-size="16">📱</text>
      <text x="305" y="68" text-anchor="middle" fill="#64748b" font-size="9">Slowing down</text></g>
      <line x1="335" y1="55" x2="385" y2="55" stroke="#f472b6" stroke-width="1.5" stroke-dasharray="5,4"/>
      <text x="360" y="48" text-anchor="middle" fill="#f472b6" font-size="9">Year 3</text>
      <g><circle cx="420" cy="55" r="36" fill="#1f1120" stroke="#f472b6" stroke-width="2"/>
      <text x="420" y="50" text-anchor="middle" fill="#fbcfe8" font-size="18">🗑️</text>
      <text x="420" y="70" text-anchor="middle" fill="#fbcfe8" font-size="9" font-weight="800">Discarded → e-waste</text></g>
    </svg>`,
    pos_env:`<svg viewBox="0 0 480 110" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,sans-serif">
      <rect x="10"  y="20" width="105" height="70" rx="12" fill="#0d1f18" stroke="#34d399" stroke-width="1.5"/>
      <text x="62"  y="52" text-anchor="middle" fill="#6ee7b7" font-size="20">🚦</text>
      <text x="62"  y="70" text-anchor="middle" fill="#34d399" font-size="9" font-weight="800">Smart traffic</text>
      <rect x="127" y="20" width="105" height="70" rx="12" fill="#0d1f18" stroke="#34d399" stroke-width="1.5"/>
      <text x="179" y="52" text-anchor="middle" fill="#6ee7b7" font-size="20">💡</text>
      <text x="179" y="70" text-anchor="middle" fill="#34d399" font-size="9" font-weight="800">Smart lighting</text>
      <rect x="244" y="20" width="105" height="70" rx="12" fill="#0d1f18" stroke="#34d399" stroke-width="1.5"/>
      <text x="296" y="52" text-anchor="middle" fill="#6ee7b7" font-size="20">🌍</text>
      <text x="296" y="70" text-anchor="middle" fill="#34d399" font-size="9" font-weight="800">Env. monitoring</text>
      <rect x="361" y="20" width="105" height="70" rx="12" fill="#0d1f18" stroke="#34d399" stroke-width="1.5"/>
      <text x="413" y="52" text-anchor="middle" fill="#6ee7b7" font-size="20">🏠</text>
      <text x="413" y="70" text-anchor="middle" fill="#34d399" font-size="9" font-weight="800">Home working</text>
    </svg>`,
    personal_data:`<svg viewBox="0 0 500 130" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,sans-serif">
      <ellipse cx="250" cy="65" rx="32" ry="32" fill="#1a2235" stroke="#6366f1" stroke-width="2"/>
      <text x="250" y="61" text-anchor="middle" fill="#a5b4fc" font-size="20">👤</text>
      <text x="250" y="76" text-anchor="middle" fill="#94a3b8" font-size="9">You</text>
      <rect x="10"  y="44" width="88" height="36" rx="8" fill="#111827" stroke="#34d399" stroke-width="1.2"/>
      <text x="54"  y="65" text-anchor="middle" fill="#6ee7b7" font-size="10" font-weight="700">🪪 Name & ID</text>
      <rect x="10"  y="88" width="88" height="36" rx="8" fill="#111827" stroke="#fbbf24" stroke-width="1.2"/>
      <text x="54"  y="109" text-anchor="middle" fill="#fde68a" font-size="10" font-weight="700">📍 Location</text>
      <rect x="402" y="44" width="88" height="36" rx="8" fill="#111827" stroke="#f472b6" stroke-width="1.2"/>
      <text x="446" y="65" text-anchor="middle" fill="#fbcfe8" font-size="10" font-weight="700">🏥 Medical</text>
      <rect x="402" y="88" width="88" height="36" rx="8" fill="#111827" stroke="#22d3ee" stroke-width="1.2"/>
      <text x="446" y="109" text-anchor="middle" fill="#a5f3fc" font-size="10" font-weight="700">💳 Financial</text>
      <rect x="196" y="5" width="108" height="32" rx="8" fill="#111827" stroke="#6366f1" stroke-width="1.2"/>
      <text x="250" y="25" text-anchor="middle" fill="#a5b4fc" font-size="10" font-weight="700">🔬 Biometrics</text>
      <line x1="98"  y1="62"  x2="218" y2="62"  stroke="#34d399" stroke-width="1" stroke-dasharray="4,3"/>
      <line x1="98"  y1="106" x2="218" y2="76"  stroke="#fbbf24" stroke-width="1" stroke-dasharray="4,3"/>
      <line x1="402" y1="62"  x2="282" y2="62"  stroke="#f472b6" stroke-width="1" stroke-dasharray="4,3"/>
      <line x1="402" y1="106" x2="282" y2="76"  stroke="#22d3ee" stroke-width="1" stroke-dasharray="4,3"/>
      <line x1="250" y1="37"  x2="250" y2="33"  stroke="#6366f1" stroke-width="1" stroke-dasharray="4,3"/>
    </svg>`,
    footprint:`<svg viewBox="0 0 500 120" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,sans-serif">
      <path d="M60 100 Q140 20 250 60 Q360 100 440 20" stroke="#22d3ee" stroke-width="2" fill="none" stroke-dasharray="6,3"/>
      <circle cx="60"  cy="100" r="7" fill="#22d3ee"/>
      <circle cx="160" cy="48"  r="7" fill="#22d3ee" opacity=".7"/>
      <circle cx="250" cy="60"  r="7" fill="#22d3ee" opacity=".85"/>
      <circle cx="340" cy="82"  r="7" fill="#22d3ee" opacity=".7"/>
      <circle cx="440" cy="20"  r="7" fill="#22d3ee"/>
      <text x="55"  y="118" text-anchor="middle" fill="#94a3b8" font-size="9">Login</text>
      <text x="160" y="40"  text-anchor="middle" fill="#94a3b8" font-size="9">Browse</text>
      <text x="250" y="52"  text-anchor="middle" fill="#94a3b8" font-size="9">Purchase</text>
      <text x="340" y="100" text-anchor="middle" fill="#94a3b8" font-size="9">Share</text>
      <text x="440" y="13"  text-anchor="middle" fill="#94a3b8" font-size="9">Location</text>
      <text x="250" y="115" text-anchor="middle" fill="#64748b" font-size="9">Every online action adds to your digital footprint</text>
    </svg>`,
    cma:`<svg viewBox="0 0 520 110" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,sans-serif">
      <rect x="8"   y="18" width="155" height="72" rx="12" fill="#1f1120" stroke="#f472b6" stroke-width="1.5"/>
      <text x="85"  y="46" text-anchor="middle" fill="#fbcfe8" font-size="12" font-weight="800">Offence 1</text>
      <text x="85"  y="62" text-anchor="middle" fill="#94a3b8" font-size="9">Unauthorised access</text>
      <text x="85"  y="76" text-anchor="middle" fill="#64748b" font-size="8">e.g. logging into someone's account</text>
      <rect x="183" y="18" width="155" height="72" rx="12" fill="#1f170e" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="260" y="46" text-anchor="middle" fill="#fde68a" font-size="12" font-weight="800">Offence 2</text>
      <text x="260" y="62" text-anchor="middle" fill="#94a3b8" font-size="9">Access + further crime</text>
      <text x="260" y="76" text-anchor="middle" fill="#64748b" font-size="8">e.g. hacking to steal card details</text>
      <rect x="358" y="18" width="155" height="72" rx="12" fill="#0d1f10" stroke="#34d399" stroke-width="1.5"/>
      <text x="435" y="46" text-anchor="middle" fill="#6ee7b7" font-size="12" font-weight="800">Offence 3</text>
      <text x="435" y="62" text-anchor="middle" fill="#94a3b8" font-size="9">Access + impair/damage</text>
      <text x="435" y="76" text-anchor="middle" fill="#64748b" font-size="8">e.g. planting a virus</text>
      <text x="260" y="105" text-anchor="middle" fill="#64748b" font-size="9">Severity increases → Computer Misuse Act 1990</text>
    </svg>`,
    ai_venn:`<svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,sans-serif">
      <ellipse cx="200" cy="90" rx="115" ry="75" fill="none" stroke="#6366f1" stroke-width="2"/>
      <text x="200" y="28" text-anchor="middle" fill="#a5b4fc" font-size="14" font-weight="800">AI</text>
      <text x="200" y="44" text-anchor="middle" fill="#64748b" font-size="9">Pattern recognition, decision-making</text>
      <ellipse cx="200" cy="98" rx="78" ry="50" fill="none" stroke="#fbbf24" stroke-width="1.8"/>
      <text x="200" y="68" text-anchor="middle" fill="#fde68a" font-size="12" font-weight="800">Machine Learning</text>
      <text x="200" y="82" text-anchor="middle" fill="#64748b" font-size="9">Learns from data</text>
      <ellipse cx="200" cy="108" rx="44" ry="28" fill="#111827" stroke="#34d399" stroke-width="1.5"/>
      <text x="200" y="104" text-anchor="middle" fill="#6ee7b7" font-size="10" font-weight="800">Narrow AI</text>
      <text x="200" y="118" text-anchor="middle" fill="#6ee7b7" font-size="8">One specific task</text>
    </svg>`,
    bias:`<svg viewBox="0 0 500 120" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,sans-serif">
      <rect x="10"  y="20" width="140" height="70" rx="12" fill="#1f1120" stroke="#f472b6" stroke-width="1.5"/>
      <text x="80"  y="48" text-anchor="middle" fill="#fbcfe8" font-size="11" font-weight="800">Biased Dataset</text>
      <text x="80"  y="65" text-anchor="middle" fill="#94a3b8" font-size="9">Historical prejudice</text>
      <text x="80"  y="79" text-anchor="middle" fill="#94a3b8" font-size="9">in training data</text>
      <rect x="180" y="20" width="140" height="70" rx="12" fill="#1f170e" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="250" y="48" text-anchor="middle" fill="#fde68a" font-size="11" font-weight="800">Design Flaw</text>
      <text x="250" y="65" text-anchor="middle" fill="#94a3b8" font-size="9">Algorithm amplifies</text>
      <text x="250" y="79" text-anchor="middle" fill="#94a3b8" font-size="9">rather than ignores bias</text>
      <rect x="350" y="20" width="140" height="70" rx="12" fill="#13152e" stroke="#6366f1" stroke-width="1.5"/>
      <text x="420" y="48" text-anchor="middle" fill="#a5b4fc" font-size="11" font-weight="800">Developer Bias</text>
      <text x="420" y="65" text-anchor="middle" fill="#94a3b8" font-size="9">Unconscious prejudices</text>
      <text x="420" y="79" text-anchor="middle" fill="#94a3b8" font-size="9">built into the design</text>
      <text x="250" y="112" text-anchor="middle" fill="#64748b" font-size="9">→ Algorithmic Bias: unfair, discriminatory AI decisions</text>
    </svg>`,
    ip_types:`<svg viewBox="0 0 480 110" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,sans-serif">
      <rect x="10"  y="20" width="130" height="72" rx="12" fill="#13152e" stroke="#a5b4fc" stroke-width="1.5"/>
      <text x="75"  y="52" text-anchor="middle" fill="#a5b4fc" font-size="22">©</text>
      <text x="75"  y="70" text-anchor="middle" fill="#e2e8f0" font-size="11" font-weight="800">Copyright</text>
      <text x="75"  y="84" text-anchor="middle" fill="#64748b" font-size="9">70 yrs · Automatic</text>
      <rect x="175" y="20" width="130" height="72" rx="12" fill="#1f1a0e" stroke="#fde68a" stroke-width="1.5"/>
      <text x="240" y="52" text-anchor="middle" fill="#fde68a" font-size="22">⚙</text>
      <text x="240" y="70" text-anchor="middle" fill="#e2e8f0" font-size="11" font-weight="800">Patent</text>
      <text x="240" y="84" text-anchor="middle" fill="#64748b" font-size="9">20 yrs · Apply for it</text>
      <rect x="340" y="20" width="130" height="72" rx="12" fill="#0d1f18" stroke="#6ee7b7" stroke-width="1.5"/>
      <text x="405" y="52" text-anchor="middle" fill="#6ee7b7" font-size="22">™</text>
      <text x="405" y="70" text-anchor="middle" fill="#e2e8f0" font-size="11" font-weight="800">Trademark</text>
      <text x="405" y="84" text-anchor="middle" fill="#64748b" font-size="9">10 yrs · Register it</text>
    </svg>`,
    ip_durations:`<svg viewBox="0 0 480 110" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,sans-serif">
      <rect x="10" y="30" width="460" height="28" rx="6" fill="#1a2235"/>
      <rect x="10" y="30" width="320" height="28" rx="6" fill="rgba(165,180,252,.12)" stroke="#a5b4fc" stroke-width="1"/>
      <text x="170" y="49" text-anchor="middle" fill="#a5b4fc" font-size="10" font-weight="700">© Copyright — 70 years after death</text>
      <rect x="10" y="68" width="185" height="28" rx="6" fill="rgba(253,230,138,.1)" stroke="#fde68a" stroke-width="1"/>
      <text x="102" y="87" text-anchor="middle" fill="#fde68a" font-size="10" font-weight="700">⚙ Patent — 20 years</text>
      <rect x="10" y="68" width="94" height="28" rx="6" fill="rgba(110,231,183,.1)" stroke="#6ee7b7" stroke-width="1"/>
      <text x="57"  y="87" text-anchor="middle" fill="#6ee7b7" font-size="10" font-weight="700">™ 10 yr</text>
      <line x1="10" y1="22" x2="10"  y2="100" stroke="#2d4060" stroke-width="1"/>
      <text x="10"  y="17" fill="#64748b" font-size="9">0</text>
      <line x1="103" y1="22" x2="103" y2="100" stroke="#2d4060" stroke-width="1" stroke-dasharray="3,3"/>
      <text x="103" y="17" text-anchor="middle" fill="#64748b" font-size="9">10y</text>
      <line x1="195" y1="22" x2="195" y2="100" stroke="#2d4060" stroke-width="1" stroke-dasharray="3,3"/>
      <text x="195" y="17" text-anchor="middle" fill="#64748b" font-size="9">20y</text>
      <text x="240" y="17" text-anchor="middle" fill="#64748b" font-size="9">70y →</text>
    </svg>`,
    malware:`<svg viewBox="0 0 520 130" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,sans-serif">
      <rect x="5"   y="8"  width="78" height="56" rx="8" fill="#1f1120" stroke="#f472b6" stroke-width="1.2"/>
      <text x="44"  y="33" text-anchor="middle" fill="#f472b6" font-size="17">🦠</text>
      <text x="44"  y="50" text-anchor="middle" fill="#fbcfe8" font-size="9" font-weight="700">Virus</text>
      <text x="44"  y="62" text-anchor="middle" fill="#64748b" font-size="8">Needs host</text>
      <rect x="89"  y="8"  width="78" height="56" rx="8" fill="#1f1120" stroke="#fb923c" stroke-width="1.2"/>
      <text x="128" y="33" text-anchor="middle" fill="#fb923c" font-size="17">🐛</text>
      <text x="128" y="50" text-anchor="middle" fill="#fdba74" font-size="9" font-weight="700">Worm</text>
      <text x="128" y="62" text-anchor="middle" fill="#64748b" font-size="8">Self-spreading</text>
      <rect x="173" y="8"  width="78" height="56" rx="8" fill="#1f170e" stroke="#fbbf24" stroke-width="1.2"/>
      <text x="212" y="33" text-anchor="middle" fill="#fbbf24" font-size="17">🐴</text>
      <text x="212" y="50" text-anchor="middle" fill="#fde68a" font-size="9" font-weight="700">Trojan</text>
      <text x="212" y="62" text-anchor="middle" fill="#64748b" font-size="8">Disguised</text>
      <rect x="257" y="8"  width="78" height="56" rx="8" fill="#13152e" stroke="#a5b4fc" stroke-width="1.2"/>
      <text x="296" y="33" text-anchor="middle" fill="#a5b4fc" font-size="17">💰</text>
      <text x="296" y="50" text-anchor="middle" fill="#a5b4fc" font-size="9" font-weight="700">Ransomware</text>
      <text x="296" y="62" text-anchor="middle" fill="#64748b" font-size="8">Encrypts files</text>
      <rect x="341" y="8"  width="78" height="56" rx="8" fill="#0d1f18" stroke="#34d399" stroke-width="1.2"/>
      <text x="380" y="33" text-anchor="middle" fill="#34d399" font-size="17">⌨️</text>
      <text x="380" y="50" text-anchor="middle" fill="#6ee7b7" font-size="9" font-weight="700">Keylogger</text>
      <text x="380" y="62" text-anchor="middle" fill="#64748b" font-size="8">Records keys</text>
      <rect x="425" y="8"  width="88" height="56" rx="8" fill="#0d1a1f" stroke="#22d3ee" stroke-width="1.2"/>
      <text x="469" y="33" text-anchor="middle" fill="#22d3ee" font-size="17">🤖</text>
      <text x="469" y="50" text-anchor="middle" fill="#a5f3fc" font-size="9" font-weight="700">Botnet/DDoS</text>
      <text x="469" y="62" text-anchor="middle" fill="#64748b" font-size="8">Floods targets</text>
      <text x="260" y="120" text-anchor="middle" fill="#64748b" font-size="9">Six major types of malware — each with different methods and impacts</text>
    </svg>`,
    firewall:`<svg viewBox="0 0 500 120" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,sans-serif">
      <defs><marker id="fa" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0L0,6L7,3z" fill="#f472b6"/></marker>
      <marker id="fb" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0L0,6L7,3z" fill="#34d399"/></marker></defs>
      <rect x="10"  y="32" width="120" height="56" rx="10" fill="#1a1020" stroke="#f472b6" stroke-width="1.5"/>
      <text x="70"  y="58" text-anchor="middle" fill="#f472b6" font-size="12" font-weight="800">🌐 Internet</text>
      <text x="70"  y="74" text-anchor="middle" fill="#64748b" font-size="9">(untrusted)</text>
      <rect x="210" y="22" width="80" height="76" rx="10" fill="#1f170a" stroke="#fbbf24" stroke-width="2"/>
      <text x="250" y="54" text-anchor="middle" fill="#fbbf24" font-size="20">🔥</text>
      <text x="250" y="72" text-anchor="middle" fill="#fde68a" font-size="10" font-weight="800">Firewall</text>
      <text x="250" y="86" text-anchor="middle" fill="#64748b" font-size="8">Rules-based</text>
      <rect x="370" y="32" width="120" height="56" rx="10" fill="#0d1a10" stroke="#34d399" stroke-width="1.5"/>
      <text x="430" y="58" text-anchor="middle" fill="#34d399" font-size="12" font-weight="800">🏢 Network</text>
      <text x="430" y="74" text-anchor="middle" fill="#64748b" font-size="9">(trusted)</text>
      <path d="M130 55 L210 55" stroke="#f472b6" stroke-width="2" stroke-dasharray="5,3" marker-end="url(#fa)"/>
      <text x="170" y="48" text-anchor="middle" fill="#f472b6" font-size="8">traffic in</text>
      <path d="M290 65 L370 65" stroke="#34d399" stroke-width="2" marker-end="url(#fb)"/>
      <text x="330" y="58" text-anchor="middle" fill="#34d399" font-size="8">allowed</text>
    </svg>`,
    antimalware:`<svg viewBox="0 0 500 130" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,sans-serif">
      <rect x="10"  y="20" width="148" height="86" rx="12" fill="#111827" stroke="#6366f1" stroke-width="1.5"/>
      <text x="84"  y="46" text-anchor="middle" fill="#a5b4fc" font-size="11" font-weight="800">📋 Signature DB</text>
      <text x="84"  y="62" text-anchor="middle" fill="#94a3b8" font-size="9">Compare file to known</text>
      <text x="84"  y="75" text-anchor="middle" fill="#94a3b8" font-size="9">malware signatures</text>
      <text x="84"  y="92" text-anchor="middle" fill="#64748b" font-size="8">✓ Fast  ✗ Misses new threats</text>
      <rect x="176" y="20" width="148" height="86" rx="12" fill="#111827" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="250" y="46" text-anchor="middle" fill="#fde68a" font-size="11" font-weight="800">🔍 Heuristic</text>
      <text x="250" y="62" text-anchor="middle" fill="#94a3b8" font-size="9">Compare code structure</text>
      <text x="250" y="75" text-anchor="middle" fill="#94a3b8" font-size="9">to known malware families</text>
      <text x="250" y="92" text-anchor="middle" fill="#64748b" font-size="8">✓ Detects new variants</text>
      <rect x="342" y="20" width="148" height="86" rx="12" fill="#111827" stroke="#34d399" stroke-width="1.5"/>
      <text x="416" y="46" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="800">📦 Sandboxing</text>
      <text x="416" y="62" text-anchor="middle" fill="#94a3b8" font-size="9">Run in isolated VM,</text>
      <text x="416" y="75" text-anchor="middle" fill="#94a3b8" font-size="9">observe behaviour safely</text>
      <text x="416" y="92" text-anchor="middle" fill="#64748b" font-size="8">✓ Most comprehensive</text>
      <text x="250" y="122" text-anchor="middle" fill="#64748b" font-size="9">Three layers of anti-malware protection</text>
    </svg>`,
    encryption:`<svg viewBox="0 0 520 120" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,sans-serif">
      <defs><marker id="ea" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0L0,6L7,3z" fill="#22d3ee"/></marker></defs>
      <text x="50"  y="62" text-anchor="middle" fill="#34d399" font-size="14" font-weight="800">Hello!</text>
      <rect x="110" y="28" width="90" height="56" rx="10" fill="#0d1a1f" stroke="#22d3ee" stroke-width="1.5"/>
      <text x="155" y="53" text-anchor="middle" fill="#22d3ee" font-size="13">🔐</text>
      <text x="155" y="70" text-anchor="middle" fill="#a5f3fc" font-size="10" font-weight="800">Encrypt</text>
      <text x="265" y="62" text-anchor="middle" fill="#f472b6" font-size="14" font-weight="800">@#$%!</text>
      <rect x="320" y="28" width="90" height="56" rx="10" fill="#1a2030" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="365" y="53" text-anchor="middle" fill="#fbbf24" font-size="13">🔓</text>
      <text x="365" y="70" text-anchor="middle" fill="#fde68a" font-size="10" font-weight="800">Decrypt</text>
      <text x="460" y="62" text-anchor="middle" fill="#34d399" font-size="14" font-weight="800">Hello!</text>
      <line x1="85"  y1="58" x2="110" y2="58" stroke="#34d399" stroke-width="1.5" marker-end="url(#ea)"/>
      <line x1="200" y1="58" x2="260" y2="58" stroke="#22d3ee" stroke-width="1.5" marker-end="url(#ea)"/>
      <line x1="305" y1="58" x2="320" y2="58" stroke="#f472b6" stroke-width="1.5" marker-end="url(#ea)"/>
      <line x1="410" y1="58" x2="440" y2="58" stroke="#34d399" stroke-width="1.5" marker-end="url(#ea)"/>
      <text x="260" y="108" text-anchor="middle" fill="#64748b" font-size="9">Only the correct key can decrypt the data — ensuring confidentiality in transit</text>
    </svg>`,
  };
  return D[id] || '';
}

/* ── SHUFFLE ── */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
