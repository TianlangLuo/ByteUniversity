/* ══════════════ FLASHCARDS ══════════════ */
let fcDeck = [], fcIdx = 0;

function initFC() {
  populateSel('fc-sel');
  loadFC();
}

function loadFC() {
  const topic = document.getElementById('fc-sel').value;
  fcDeck = ALL_FLASHCARDS.filter(c => topic === 'all' ? App.learned.has(c.t) : c.t === topic);
  if (!fcDeck.length) fcDeck = ALL_FLASHCARDS.slice(0, 8);
  fcIdx = 0;
  showFC();
}

function showFC() {
  const c = fcDeck[fcIdx];
  document.getElementById('fc-front').textContent = c.f;
  document.getElementById('fc-back').textContent  = c.b;
  document.getElementById('fc-count').textContent = `${fcIdx + 1} / ${fcDeck.length}`;
  document.getElementById('fc-card').classList.remove('flip');
}

function flipFC()  { document.getElementById('fc-card').classList.toggle('flip'); }
function nextFC()  { fcIdx = (fcIdx + 1) % fcDeck.length; showFC(); }
function prevFC()  { fcIdx = (fcIdx - 1 + fcDeck.length) % fcDeck.length; showFC(); }
function shuffleFC(){ fcDeck = shuffle(fcDeck); fcIdx = 0; showFC(); toast('Cards shuffled! 🔀', 'ye'); }


/* ══════════════ QUIZ ══════════════ */
let qzQ = [], qzIdx = 0, qzScore = 0, qzAnswered = false, qzTopicTally = {};

function initQuiz() {
  populateSel('qz-sel');
  startQuiz();
}

function startQuiz() {
  const topic = document.getElementById('qz-sel').value;
  let pool = ALL_QUIZ.filter(q => topic === 'all' ? App.learned.has(q.t) : q.t === topic);
  if (!pool.length) pool = ALL_QUIZ.slice(0, 12);
  qzQ = shuffle(pool).slice(0, 15);
  qzIdx = 0; qzScore = 0; qzAnswered = false; qzTopicTally = {};
  document.getElementById('qz-card').style.display = 'block';
  document.getElementById('qz-score').style.display = 'none';
  renderQzPips();
  showQzQ();
}

function renderQzPips() {
  const pip = document.getElementById('qz-pips');
  pip.innerHTML = '';
  qzQ.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'qz-pip' + (i < qzIdx ? ' done' : i === qzIdx ? ' cur' : '');
    d.id = `pip-${i}`;
    pip.appendChild(d);
  });
}

function showQzQ() {
  const q = qzQ[qzIdx];
  document.getElementById('qz-num').textContent = `Question ${qzIdx + 1} of ${qzQ.length}`;
  document.getElementById('qz-q').textContent = q.q;
  const optsEl = document.getElementById('qz-opts');
  optsEl.innerHTML = '';
  document.getElementById('qz-fb').style.display = 'none';
  document.getElementById('qz-next').style.display = 'none';
  qzAnswered = false;

  q.opts.forEach((opt, oi) => {
    const btn = document.createElement('button');
    btn.className = 'qopt';
    btn.textContent = opt;
    btn.onclick = () => answerQz(oi, q, btn, optsEl);
    optsEl.appendChild(btn);
  });
}

function answerQz(chosen, q, clickedBtn, optsEl) {
  if (qzAnswered) return;
  qzAnswered = true;
  optsEl.querySelectorAll('.qopt').forEach(b => b.disabled = true);
  const ok = chosen === q.a;
  clickedBtn.classList.add(ok ? 'correct' : 'wrong');
  optsEl.children[q.a].classList.add('correct');
  if (ok) { qzScore++; awardXP(XP_VALUES.quizQuestion, 'Correct!'); }

  if (!qzTopicTally[q.t]) qzTopicTally[q.t] = { c: 0, n: 0 };
  qzTopicTally[q.t].n++;
  if (ok) qzTopicTally[q.t].c++;

  const fb = document.getElementById('qz-fb');
  fb.className = 'qfb ' + (ok ? 'ok' : 'bad');
  fb.textContent = ok ? '✅ Correct!' : `❌ The correct answer was: ${q.opts[q.a]}`;
  fb.style.display = 'flex';
  document.getElementById('qz-next').style.display = 'inline-flex';

  // Update pip
  const pip = document.getElementById(`pip-${qzIdx}`);
  if (pip) pip.style.background = ok ? 'var(--gn)' : 'var(--pk)';
}

function nextQzQ() {
  qzIdx++;
  if (qzIdx >= qzQ.length) { showScore(); return; }
  renderQzPips();
  showQzQ();
}

function showScore() {
  document.getElementById('qz-card').style.display = 'none';
  const ss = document.getElementById('qz-score');
  ss.style.display = 'block';

  const pct = Math.round(qzScore / qzQ.length * 100);
  const msg = pct === 100 ? 'Perfect Score! 🏆' : pct >= 80 ? 'Excellent! 🎉' : pct >= 60 ? 'Good effort! 👍' : 'Keep practising! 💪';
  document.getElementById('score-msg').textContent = msg;
  document.getElementById('score-det').textContent = `You scored ${qzScore} / ${qzQ.length} (${pct}%)${pct >= 80 ? ' — Topics marked as reviewed!' : ' — Get 80%+ to mark topics reviewed.'}`;
  document.getElementById('score-num').textContent = `${qzScore}/${qzQ.length}`;

  // Draw ring
  const r = 54, circ = 2 * Math.PI * r;
  const fill = circ * (pct / 100);
  const col = pct >= 80 ? '#34d399' : pct >= 50 ? '#fbbf24' : '#f472b6';
  document.getElementById('score-ring-svg').innerHTML = `
    <circle cx="68" cy="68" r="${r}" fill="none" stroke="#1a2235" stroke-width="10"/>
    <circle cx="68" cy="68" r="${r}" fill="none" stroke="${col}" stroke-width="10"
      stroke-dasharray="${fill} ${circ}" stroke-dashoffset="${circ / 4}" stroke-linecap="round"/>`;
  document.getElementById('score-num').style.color = col;

  if (pct >= 80) {
    const bonus = pct === 100 ? XP_VALUES.quizBonus100 : XP_VALUES.quizBonus80;
    awardXP(bonus, pct === 100 ? 'Perfect quiz!' : '80%+ bonus!');
    App._lastQuizPct = pct;
    Object.entries(qzTopicTally).forEach(([tid, t]) => {
      if (t.n > 0 && t.c / t.n >= 0.8) markReviewed(tid);
    });
    toast('✅ Topics marked as reviewed!');
    refreshLocks();
    renderCalendar();
    checkBadges();
  }
}


/* ══════════════ GAMES ══════════════ */
function openGame(name) {
  if (App.learned.size === 0) { toast('Complete a subtopic first! 📚', 'ye'); return; }
  document.getElementById('gm-' + name).classList.add('open');
  populateSel('gm-' + name + '-sel');
  if (name === 'memory') initMemory();
  if (name === 'snake')  initSnake();
  if (name === 'pac')    initPac();
}
function closeGame(name) {
  document.getElementById('gm-' + name).classList.remove('open');
  if (name === 'snake') stopSnake();
  if (name === 'pac')   stopPac();
}

/* ── MEMORY MATCH ── */
let memPairs = [], memFlipped = [], memMatched = 0, memMoves = 0, memTimer, memSecs = 0, memLocked = false;

function initMemory() {
  const topic = document.getElementById('gm-memory-sel').value;
  const pool = shuffle(ALL_FLASHCARDS.filter(c => topic === 'all' ? App.learned.has(c.t) : c.t === topic)).slice(0, 8);
  memPairs = []; memFlipped = []; memMatched = 0; memMoves = 0; memSecs = 0; memLocked = false;
  clearInterval(memTimer);
  memTimer = setInterval(() => { memSecs++; document.getElementById('mem-time').textContent = memSecs; }, 1000);

  pool.forEach((fc, i) => {
    memPairs.push({ id: i, type: 'term', text: fc.f, match: i });
    memPairs.push({ id: i + 100, type: 'def',  text: fc.b.slice(0, 80) + (fc.b.length > 80 ? '…' : ''), match: i });
  });
  memPairs = shuffle(memPairs);

  const grid = document.getElementById('mem-grid');
  grid.style.gridTemplateColumns = 'repeat(4,1fr)';
  grid.innerHTML = '';
  memPairs.forEach((p, idx) => {
    const div = document.createElement('div');
    div.className = 'mcard' + (p.type === 'def' ? ' is-def' : ' is-term');
    div.dataset.idx = idx;
    div.textContent = p.text;
    div.onclick = () => flipMem(idx);
    grid.appendChild(div);
  });

  document.getElementById('mem-pairs').textContent = '0';
  document.getElementById('mem-moves').textContent = '0';
  document.getElementById('mem-time').textContent  = '0';
}

function flipMem(idx) {
  if (memLocked) return;
  const cards = document.querySelectorAll('.mcard');
  const card = cards[idx];
  if (card.classList.contains('shown') || card.classList.contains('matched')) return;
  card.classList.add('shown');
  memFlipped.push(idx);

  if (memFlipped.length === 2) {
    memLocked = true; memMoves++;
    document.getElementById('mem-moves').textContent = memMoves;
    const [a, b] = memFlipped;
    const pa = memPairs[a], pb = memPairs[b];

    if (pa.match === pb.match && pa.type !== pb.type) {
      [a, b].forEach(i => { cards[i].classList.add('matched'); cards[i].classList.remove('shown'); });
      memMatched++;
      document.getElementById('mem-pairs').textContent = memMatched;
      awardXP(XP_VALUES.memoryMatch, 'Pair matched!');
      memFlipped = []; memLocked = false;
      if (memMatched === memPairs.length / 2) {
        clearInterval(memTimer);
        toast(`🎉 Matched all ${memMatched} pairs in ${memMoves} moves!`);
        Object.keys(Object.fromEntries(memPairs.map(p => [p.match, true]))).forEach(mid => {
          const fc = ALL_FLASHCARDS.filter(c => App.learned.has(c.t))[mid];
          if (fc) markReviewed(fc.t);
        });
      }
    } else {
      setTimeout(() => {
        [a, b].forEach(i => cards[i].classList.remove('shown'));
        memFlipped = []; memLocked = false;
      }, 900);
    }
  }
}

/* ── SNAKE ── */
let snakeInt = null, snakeBody = [], snakeDir = {x:1,y:0}, snakeFood = {x:10,y:8};
let snakeScore2 = 0, snakeLives = 3, snakePaused = false;
let snakeQPool = [], snakeQPaused = false;
const CELL = 20, COLS = 20, ROWS = 16;

function initSnake() {
  stopSnake();
  snakeBody = [{x:5,y:8},{x:4,y:8},{x:3,y:8}];
  snakeDir = {x:1,y:0}; snakeScore2 = 0; snakeLives = 3; snakePaused = false; snakeQPaused = false;
  document.getElementById('gm-snake-score').textContent = 0;
  document.getElementById('gm-snake-lives').textContent = '❤️❤️❤️';
  document.getElementById('snake-qbox').classList.remove('show');
  placeSnakeFood();
  snakeQPool = shuffle(ALL_QUIZ.filter(q => App.learned.has(q.t)));
  snakeInt = setInterval(stepSnake, 150);
}

function stopSnake() { clearInterval(snakeInt); snakeInt = null; }

function placeSnakeFood() {
  snakeFood = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
}

function stepSnake() {
  if (snakePaused || snakeQPaused) return;
  const head = { x: snakeBody[0].x + snakeDir.x, y: snakeBody[0].y + snakeDir.y };

  // Wall
  if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) { snakeDie(); return; }
  // Self
  if (snakeBody.some(s => s.x === head.x && s.y === head.y)) { snakeDie(); return; }

  snakeBody.unshift(head);

  if (head.x === snakeFood.x && head.y === snakeFood.y) {
    snakeScore2 += 10;
    document.getElementById('gm-snake-score').textContent = snakeScore2;
    placeSnakeFood();
    if (snakeQPool.length && snakeScore2 % 20 === 0) { snakeAskQ(); return; }
  } else {
    snakeBody.pop();
  }
  drawSnake();
}

function snakeDie() {
  snakeLives--;
  document.getElementById('gm-snake-lives').textContent = '❤️'.repeat(snakeLives) + '🖤'.repeat(3 - snakeLives);
  if (snakeLives <= 0) { stopSnake(); toast('Game over! 💀', 'pk'); return; }
  snakeBody = [{x:5,y:8},{x:4,y:8},{x:3,y:8}];
  snakeDir = {x:1,y:0};
  drawSnake();
}

function drawSnake() {
  const canvas = document.getElementById('snake-canvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#07090f'; ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);
  // Grid
  ctx.strokeStyle = '#1a2235'; ctx.lineWidth = 0.5;
  for (let x = 0; x < COLS; x++) { ctx.beginPath(); ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, ROWS * CELL); ctx.stroke(); }
  for (let y = 0; y < ROWS; y++) { ctx.beginPath(); ctx.moveTo(0, y * CELL); ctx.lineTo(COLS * CELL, y * CELL); ctx.stroke(); }
  // Food
  ctx.fillStyle = '#f472b6';
  ctx.beginPath(); ctx.arc(snakeFood.x * CELL + CELL/2, snakeFood.y * CELL + CELL/2, CELL/2 - 2, 0, Math.PI * 2); ctx.fill();
  // Snake
  snakeBody.forEach((s, i) => {
    const g = ctx.createLinearGradient(s.x*CELL, s.y*CELL, (s.x+1)*CELL, (s.y+1)*CELL);
    g.addColorStop(0, i === 0 ? '#34d399' : '#22d3ee'); g.addColorStop(1, i === 0 ? '#059669' : '#0891b2');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.roundRect(s.x * CELL + 1, s.y * CELL + 1, CELL - 2, CELL - 2, 4);
    ctx.fill();
  });
}

function snakeAskQ() {
  snakeQPaused = true;
  const q = snakeQPool.shift();
  if (!q) { snakeQPaused = false; return; }
  const box = document.getElementById('snake-qbox');
  const opts = document.getElementById('snake-q-opts');
  document.getElementById('snake-q-text').textContent = q.q;
  box.classList.add('show');
  opts.innerHTML = '';
  q.opts.forEach((opt, oi) => {
    const btn = document.createElement('button');
    btn.className = 'gopt';
    btn.textContent = opt;
    btn.onclick = () => {
      opts.querySelectorAll('.gopt').forEach(b => b.disabled = true);
      const ok = oi === q.a;
      btn.classList.add(ok ? 'gc' : 'gw');
      opts.children[q.a].classList.add('gc');
      setTimeout(() => {
        box.classList.remove('show');
        snakeQPaused = false;
        if (!ok) snakeDie();
        else { awardXP(XP_VALUES.snakeQuestion, 'Snake Q!'); markReviewed(q.t); }
      }, 1200);
    };
    opts.appendChild(btn);
  });
}

document.addEventListener('keydown', e => {
  if (snakeInt === null) return;
  const map = {ArrowUp:{x:0,y:-1},ArrowDown:{x:0,y:1},ArrowLeft:{x:-1,y:0},ArrowRight:{x:1,y:0},
    w:{x:0,y:-1},s:{x:0,y:1},a:{x:-1,y:0},d:{x:1,y:0}};
  const d = map[e.key];
  if (d && !(d.x === -snakeDir.x && d.y === -snakeDir.y)) {
    snakeDir = d;
    e.preventDefault();
  }
});

/* ── PAC-MAN (simplified) ── */
let pacInt = null, pacX = 7, pacY = 7, pacDir = {x:1,y:0}, pacNextDir = {x:1,y:0};
let pacScore2 = 0, pacLives = 3, pacDots = [], pacGhosts = [], pacQPaused = false, pacQPool = [];
const PAC_COLS = 21, PAC_ROWS = 15, PAC_CELL = 20;

function initPac() {
  stopPac();
  pacX = 10; pacY = 7; pacDir = {x:0,y:0}; pacNextDir = {x:1,y:0};
  pacScore2 = 0; pacLives = 3; pacQPaused = false;
  document.getElementById('gm-pac-score').textContent = 0;
  document.getElementById('gm-pac-lives').textContent = '❤️❤️❤️';
  document.getElementById('pac-qbox').classList.remove('show');

  // Dots
  pacDots = [];
  for (let x = 0; x < PAC_COLS; x++)
    for (let y = 0; y < PAC_ROWS; y++)
      if ((x + y) % 3 === 0) pacDots.push({x, y, eaten: false});

  // Ghosts
  pacGhosts = [
    {x:2,  y:2,  dx:1, dy:0, col:'#f472b6'},
    {x:18, y:2,  dx:-1,dy:0, col:'#fbbf24'},
    {x:2,  y:12, dx:1, dy:0, col:'#22d3ee'},
    {x:18, y:12, dx:-1,dy:0, col:'#a5b4fc'},
  ];

  pacQPool = shuffle(ALL_QUIZ.filter(q => App.learned.has(q.t)));
  pacInt = setInterval(stepPac, 120);
}

function stopPac() { clearInterval(pacInt); pacInt = null; }

function stepPac() {
  if (pacQPaused) return;
  // Move pac
  const nx = pacX + pacNextDir.x, ny = pacY + pacNextDir.y;
  if (nx >= 0 && nx < PAC_COLS && ny >= 0 && ny < PAC_ROWS) { pacDir = pacNextDir; }
  pacX = Math.max(0, Math.min(PAC_COLS - 1, pacX + pacDir.x));
  pacY = Math.max(0, Math.min(PAC_ROWS - 1, pacY + pacDir.y));

  // Eat dots
  const dot = pacDots.find(d => !d.eaten && d.x === pacX && d.y === pacY);
  if (dot) { dot.eaten = true; pacScore2 += 5; document.getElementById('gm-pac-score').textContent = pacScore2; }

  // Move ghosts
  pacGhosts.forEach(g => {
    g.x += g.dx; g.y += g.dy;
    if (g.x <= 0 || g.x >= PAC_COLS - 1) g.dx *= -1;
    if (g.y <= 0 || g.y >= PAC_ROWS - 1) g.dy *= -1;
  });

  // Ghost collision
  const hit = pacGhosts.find(g => Math.abs(g.x - pacX) < 1.5 && Math.abs(g.y - pacY) < 1.5);
  if (hit && !pacQPaused) {
    if (pacQPool.length) { pacAskQ(); }
    else { pacLoseLife(); }
  }

  drawPac();
}

function pacLoseLife() {
  pacLives--;
  document.getElementById('gm-pac-lives').textContent = '❤️'.repeat(pacLives) + '🖤'.repeat(3 - pacLives);
  if (pacLives <= 0) { stopPac(); toast('Game over! 💀', 'pk'); }
  pacX = 10; pacY = 7;
}

function pacAskQ() {
  pacQPaused = true;
  const q = pacQPool.shift();
  if (!q) { pacQPaused = false; return; }
  const box = document.getElementById('pac-qbox');
  const opts = document.getElementById('pac-q-opts');
  document.getElementById('pac-q-text').textContent = q.q;
  box.classList.add('show');
  opts.innerHTML = '';
  q.opts.forEach((opt, oi) => {
    const btn = document.createElement('button');
    btn.className = 'gopt';
    btn.textContent = opt;
    btn.onclick = () => {
      opts.querySelectorAll('.gopt').forEach(b => b.disabled = true);
      const ok = oi === q.a;
      btn.classList.add(ok ? 'gc' : 'gw');
      setTimeout(() => {
        box.classList.remove('show');
        pacQPaused = false;
        if (ok) { awardXP(XP_VALUES.pacQuestion, 'Pac Q!'); markReviewed(q.t); pacScore2 += 50; document.getElementById('gm-pac-score').textContent = pacScore2; }
        else pacLoseLife();
      }, 1200);
    };
    opts.appendChild(btn);
  });
}

function drawPac() {
  const canvas = document.getElementById('pac-canvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#07090f'; ctx.fillRect(0, 0, PAC_COLS * PAC_CELL, PAC_ROWS * PAC_CELL);

  // Dots
  pacDots.filter(d => !d.eaten).forEach(d => {
    ctx.fillStyle = '#34d399';
    ctx.beginPath(); ctx.arc(d.x * PAC_CELL + PAC_CELL/2, d.y * PAC_CELL + PAC_CELL/2, 3, 0, Math.PI*2); ctx.fill();
  });

  // Pac
  const angle = pacDir.x === 0 && pacDir.y === 0 ? 0.3 : 0.3;
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.moveTo(pacX * PAC_CELL + PAC_CELL/2, pacY * PAC_CELL + PAC_CELL/2);
  ctx.arc(pacX * PAC_CELL + PAC_CELL/2, pacY * PAC_CELL + PAC_CELL/2, PAC_CELL/2 - 1, angle, Math.PI * 2 - angle);
  ctx.closePath(); ctx.fill();

  // Ghosts
  pacGhosts.forEach(g => {
    ctx.fillStyle = g.col;
    const gx = g.x * PAC_CELL, gy = g.y * PAC_CELL, s = PAC_CELL - 2;
    ctx.beginPath();
    ctx.arc(gx + s/2, gy + s/3, s/2, Math.PI, 0);
    ctx.lineTo(gx + s, gy + s);
    ctx.lineTo(gx + s * .75, gy + s * .8);
    ctx.lineTo(gx + s * .5, gy + s);
    ctx.lineTo(gx + s * .25, gy + s * .8);
    ctx.lineTo(gx, gy + s);
    ctx.closePath(); ctx.fill();
  });
}

document.addEventListener('keydown', e => {
  const map = {ArrowUp:{x:0,y:-1},ArrowDown:{x:0,y:1},ArrowLeft:{x:-1,y:0},ArrowRight:{x:1,y:0},
    w:{x:0,y:-1},s:{x:0,y:1},a:{x:-1,y:0},d:{x:1,y:0}};
  const d = map[e.key];
  if (d && pacInt !== null) { pacNextDir = d; e.preventDefault(); }
});


/* ══════════════ CALENDAR ══════════════ */
function renderCalendar() {
  renderMastery();
  renderCalGrid();
}

function renderMastery() {
  const el = document.getElementById('mastery-panel');
  el.innerHTML = '';
  SUBTOPICS.forEach(st => {
    const sr = App.sr[st.id] || { level: 0 };
    const pct = Math.round(sr.level / SR_INTERVALS.length * 100);
    const stars = '★'.repeat(sr.level) + '☆'.repeat(SR_INTERVALS.length - sr.level);
    const next = sr.nextReview
      ? `Next: ${sr.nextReview}`
      : App.learned.has(st.id) ? 'Not yet reviewed' : 'Complete subtopic first';
    const div = document.createElement('div');
    div.className = 'mcard2';
    div.innerHTML = `<h4>${st.label}</h4>
      <div class="prog-track"><div class="prog-fill" style="width:${pct}%"></div></div>
      <div class="mmeta"><span class="mstars" style="color:var(--ye)">${stars}</span><span>Level ${sr.level}/${SR_INTERVALS.length}</span></div>
      <div style="font-size:.72rem;color:var(--tx3);margin-top:4px;">${next}</div>`;
    el.appendChild(div);
  });
}

function renderCalGrid() {
  const today = todayStr();
  const { calMonth: m, calYear: y } = App;
  document.getElementById('cal-month').textContent = new Date(y, m, 1).toLocaleDateString('en-GB', {month:'long',year:'numeric'});

  // Build review map — key = date string, value = array of {label, status}
  const rmap = {};
  const addPill = (date, label, status) => {
    if (!rmap[date]) rmap[date] = [];
    rmap[date].push({ label, status });
  };

  Object.entries(App.sr).forEach(([id, sr]) => {
    const st = SUBTOPICS.find(s => s.id === id);
    if (!st) return;

    // If reviewed today, show a green 'done' pill on today
    if (sr.lastReviewed === today) {
      addPill(today, st.short, 'done');
    }

    // Show the next scheduled review date (future or overdue)
    if (sr.nextReview && sr.nextReview !== today) {
      const status = sr.nextReview < today ? 'overdue' : 'due';
      addPill(sr.nextReview, st.short, status);
    }
  });

  const grid = document.getElementById('cal-grid');
  grid.innerHTML = '';
  ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].forEach(d => {
    const dn = document.createElement('div');
    dn.className = 'cal-dname'; dn.textContent = d; grid.appendChild(dn);
  });

  const first = new Date(y, m, 1);
  let dow = first.getDay(); dow = dow === 0 ? 6 : dow - 1;
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const total = Math.ceil((dow + daysInMonth) / 7) * 7;

  for (let i = 0; i < total; i++) {
    const dayNum = i - dow + 1;
    const cell = document.createElement('div');
    cell.className = 'cal-cell';
    if (dayNum < 1 || dayNum > daysInMonth) { cell.classList.add('dim'); grid.appendChild(cell); continue; }
    const ds = `${y}-${String(m+1).padStart(2,'0')}-${String(dayNum).padStart(2,'0')}`;
    if (ds === today) cell.classList.add('today');
    cell.innerHTML = `<div class="cal-dt">${dayNum}</div>`;
    if (rmap[ds]) {
      rmap[ds].forEach(rv => {
        const p = document.createElement('div');
        p.className = `cpill ${rv.status}`;
        p.textContent = rv.label;
        cell.appendChild(p);
      });
    }
    grid.appendChild(cell);
  }
}

function changeMonth(delta) {
  App.calMonth += delta;
  if (App.calMonth > 11) { App.calMonth = 0; App.calYear++; }
  if (App.calMonth < 0)  { App.calMonth = 11; App.calYear--; }
  renderCalGrid();
}

/* ── Shared select populator ── */
function populateSel(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const cur = el.value;
  el.innerHTML = '<option value="all">All Topics</option>';
  SUBTOPICS.filter(st => App.learned.has(st.id)).forEach(st => {
    el.innerHTML += `<option value="${st.id}">${st.label}</option>`;
  });
  if ([...el.options].some(o => o.value === cur)) el.value = cur;
}

/* ══════════════ DASHBOARD ══════════════ */
function renderDashboard() {
  updateXPBar();
  renderDashStats();
  renderDashSubtopics();
  renderDashDue();
  renderDashBadges();
  renderDashTileLocks();
}

function renderDashStats() {
  const level = Math.floor(App.totalXpEarned / 200) + 1;
  const learnedCount = App.learned.size;
  const totalCards = SUBTOPICS.reduce((s, st) => s + st.cards.length, 0);
  const shownCards = App.stProgress.reduce((s, sp) => s + sp.shown, 0);

  // Hero stat card
  const av = AVATARS.find(a => a.id === App.equippedAvatar) || AVATARS[0];
  document.getElementById('dash-progress-row').innerHTML = `
    <div class="dash-stat-item">
      <div class="dash-stat-icon" style="background:${av.bg}">${av.emoji}</div>
      <div><div class="dash-stat-label">Avatar</div><div class="dash-stat-val">${av.name}</div></div>
    </div>
    <div class="dash-stat-item">
      <div class="dash-stat-icon" style="background:rgba(99,102,241,.15)">⚡</div>
      <div><div class="dash-stat-label">Available XP</div><div class="dash-stat-val" style="color:var(--ye)">${App.xp} XP</div></div>
    </div>
    <div class="dash-stat-item">
      <div class="dash-stat-icon" style="background:rgba(52,211,153,.12)">📚</div>
      <div><div class="dash-stat-label">Subtopics Complete</div><div class="dash-stat-val" style="color:var(--gn)">${learnedCount} / ${SUBTOPICS.length}</div></div>
    </div>
    <div class="dash-stat-item">
      <div class="dash-stat-icon" style="background:rgba(251,191,36,.12)">🔥</div>
      <div><div class="dash-stat-label">Day Streak</div><div class="dash-stat-val" style="color:var(--ye)">${App.streakDays} day${App.streakDays !== 1 ? 's' : ''}</div></div>
    </div>`;

  // Stats pills bar
  const dueCount = Object.values(App.sr).filter(sr => sr.nextReview && sr.nextReview <= todayStr()).length;
  document.getElementById('dash-stats-bar').innerHTML = `
    <div class="dash-stat-pill">
      <div class="dash-stat-pill-val" style="color:var(--pu)">${App.totalXpEarned}</div>
      <div class="dash-stat-pill-label">Total XP Earned</div>
    </div>
    <div class="dash-stat-pill">
      <div class="dash-stat-pill-val" style="color:var(--gn)">${learnedCount}/${SUBTOPICS.length}</div>
      <div class="dash-stat-pill-label">Subtopics Done</div>
    </div>
    <div class="dash-stat-pill">
      <div class="dash-stat-pill-val" style="color:var(--ye)">${level}</div>
      <div class="dash-stat-pill-label">Current Level</div>
    </div>
    <div class="dash-stat-pill">
      <div class="dash-stat-pill-val" style="color:var(--pk)">${dueCount}</div>
      <div class="dash-stat-pill-label">Reviews Due</div>
    </div>
    <div class="dash-stat-pill">
      <div class="dash-stat-pill-val" style="color:var(--cy)">${App.badges.length}</div>
      <div class="dash-stat-pill-label">Badges Earned</div>
    </div>
    <div class="dash-stat-pill">
      <div class="dash-stat-pill-val" style="color:var(--tx2)">${App.streakDays}</div>
      <div class="dash-stat-pill-label">Day Streak</div>
    </div>`;
}

function renderDashSubtopics() {
  const el = document.getElementById('dash-subtopic-progress');
  if (!el) return;
  el.innerHTML = '';
  SUBTOPICS.forEach((st, i) => {
    const sp = App.stProgress[i];
    const total = st.cards.length + st.cps.length;
    const done  = sp.shown + sp.cpDone.length;
    const pct   = sp.allDone ? 100 : Math.round(done / total * 100);
    const row = document.createElement('div');
    row.className = 'dash-st-item';
    row.innerHTML = `
      <div class="dash-st-label ${sp.allDone ? 'dash-st-done' : ''}">${sp.allDone ? '✓ ' : ''}${st.short}</div>
      <div class="dash-st-bar-wrap"><div class="dash-st-bar" style="width:${pct}%"></div></div>
      <div class="dash-st-pct">${pct}%</div>`;
    el.appendChild(row);
  });
}

function renderDashDue() {
  const el = document.getElementById('dash-due-reviews');
  if (!el) return;
  const today = todayStr();
  const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().slice(0,10);
  const in3 = new Date(); in3.setDate(in3.getDate() + 3);
  const in3Str = in3.toISOString().slice(0,10);

  const items = [];
  Object.entries(App.sr).forEach(([id, sr]) => {
    if (!sr.nextReview) return;
    const st = SUBTOPICS.find(s => s.id === id);
    if (!st) return;
    let status = 'soon', label = `Due ${sr.nextReview}`;
    if (sr.nextReview < today) { status = 'overdue'; label = 'Overdue!'; }
    else if (sr.nextReview === today) { status = 'today'; label = 'Due today'; }
    else if (sr.nextReview === tomorrowStr) { label = 'Due tomorrow'; }
    else if (sr.nextReview <= in3Str) { label = `Due in ${Math.round((new Date(sr.nextReview) - new Date(today)) / 86400000)} days`; }
    items.push({ name: st.label, status, label });
  });

  if (items.length === 0) {
    el.innerHTML = `<div class="dash-no-data">No reviews scheduled yet. Complete a quiz to set up your revision schedule!</div>`;
    return;
  }
  // Sort: overdue first, then today, then soon
  items.sort((a,b) => {
    const o = { overdue:0, today:1, soon:2 };
    return o[a.status] - o[b.status];
  });
  el.innerHTML = items.slice(0,6).map(it => `
    <div class="dash-due-item">
      <div class="dash-due-label">${it.name}</div>
      <div class="dash-due-badge ${it.status}">${it.label}</div>
    </div>`).join('');
}

function renderDashBadges() {
  const el = document.getElementById('dash-recent-badges');
  if (!el) return;
  const earned = BADGES.filter(b => App.badges.includes(b.id));
  if (earned.length === 0) {
    el.innerHTML = `<div class="dash-no-data">No badges yet — start learning to earn your first!</div>`;
    return;
  }
  const recent = earned.slice(-4).reverse();
  el.innerHTML = `<div class="dash-badge-list">${recent.map(b => `
    <div class="dash-badge-item">
      <div class="dash-badge-emoji">${b.icon}</div>
      <div class="dash-badge-info">
        <div class="dash-badge-name">${b.name}</div>
        <div class="dash-badge-desc">${b.desc}</div>
      </div>
    </div>`).join('')}</div>
  <div style="margin-top:12px;font-size:.78rem;color:var(--tx3);">${earned.length} / ${BADGES.length} badges unlocked — <span style="color:var(--pu);cursor:pointer;font-weight:700;" onclick="showPage('profile')">see all →</span></div>`;
}

function renderDashTileLocks() {
  const unlocked = App.learned.size > 0;
  ['dash-tile-fc','dash-tile-quiz','dash-tile-games'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('locked-tile', !unlocked);
  });
}

/* ══════════════ PROFILE / SHOP / BADGES ══════════════ */
function renderProfile() {
  renderAvatarShop();
  renderBadges();
  updateXPBar();

  const level = Math.floor(App.totalXpEarned / 200) + 1;
  document.getElementById('prof-level').textContent  = 'Level ' + level;
  document.getElementById('prof-xp').textContent     = App.xp + ' XP available';
  document.getElementById('prof-total').textContent  = App.totalXpEarned;
  document.getElementById('prof-streak').textContent = App.streakDays;
  const bstat = document.getElementById('prof-badges-stat');
  if (bstat) bstat.textContent = App.badges.length + ' / ' + BADGES.length;
  document.getElementById('prof-avatar-big').innerHTML = renderAvatar(App.equippedAvatar, 72);
}

function renderAvatarShop() {
  const grid = document.getElementById('avatar-grid');
  if (!grid) return;
  grid.innerHTML = '';
  AVATARS.forEach(av => {
    const owned    = App.unlockedAvatars.includes(av.id);
    const equipped = App.equippedAvatar === av.id;
    const canAfford = App.xp >= av.cost;

    const div = document.createElement('div');
    div.className = 'av-card' + (equipped ? ' equipped' : '') + (owned ? ' owned' : '');
    div.innerHTML = `
      <div class="av-emoji-wrap" style="background:${av.bg}">${av.emoji}</div>
      <div class="av-name">${av.name}</div>
      <div class="av-desc">${av.desc}</div>
      ${equipped
        ? `<button class="btn btn-gn btn-sm" disabled>✓ Equipped</button>`
        : owned
          ? `<button class="btn btn-ghost btn-sm" onclick="equipAvatar('${av.id}')">Equip</button>`
          : `<button class="btn btn-pu btn-sm" ${canAfford ? '' : 'disabled'} onclick="buyAvatar('${av.id}',${av.cost})">
               ${av.cost === 0 ? 'Free' : av.cost + ' XP'}
             </button>`
      }`;
    grid.appendChild(div);
  });
}

function buyAvatar(id, cost) {
  if (!spendXP(cost)) { toast('Not enough XP! Keep learning to earn more.', 'pk'); return; }
  App.unlockedAvatars.push(id);
  App.equippedAvatar = id;
  saveState();
  checkBadges();
  updateXPBar();
  renderAvatarShop();
  // update nav avatar
  document.getElementById('nav-avatar').innerHTML = renderAvatar(App.equippedAvatar, 28);
  toast('🎉 New avatar unlocked and equipped!');
}

function equipAvatar(id) {
  App.equippedAvatar = id;
  saveState();
  renderAvatarShop();
  document.getElementById('nav-avatar').innerHTML = renderAvatar(App.equippedAvatar, 28);
  document.getElementById('prof-avatar-big').innerHTML = renderAvatar(id, 72);
  toast('Avatar equipped!');
}

function renderBadges() {
  const grid = document.getElementById('badges-grid');
  if (!grid) return;
  grid.innerHTML = '';
  BADGES.forEach(b => {
    const earned = App.badges.includes(b.id);
    const div = document.createElement('div');
    div.className = 'badge-card' + (earned ? ' earned' : ' locked-badge');
    div.innerHTML = `
      <div class="badge-icon">${earned ? b.icon : '🔒'}</div>
      <div class="badge-name">${b.name}</div>
      <div class="badge-desc">${b.desc}</div>`;
    grid.appendChild(div);
  });

  const count = document.getElementById('badges-count');
  if (count) count.textContent = `${App.badges.length} / ${BADGES.length} badges earned`;
}
