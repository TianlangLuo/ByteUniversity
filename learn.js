/* ── LEARN PAGE ── */

function initLearn() {
  buildSTNav();
  loadST(App.currentST);
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
      } else {
        // This card hasn't been revealed yet — show the reveal button and stop
        const btn = document.createElement('button');
        btn.className = 'reveal-btn';
        btn.textContent = sp.shown === 0 ? '▶ Start Learning' : '→ Next Card';
        btn.onclick = () => {
          sp.shown++;
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
    sp.allDone = true;
    App.learned.add(st.id);
    saveState();
    refreshLocks();
    loadST(stIdx);
    buildSTNav();
    toast('🎉 Subtopic complete! Flashcards & Quiz unlocked!');
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
