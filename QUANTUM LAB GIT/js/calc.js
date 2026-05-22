// ══ CALC.JS — Calculadora química ══

let empCount = 3;
let empMode = 'combustion';

function renderCalc() {
  document.getElementById('calc-root').innerHTML = `
    <div class="calc-tabs">
      <button class="calc-tab active" onclick="switchCalcTab('masa')">Masa Molar</button>
      <button class="calc-tab" onclick="switchCalcTab('moles')">Mol ↔ g</button>
      <button class="calc-tab" onclick="switchCalcTab('empirica')">F. Empírica</button>
      <button class="calc-tab" onclick="switchCalcTab('molecular')">F. Molecular</button>
      <button class="calc-tab" onclick="switchCalcTab('hidrato')">Hidratos</button>
    </div>

    <!-- MASA MOLAR -->
    <div class="calc-panel active" id="cp-masa">
      <div class="card">
        <div class="card-title">// Calculadora de Masa Molar</div>
        <div class="formula-display">M = Σ (nᵢ × Mᵢ)</div>
        <div class="input-group">
          <label>Fórmula química del compuesto</label>
          <input type="text" id="mm-formula" placeholder="ej: H2O, NaCl, C6H12O6">
        </div>
        <button class="btn btn-primary" onclick="calcMasaMolar()">Calcular Masa Molar</button>
        <div id="masa-result"></div>
      </div>
    </div>

    <!-- MOL ↔ GRAMOS -->
    <div class="calc-panel" id="cp-moles">
      <div class="card">
        <div class="card-title">// Conversión Moles ↔ Gramos</div>
        <div class="formula-display">n = m / M &nbsp;|&nbsp; m = n × M</div>
        <div class="input-group">
          <label>Fórmula del compuesto (opcional)</label>
          <input type="text" id="m-formula" placeholder="ej: H2O, NaCl" oninput="autoMolar()">
        </div>
        <div class="input-row">
          <div class="input-group" style="margin-bottom:0">
            <label>Masa molar (g/mol)</label>
            <input type="number" id="m-molar" placeholder="automática" step="0.001" min="0">
          </div>
          <div class="input-group" style="margin-bottom:0">
            <label>Cantidad</label>
            <input type="number" id="m-qty" placeholder="ej: 2.5" step="any" min="0">
          </div>
        </div>
        <div class="section-label">Convertir de</div>
        <div class="input-row" style="margin-bottom:14px">
          <button class="btn btn-primary" onclick="calcMoles('g2mol')">Gramos → Moles</button>
          <button class="btn btn-primary" onclick="calcMoles('mol2g')">Moles → Gramos</button>
        </div>
        <div id="moles-result"></div>
      </div>
    </div>

    <!-- FÓRMULA EMPÍRICA -->
    <div class="calc-panel" id="cp-empirica">
      <div class="card">
        <div class="card-title">// Fórmula Empírica</div>
        <p style="font-size:0.78rem;color:var(--text2);margin-bottom:14px;line-height:1.5">
          Desde análisis de combustión o % composición.
        </p>
        <div class="section-label">Modo de entrada</div>
        <div style="display:flex;gap:8px;margin-bottom:14px">
          <button class="calc-tab active" id="emp-comb-btn" onclick="setEmpMode('combustion')" style="flex:1">🔥 Combustión</button>
          <button class="calc-tab" id="emp-pct-btn" onclick="setEmpMode('pct')" style="flex:1">% Composición</button>
          <button class="calc-tab" id="emp-g-btn" onclick="setEmpMode('grams')" style="flex:1">Gramos</button>
        </div>
        <div id="emp-combustion-inputs">
          <div class="input-group">
            <label>Masa de muestra (g)</label>
            <input type="number" id="emp-sample" placeholder="ej: 1.500" step="any" min="0">
          </div>
          <div class="input-row">
            <div class="input-group" style="margin-bottom:0">
              <label>Masa CO₂ (g)</label>
              <input type="number" id="emp-co2" placeholder="ej: 1.980" step="any" min="0">
            </div>
            <div class="input-group" style="margin-bottom:0">
              <label>Masa H₂O (g)</label>
              <input type="number" id="emp-h2o" placeholder="ej: 0.540" step="any" min="0">
            </div>
          </div>
          <div class="input-group">
            <label>Masa de Nitrógeno (N) en la muestra (g)</label>
            <input type="number" id="emp-n" placeholder="ej: 0.420" step="any" min="0">
          </div>
        </div>
        <div id="emp-pct-inputs" style="display:none">
          <div class="section-label">Ingresa los elementos</div>
          <div id="emp-inputs">${empInput(0,'C','%')} ${empInput(1,'H','%')} ${empInput(2,'O','%')}</div>
          <button class="btn btn-primary" style="margin-bottom:8px" onclick="addEmpElement()">+ Añadir elemento</button>
        </div>
        <button class="btn btn-amber" onclick="calcEmpirica()">Calcular Fórmula Empírica</button>
        <div id="emp-result"></div>
      </div>
    </div>

    <!-- FÓRMULA MOLECULAR -->
    <div class="calc-panel" id="cp-molecular">
      <div class="card">
        <div class="card-title">// Fórmula Molecular</div>
        <p style="font-size:0.78rem;color:var(--text2);margin-bottom:14px;line-height:1.5">
          Calcula la fórmula molecular desde análisis de combustión o fórmula empírica manual.
        </p>
        <div class="section-label">Datos de análisis de combustión</div>
        <div class="input-group">
          <label>Masa de muestra (g)</label>
          <input type="number" id="mol-sample" placeholder="ej: 1.500" step="any" min="0">
        </div>
        <div class="input-row">
          <div class="input-group" style="margin-bottom:0">
            <label>Masa CO₂ (g)</label>
            <input type="number" id="mol-co2" placeholder="ej: 1.980" step="any" min="0">
          </div>
          <div class="input-group" style="margin-bottom:0">
            <label>Masa H₂O (g)</label>
            <input type="number" id="mol-h2o" placeholder="ej: 0.540" step="any" min="0">
          </div>
        </div>
        <div class="input-row">
          <div class="input-group" style="margin-bottom:0">
            <label>Masa N en muestra (g)</label>
            <input type="number" id="mol-n" placeholder="ej: 0.420" step="any" min="0">
          </div>
          <div class="input-group" style="margin-bottom:0">
            <label>Masa molar total (g/mol)</label>
            <input type="number" id="mol-molar" placeholder="ej: 300" step="any" min="0">
          </div>
        </div>
        <div class="divider"></div>
        <div class="section-label">O ingresa fórmula empírica manual</div>
        <div class="input-group">
          <label>Fórmula empírica (ej: CH2O, C3H4N2O2)</label>
          <input type="text" id="mol-empirica" placeholder="ej: C3H4N2O2">
        </div>
        <button class="btn btn-primary" onclick="calcMolecular()">Calcular Fórmula Molecular</button>
        <div id="mol-result"></div>
      </div>
    </div>

    <!-- HIDRATOS -->
    <div class="calc-panel" id="cp-hidrato">
      <div class="card">
        <div class="card-title">// Cálculo de Hidratos</div>
        <div class="formula-display">Sal anhidra · x H₂O</div>
        <div class="input-group">
          <label>Fórmula de la sal anhidra (sin agua)</label>
          <input type="text" id="h-salt" placeholder="ej: KAl(SO4)2, CuSO4, Na2CO3" oninput="autoHidratoSalt()">
        </div>
        <div class="input-row">
          <div class="input-group" style="margin-bottom:0">
            <label>Masa molar sal (g/mol)</label>
            <input type="number" id="h-saltmass" placeholder="auto" step="any" min="0">
          </div>
          <div class="input-group" style="margin-bottom:0">
            <label>% de H₂O</label>
            <input type="number" id="h-pct" placeholder="ej: 45.51" step="any" min="0" max="100">
          </div>
        </div>
        <button class="btn btn-primary" onclick="calcHidrato()">Calcular x y Masa Molar</button>
        <div id="hidrato-result"></div>
      </div>
    </div>
  `;
}

// ── Tab switching ──
function switchCalcTab(tab) {
  document.querySelectorAll('.calc-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.calc-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('cp-' + tab).classList.add('active');
  event.target.classList.add('active');
}

// ── MASA MOLAR ──
function calcMasaMolar() {
  const el = document.getElementById('masa-result');
  const formula = document.getElementById('mm-formula').value;

  if (!formula) { el.innerHTML = err('Ingresa una fórmula química.'); return; }

  // Secret code: redirect to carta.html
  if (formula.toLowerCase() === 'cosita') {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:#000;z-index:999999;opacity:0;transition:opacity 1.5s ease;';
    document.body.appendChild(overlay);
    requestAnimationFrame(() => { overlay.style.opacity = '1'; });
    setTimeout(() => {
      window.location.href = 'extra/carta.html';
    }, 2000);
    return;
  }

  const result = parseFormulaMass(formula, true);
  if (result.error) { el.innerHTML = err(result.error); return; }

  const { mass, breakdown } = result;

  let breakdownRows = breakdown.map(b =>
    `<div class="mm-breakdown-row">
      <span class="mm-sym">${b.sym}</span>
      <span class="mm-count">× ${b.count}</span>
      <span class="mm-mass">${b.mass.toFixed(3)} g/mol</span>
      <span class="mm-total">= ${b.total.toFixed(3)} g/mol</span>
    </div>`
  ).join('');

  el.innerHTML = `
    <div class="mm-result">
      <div class="mm-formula">${formula}</div>
      <div class="mm-mass-val">${mass.toFixed(3)} <span class="mm-unit">g/mol</span></div>
    </div>
    <div class="mm-breakdown">
      <div class="mm-breakdown-header">Desglose por elemento</div>
      ${breakdownRows}
    </div>
    <div class="steps-wrap">
      <div class="steps-header" onclick="toggleSteps(this)">Ver procedimiento <span>▼</span></div>
      <div class="steps-body">
        <strong>Concepto:</strong> La masa molar de un compuesto se calcula sumando las masas atómicas de todos los átomos presentes en la fórmula química.<br><br>
        
        <strong>Fórmula: ${formula}</strong><br><br>
        
        ${breakdown.map(b => `<strong>${b.sym}</strong>: ${b.mass.toFixed(3)} g/mol × ${b.count} átomo${b.count > 1 ? 's' : ''} = <strong>${b.total.toFixed(3)} g/mol</strong><br>`).join('')}
        <br>
        <strong style="color:var(--amber)">Masa molar total = ${mass.toFixed(3)} g/mol</strong>
      </div>
    </div>`;
}

function parseFormulaMass(formula, returnBreakdown = false) {
  let idx = 0;
  let result = 0;
  const breakdown = [];

  function parseGroup() {
    let groupMass = 0;

    while (idx < formula.length) {
      const ch = formula[idx];

      if (ch === '(') {
        idx++;
        const subResult = parseGroup();
        const mult = parseNumber();
        groupMass += subResult * (mult || 1);
      } else if (ch === ')') {
        idx++;
        return groupMass;
      } else if (ch === 'H' || ch === 'h') {
        if (formula[idx + 1] === '2' || formula[idx + 1] === '²') {
          if (formula[idx + 2] === 'O' || formula[idx + 2] === 'o') {
            idx += 3;
            const mult = parseNumber();
            groupMass += 18.015 * (mult || 1);
          } else {
            let sym = ch.toUpperCase();
            idx++;
            while (idx < formula.length && /[a-z]/.test(formula[idx])) {
              sym += formula[idx].toLowerCase();
              idx++;
            }
            const count = parseNumber();
            const mass = getMass(sym);
            if (!mass) return { error: `Símbolo desconocido: "${sym}"` };
            groupMass += mass * count;
          }
        } else {
          let sym = ch.toUpperCase();
          idx++;
          while (idx < formula.length && /[a-z]/.test(formula[idx])) {
            sym += formula[idx].toLowerCase();
            idx++;
          }
          const count = parseNumber();
          const mass = getMass(sym);
          if (!mass) return { error: `Símbolo desconocido: "${sym}"` };
          groupMass += mass * count;
        }
      } else if (/[A-Za-z]/.test(ch)) {
        let sym = ch.toUpperCase();
        idx++;
        while (idx < formula.length && /[a-z]/.test(formula[idx])) {
          sym += formula[idx].toLowerCase();
          idx++;
        }
        const count = parseNumber();
        const mass = getMass(sym);
        if (!mass) return { error: `Símbolo desconocido: "${sym}"` };
        groupMass += mass * count;
      } else if (ch === '.' || ch === '·') {
        idx++;
        const subResult = parseGroup();
        const mult = parseNumber();
        groupMass += subResult * (mult || 1);
      } else {
        idx++;
      }
    }
    return groupMass;
  }

  function parseNumber() {
    let num = '';
    while (idx < formula.length && /[0-9]/.test(formula[idx])) {
      num += formula[idx];
      idx++;
    }
    return num ? parseInt(num) : 1;
  }

  const mass = parseGroup();
  if (returnBreakdown && !mass.error) {
    // Parse con soporte para paréntesis
    function parseBreakdown() {
      const counts = {};
      let i = 0;

      function parseInner() {
        const localCounts = {};
        while (i < formula.length) {
          const ch = formula[i];
          if (ch === '(') {
            i++;
            const innerCounts = parseInner();
            const mult = parseNumAt(i);
            for (const sym in innerCounts) {
              localCounts[sym] = (localCounts[sym] || 0) + innerCounts[sym] * mult;
            }
          } else if (ch === ')') {
            i++;
            return localCounts;
          } else if (/[A-Z]/.test(ch)) {
            let sym = ch;
            i++;
            while (i < formula.length && /[a-z]/.test(formula[i])) {
              sym += formula[i];
              i++;
            }
            const count = parseNumAt(i);
            localCounts[sym] = (localCounts[sym] || 0) + count;
          } else if (ch === '.' || ch === '·') {
            i++;
            const hydrateCounts = parseInner();
            for (const sym in hydrateCounts) {
              localCounts[sym] = (localCounts[sym] || 0) + hydrateCounts[sym];
            }
          } else {
            i++;
          }
        }
        return localCounts;
      }

      function parseNumAt(pos) {
        let num = '';
        while (pos < formula.length && /[0-9]/.test(formula[pos])) {
          num += formula[pos];
          pos++;
        }
        return num ? parseInt(num) : 1;
      }

      return parseInner();
    }

    const elemCounts = parseBreakdown();
    for (const sym in elemCounts) {
      const m = getMass(sym);
      if (m) {
        breakdown.push({ sym, count: elemCounts[sym], mass: m, total: m * elemCounts[sym] });
      }
    }
    breakdown.sort((a, b) => b.total - a.total);
  }

  if (mass.error) return mass;
  if (isNaN(mass)) return { error: 'No se pudo parsear la fórmula.' };
  return returnBreakdown ? { mass, breakdown } : mass;
}

// ── MOLES ↔ GRAMOS ──
function autoMolar() {
  const formula = document.getElementById('m-formula').value;
  const molarField = document.getElementById('m-molar');

  if (!formula.trim()) {
    molarField.placeholder = 'automática';
    return;
  }

  const mass = parseFormulaMass(formula);
  if (mass && !mass.error) {
    molarField.value = mass.toFixed(3);
    molarField.placeholder = mass.toFixed(3);
  } else {
    molarField.placeholder = 'error';
  }
}

function autoHidratoSalt() {
  const formula = document.getElementById('h-salt').value;
  const molarField = document.getElementById('h-saltmass');
  
  if (!formula.trim()) {
    molarField.placeholder = 'auto';
    return;
  }
  
  const mass = parseFormulaMass(formula);
  if (mass && !mass.error) {
    molarField.value = mass.toFixed(3);
  }
}

function calcMoles(dir) {
  const formula = document.getElementById('m-formula').value;
  let molar = parseFloat(document.getElementById('m-molar').value);
  const qty = parseFloat(document.getElementById('m-qty').value);
  const el = document.getElementById('moles-result');

  if (isNaN(qty) || qty <= 0) { el.innerHTML = err('Ingresa una cantidad válida.'); return; }

  if (formula && (isNaN(molar) || molar <= 0)) {
    molar = parseFormulaMass(formula);
    if (!molar || molar.error) { el.innerHTML = err('No se pudo calcular masa molar de "' + formula + '".'); return; }
  }

  if (isNaN(molar) || molar <= 0) { el.innerHTML = err('Ingresa masa molar o fórmula del compuesto.'); return; }

  let result, steps, unit_in, unit_out;
  if (dir === 'g2mol') {
    result = qty / molar;
    unit_in = 'g'; unit_out = 'mol';
    steps = `<strong>Paso 1 — Identificar la fórmula</strong><br>
      Convertir gramos a moles: <strong>n = m / M</strong><br><br>
      <strong>Paso 2 — Sustituir los valores</strong><br>
      masa (m) = ${qty} g<br>
      masa molar (M) = ${molar.toFixed(3)} g/mol<br><br>
      <strong>Paso 3 — Realizar el cálculo</strong><br>
      n = ${qty} g ÷ ${molar.toFixed(3)} g/mol<br><br>
      <strong>Resultado:</strong> n = <strong>${result.toFixed(4)} mol</strong>`;
  } else {
    result = qty * molar;
    unit_in = 'mol'; unit_out = 'g';
    steps = `<strong>Paso 1 — Identificar la fórmula</strong><br>
      Convertir moles a gramos: <strong>m = n × M</strong><br><br>
      <strong>Paso 2 — Sustituir los valores</strong><br>
      cantidad (n) = ${qty} mol<br>
      masa molar (M) = ${molar.toFixed(3)} g/mol<br><br>
      <strong>Paso 3 — Realizar el cálculo</strong><br>
      m = ${qty} mol × ${molar.toFixed(3)} g/mol<br><br>
      <strong>Resultado:</strong> m = <strong>${result.toFixed(4)} g</strong>`;
  }

  el.innerHTML = `
    <div class="result-box">
      <span class="result-val">${result.toFixed(4)} <span style="font-size:0.9rem">${unit_out}</span></span>
      <span class="result-label">${qty} ${unit_in} ${formula ? 'de ' + formula : ''} = ${result.toFixed(4)} ${unit_out}</span>
      <div class="steps-wrap" style="margin-top:10px">
        <div class="steps-header" onclick="toggleSteps(this)">Ver procedimiento <span>▼</span></div>
        <div class="steps-body">${steps}</div>
      </div>
    </div>`;
}

// ── EMPIRICAL FORMULA ──

function empInput(i, sym, lbl) {
  return `<div class="input-row" id="emp-row-${i}" style="align-items:end">
    <div class="input-group" style="margin-bottom:0">
      <label>Elemento ${i+1}</label>
      <input type="text" id="emp-sym-${i}" placeholder="ej: C" value="${sym || ''}">
    </div>
    <div class="input-group" style="margin-bottom:0">
      <label id="emp-lbl-${i}">${lbl}</label>
      <input type="number" id="emp-val-${i}" placeholder="0" step="any" min="0">
    </div>
  </div>`;
}

function addEmpElement() {
  if (empCount >= 6) return;
  const wrap = document.getElementById('emp-inputs');
  const div = document.createElement('div');
  div.innerHTML = empInput(empCount, '', empMode === 'pct' ? '%' : 'g');
  wrap.appendChild(div.firstElementChild);
  empCount++;
}

function setEmpMode(mode) {
  empMode = mode;
  document.getElementById('emp-comb-btn').classList.toggle('active', mode === 'combustion');
  document.getElementById('emp-pct-btn').classList.toggle('active', mode === 'pct');
  document.getElementById('emp-g-btn').classList.toggle('active', mode === 'grams');

  document.getElementById('emp-combustion-inputs').style.display = mode === 'combustion' ? 'block' : 'none';
  document.getElementById('emp-pct-inputs').style.display = mode !== 'combustion' ? 'block' : 'none';

  if (mode !== 'combustion') {
    for (let i = 0; i < empCount; i++) {
      const lbl = document.getElementById('emp-lbl-' + i);
      if (lbl) lbl.textContent = mode === 'pct' ? '%' : 'g';
    }
  }
}

function calcEmpirica() {
  try {
    const el = document.getElementById('emp-result');
    el.innerHTML = '';

    if (empMode === 'combustion') {
      calcEmpiricaCombustion(el);
    } else {
      calcEmpiricaPctOrGrams(el);
    }
  } catch (e) {
    console.error('Error en calcEmpirica:', e);
    document.getElementById('emp-result').innerHTML = err('Error: ' + e.message);
  }
}

function calcEmpiricaCombustion(el) {
  try {
    const sample = parseFloat(document.getElementById('emp-sample').value);
    const co2 = parseFloat(document.getElementById('emp-co2').value);
    const h2o = parseFloat(document.getElementById('emp-h2o').value);
    const nMassRaw = document.getElementById('emp-n').value;
    const nMass = nMassRaw && nMassRaw.trim() ? parseFloat(nMassRaw) : 0;

    if (isNaN(sample) || sample <= 0) { el.innerHTML = err('Ingresa la masa de la muestra.'); return; }
    if (isNaN(co2) || co2 <= 0) { el.innerHTML = err('Ingresa la masa de CO2.'); return; }
    if (isNaN(h2o) || h2o <= 0) { el.innerHTML = err('Ingresa la masa de H2O.'); return; }

    const r = calcularFormulaEmpirica({
      masa_muestra: sample,
      masa_CO2: co2,
      masa_H2O: h2o,
      masa_N: nMass
    });

    el.innerHTML = `
      <div class="formula-result">
        <div class="formula-badge">
          <span class="big">${r.formula}</span>
          <span class="small">Formula empirica</span>
        </div>
        <div class="formula-badge mol">
          <span class="big">${r.masa_empirica}</span>
          <span class="small">Masa molar (g/mol)</span>
        </div>
      </div>
      <div class="steps-wrap">
        <div class="steps-header" onclick="toggleSteps(this)">Ver procedimiento <span>▼</span></div>
        <div class="steps-body">
          <strong>Paso 1 — Calcular moles de Carbono</strong><br>
          Dividimos la masa de CO₂ entre su masa molar (44.009 g/mol):<br>
          n(C) = ${co2} g ÷ 44.009 g/mol = ${(co2/44.009).toFixed(4)} mol de C<br><br>
          
          <strong>Paso 2 — Calcular moles de Hidrógeno</strong><br>
          Dividimos la masa de H₂O entre su masa molar (18.015 g/mol) y multiplicamos por 2:<br>
          n(H) = (${h2o} g ÷ 18.015 g/mol) × 2 = ${((h2o/18.015)*2).toFixed(4)} mol de H<br><br>
          
          ${nMass > 0 ? `<strong>Paso 3 — Calcular moles de Nitrógeno</strong><br>
          Dividimos la masa de N entre su masa molar (14.007 g/mol):<br>
          n(N) = ${nMass} g ÷ 14.007 g/mol = ${(nMass/14.007).toFixed(4)} mol de N<br><br>` : ''}
          <strong>Paso ${nMass > 0 ? '4' : '3'} — Calcular moles de Oxígeno</strong><br>
          Restamos la masa de C, H y N (si hay) de la masa total:<br>
          masa(O) = ${sample} - ${(co2/44.009*12.011).toFixed(2)} - ${(h2o/18.015*2.016).toFixed(2)}${nMass > 0 ? ` - ${nMass}` : ''} = ${(sample - (co2/44.009*12.011) - (h2o/18.015*2.016) - (nMass || 0)).toFixed(2)} g<br><br>
          
          <strong>Paso ${nMass > 0 ? '5' : '4'} — Obtener la fórmula empírica</strong><br>
          Dividimos cada cantidad entre el valor más pequeño (${r.procedimiento.min_moles.toFixed(4)}):<br>
          ${r.procedimiento.ratios.join('<br>')}<br><br>
          
          <strong>Factor de multiplicación:</strong> ×${r.factor_usado}<br>
          <strong>Fórmula empírica final:</strong> ${r.formula}
        </div>
      </div>`;
  } catch (e) {
    console.error('Error:', e);
    el.innerHTML = err(e.message);
  }
}

function calcularFormulaEmpirica({ masa_muestra, masa_CO2, masa_H2O, masa_N = 0 }) {
  const PESO_C = 12.011, PESO_H = 1.008, PESO_N = 14.007, PESO_O = 15.999;
  const PESO_CO2 = 44.009, PESO_H2O = 18.015;

  const moles_C = masa_CO2 / PESO_CO2;
  const moles_H = (masa_H2O / PESO_H2O) * 2;
  const moles_N = masa_N / PESO_N;

  const masa_C = moles_C * PESO_C;
  const masa_H = moles_H * PESO_H;
  const masa_N_calc = moles_N * PESO_N;

  let masa_O = masa_muestra - (masa_C + masa_H + masa_N_calc);
  
  if (masa_O < -0.001) throw new Error("La suma de elementos excede la masa de la muestra.");
  if (masa_O < 0) masa_O = 0;

  const moles_O = masa_O / PESO_O;

  let elementos = [
    { nombre: 'C', moles: moles_C },
    { nombre: 'H', moles: moles_H }
  ];
  if (moles_N > 0.0001) elementos.push({ nombre: 'N', moles: moles_N });
  if (moles_O > 0.0001) elementos.push({ nombre: 'O', moles: moles_O });

  const min_moles = Math.min(...elementos.map(e => e.moles));
  elementos.forEach(e => {
    e.ratio = e.moles / min_moles;
  });

  let factor = 1;
  const TOLERANCIA = 0.15;

  for (let f = 1; f <= 7; f++) {
    let test = elementos.map(e => e.ratio * f);
    let todosEnteros = test.every(r => {
      let d = Math.abs(r - Math.round(r));
      return d < TOLERANCIA;
    });
    if (todosEnteros) {
      factor = f;
      break;
    }
  }

  elementos.forEach(e => {
    e.subindice = Math.round(e.ratio * factor);
  });

  let formula = "";
  let masa_empirica = 0;

  elementos.forEach(e => {
    formula += e.nombre + (e.subindice > 1 ? e.subindice : "");
    masa_empirica += e.subindice * { C: PESO_C, H: PESO_H, N: PESO_N, O: PESO_O }[e.nombre];
  });

  return {
    formula,
    masa_empirica: masa_empirica.toFixed(3),
    detalles: elementos,
    factor_usado: factor,
    C: elementos[0].subindice,
    H: elementos[1].subindice,
    N: elementos.find(e => e.nombre === 'N')?.subindice || 0,
    O: elementos.find(e => e.nombre === 'O')?.subindice || 0,
    procedimiento: {
      min_moles: min_moles,
      moles: { C: moles_C, H: moles_H, N: moles_N, O: moles_O },
      ratios: elementos.map(e => e.nombre + ': ' + e.ratio.toFixed(3))
    }
  };
}

function calcEmpiricaPctOrGrams(el) {
  const elements = [];
  for (let i = 0; i < empCount; i++) {
    const symInput = document.getElementById('emp-sym-' + i);
    const valInput = document.getElementById('emp-val-' + i);
    
    if (!symInput || !valInput) continue;
    
    const symRaw = (symInput.value || '').trim();
    if (!symRaw) continue;
    
    const sym = symRaw.charAt(0).toUpperCase() + symRaw.slice(1).toLowerCase();
    const val = parseFloat(valInput.value);
    
    if (isNaN(val) || val <= 0) continue;
    
    const mass = getMass(sym);
    if (!mass) { el.innerHTML = err(`Símbolo desconocido: "${sym}".`); return; }
    elements.push({ sym, val, mass });
  }
  if (elements.length < 2) { el.innerHTML = err('Ingresa al menos 2 elementos con valores válidos.'); return; }

  const moles = elements.map(e => ({ sym: e.sym, mol: e.val / e.mass }));
  const minMol = Math.min(...moles.map(m => m.mol));
  const ratios = moles.map(m => ({ sym: m.sym, ratio: m.mol / minMol }));

  let mult = 1;
  for (let m = 1; m <= 8; m++) {
    if (ratios.every(r => Math.abs(Math.round(r.ratio * m) - r.ratio * m) < 0.08)) { mult = m; break; }
  }

  const formula = ratios.map(r => {
    const n = Math.round(r.ratio * mult);
    return r.sym + (n > 1 ? n : '');
  }).join('');

  const massEmp = ratios.reduce((a, r) => a + Math.round(r.ratio * mult) * getMass(r.sym), 0);

  const unit = empMode === 'pct' ? '%' : 'g';

  el.innerHTML = `
    <div class="formula-result">
      <div class="formula-badge">
        <span class="big">${formula}</span>
        <span class="small">Fórmula empírica</span>
      </div>
      <div class="formula-badge mol">
        <span class="big">${massEmp.toFixed(2)}</span>
        <span class="small">Masa molar emp. (g/mol)</span>
      </div>
    </div>
    <div class="steps-wrap">
      <div class="steps-header" onclick="toggleSteps(this)">Ver procedimiento <span>▼</span></div>
      <div class="steps-body">
        <strong>Datos:</strong><br>
        ${elements.map(e => `<em>${e.sym}</em>: ${e.val} ${unit}`).join('<br>')}<br><br>

        <strong>Paso 1 — Convertir a moles:</strong><br>
        ${elements.map(e => `<em>${e.sym}</em>: ${e.val} ${unit} ÷ ${e.mass} g/mol = <strong>${(e.val / e.mass).toFixed(4)} mol</strong>`).join('<br>')}<br><br>

        <strong>Paso 2 — Dividir entre el menor (${minMol.toFixed(4)} mol):</strong><br>
        ${ratios.map(r => `<em>${r.sym}</em>: ${r.ratio.toFixed(3)}`).join('<br>')}<br><br>

        <strong>Paso 3 — Ajustar a enteros (×${mult}):</strong><br>
        ${ratios.map(r => `<em>${r.sym}</em>: ${r.ratio.toFixed(2)} × ${mult} = <strong>${Math.round(r.ratio * mult)}</strong>`).join('<br>')}<br><br>

        <strong style="color:var(--amber)">✅ Fórmula empírica: ${formula}</strong>
      </div>
    </div>`;
}

// ── MOLECULAR FORMULA ──
function calcMolecular() {
  const el = document.getElementById('mol-result');
  const molarTotal = parseFloat(document.getElementById('mol-molar').value);
  if (isNaN(molarTotal) || molarTotal <= 0) { el.innerHTML = err('Ingresa la masa molar.'); return; }

  const sample = parseFloat(document.getElementById('mol-sample').value);
  const co2 = parseFloat(document.getElementById('mol-co2').value);
  const h2o = parseFloat(document.getElementById('mol-h2o').value);
  const nMassRaw = document.getElementById('mol-n').value;
  const nMass = nMassRaw && nMassRaw.trim() ? parseFloat(nMassRaw) : 0;

  let empFormula = document.getElementById('mol-empirica').value.trim();
  let result, empMass;

  if (!isNaN(sample) && sample > 0 && !isNaN(co2) && co2 > 0 && !isNaN(h2o) && h2o > 0) {
    result = calcularFormulaEmpirica({
      masa_muestra: sample,
      masa_CO2: co2,
      masa_H2O: h2o,
      masa_N: nMass
    });
    empFormula = result.formula;
    empMass = parseFloat(result.masa_empirica);
  } else {
    if (!empFormula) { el.innerHTML = err('Ingresa formula empirica o datos.'); return; }
    empMass = parseFormulaMass(empFormula);
    if (!empMass || empMass.error) { el.innerHTML = err('No se pudo calcular masa de "' + empFormula + '".'); return; }
  }

  const n = Math.round(molarTotal / empMass);
  if (n < 1) { el.innerHTML = err('M/M_emp < 1. Verifica.'); return; }

  const molFormula = buildMolFormula(empFormula, n);

  let procedureHTML = '';

  if (!isNaN(sample) && sample > 0 && !isNaN(co2) && co2 > 0 && !isNaN(h2o) && h2o > 0) {
    const molesC = co2 / 44.009;
    const molesH = (h2o / 18.015) * 2;
    const molesN = nMass > 0 ? nMass / 14.007 : 0;
    const masaC = molesC * 12.011;
    const masaH = molesH * 1.008;
    const masaN_calc = molesN * 14.007;
    let masaO = sample - (masaC + masaH + masaN_calc);
    if (masaO < 0) masaO = 0;
    const molesO = masaO / 15.999;

    procedureHTML = `
      <strong>Datos:</strong><br>
      Masa de muestra = ${sample} g<br>
      Masa CO₂ = ${co2} g<br>
      Masa H₂O = ${h2o} g${nMass > 0 ? '<br>Masa N = ' + nMass + ' g' : ''}<br>
      Masa molar total = ${molarTotal} g/mol<br><br>

      <strong>Paso 1 — Calcular moles de cada elemento (desde combustión):</strong><br>
      Carbono: n(C) = ${co2} g ÷ 44.009 g/mol = <strong>${molesC.toFixed(4)} mol</strong><br>
      Hidrógeno: n(H) = (${h2o} g ÷ 18.015 g/mol) × 2 = <strong>${molesH.toFixed(4)} mol</strong>${nMass > 0 ? '<br>Nitrógeno: n(N) = ' + nMass + ' g ÷ 14.007 g/mol = <strong>' + molesN.toFixed(4) + ' mol</strong>' : ''}<br><br>

      <strong>Paso 2 — Calcular masa de Oxígeno (por diferencia):</strong><br>
      Masa total = ${sample} g<br>
      Masa C = ${molesC.toFixed(4)} × 12.011 = ${masaC.toFixed(2)} g<br>
      Masa H = ${molesH.toFixed(4)} × 1.008 = ${masaH.toFixed(2)} g${nMass > 0 ? '<br>Masa N = ' + molesN.toFixed(4) + ' × 14.007 = ' + masaN_calc.toFixed(2) + ' g' : ''}<br>
      Masa O = ${sample} - (${masaC.toFixed(2)} + ${masaH.toFixed(2)}${nMass > 0 ? ' + ' + masaN_calc.toFixed(2) : ''}) = <strong>${masaO.toFixed(2)} g</strong><br><br>

      <strong>Paso 3 — Obtener fórmula empírica:</strong><br>
      Dividimos entre el menor valor (${Math.min(molesC, molesH, nMass > 0 ? molesN : Infinity, masaO > 0 ? molesO : Infinity).toFixed(4)}):<br>
      Ratios: C: ${(molesC / Math.min(molesC, molesH, nMass > 0 ? molesN : Infinity, masaO > 0 ? molesO : Infinity)).toFixed(2)}, H: ${(molesH / Math.min(molesC, molesH, nMass > 0 ? molesN : Infinity, masaO > 0 ? molesO : Infinity)).toFixed(2)}${nMass > 0 ? ', N: ' + (molesN / Math.min(molesC, molesH, nMass > 0 ? molesN : Infinity, masaO > 0 ? molesO : Infinity)).toFixed(2) : ''}${masaO > 0 ? ', O: ' + (molesO / Math.min(molesC, molesH, nMass > 0 ? molesN : Infinity, masaO > 0 ? molesO : Infinity)).toFixed(2) : ''}<br>
      Fórmula empírica: <strong>${empFormula}</strong> (M = ${empMass.toFixed(2)} g/mol)<br><br>

      <strong>Paso 4 — Calcular factor n:</strong><br>
      La fórmula molecular es un múltiplo entero de la empírica:<br>
      n = Masa molar / Masa empírica = ${molarTotal} / ${empMass.toFixed(2)} = <strong>${n}</strong><br><br>

      <strong style="color:var(--amber)">✅ Fórmula molecular: ${molFormula}</strong>`;
  } else {
    procedureHTML = `
      <strong>Datos:</strong><br>
      Fórmula empírica = ${empFormula}<br>
      Masa molar empírica = ${empMass.toFixed(2)} g/mol<br>
      Masa molar total = ${molarTotal} g/mol<br><br>

      <strong>Paso 1 — Calcular factor n:</strong><br>
      La fórmula molecular es múltiplo de la empírica:<br>
      n = Masa molar / Masa empírica<br>
      n = ${molarTotal} / ${empMass.toFixed(2)} = ${(molarTotal / empMass).toFixed(4)}<br>
      Redondeamos al entero más cercano: <strong>n = ${n}</strong><br><br>

      <strong>Paso 2 — Multiplicar subíndices:</strong><br>
      Fórmula empírica: ${empFormula}<br>
      Multiplicamos cada subíndice por ${n}:<br>
      Fórmula molecular: <strong>${molFormula}</strong><br><br>

      <strong style="color:var(--amber)">✅ Fórmula molecular: ${molFormula}</strong>`;
  }

  el.innerHTML = `
    <div class="formula-result">
      <div class="formula-badge">
        <span class="big">${empFormula}</span>
        <span class="small">Emp</span>
      </div>
      <div class="formula-badge mol">
        <span class="big">${molFormula}</span>
        <span class="small">Mol</span>
      </div>
    </div>
    <div class="result-box" style="margin-top:10px;text-align:center">
      <span class="result-val">n = ${n}</span>
      <span class="result-label">${molarTotal} / ${empMass.toFixed(2)}</span>
    </div>
    <div class="steps-wrap">
      <div class="steps-header" onclick="toggleSteps(this)">Ver procedimiento <span>▼</span></div>
      <div class="steps-body">
        ${procedureHTML}
      </div>
    </div>`;
}

function buildMolFormula(emp, n) {
  if (n === 1) return emp;
  const regex = /([A-Z][a-z]?)(\d*)/g;
  let m, result = '';
  while ((m = regex.exec(emp)) !== null) {
    const sym = m[1], cnt = parseInt(m[2] || '1');
    result += sym + (cnt * n > 1 ? cnt * n : '');
  }
  return result;
}

// ── HIDRATOS ──
function calcHidrato() {
  const el = document.getElementById('hidrato-result');
  const pct = parseFloat(document.getElementById('h-pct').value);
  let saltM = parseFloat(document.getElementById('h-saltmass').value);
  const saltF = document.getElementById('h-salt').value;

  if (isNaN(pct) || pct <= 0 || pct >= 100) { el.innerHTML = err('Ingresa un % de H₂O entre 0 y 100.'); return; }

  if (isNaN(saltM) || saltM <= 0) {
    if (!saltF) { el.innerHTML = err('Ingresa la fórmula de la sal o su masa molar.'); return; }
    saltM = parseFormulaMass(saltF);
    if (!saltM || saltM.error) { el.innerHTML = err('No se pudo calcular masa molar de "' + saltF + '".'); return; }
    document.getElementById('h-saltmass').value = saltM.toFixed(3);
  }

  const M_H2O = 18.015;
  const p = pct / 100;
  const x = (p * saltM) / (M_H2O * (1 - p));
  const xRound = Math.round(x);
  const molarTotal = saltM + xRound * M_H2O;

  el.innerHTML = `
    <div class="hydrate-result">
      <div class="hydrate-formula">${saltF || 'Sal'} · <strong>${xRound}</strong> H₂O</div>
      <div class="hydrate-mass">Masa molar total: <strong>${molarTotal.toFixed(2)} g/mol</strong></div>
    </div>
    <div class="steps-wrap">
      <div class="steps-header" onclick="toggleSteps(this)">Ver procedimiento <span>▼</span></div>
      <div class="steps-body">
        <strong>Datos:</strong><br>
        Compuesto: ${saltF || 'Sal'} · x H₂O (hidrato)<br>
        Masa molar sal anhidra = ${saltM.toFixed(3)} g/mol<br>
        % H₂O en el hidrato = ${pct}%<br><br>

        <strong>Concepto:</strong> Un hidrato es una sal que incluye moléculas de agua cristalizadas en su estructura. La fórmula representa la sal anhidra seguida del número de moléculas de agua (x). Por ejemplo, el sulfato de cobre(II) pentahidratado es CuSO₄·5H₂O.<br><br>

        <strong>Paso 1 — Escribir la ecuación del porcentaje:</strong><br>
        El porcentaje de agua se calcula como:<br>
        % H₂O = (masa H₂O / masa total) × 100<br><br>
        
        Sustituimos los valores conocidos:<br>
        ${pct}% = (x × ${M_H2O} g/mol) ÷ (${saltM.toFixed(3)} + x × ${M_H2O}) × 100<br><br>

        <strong>Paso 2 — Despejar x de la ecuación:</strong><br>
        Primero eliminamos el factor 100 dividiendo ambos lados:<br>
        ${p} = (x × ${M_H2O}) ÷ (${saltM.toFixed(3)} + x × ${M_H2O})<br><br>
        
        Multiplicamos ambos lados por el denominador:<br>
        ${p.toFixed(4)} × (${saltM.toFixed(3)} + x × ${M_H2O}) = x × ${M_H2O}<br><br>
        
        ${p.toFixed(4)} × ${saltM.toFixed(3)} + ${p.toFixed(4)} × x × ${M_H2O} = x × ${M_H2O}<br><br>
        
        Movemos términos con x a un lado:<br>
        ${(p * saltM).toFixed(3)} = x × ${M_H2O} - ${(p * M_H2O).toFixed(3)} × x<br><br>
        
        ${(p * saltM).toFixed(3)} = x × ${(M_H2O * (1 - p)).toFixed(4)}<br><br>
        
        Despejamos x:<br>
        x = ${(p * saltM).toFixed(3)} ÷ ${(M_H2O * (1 - p)).toFixed(4)}<br>
        <strong>x = ${x.toFixed(4)}</strong><br><br>

        <strong>Paso 3 — Redondear y calcular masa molar total:</strong><br>
        El número de moléculas de agua debe ser entero:<br>
        x ≈ <strong style="color:var(--amber)">${xRound}</strong><br><br>

        Calculamos la masa molar total:<br>
        M_total = M_sal + x × M_H₂O<br>
        M_total = ${saltM.toFixed(3)} + ${xRound} × ${M_H2O}<br>
        M_total = ${saltM.toFixed(3)} + ${(xRound * M_H2O).toFixed(3)}<br>
        <strong style="color:var(--amber)">M_total = ${molarTotal.toFixed(2)} g/mol</strong><br><br>

        <strong>✅ Fórmula del hidrato: ${saltF || 'Sal'}·${xRound}H₂O</strong>
      </div>
    </div>`;
}

// ── HELPERS ──
function err(msg) {
  return `<div class="error-box">⚠ ${msg}</div>`;
}

function toggleSteps(header) {
  const body = header.nextElementSibling;
  body.classList.toggle('open');
  header.querySelector('span').textContent = body.classList.contains('open') ? '▲' : '▼';
}
