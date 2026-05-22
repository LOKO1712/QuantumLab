// ══ QUIZ.JS — Evaluación con opción múltiple ══

const ALL_QUESTIONS = [
  // MOLES
  { topic: 'moles', q: '¿Cuántos moles hay en 58.5 g de NaCl? (M = 58.5 g/mol)', opts: ['0.5 mol', '1 mol', '2 mol', '58.5 mol'], ans: 1,
    exp: 'Para determinar la cantidad de sustancia se aplica la fórmula fundamental n = m ÷ M, donde m representa la masa de la muestra y M equivale a la masa molar del compuesto. Al sustituir los valores correspondientes, dividimos 58.5 g de NaCl entre su masa molar de 58.5 g/mol, obteniendo un cociente exacto de 1 mol.' },
  { topic: 'moles', q: '¿Qué masa tiene 0.5 mol de H₂O? (M = 18 g/mol)', opts: ['9 g', '18 g', '36 g', '0.5 g'], ans: 0,
    exp: 'A partir de la ecuación del número de moles, se despeja algebraicamente la masa del compuesto dando como resultado la expresión m = n × M. Al realizar la multiplicación del número de moles indicado (0.5 mol) por la masa molar unitaria del agua (18 g/mol), se calcula que el peso de la muestra es de 9 g.' },
  { topic: 'moles', q: '¿Cuántos moles hay en 44 g de CO₂? (M = 44 g/mol)', opts: ['0.25 mol', '0.5 mol', '1 mol', '2 mol'], ans: 2,
    exp: 'El cálculo de moles se realiza mediante la relación química de masa y peso molecular n = m ÷ M. Dividiendo la masa medida en la muestra (44 g) entre la masa molar de un solo mol de dióxido de carbono (44 g/mol), el resultado matemático obtenido es igual a 1 mol.' },
  { topic: 'moles', q: 'La masa molar del Ca es 40 g/mol. ¿Cuántos gramos son 2.5 mol?', opts: ['16 g', '40 g', '80 g', '100 g'], ans: 3,
    exp: 'Para conocer el peso neto en gramos se multiplica la cantidad de sustancia acumulada por la masa atómica reportada del elemento (m = n × M). Efectuando la operación con los valores dados, multiplicamos 2.5 mol × 40 g/mol, lo que nos da una masa total de 100 g de Calcio.' },
  { topic: 'moles', q: '¿Cuántos moles hay en 27 g de Al? (M = 27 g/mol)', opts: ['0.5 mol', '1 mol', '1.5 mol', '3 mol'], ans: 1,
    exp: 'Aplicando de forma directa la expresión matemática de conversión molecular n = m ÷ M, dividimos la masa física analizada del metal (27 g) entre el peso de un mol de átomos de aluminio (27 g/mol), lo que da un resultado estequiométrico exacto de 1 mol.' },
  { topic: 'moles', q: 'Si M(Fe) = 55.85 g/mol, ¿cuántos gramos son 3 mol de Fe?', opts: ['55.85 g', '111.7 g', '167.6 g', '186.2 g'], ans: 2,
    exp: 'La masa representativa de una muestra metálica se halla multiplicando sus moles por la masa molar unitaria (m = n × M). Llevando a cabo el producto de los datos del enunciado, operamos 3 mol × 55.85 g/mol = 167.55 g. Al ajustar con redondeo decimal para el diseño de la app, esto equivale a 167.6 g.' },

  // EMPÍRICA
  { topic: 'empirica', q: 'Un compuesto tiene 40% C, 6.67% H y 53.33% O. Su fórmula empírica es:', opts: ['CH₂O', 'C₂H₄O₂', 'CHO', 'CH₄O'], ans: 0,
    exp: 'Se asume inicialmente una muestra estándar de 100 g, convirtiendo los porcentajes de forma directa a gramos. Primero, hallamos los moles individuales dividiendo cada masa entre su peso atómico: C = 40 ÷ 12 = 3.33 mol; H = 6.67 ÷ 1 = 6.67 mol; O = 53.33 ÷ 16 = 3.33 mol. En segundo lugar, se divide cada uno de estos subtotales entre el menor número de moles obtenido (3.33). Esto genera la proporción de números enteros más pequeña: C = 1, H = 2, O = 1, definiendo la fórmula empírica como CH₂O.' },
  { topic: 'empirica', q: 'La fórmula molecular de la glucosa es C₆H₁₂O y su fórmula empírica es CH₂O. El factor n es:', opts: ['3', '4', '6', '12'], ans: 2,
    exp: 'El factor entero de amplificación elemental se calcula dividiendo la masa molar real de la fórmula molecular completa entre el peso de su unidad mínima o fórmula empírica (n = M_molecular ÷ M_empírica). Dividiendo el peso real de la molécula de glucosa (180 g/mol) entre la masa correspondiente al fragmento empírico CH₂O (30 g/mol), obtenemos un factor de escala exacto de 6.' },
  { topic: 'empirica', q: 'En un análisis de combustión de 1g de un compuesto se obtienen 2.667g de CO₂. ¿Cuántos gramos de C hay?', opts: ['0.333 g', '0.727 g', '1.0 g', '2.667 g'], ans: 1,
    exp: 'El carbono contenido originalmente en la muestra se oxida por completo transformándose en CO₂. Tomando en cuenta que un mol de gas CO₂ (44.01 g/mol) aloja siempre en su interior un mol de átomos de carbono puro (12.011 g/mol), se multiplica el peso total del gas recolectado por la fracción de masa de dicho elemento: 2.667 g de CO₂ × (12.011 g/mol ÷ 44.01 g/mol) = 0.727 g de carbono neto.' },
  { topic: 'empirica', q: 'Si la fórmula empírica es CH₂ (M_emp = 14 g/mol) y la masa molar es 56 g/mol, la fórmula molecular es:', opts: ['CH₂', 'C₂H₄', 'C₃H₆', 'CH₈'], ans: 3,
    exp: 'Primero se descubre el factor multiplicador entero dividiendo la masa verdadera determinada para el compuesto entre la masa de la subunidad empírica: n = 56 g/mol ÷ 14 g/mol = 4. Una vez hallado este factor 4, multiplicamos individualmente cada uno de los subíndices atómicos de la fórmula base (CH₂), resultando con precisión la fórmula molecular real: C₄H₈.' },
  { topic: 'empirica', q: 'Para obtener la fórmula empírica desde porcentajes, el primer paso es:', opts: ['Dividir % entre la masa atómica', 'Asumir 100g de muestra y calcular moles', 'Multiplicar por la masa molar', 'Calcular la masa molecular'], ans: 1,
    exp: 'El procedimiento analítico exige fijar de forma arbitraria una base cuantitativa de cálculo equivalente a 100 g de muestra total. Esto permite realizar una conversión directa de los valores porcentuales a gramos de masa reales para cada elemento químico (por ejemplo, 40% → 40 g), paso indispensable para posteriormente dividir dichos pesos entre las masas atómicas y hallar las relaciones molares.' },

  // HIDRATOS
  { topic: 'hidrato', q: 'CuSO₄ · 5H₂O tiene M_sal = 159.6 g/mol. ¿Cuál es su masa molar total?', opts: ['177.6 g/mol', '249.7 g/mol', '249.6 g/mol', '267.6 g/mol'], ans: 1,
    exp: 'La masa molar compuesta de un cristal hidratado se obtiene mediante la suma de la masa molar de su sal anhidra base y el peso total aportado por sus moléculas de agua periféricas coordinadas: M_total = M_sal + (x × M_H₂O). Sustituyendo los datos: 159.6 g/mol + (5 × 18.015 g/mol) = 159.6 + 90.075 = 249.675 g/mol, lo que redondeado correctamente en la interfaz se expresa como 249.7 g/mol.' },
  { topic: 'hidrato', q: 'Na₂SO₄ · xH₂O tiene 55.9% de H₂O y M_sal = 142 g/mol. ¿Cuál es x?', opts: ['7', '8', '9', '10'], ans: 3,
    exp: 'Al representar el agua un 55.9% de la masa, deducimos que la sal anhidra representa el 44.1% restante del cristal. Evaluando una base de 100 g: calculamos los moles de agua dividiendo su peso entre su masa molar (55.9 g ÷ 18.015 g/mol = 3.103 mol) y los moles de sal anhidra de la misma forma (44.1 g ÷ 142 g/mol = 0.3106 mol). Dividiendo los moles de agua entre los de la sal (3.103 ÷ 0.3106), obtenemos de forma exacta la relación entera de hidratación x = 10.' },
  { topic: 'hidrato', q: 'En un hidrato, el % de agua se calcula como:', opts: ['(M_agua / M_sal) × 100', '(x·M_H₂O / M_hidrato) × 100', '(M_sal / M_hidrato) × 100', 'x × 18 × 100'], ans: 1,
    exp: 'El porcentaje de agua en estas redes cristalinas se define como la proporción másica que tiene el agua incorporada respecto al peso molecular del compuesto íntegro. Matemáticamente se expresa multiplicando el coeficiente estequiométrico de hidratación (x) por la masa molar del agua (18.015 g/mol), dividiendo este resultado parcial entre la masa molar total del hidrato completo y multiplicando finalmente por 100.' },
  { topic: 'hidrato', q: 'Si un hidrato tiene 36.0% de H₂O y M_sal = 111 g/mol, ¿cuánto vale x aproximadamente?', opts: ['2', '3', '4', '5'], ans: 1,
    exp: 'Si la humedad corresponde al 36.0%, la fracción correspondiente a la sal anhidra equivale al 64.0%. Utilizando una muestra ficticia de 100 g: los moles de agua son 36 g ÷ 18.015 g/mol = 1.998 mol, y los moles de la sal pura son 64 g  111 g/mol = 0.576 mol. Al efectuar la división para hallar la proporción molar unitaria (1.998 ÷ 0.576) da un valor de 3.46, cuyo número entero más estable y común para los coeficientes de hidratos es 3.' },

  // CUÁNTICOS
  { topic: 'quantica', q: 'Para el electrón diferenciador del Na (1s²2s²2p⁶3s¹), ¿cuál es el valor de n?', opts: ['1', '2', '3', '4'], ans: 2,
    exp: 'El electrón diferenciador es la partícula de carga negativa que se añade en último lugar al estructurar la configuración electrónica fundamental de un elemento. En el caso del átomo de Sodio, este electrón terminal se posiciona en el orbital energético 3s¹. Debido a que el número entero que antecede directamente a la letra del subnivel representa el nivel principal de energía, determinamos que n = 3.' },
  { topic: 'quantica', q: 'Si ℓ = 2, ¿a qué subcapa corresponde?', opts: ['s', 'p', 'd', 'f'], ans: 2,
    exp: 'El número cuántico secundario o azimutal (l) rige la forma geométrica tridimensional espacial de una subcapa electrónica. Los valores asignados convencionalmente corresponden de forma estricta a: l = 0 identifica al orbital \'s\' (sharp), l = 1 identifica al orbital \'p\' (principal), l = 2 identifica al orbital \'d\' (diffuse), y l = 3 identifica al orbital \'f\' (fundamental).' },
  { topic: 'quantica', q: 'Para la subcapa 3p con 4 electrones, el electrón diferenciador tiene mₛ =', opts: ['+1/2', '−1/2', '0', '+1'], ans: 1,
    exp: 'Con base en la Regla de Máxima Multiplicidad de Hund, los 3 orbitales degenerados del subnivel \'p\' (m_l = -1, 0, +1) se ocupan inicialmente de uno en uno con electrones orientados de forma paralela hacia arriba (m_s = +1/2), cubriendo los primeros 3 electrones. El cuarto electrón adicionado se ve obligado por espacio a realizar el apareamiento en el primer orbital disponible (m_l = -1), adquiriendo una orientación de espín opuesta (hacia abajo), lo que define con exactitud su valor de espín como m_s = -1/2.' },
  { topic: 'quantica', q: 'Los valores posibles de mₗ para ℓ = 1 son:', opts: ['0 solo', '−1, 0, +1', '−2,−1,0,+1,+2', '+1 y −1 solo'], ans: 1,
    exp: 'El número cuántico magnético (m_l) especifica la orientación espacial particular de un orbital atómico y toma valores enteros condicionados por el subnivel, variando algebraicamente en un rango desde -l cruzando por el cero absoluto hasta alcanzar +l. Si tenemos un valor secundario de l = 1 (que describe a los orbitales p), los tres números válidos que denotan sus tres subespacios son -1, 0, +1.' },
  { topic: 'quantica', q: '¿Cuántos electrones puede alojar la subcapa 4f?', opts: ['6', '10', '14', '18'], ans: 2,
    exp: 'Las subcapas complejas de clase \'f\' poseen asignado un número cuántico secundario inalterable de l = 3. La cantidad de orientaciones u orbitales individuales internos se calcula a través de la relación 2l + 1, dando como resultado 2(3) + 1 = 7 orbitales de igual energía. Por el Principio de Exclusión de Pauli, cada celda cuántica retiene un máximo de 2 electrones apareados, concluyendo que 7 × 2 = 14 electrones totales permitidos.' },
  { topic: 'quantica', q: 'El Cromo (Z=24) tiene configuración 1s²2s²2p⁶3s²3p3d⁵4s¹ en vez de …3d⁴4s². Esto se debe a:', opts: ['Principio de Aufbau', 'Principio de Pauli', 'Mayor estabilidad de subcapa semillena', 'Error en la tabla periódica'], ans: 2,
    exp: 'Las distribuciones en las que un subnivel tipo \'d\' se encuentra exactamente lleno (d¹⁰) o exactamente a la mitad de su capacidad máxima (d⁵) otorgan al átomo una simetría cuántica esférica y una estabilidad energética marcadamente superior. Con la finalidad de alcanzar esta condición de mínima energía basal, un electrón situado en el orbital 4s realiza una transición o promoción espontánea hacia la quinta vacante geométrica del subnivel 3d.' },

  // BALANCEO
  { topic: 'balanceo', q: 'Al realizar el balanceo por tanteo de la combustión del metano: CH₄ + O₂ → CO₂ + H₂O, ¿cuáles son los coeficientes estequiométricos correctos para equilibrar la ecuación?', opts: ['1, 1, 1, 1', '1, 2, 1, 2', '1, 2, 1, 1', '2, 4, 2, 4'], ans: 1,
    exp: 'Para equilibrar la ecuación se realiza el conteo de átomos en reactivos y productos. Primero se verifica el carbono (1 en ambos lados). Luego los hidrógenos: hay 4 en los reactivos (CH₄), por lo que se coloca un coeficiente 2 en el agua (2H₂O). Finalmente, se cuentan los oxígenos en los productos: 2 en el CO₂ y 2 en el agua (total = 4), lo que exige un coeficiente 2 en el oxígeno reactivo (2O₂). Los coeficientes quedan con la secuencia matemática balanceada 1, 2, 1, 2.' },
  { topic: 'balanceo', q: 'Durante el balanceo de una ecuación por el método redox, si una especie química cambia su estado de oxidación de +2 a +7, ¿qué proceso ha ocurrido y cuántos electrones están involucrados?', opts: ['Reducción con ganancia de 5 electrones', 'Oxidación con pérdida de 5 electrones', 'Oxidación con ganancia de 5 electrones', 'Reducción con pérdida de 5 electrones'], ans: 1,
    exp: 'El incremento algebraico en el número de oxidación (movimiento en la recta numérica hacia un valor más positivo, de +2 a +7) indica que el átomo ha cedido o perdido cargas negativas. La pérdida de electrones se define teóricamente como una oxidación. Al calcular la diferencia numérica absoluta entre ambos estados de oxidación (7 - 2), se determina que se han transferido y perdido exactamente 5 electrones en la semirreacción.' },
  { topic: 'balanceo', q: 'En la siguiente ecuación química balanceada de síntesis: N₂ + 3H₂ → 2NH, ¿cuál es la interpretación estequiométrica correcta de las proporciones?', opts: ['1 g de nitrógeno reacciona con 3 g de hidrógeno para producir 2 g de amoníaco', '1 mol de N₂ reacciona con 3 mol de H₂ para producir 2 mol de NH₃', '1 átomo de nitrógeno reacciona con 3 átomos de hidrógeno para dar 2 moléculas de amoníaco', 'Se mezclan masas idénticas de gases reactivos de acuerdo con la ley de Lavoisier'], ans: 1,
    exp: 'Los coeficientes estequiométricos de una ecuación balanceada expresan proporciones de partículas microscópicas o proporciones cuantitativas de sustancias a nivel macroscópico (moles). No reflejan relaciones directas en masa (gramos), dado que cada molécula posee una masa molar diferente de acuerdo a sus componentes. Por lo tanto, el enunciado válido establece que 1 mol de dinitrógeno gaseoso se combina con 3 moles de dihidrógeno para dar lugar a 2 moles de amoníaco.' },
  { topic: 'balanceo', q: 'Al balancear por el método ion-electrón en medio ácido la semirreacción de reducción del permanganeso: MnO₄⁻ → Mn²⁺, ¿de qué manera deben equilibrarse los átomos de oxígeno sobrantes?', opts: ['Añadiendo 4 moléculas de gas oxígeno (O₂) en el lado de los productos', 'Añadiendo 4 moléculas de agua (H₂O) en el lado de los productos', 'Agregando 4 iones hidróxido (OH⁻) en los reactivos para compensar', 'Duplicando el coeficiente estequiométrico del ion manganeso'], ans: 1,
    exp: 'Bajo las reglas normalizadas del método ion-electrón en condiciones o medios ácidos, los átomos de oxígeno en desequilibrio se balancean incorporando tantas moléculas de agua líquida (H₂O) como oxígenos en exceso existan en el lado opuesto de la semirreacción. Dado que el ion poliatómico permanganeso introduce 4 oxígenos en los reactivos, se compensa de forma exacta añadiendo 4 moléculas de agua en el lado de los productos.' },
  { topic: 'balanceo', q: 'Balancea la siguiente ecuación de neutralización ácido-base por tanteo: H₃PO₄ + Ca(OH)₂ → Ca₃(PO₄)₂ + H₂O. ¿Cuál es el coeficiente estequiométrico final del agua?', opts: ['2', '3', '4', '6'], ans: 3,
    exp: 'Siguiendo el orden de balanceo clásico (metales, no metales, hidrógenos y oxígenos), equilibramos primero el calcio colocando un coeficiente de 3 en el reactivo: 3Ca(OH)₂. Luego ajustamos el fósforo, colocando un 2 en el ácido: 2H₃PO₄. Al contar la cantidad de átomos de hidrógeno presentes en todos los reactivos, tenemos un total de (2 × 3) + (3 × 2) = 12 hidrógenos. Para balancear estos 12 hidrógenos en el miembro de los productos, es necesario asignar un coeficiente de 6 al agua (6H₂O), equilibrando de forma simultánea los oxígenos.' },
  { topic: 'balanceo', q: 'Si una ecuación química ha sido balanceada de forma completamente correcta, ¿cuál criterio de conservación se cumple obligatoriamente en el sistema?', opts: ['El número total de moléculas en los reactivos equivale exactamente al de los productos', 'El número de átomos de cada elemento y la carga neta total son idénticos en ambos lados', 'Todos los coeficientes estequiométricos asignados deben convertirse en números pares', 'La masa gaseosa desaparece por completo debido a la liberación de energía térmica'], ans: 1,
    exp: 'El ajuste o balanceo de ecuaciones químicas cumple estrictamente con dos pilares de la física y la química: la Ley de Conservación de la Masa de Lavoisier (el número de átomos de cada especie elemental se mantiene inalterado antes y después de la transformación) y la Ley de Conservación de la Carga Eléctrica (la sumatoria de cargas netas a la izquierda debe ser algebraicamente igual a la de la derecha). Los moles de moléculas pueden variar, pero los átomos individuales y las cargas netas son constantes.' },
  { topic: 'balanceo', q: 'En la ecuación de combustión del propano: C₃H₈ + xO₂ → 3CO₂ + 4H₂O, ¿qué valor numérico debe tomar el coeficiente x para que el oxígeno quede en perfecto equilibrio?', opts: ['3', '4', '5', '10'], ans: 2,
    exp: 'En primer lugar, procedemos a realizar la cuantificación total de átomos de oxígeno presentes en el miembro de los productos: las moléculas de dióxido de carbono aportan un subtotal de (3 × 2) = 6 oxígenos, mientras que las moléculas de agua aportan (4 × 1) = 4 oxígenos, sumando un neto de 10 átomos de oxígeno. Debido a que en el lado de los reactivos el oxígeno se encuentra en su estado molecular diatómico gaseoso (O₂), dividimos el total requerido entre 2 (10 ÷ 2), definiendo que el coeficiente x debe valer exactamente 5.' },
  { topic: 'balanceo', q: 'Durante el balanceo por ion-electrón en medio ácido, tras balancear los oxígenos con agua, ¿cómo se equilibra el exceso de hidrógenos generado en el lado opuesto?', opts: ['Añadiendo moléculas de gas hidrógeno (H₂)', 'Añadiendo iones hidrógeno u oxonios (H⁺)', 'Agregando el mismo número de moléculas de agua adicionales', 'Colocando electrones en el lado con más hidrógenos'], ans: 1,
    exp: 'Una vez introducidas moléculas de agua para nivelar los oxígenos en un miembro de la semirreacción, se genera una cantidad excedente de átomos de hidrógeno en dicho sector. Para equilibrar y compensar estos hidrógenos en el miembro opuesto bajo condiciones ácidas, se añade la cantidad numéricamente equivalente de partículas en forma de protones libres o iones hidrógeno (H⁺).' },
  { topic: 'balanceo', q: 'Al balancear la reacción redox de desplazamiento: Zn + HCl → ZnCl₂ + H₂, ¿cuál es el coeficiente que requiere el ácido clorhídrico (HCl)?', opts: ['1', '2', '3', '4'], ans: 1,
    exp: 'Al examinar las sustancias producidas a la derecha de la ecuación, notamos la presencia de 2 átomos de cloro integrados en el cloruro de zinc (ZnCl₂) y 2 átomos de hidrógeno en la molécula de gas dihidrógeno (H₂). Como en el miembro de los reactivos ambos elementos constituyen de forma unificada la molécula de ácido clorhídrico (HCl), se coloca un coeficiente estequiométrico de 2 frente a este compuesto, equilibrando simultáneamente el cloro y el hidrógeno, y manteniendo el zinc balanceado con valor unitario en cada extremo.' },
];

let quizState = {
  questions: [],
  current: 0,
  score: 0,
  answered: false,
  filter: 'all',
};

function renderQuiz() {
  document.getElementById('quiz-root').innerHTML = `
    <div class="quiz-filter">
      <button class="quiz-filter-btn active" onclick="setQuizFilter('all',this)">Todos</button>
      <button class="quiz-filter-btn" onclick="setQuizFilter('moles',this)">Moles</button>
      <button class="quiz-filter-btn" onclick="setQuizFilter('empirica',this)">F. Empírica</button>
      <button class="quiz-filter-btn" onclick="setQuizFilter('hidrato',this)">Hidratos</button>
      <button class="quiz-filter-btn" onclick="setQuizFilter('quantica',this)">Cuánticos</button>
      <button class="quiz-filter-btn" onclick="setQuizFilter('balanceo',this)">Balanceo</button>
    </div>
    <div id="quiz-area"></div>`;
  startQuiz();
}

function setQuizFilter(f, btn) {
  quizState.filter = f;
  document.querySelectorAll('.quiz-filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  startQuiz();
}

function startQuiz() {
  const pool = quizState.filter === 'all'
    ? [...ALL_QUESTIONS]
    : ALL_QUESTIONS.filter(q => q.topic === quizState.filter);
  // Shuffle
  quizState.questions = pool.sort(() => Math.random() - 0.5);
  quizState.current = 0;
  quizState.score = 0;
  quizState.answered = false;
  renderQuestion();
}

const TOPIC_LABELS = { moles:'Moles', empirica:'F. Empírica', hidrato:'Hidratos', quantica:'N. Cuánticos', balanceo:'Balanceo' };
const TOPIC_TAGS   = { moles:'tag-cyan', empirica:'tag-amber', hidrato:'tag-green', quantica:'tag-rose', balanceo:'tag-purple' };

function renderQuestion() {
  const el = document.getElementById('quiz-area');
  const qs  = quizState.questions;
  const idx  = quizState.current;

  if (idx >= qs.length) { renderResults(); return; }

  const q    = qs[idx];
  const pct  = Math.round((idx / qs.length) * 100);
  const letters = ['A','B','C','D'];

  el.innerHTML = `
    <div class="quiz-header">
      <div class="quiz-progress-wrap">
        <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>
        <div class="quiz-progress-label">Pregunta ${idx+1} de ${qs.length}</div>
      </div>
      <div class="quiz-score-badge">✓ ${quizState.score}</div>
    </div>
    <div class="quiz-topic-tag"><span class="tag ${TOPIC_TAGS[q.topic]}">${TOPIC_LABELS[q.topic]}</span></div>
    <div class="quiz-question">${q.q}</div>
    <div class="quiz-options" id="quiz-opts">
      ${q.opts.map((opt,i)=>`
        <button class="quiz-option" onclick="answerQuiz(${i})" id="qopt-${i}">
          <span class="quiz-option-letter">${letters[i]}</span>
          <span class="quiz-option-text">${opt}</span>
        </button>`).join('')}
    </div>
    <div id="quiz-feedback"></div>
    <div class="quiz-nav" id="quiz-nav" style="display:none">
      <button class="btn btn-primary" onclick="nextQuestion()">
        ${idx+1 < qs.length ? 'Siguiente →' : 'Ver Resultados'}
      </button>
    </div>`;
}

function answerQuiz(chosen) {
  if (quizState.answered) return;
  quizState.answered = true;
  const q = quizState.questions[quizState.current];
  const correct = q.ans;
  const isRight = chosen === correct;
  if (isRight) quizState.score++;

  // Disable all and mark
  document.querySelectorAll('.quiz-option').forEach((btn,i) => {
    btn.disabled = true;
    if (i === correct) btn.classList.add('correct');
    if (i === chosen && !isRight) btn.classList.add('wrong');
  });

  document.getElementById('quiz-feedback').innerHTML = `
    <div class="quiz-feedback ${isRight?'correct-fb':'wrong-fb'}">
      ${isRight ? '✅ <strong>¡Correcto!</strong>' : '❌ <strong>Incorrecto.</strong>'} ${q.exp}
    </div>`;

  document.getElementById('quiz-nav').style.display = 'flex';
}

function nextQuestion() {
  quizState.current++;
  quizState.answered = false;
  renderQuestion();
}

function renderResults() {
  const total = quizState.questions.length;
  const score = quizState.score;
  const pct   = Math.round((score / total) * 100);
  let emoji = '😐', msg = 'Sigue practicando';
  if (pct >= 90) { emoji = '🏆'; msg = '¡Excelente dominio!'; }
  else if (pct >= 70) { emoji = '⭐'; msg = '¡Buen trabajo!'; }
  else if (pct >= 50) { emoji = '📚'; msg = 'Repasa los temas y vuelve a intentarlo'; }

  document.getElementById('quiz-area').innerHTML = `
    <div class="quiz-results">
      <div class="quiz-results-icon">${emoji}</div>
      <div class="quiz-results-score">${score} / ${total}</div>
      <div class="quiz-results-msg">${msg} — ${pct}% de aciertos</div>
      <button class="btn btn-primary" style="margin-bottom:10px" onclick="startQuiz()">Repetir evaluación</button>
      <button class="btn" style="background:var(--card);border:1px solid var(--border);color:var(--text2)" onclick="navigateTo('learn')">Ir a Aprender</button>
    </div>`;
}
