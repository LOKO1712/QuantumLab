// ══ QUANTUM.JS — Números cuánticos ↔ Config electrónica ══
// anomaliasQuimicas se define en elements.js (cargado primero)

const FILL_ORDER = [
  {n:1,l:0},{n:2,l:0},{n:2,l:1},{n:3,l:0},{n:3,l:1},
  {n:4,l:0},{n:3,l:2},{n:4,l:1},{n:5,l:0},{n:4,l:2},
  {n:5,l:1},{n:6,l:0},{n:4,l:3},{n:5,l:2},{n:6,l:1},
  {n:7,l:0},{n:5,l:3},{n:6,l:2},{n:7,l:1}
];
const L_NAMES = ['s','p','d','f'];
const L_MAX   = [2,6,10,14];

let qnSpin = null, filteredQ = [];

function renderQuantum() {
  document.getElementById('quantum-root').innerHTML = `
    <div class="qn-mode-toggle">
      <button class="qn-mode-btn active" onclick="setQnMode('c2q')">Config → N. Cuánticos</button>
      <button class="qn-mode-btn" onclick="setQnMode('q2c')">N. Cuánticos → Config</button>
    </div>

    <!-- PANEL C→Q -->
    <div class="qn-panel active" id="qp-c2q">
      <div class="card">
        <div class="card-title">// Configuración Electrónica</div>
        <div class="input-group">
          <label>Config. electrónica</label>
          <input type="text" id="q-cfg-input" placeholder="ej: 1s2 2s2 2p6 3s1">
          <div style="font-size:0.62rem;color:var(--text3);margin-top:4px">Formato: 1s2 2p6 3d5 … o busca el elemento</div>
        </div>
        <div class="section-label">Buscar elemento</div>
        <div class="elem-wrap">
          <input type="text" id="q-elem-search" placeholder="🔍 Nombre, símbolo o Z…" oninput="qFilterElems()" autocomplete="off">
          <div class="elem-dd" id="q-elem-dd"></div>
        </div>
        <button class="btn btn-primary" onclick="calcQN()">Determinar N. Cuánticos</button>
        <div id="q-result-c2q"></div>
      </div>
    </div>

    <!-- PANEL Q→C -->
    <div class="qn-panel" id="qp-q2c">
      <div class="card">
        <div class="card-title">// Ingresa Números Cuánticos</div>
        <div class="input-row">
          <div class="input-group" style="margin-bottom:0">
            <label>n — Principal</label>
            <select id="q-n" onchange="qUpdateL()">
              <option value="">—</option>
              ${[1,2,3,4,5,6,7].map(v=>`<option>${v}</option>`).join('')}
            </select>
          </div>
          <div class="input-group" style="margin-bottom:0">
            <label>ℓ — Azimutal</label>
            <select id="q-l" onchange="qUpdateMl()">
              <option value="">—</option>
            </select>
          </div>
        </div>
        <div class="input-group" style="margin-top:10px">
          <label>mℓ — Magnético</label>
          <select id="q-ml"><option value="">—</option></select>
        </div>
        <div class="input-group">
          <label>ms — Espín</label>
          <div class="spin-row">
            <div class="spin-opt" id="q-sup" onclick="qSelectSpin('+1/2')">+½ ↑</div>
            <div class="spin-opt" id="q-sdown" onclick="qSelectSpin('-1/2')">−½ ↓</div>
          </div>
        </div>
        <button class="btn btn-primary" onclick="calcConfig()">Obtener Configuración</button>
        <div id="q-result-q2c"></div>
      </div>
    </div>

    <!-- REF TABLE -->
    <div class="card">
      <div class="ref-toggle" onclick="qToggleRef()">
        <div class="card-title" style="margin:0">// Tabla de Referencia</div>
        <span class="ref-chevron" id="q-ref-chev">▼</span>
      </div>
      <div class="ref-body" id="q-ref-body">
        <table class="learn-table" style="margin-top:12px">
          <tr><th>n</th><th>ℓ</th><th>Subcapa</th><th>mℓ</th><th>e⁻ máx</th></tr>
          <tr><td>1</td><td>0</td><td>1s</td><td>0</td><td>2</td></tr>
          <tr><td>2</td><td>0</td><td>2s</td><td>0</td><td>2</td></tr>
          <tr><td>2</td><td>1</td><td>2p</td><td>−1,0,+1</td><td>6</td></tr>
          <tr><td>3</td><td>0</td><td>3s</td><td>0</td><td>2</td></tr>
          <tr><td>3</td><td>1</td><td>3p</td><td>−1,0,+1</td><td>6</td></tr>
          <tr><td>3</td><td>2</td><td>3d</td><td>−2…+2</td><td>10</td></tr>
          <tr><td>4</td><td>0</td><td>4s</td><td>0</td><td>2</td></tr>
          <tr><td>4</td><td>3</td><td>4f</td><td>−3…+3</td><td>14</td></tr>
        </table>
      </div>
    </div>
  `;
}

function setQnMode(m) {
  document.querySelectorAll('.qn-mode-btn').forEach((b,i) => b.classList.toggle('active', (i===0&&m==='c2q')||(i===1&&m==='q2c')));
  document.getElementById('qp-c2q').classList.toggle('active', m==='c2q');
  document.getElementById('qp-q2c').classList.toggle('active', m==='q2c');
}

// Element search
function qFilterElems() {
  const q = document.getElementById('q-elem-search').value.trim().toLowerCase();
  const dd = document.getElementById('q-elem-dd');
  if (!q) { dd.classList.remove('open'); return; }
  filteredQ = ELEMENTS.filter(e => e.name.toLowerCase().includes(q) || e.sym.toLowerCase().includes(q) || String(e.z).startsWith(q)).slice(0,15);
  dd.innerHTML = filteredQ.length
    ? filteredQ.map((e,i)=>`<div class="elem-item" onclick="qSelectElem(${i})"><span class="ei-z">${e.z}</span><span class="ei-sym">${e.sym}</span><span class="ei-name">${e.name}</span><span class="ei-cfg">${e.cfg}</span></div>`).join('')
    : '<div class="elem-item"><span class="ei-name" style="color:var(--text3)">Sin resultados</span></div>';
  dd.classList.add('open');
}

function qSelectElem(i) {
  const e = filteredQ[i];
  document.getElementById('q-cfg-input').value = e.cfg;
  document.getElementById('q-elem-search').value = `${e.sym} — ${e.name} (Z=${e.z})`;
  document.getElementById('q-elem-dd').classList.remove('open');
}

document.addEventListener('click', e => {
  if (!e.target.closest('.elem-wrap')) document.getElementById('q-elem-dd')?.classList.remove('open');
});

// Config → QN
function calcQN() {
  const raw = document.getElementById('q-cfg-input').value.trim();
  const el  = document.getElementById('q-result-c2q');
  if (!raw) { el.innerHTML = qErr('Ingresa la configuración electrónica.'); return; }

  // ═ 1. Detectar anomalía IUPAC directamente (sin calcular) ══
  for (const z in anomaliasQuimicas) {
    const anom = anomaliasQuimicas[z];
    if (raw === anom.config || raw === anom.configFull) {
      const q = anom.q;
      const cfgStr = anom.config.split(' ').map(s => {
        const m = s.match(/^(\d+)([spdf])(\d+)$/);
        if (m) return `${m[1]}${m[2]}${sup(m[3])}`;
        return s;
      }).join(' ');
      el.innerHTML = qnResult(q.n, q.l, L_NAMES[q.l], q.ml, q.ms, parseInt(z), cfgStr, { n: q.n, lName: L_NAMES[q.l] }, true);
      return;
    }
  }

  // ══ 2. Si no es anomalía, calcular normalmente ══
  const p = parseQCfg(raw);
  if (p.error) { el.innerHTML = qErr(p.error); return; }
  const { subshells } = p;
  const totalE = subshells.reduce((a,s) => a+s.count, 0);
  
  const last = subshells[subshells.length-1];
  const { n, l, lName, count } = last;
  const maxOrb = 2*l+1;
  let ml, ms;
  if (count <= maxOrb) { ml = -l+(count-1); ms = '+1/2'; }
  else { ml = -l+(count-maxOrb-1); ms = '-1/2'; }
  const cfgStr = subshells.map(s=>`${s.n}${s.lName}${sup(s.count)}`).join(' ');
  el.innerHTML = qnResult(n,l,lName,ml,ms,totalE,cfgStr,last);
}

function qnResult(n,l,lName,ml,ms,totalE,cfgStr,last,esExcepcion=false) {
  const excepcionBadge = esExcepcion ? '<div style="text-align:center;margin-bottom:8px"><span class="tag tag-orange">⚡ Configuración anómala IUPAC</span></div>' : '';
  const explanationText = esExcepcion
    ? `Este elemento (Z=${totalE}) tiene una configuración anómala por estabilidad de subcapa semillena/llena. Los valores cuánticos son los reales según IUPAC.`
    : `${last.count} e⁻ en ${2*l+1} orbital${2*l+1>1?'es':''}. ${last.count<=2*l+1?`Se llenan individualmente → mℓ=${ml>=0?'+':''}${ml}, ms=+½`:`Orbitales semillenos, empareja desde mℓ=${ml}, ms=−½`}`;
  const explanationTitle = esExcepcion ? 'Excepción IUPAC' : 'Regla de Hund';
  
  return `
    <div style="margin-top:12px;animation:fadeUp .35s ease">
      ${excepcionBadge}
      <div class="config-display">${cfgStr}</div>
      <div class="qn-grid-4">
        <div class="qn-badge"><span class="qn-sym c">n</span><span class="qn-val">${n}</span><span class="qn-lbl">Principal</span></div>
        <div class="qn-badge"><span class="qn-sym p">ℓ</span><span class="qn-val">${l}</span><span class="qn-lbl">Azimutal (${lName})</span></div>
        <div class="qn-badge"><span class="qn-sym a">mℓ</span><span class="qn-val">${ml>=0?'+':''}${ml}</span><span class="qn-lbl">Magnético</span></div>
        <div class="qn-badge"><span class="qn-sym g">ms</span><span class="qn-val">${ms}</span><span class="qn-lbl">Espín</span></div>
      </div>
      <div style="background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:12px">
        <div class="info-row"><span class="info-key">Total electrones (Z)</span><span class="info-val">${totalE}</span></div>
        <div class="info-row"><span class="info-key">Subcapa diferenciador</span><span class="info-val">${n}${lName}</span></div>
        <div class="info-row"><span class="info-key">Orbitales en subcapa</span><span class="info-val">${2*l+1} (mℓ: ${-l} a +${l})</span></div>
      </div>
      <div class="explanation"><strong>${explanationTitle}:</strong> ${explanationText}</div>
    </div>`;
}

// QN → Config
function qUpdateL() {
  const n = parseInt(document.getElementById('q-n').value);
  const sel = document.getElementById('q-l');
  sel.innerHTML = '<option value="">—</option>';
  if (!isNaN(n)) for (let l=0;l<n;l++) sel.innerHTML+=`<option value="${l}">${l} (${L_NAMES[l]})</option>`;
  document.getElementById('q-ml').innerHTML = '<option value="">—</option>';
}

function qUpdateMl() {
  const l = parseInt(document.getElementById('q-l').value);
  const sel = document.getElementById('q-ml');
  sel.innerHTML = '<option value="">—</option>';
  if (!isNaN(l)) for (let ml=-l;ml<=l;ml++) sel.innerHTML+=`<option value="${ml}">${ml>=0?'+':''}${ml}</option>`;
}

function qSelectSpin(v) {
  qnSpin = v;
  document.getElementById('q-sup').classList.toggle('sel',v==='+1/2');
  document.getElementById('q-sdown').classList.toggle('sel',v==='-1/2');
}

function calcConfig() {
  const n=document.getElementById('q-n').value, l=document.getElementById('q-l').value,
        ml=document.getElementById('q-ml').value, ms=qnSpin;
  const el=document.getElementById('q-result-q2c');
  if(!n||l===''||ml===''||!ms){el.innerHTML=qErr('Completa todos los números cuánticos.');return;}
  const ni=parseInt(n),li=parseInt(l),mli=parseInt(ml);

  // ══ 1. Buscar coincidencia en anomalías IUPAC ═
  for (const z in anomaliasQuimicas) {
    const anom = anomaliasQuimicas[z];
    const q = anom.q;
    if (q.n===ni && q.l===li && q.ml===mli && q.ms===ms) {
      const cfgStr = anom.config.split(' ').map(s => {
        const m = s.match(/^(\d+)([spdf])(\d+)$/);
        if (m) return `${m[1]}${m[2]}${sup(m[3])}`;
        return s;
      }).join(' ');
      el.innerHTML=`
        <div style="margin-top:12px;animation:fadeUp .35s ease">
          <div style="text-align:center;margin-bottom:8px"><span class="tag tag-orange">⚡ Configuración anómala IUPAC</span></div>
          <div class="config-display">${cfgStr}</div>
          <div class="qn-grid-4">
            <div class="qn-badge"><span class="qn-sym c">n</span><span class="qn-val">${ni}</span><span class="qn-lbl">Principal</span></div>
            <div class="qn-badge"><span class="qn-sym p">ℓ</span><span class="qn-val">${li}</span><span class="qn-lbl">Azimutal</span></div>
            <div class="qn-badge"><span class="qn-sym a">mℓ</span><span class="qn-val">${mli>=0?'+':''}${mli}</span><span class="qn-lbl">Magnético</span></div>
            <div class="qn-badge"><span class="qn-sym g">ms</span><span class="qn-val">${ms}</span><span class="qn-lbl">Espín</span></div>
          </div>
          <div style="background:var(--bg);border:1px solid var(--border2);border-radius:10px;padding:12px">
            <div class="info-row"><span class="info-key">Total electrones (Z)</span><span class="info-val">${z}</span></div>
            <div class="info-row"><span class="info-key">Elemento</span><span class="info-val">${ELEMENTS[parseInt(z)-1].sym} — ${ELEMENTS[parseInt(z)-1].name}</span></div>
            <div class="info-row"><span class="info-key">Período</span><span class="info-val">${ni}</span></div>
          </div>
          <div class="explanation"><strong>Excepción IUPAC:</strong> Este elemento tiene una configuración anómala por estabilidad de subcapa semillena/llena. Los valores son los reales según IUPAC.</div>
        </div>`;
      return;
    }
  }

  // ══ 2. Si no es anomalía, calcular por Aufbau ══
  const orbIdx=mli+li;
  const cnt=ms==='+1/2'?orbIdx+1:(2*li+1)+orbIdx+1;
  const config=[];let found=false;
  for(const sub of FILL_ORDER){
    if(sub.n===ni&&sub.l===li){config.push({n:sub.n,l:sub.l,count:cnt});found=true;break;}
    config.push({n:sub.n,l:sub.l,count:L_MAX[sub.l]});
  }
  if(!found){el.innerHTML=qErr('Subcapa no encontrada en orden de Aufbau.');return;}
  const totalE=config.reduce((a,s)=>a+s.count,0);
  const cfgStr=config.map(s=>`${s.n}${L_NAMES[s.l]}${sup(s.count)}`).join(' ');
  el.innerHTML=`
    <div style="margin-top:12px;animation:fadeUp .35s ease">
      <div class="config-display">${cfgStr}</div>
      <div class="qn-grid-4">
        <div class="qn-badge"><span class="qn-sym c">n</span><span class="qn-val">${ni}</span><span class="qn-lbl">Principal</span></div>
        <div class="qn-badge"><span class="qn-sym p">ℓ</span><span class="qn-val">${li}</span><span class="qn-lbl">Azimutal</span></div>
        <div class="qn-badge"><span class="qn-sym a">mℓ</span><span class="qn-val">${mli>=0?'+':''}${mli}</span><span class="qn-lbl">Magnético</span></div>
        <div class="qn-badge"><span class="qn-sym g">ms</span><span class="qn-val">${ms}</span><span class="qn-lbl">Espín</span></div>
      </div>
      <div style="background:var(--bg);border:1px solid var(--border2);border-radius:10px;padding:12px">
        <div class="info-row"><span class="info-key">Total electrones</span><span class="info-val">${totalE}</span></div>
        <div class="info-row"><span class="info-key">Electrón n° en ${ni}${L_NAMES[li]}</span><span class="info-val">${cnt} / ${L_MAX[li]}</span></div>
        <div class="info-row"><span class="info-key">Período</span><span class="info-val">${ni}</span></div>
      </div>
      <div class="explanation"><strong>Verificación:</strong> El e⁻ es el n°${cnt} en la subcapa ${ni}${L_NAMES[li]}, colocado por Aufbau y Hund.</div>
    </div>`;
}

// Helpers
function parseQCfg(raw) {
  const text = raw.trim().replace(/²/g,'2').replace(/³/g,'3').replace(/⁴/g,'4').replace(/⁵/g,'5').replace(/⁶/g,'6').replace(/⁷/g,'7').replace(/⁸/g,'8').replace(/⁹/g,'9').replace(/¹/g,'1').replace(/⁰/g,'0');
  const tokens = text.split(/\s+/);
  const subshells=[];
  for(const tok of tokens){
    const m=tok.match(/^(\d+)([spdf])(\d+)$/i);
    if(!m)return{error:`Token inválido: "${tok}"`};
    const n=parseInt(m[1]),lName=m[2].toLowerCase(),l=L_NAMES.indexOf(lName),count=parseInt(m[3]);
    if(n<1||n>7)return{error:`n=${n} fuera de rango`};
    if(l<0)return{error:`Subcapa "${lName}" inválida`};
    if(count<1||count>L_MAX[l])return{error:`${tok}: máx ${L_MAX[l]} e⁻ en ${n}${lName}`};
    subshells.push({n,l,lName,count});
  }
  return subshells.length?{subshells}:{error:'Ingresa al menos una subcapa'};
}

function sup(n){return String(n).split('').map(c=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[+c]).join('');}
function qErr(msg){return`<div class="error-box" style="margin-top:10px">⚠ ${msg}</div>`;}

let qRefOpen=false;
function qToggleRef(){
  qRefOpen=!qRefOpen;
  document.getElementById('q-ref-body').classList.toggle('open',qRefOpen);
  document.getElementById('q-ref-chev').classList.toggle('open',qRefOpen);
}
