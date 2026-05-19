/* ── LEARN PAGE ── */

// Real images per subtopic (3 each, Unsplash free-to-use)
const TOPIC_IMAGES = {
  env: [
    { url:'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=900&q=80', caption:'E-waste piling up globally — 50 million tonnes per year', credit:'Unsplash' },
    { url:'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&q=80', caption:'Energy-hungry data centres power our digital lives', credit:'Unsplash' },
    { url:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80', caption:'Smart cities use technology to reduce environmental impact', credit:'Unsplash' },
  ],
  data: [
    { url:'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80', caption:'Your digital footprint is tracked across every site you visit', credit:'Unsplash' },
    { url:'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80', caption:'Vast amounts of personal data flow through the internet daily', credit:'Unsplash' },
    { url:'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900&q=80', caption:'Data protection laws try to keep personal information safe', credit:'Unsplash' },
  ],
  leg: [
    { url:'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&q=80', caption:'The law governs how organisations handle your data', credit:'Unsplash' },
    { url:'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=900&q=80', caption:'Cookie consent banners — required by the Privacy Regulations', credit:'Unsplash' },
    { url:'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&q=80', caption:'Cybercrime is prosecuted under the Computer Misuse Act 1990', credit:'Unsplash' },
  ],
  ai: [
    { url:'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80', caption:'AI systems are increasingly part of everyday decisions', credit:'Unsplash' },
    { url:'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&q=80', caption:'Machine learning finds patterns in vast amounts of data', credit:'Unsplash' },
    { url:'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?w=900&q=80', caption:'Voice assistants are one of the most common Narrow AI examples', credit:'Unsplash' },
  ],
  ip: [
    { url:'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=900&q=80', caption:'Software development — who owns the code you write?', credit:'Unsplash' },
    { url:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&q=80', caption:'Open-source communities collaborate freely across the world', credit:'Unsplash' },
    { url:'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=80', caption:'Legal protection for intellectual property drives innovation', credit:'Unsplash' },
  ],
  threats: [
    { url:'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=900&q=80', caption:'Cybercriminals operate in the shadows of the internet', credit:'Unsplash' },
    { url:'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&q=80', caption:'Phishing emails are designed to look completely legitimate', credit:'Unsplash' },
    { url:'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&q=80', caption:'Malware can silently compromise millions of devices', credit:'Unsplash' },
  ],
  protect: [
    { url:'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=900&q=80', caption:'Firewalls and encryption form the backbone of network security', credit:'Unsplash' },
    { url:'https://images.unsplash.com/photo-1555066931-4365d14431b9?w=900&q=80', caption:'Regular backups protect against data loss and ransomware', credit:'Unsplash' },
    { url:'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=900&q=80', caption:'Security teams defend organisations around the clock', credit:'Unsplash' },
  ],
};

// Which card index each image appears after (0-indexed)
const IMAGE_AFTER_CARD = [0, 1, 3]; // after card 1, 2, 4

function initLearn() {
  buildSTNav();
  loadST(App.currentST);
  trackSession();
}

function buildSTNav() {
  const nav = document.getElementById('st-nav');
  nav.innerHTML = '';
  SUBTOPICS.forEach((st, i) => {
    const sp = App.stProgress[i];
    const btn = document.createElement('button');
    btn.className = 'stbtn' + (i === App.currentST ? ' on' : '') + (sp.allDone ? ' done' : '');
    btn.innerHTML = `<span class="dot"></span>${st.label}`;
    btn.onclick = () => { App.currentST = i; buildSTNav(); loadST(i); };
    nav.appendChild(btn);
  });
}

function loadST(idx) {
  const st = SUBTOPICS[idx];
  const sp = App.stProgress[idx];
  const area = document.getElementById('learn-area');
  area.innerHTML = '';

  const totalItems = st.cards.length + st.cps.length;
  const done = sp.shown + sp.cpDone.length;
  document.getElementById('lp-fill').style.width = Math.round(done / totalItems * 100) + '%';
  document.getElementById('lp-label').textContent = Math.round(done / totalItems * 100) + '%';

  if (sp.allDone) {
    const banner = document.createElement('div');
    banner.className = 'done-banner au';
    banner.innerHTML = `<h2>✅ Subtopic Complete!</h2>
      <p>Great work! You've finished <strong>${st.label}</strong>. Flashcards, Quiz and Games are now unlocked.</p>
      <button class="btn btn-gn btn-lg" style="margin-top:16px;" onclick="nextST(${idx})">Next Subtopic →</button>`;
    area.appendChild(banner);
    st.cards.forEach(c => area.appendChild(buildCard(c)));
    return;
  }
  renderProgressive(st, sp, idx, area);
}

/* Build the interleaved sequence: card, card, checkpoint, card, card, checkpoint... */
function getSequence(st) {
  const seq = [];
  let cpIdx = 0;
  st.cards.forEach((card, ci) => {
    seq.push({ type: 'card', ci, card });
    if ((ci + 1) % 2 === 0 && cpIdx < st.cps.length) {
      seq.push({ type: 'cp', cpIdx: cpIdx++ });
    }
  });
  while (cpIdx < st.cps.length) seq.push({ type: 'cp', cpIdx: cpIdx++ });
  return seq;
}

function renderProgressive(st, sp, stIdx, area) {
  area.innerHTML = '';
  const seq = getSequence(st);
  let cardsRendered = 0;

  for (let i = 0; i < seq.length; i++) {
    const item = seq[i];

    if (item.type === 'card') {
      if (cardsRendered < sp.shown) {
        area.appendChild(buildCard(item.card));
        cardsRendered++;
        // Inject image after certain cards
        const imgIdx = IMAGE_AFTER_CARD.indexOf(item.ci);
        const imgs = TOPIC_IMAGES[st.id];
        if (imgIdx !== -1 && imgs && imgs[imgIdx]) {
          area.appendChild(buildImageCard(imgs[imgIdx]));
        }
      } else {
        // This card hasn't been revealed yet — show the reveal button and stop
        const btn = document.createElement('button');
        btn.className = 'reveal-btn';
        btn.textContent = sp.shown === 0 ? '▶ Start Learning' : '→ Next Card';
        btn.onclick = () => {
          sp.shown++;
          awardXP(XP_VALUES.cardReveal, 'Card revealed');
          saveState();
          updateLPBar(st, sp);
          renderProgressive(st, sp, stIdx, area);
        };
        area.appendChild(btn);
        return;
      }
    } else {
      // checkpoint
      if (sp.cpDone.includes(item.cpIdx)) {
        // already answered — skip (don't re-render)
        continue;
      } else {
        // Need to answer this checkpoint
        area.appendChild(buildCP(st, item.cpIdx, stIdx));
        return; // stop here until checkpoint answered
      }
    }
  }

  // Reached end — mark complete
  if (!sp.allDone) {
    sp._startTime = sp._startTime || Date.now();
    const elapsed = (Date.now() - (sp._startTime || Date.now())) / 1000;
    if (elapsed < 180) App._speedRun = true;
    sp.allDone = true;
    App.learned.add(st.id);
    awardXP(XP_VALUES.subtopicComplete, 'Subtopic complete!');
    saveState();
    refreshLocks();
    loadST(stIdx);
    buildSTNav();
    toast('🎉 Subtopic complete! +' + XP_VALUES.subtopicComplete + ' XP!');
  }
}

function updateLPBar(st, sp) {
  const totalItems = st.cards.length + st.cps.length;
  const done = sp.shown + sp.cpDone.length;
  const pct = Math.round(done / totalItems * 100);
  document.getElementById('lp-fill').style.width = pct + '%';
  document.getElementById('lp-label').textContent = pct + '%';
}

function buildCard(c) {
  const div = document.createElement('div');
  div.className = `cc ${c.col || ''} au`;
  let html = `<div style="margin-bottom:10px;"><span class="tag ${c.tc}">${c.tag}</span></div>
    <h3>${c.title}</h3>`;

  if (c.body) html += c.body;

  if (c.compare) {
    const labels = c.compare.labels || ['✅ Benefits', '❌ Drawbacks'];
    html += `<div class="cmp-grid">
      <div class="cmp-col pros"><h4>${labels[0]}</h4><ul>`;
    c.compare.pros.forEach(p => { html += `<li>${p}</li>`; });
    html += `</ul></div><div class="cmp-col cons"><h4>${labels[1]}</h4><ul>`;
    c.compare.cons.forEach(p => { html += `<li>${p}</li>`; });
    html += `</ul></div></div>`;
  }

  if (c.table) {
    const tc = c.table.cls || '';
    html += `<table class="tbl ${tc}"><thead><tr>`;
    c.table.heads.forEach(h => { html += `<th>${h}</th>`; });
    html += `</tr></thead><tbody>`;
    c.table.rows.forEach(row => {
      html += `<tr>`;
      row.forEach(cell => { html += `<td>${cell}</td>`; });
      html += `</tr>`;
    });
    html += `</tbody></table>`;
  }

  if (c.diagram) {
    const svg = getDiagram(c.diagram);
    if (svg) html += `<div class="dbox" style="margin-top:18px;">${svg}<p class="dcap">Diagram — ${c.title}</p></div>`;
  }

  if (c.info) {
    html += `<div class="info-box"><span>💡</span><p>${c.info}</p></div>`;
  }

  div.innerHTML = html;
  return div;
}

function buildCP(st, cpIdx, stIdx) {
  const cp = st.cps[cpIdx];
  const div = document.createElement('div');
  div.className = 'cpcard au';
  div.id = `cp-${stIdx}-${cpIdx}`;
  div.innerHTML = `<div class="cpcard-hd">
    <div class="cpcard-icon">🧠</div>
    <div><div class="cpcard-meta">Quick Check · Question ${cpIdx + 1}</div></div>
  </div>
  <div class="cpcard-q">${cp.q}</div>
  <div class="qopts" id="cpopts-${stIdx}-${cpIdx}" style="margin-top:16px;"></div>
  <div id="cpfb-${stIdx}-${cpIdx}"></div>`;

  const optsEl = div.querySelector(`#cpopts-${stIdx}-${cpIdx}`);
  const fbEl   = div.querySelector(`#cpfb-${stIdx}-${cpIdx}`);

  cp.opts.forEach((opt, oi) => {
    const btn = document.createElement('button');
    btn.className = 'qopt';
    btn.textContent = opt;
    btn.onclick = () => answerCP(stIdx, cpIdx, oi, cp, btn, optsEl, fbEl);
    optsEl.appendChild(btn);
  });

  return div;
}

function answerCP(stIdx, cpIdx, chosen, cp, clickedBtn, optsEl, fbEl) {
  optsEl.querySelectorAll('.qopt').forEach(b => b.disabled = true);
  const ok = chosen === cp.ans;
  clickedBtn.classList.add(ok ? 'correct' : 'wrong');
  optsEl.children[cp.ans].classList.add('correct');

  fbEl.innerHTML = `<div class="qfb ${ok ? 'ok' : 'bad'}">${ok ? '✅' : '❌'} ${cp.exp}</div>`;

  if (ok) {
    awardXP(XP_VALUES.checkpoint, 'Checkpoint!');
    const sp = App.stProgress[stIdx];
    if (!sp.cpDone.includes(cpIdx)) sp.cpDone.push(cpIdx);
    saveState();
    updateLPBar(SUBTOPICS[stIdx], sp);

    const cont = document.createElement('button');
    cont.className = 'next-btn';
    cont.textContent = 'Continue →';
    cont.onclick = () => {
      const area = document.getElementById('learn-area');
      renderProgressive(SUBTOPICS[stIdx], sp, stIdx, area);
    };
    fbEl.appendChild(cont);
  } else {
    const retry = document.createElement('button');
    retry.className = 'retry-btn';
    retry.textContent = '↺ Try Again';
    retry.onclick = () => {
      const area = document.getElementById('learn-area');
      renderProgressive(SUBTOPICS[stIdx], App.stProgress[stIdx], stIdx, area);
    };
    fbEl.appendChild(retry);
  }
}

function buildImageCard(img) {
  const div = document.createElement('div');
  div.className = 'img-card au';
  div.innerHTML = `
    <div class="img-card-inner" style="background-image:url('${img.url}')">
      <div class="img-card-overlay">
        <p class="img-caption">${img.caption}</p>
      </div>
    </div>`;
  return div;
}

function nextST(idx) {
  const next = idx + 1;
  if (next < SUBTOPICS.length) {
    App.currentST = next;
    buildSTNav();
    loadST(next);
  } else {
    toast('🏆 All subtopics complete — you\'re a CS5 expert!');
  }
}
