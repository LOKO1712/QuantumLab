// ══ LEARN.JS — Sección de aprendizaje ══

const CURIOUS_FACTS = [
  { category: "Química del Espacio", facts: [
    "Los astronautas informan que el espacio huele a una mezcla de carne asada, metal caliente y humo de soldadura, debido a los hidrocarburos aromáticos policíclicos.",
    "Se cree que en planetas como Neptuno y Urano 'llueven' diamantes debido a las altísimas presiones que comprimen el carbono.",
    "El Helio fue descubierto en el Sol (mediante espectroscopia) antes de ser encontrado en la Tierra.",
    "Existe una nube de vapor de agua en el espacio que contiene 140 billones de veces más agua que todos los océanos de la Tierra juntos.",
    "Casi todos los elementos de tu cuerpo (excepto el hidrógeno) se forjaron en el interior de una estrella que explotó."
  ]},
  { category: "Curiosidades de los Elementos", facts: [
    "El Mercurio es el único metal que es líquido a temperatura ambiente (20°C).",
    "Hay tanto oro disuelto en los océanos que, si pudiéramos extraerlo todo, cada persona en la Tierra tendría 4 kg de oro.",
    "El elemento Indio no se llama así por la India, sino por la línea coloríndigo brillante que muestra en su espectro.",
    "El cobre es naturalmente antibacteriano; las bacterias mueren poco tiempo después de aterrizar en superficies de cobre.",
    "El Astato es el elemento más raro de la Tierra; se estima que hay menos de 30 gramos en toda la corteza terrestre en cualquier momento."
  ]},
  { category: "Más Elementos", facts: [
    "El Galio es un metal que se derrite en tus manos, ya que su punto de fusión es de apenas 29.7°C.",
    "La letra 'J' es la única que no aparece en ninguna parte de la Tabla Periódica.",
    "El Radón es un gas noble radiactivo que puede acumularse en los sótanos de las casas de forma natural."
  ]},
  { category: "Química del Cuerpo", facts: [
    "Tienes suficiente carbono en tu cuerpo para fabricar grafito para unos 9,000 lápices.",
    "El cuerpo humano adulto promedio contiene unos 250 gramos de sal (NaCl).",
    "Tienes suficiente hierro en la sangre para forjar un clavo de 7 cm.",
    "Si desenrollaras todo el ADN de tus células y lo pusieras en línea recta, llegaría de la Tierra a Plutón y de regreso.",
    "Si un átomo fuera del tamaño de un estadio de fútbol, el núcleo sería como una canica en el centro, y el resto sería espacio vacío."
  ]},
  { category: "Estados de la Materia", facts: [
    "El agua caliente puede congelarse más rápido que la fría en ciertas condiciones (Efecto Mpemba).",
    "El vidrio no es un sólido común, sino un sólido amorfo; técnicamente, fluye de forma extremadamente lenta.",
    "A 0 Kelvin (-273.15°C), todo movimiento molecular se detiene por completo.",
    "Existe una temperatura y presión exacta donde el agua puede hervir y congelarse al mismo tiempo (punto triple).",
    "El dióxido de carbono sólido (CO₂) no se derrite, pasa directamente de sólido a gas (sublimación)."
  ]},
  { category: "Reacciones Químicas", facts: [
    "La lana de acero puede 'quemarse' y, curiosamente, pesa más después de quemarse debido a que el hierro se combina con el oxígeno.",
    "Las luciérnagas producen luz mediante una reacción química llamada bioluminiscencia con casi un 100% de eficiencia energética.",
    "El agua de la Tierra se recicla constantemente; es muy probable que el agua que bebiste hoy haya pasado antes por el cuerpo de un dinosaurio.",
    "El aire que hay en una habitación promedio pesa aproximadamente lo mismo que un adulto pequeño (unos 50-60 kg).",
    "A diferencia de la mayoría de los materiales, una banda elástica se contrae cuando se calienta y se expande cuando se enfría."
  ]},
  { category: "Datos Finales", facts: [
    "El hidrógeno es el elemento más abundante del universo, pero es tan ligero que la gravedad de la Tierra no puede retenerlo; se escapa constantemente al espacio.",
    "El jugo gástrico de tu estómago tiene un pH de 1 a 2, lo que significa que es lo suficientemente ácido como para disolver una hoja de afeitar."
  ]}
];

let currentFactIndex = 0;

const TOPICS = [
  {
    id: 'moles',
    icon: '⚗',
    iconClass: 'ti-cyan',
    title: 'Moles y Conversiones',
    subtitle: '4 conceptos clave',
    content: `
      <div class="learn-text">
        El <strong>mol</strong> es la unidad fundamental de cantidad de materia en química. Un mol equivale a
        <em>6.022 × 10²³ partículas</em> (número de Avogadro, N_A).
      </div>
      <div class="learn-formula">
        n = m / M &nbsp;&nbsp; | &nbsp;&nbsp; m = n × M &nbsp;&nbsp; | &nbsp;&nbsp; M = m / n
        <br><br>
        n = moles &nbsp;|&nbsp; m = masa (g) &nbsp;|&nbsp; M = masa molar (g/mol)
      </div>
      <div class="learn-text">
        La <strong>masa molar</strong> (M) es la masa de un mol de sustancia, expresada en g/mol. 
        Coincide numéricamente con la masa atómica o molecular de la sustancia.
      </div>
      <table class="learn-table">
        <tr><th>Operación</th><th>Fórmula</th><th>Ejemplo</th></tr>
        <tr><td>Gramos → Moles</td><td>n = m / M</td><td>36g H₂O ÷ 18g/mol = 2 mol</td></tr>
        <tr><td>Moles → Gramos</td><td>m = n × M</td><td>3 mol NaCl × 58.44 = 175.3g</td></tr>
        <tr><td>Moles → Moléculas</td><td>N = n × N_A</td><td>2 mol × 6.022×10²³ = 1.2×10²⁴</td></tr>
      </table>
      <div class="example-box">
        <div class="ex-title">// Ejemplo resuelto</div>
        ¿Cuántos moles hay en 46.0g de Na?<br>
        M(Na) = 22.99 g/mol<br>
        n = 46.0 / 22.99 = <strong>2.001 mol</strong>
      </div>`
  },
  {
    id: 'empirica',
    icon: '🔬',
    iconClass: 'ti-amber',
    title: 'Fórmula Empírica y Molecular',
    subtitle: 'Análisis elemental',
    content: `
      <div class="learn-text">
        La <strong>fórmula empírica</strong> muestra la proporción molar más simple entre los elementos de un compuesto.
        La <strong>fórmula molecular</strong> muestra el número real de átomos, siendo un múltiplo entero de la empírica.
      </div>
      <div class="learn-formula">
        Paso 1: % → gramos (asumir 100g)<br>
        Paso 2: gramos ÷ masa atómica → moles<br>
        Paso 3: dividir entre el menor valor de moles<br>
        Paso 4: ajustar a razones enteras (×2, ×3…)
      </div>
      <div class="learn-text">
        Para la fórmula molecular necesitas la <strong>masa molar total</strong>:
      </div>
      <div class="learn-formula">
        n = M_total / M_empírica<br>
        Fórmula molecular = (Fórmula empírica)ₙ
      </div>
      <div class="learn-text">
        En <strong>análisis de combustión</strong>, el compuesto C, H, D, N se quema y se miden los productos:
      </div>
      <div class="learn-formula">
        C de CO₂: g_C = g_CO₂ × (12.011 / 44.010)<br>
        H de H₂O: g_H = g_H₂O × (2.016 / 18.015)<br>
        O: g_O = m_muestra − g_C − g_H − g_N
      </div>
      <div class="example-box">
        <div class="ex-title">// Ejercicio tipo</div>
        Muestra: 1.500g → produce 1.980g CO₂ y 0.540g H₂O. N = 0.420g. M = 300g/mol<br><br>
        g_C = 1.980 × (12.011/44.010) = 0.5401g → 0.04497 mol<br>
        g_H = 0.540 × (2.016/18.015) = 0.0604g → 0.0599 mol<br>
        g_O = 1.500 − 0.5401 − 0.0604 − 0.420 = 0.4795g → 0.02997 mol<br>
        Razones: C:H:N:O = 1.5:2:0.47:1 ≈ 3:4:1:2 → <strong>C₃H₄NO₂</strong><br>
        n = 300 / 102 ≈ 3 → <strong>C₉H₁₂N₃O₆</strong>
      </div>`
  },
  {
    id: 'hidrato',
    icon: '💧',
    iconClass: 'ti-green',
    title: 'Hidratos de Sales',
    subtitle: 'Sales cristalinas con agua',
    content: `
      <div class="learn-text">
        Un <strong>hidrato</strong> es una sal que tiene moléculas de agua integradas en su estructura cristalina.
        Se escribe como: <em>Sal · x H₂O</em>, donde x es el número de moléculas de agua por fórmula unidad.
      </div>
      <div class="learn-formula">
        % H₂O = (x · M_H₂O) / M_hidrato × 100<br><br>
        Despejando x:<br>
        x = (%H₂O × M_sal) / (M_H₂O × (100 − %H₂O))
      </div>
      <div class="learn-text">
        La <strong>masa molar del hidrato</strong> es la suma de la masa de la sal más las moléculas de agua:
      </div>
      <div class="learn-formula">
        M_hidrato = M_sal + x · 18.015
      </div>
      <table class="learn-table">
        <tr><th>Nombre</th><th>Fórmula</th><th>x</th></tr>
        <tr><td>Sulfato cúprico pentahidratado</td><td>CuSO₄ · 5H₂O</td><td>5</td></tr>
        <tr><td>Sulfato de sodio decahidratado</td><td>Na₂SO₄ · 10H₂O</td><td>10</td></tr>
        <tr><td>Alumbre de potasio</td><td>KAl(SO₄)₂ · 12H₂O</td><td>12</td></tr>
        <tr><td>Cloruro de calcio dihidratado</td><td>CaCl₂ · 2H₂O</td><td>2</td></tr>
      </table>
      <div class="example-box">
        <div class="ex-title">// Ejemplo: KAl(SO₄)₂ · xH₂O con 45.51% H₂O</div>
        M_sal = 258.20 g/mol<br>
        x = (0.4551 × 258.20) / (18.015 × 0.5449)<br>
        x = 117.51 / 9.814 ≈ <strong>12</strong><br>
        M_hidrato = 258.20 + 12×18.015 = <strong>474.38 g/mol</strong>
      </div>`
  },
  {
    id: 'quantica',
    icon: '⚛',
    iconClass: 'ti-purple',
    title: 'Números Cuánticos y C.E.',
    subtitle: 'Estructura electrónica',
    content: `
      <div class="learn-text">
        Los <strong>números cuánticos</strong> describen el estado de un electrón en un átomo. Son cuatro:
      </div>
      <table class="learn-table">
        <tr><th>Símbolo</th><th>Nombre</th><th>Valores</th><th>Describe</th></tr>
        <tr><td>n</td><td>Principal</td><td>1, 2, 3…</td><td>Nivel de energía / capa</td></tr>
        <tr><td>ℓ</td><td>Azimutal</td><td>0 a n−1</td><td>Subcapa (s,p,d,f)</td></tr>
        <tr><td>mₗ</td><td>Magnético</td><td>−ℓ a +ℓ</td><td>Orbital específico</td></tr>
        <tr><td>mₛ</td><td>Espín</td><td>+½ o −½</td><td>Dirección de giro</td></tr>
      </table>
      <div class="learn-text" style="margin-top:12px">
        <strong>Principio de Aufbau:</strong> los electrones llenan los orbitales de menor a mayor energía:
      </div>
      <div class="learn-formula">
        1s → 2s → 2p → 3s → 3p → 4s → 3d → 4p → 5s → 4d…
      </div>
      <div class="learn-text">
        <strong>Regla de Hund:</strong> dentro de una subcapa, los electrones se distribuyen uno por orbital (espín +½) antes de comenzar a emparejar (espín −½).
      </div>
      <div class="learn-text">
        <strong>Principio de exclusión de Pauli:</strong> dos electrones en el mismo orbital deben tener espines opuestos (+½ y −½).
      </div>
      <div class="example-box">
        <div class="ex-title">// Electrón diferenciador del Cloro (Z=17)</div>
        Config: 1s² 2s² 2p⁶ 3s² 3p⁵<br>
        Última subcapa: 3p con 5 e⁻<br>
        3 orbitales p → primero 3 e⁻ (mₗ=−1,0,+1 con mₛ=+½)<br>
        Luego empareja: 4°→mₗ=−1, 5°→mₗ=0 con mₛ=−½<br>
        <strong>n=3, ℓ=1, mₗ=0, mₛ=−½</strong>
      </div>`
  }
];

function renderLearn() {
  const allFacts = CURIOUS_FACTS.flatMap(c => c.facts);
  
  document.getElementById('learn-root').innerHTML = `
    <div class="learn-header">
      <div class="learn-title">// Aprende Química</div>
      <div class="learn-subtitle">Conceptos esenciales explicados paso a paso</div>
    </div>
    
    <div class="topic-list">
      ${TOPICS.map(t => `
        <div class="topic-card" id="tc-${t.id}">
          <div class="topic-header" onclick="toggleTopic('${t.id}')">
            <div class="topic-left">
              <div class="topic-icon ${t.iconClass}">${t.icon}</div>
              <div>
                <div class="topic-title">${t.title}</div>
                <div class="topic-subtitle">${t.subtitle}</div>
              </div>
            </div>
            <span class="topic-chevron" id="chev-${t.id}">▼</span>
          </div>
          <div class="topic-body" id="tb-${t.id}">
            <div class="learn-text" style="margin-top:12px">${t.content}</div>
          </div>
        </div>`).join('')}
      
      <div class="topic-card" id="tc-funfacts">
        <div class="topic-header" onclick="toggleTopic('funfacts')">
          <div class="topic-left">
            <div class="topic-icon ti-purple">💡</div>
            <div>
              <div class="topic-title">Datos Curiosos</div>
              <div class="topic-subtitle">30 datos fascinantes</div>
            </div>
          </div>
          <span class="topic-chevron" id="chev-funfacts">▼</span>
        </div>
        <div class="topic-body" id="tb-funfacts">
          <div class="funfact-container" style="margin-top:12px">
            <div class="funfact-category" id="ff-category">${CURIOUS_FACTS[0].category}</div>
            <div class="funfact-text" id="ff-text">${CURIOUS_FACTS[0].facts[0]}</div>
            <div class="funfact-counter" id="ff-counter">1 / ${allFacts.length}</div>
            <div class="funfact-nav">
              <button class="btn funfact-btn" onclick="prevFact()">◀ Anterior</button>
              <button class="btn funfact-btn" onclick="nextFact()">Siguiente ▶</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function nextFact() {
  const allFacts = CURIOUS_FACTS.flatMap(c => c.facts);
  currentFactIndex = (currentFactIndex + 1) % allFacts.length;
  updateFactDisplay();
}

function prevFact() {
  const allFacts = CURIOUS_FACTS.flatMap(c => c.facts);
  currentFactIndex = (currentFactIndex - 1 + allFacts.length) % allFacts.length;
  updateFactDisplay();
}

function updateFactDisplay() {
  const allFacts = CURIOUS_FACTS.flatMap(c => c.facts);
  let factCount = 0;
  
  for (let i = 0; i < CURIOUS_FACTS.length; i++) {
    if (currentFactIndex < factCount + CURIOUS_FACTS[i].facts.length) {
      document.getElementById('ff-category').textContent = CURIOUS_FACTS[i].category;
      document.getElementById('ff-text').textContent = CURIOUS_FACTS[i].facts[currentFactIndex - factCount];
      break;
    }
    factCount += CURIOUS_FACTS[i].facts.length;
  }
  
  document.getElementById('ff-counter').textContent = `${currentFactIndex + 1} / ${allFacts.length}`;
}

function toggleTopic(id) {
  const body = document.getElementById('tb-' + id);
  const chev = document.getElementById('chev-' + id);
  if (!body || !chev) return;
  
  const isOpen = body.classList.contains('open');
  document.querySelectorAll('.topic-body').forEach(b => b.classList.remove('open'));
  document.querySelectorAll('.topic-chevron').forEach(c => c.classList.remove('open'));
  
  if (!isOpen) {
    body.classList.add('open');
    chev.classList.add('open');
  }
}
