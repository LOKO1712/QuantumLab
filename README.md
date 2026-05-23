# QuantumLab ⚗️

App química completa para química general: moles, fórmulas, hidratos, números cuánticos.

## 📁 Estructura

```
quantumlab/
├── index.html
├── css/
│   ├── base.css       ← Variables, reset, componentes globales
│   ├── navbar.css     ← Barra de navegación inferior
│   ├── calc.css       ← Estilos calculadora
│   ├── learn.css      ← Estilos aprendizaje
│   ├── quiz.css       ← Estilos evaluación
│   └── quantum.css    ← Estilos números cuánticos
└── js/
    ├── nav.js         ← Navegación entre páginas
    ├── bg.js          ← Animación de fondo (canvas)
    ├── elements.js    ← Datos de elementos + masas atómicas
    ├── calc.js        ← Calculadora (moles, empírica, molecular, hidratos)
    ├── quantum.js     ← Números cuánticos ↔ config electrónica
    ├── learn.js       ← Sección de aprendizaje
    └── quiz.js        ← Evaluación con 30 preguntas retroalientadas
```

## 🚀 Cómo usar

Abre `index.html` con **Live Server** en VS Code, o directamente en Chrome.

## 📱 Secciones

| Sección | Icono | Funcionalidad |
|---------|-------|---------------|
| **Calculadora** | ⚗ | Moles↔gramos, fórmula empírica (% o g), fórmula molecular (análisis combustión), hidratos |
| **Cuánticos** | ⚛ | Config electrónica → N. cuánticos y viceversa, búsqueda de 118 elementos |
| **Aprender** | 📖 | Explicaciones de moles, fórmulas, hidratos y números cuánticos con ejemplos |
| **Evaluar** | 🧪 | 20 preguntas de opción múltiple con retroalimentación y filtro por tema |

## Sin dependencias — HTML/CSS/JS vanilla puro.
