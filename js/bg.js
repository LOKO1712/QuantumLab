// ══ BG.JS — Full background with atoms, particles and chemistry icons ══
const CHEM_ICONS = ['⚛', '🧪', '⚎', '⚬', '⚭', '⚮', '⚯', '⬡', '⬢', '◉', '○', '🧬'];

function initBg() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, atoms, particles, icons;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function makeParticles() {
    particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      alpha: Math.random() * 0.5 + 0.25,
      color: Math.random() > 0.5 ? '168,85,247' : '34,211,238',
    }));
  }

  function makeAtoms() {
    // Position atoms in a spread out pattern
    const positions = [
      { x: W * 0.25, y: H * 0.3 },
      { x: W * 0.75, y: H * 0.25 },
      { x: W * 0.5, y: H * 0.5 },
      { x: W * 0.3, y: H * 0.7 },
      { x: W * 0.7, y: H * 0.75 },
    ];
    
    atoms = positions.map((pos, i) => {
      const coreRadius = 10 + i * 1.5;
      return {
        x: pos.x,
        y: pos.y,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        coreRadius: coreRadius,
        coreColor: i % 2 === 0 ? '168,85,247' : '34,211,238',
        electrons: [
          { orbitR: coreRadius * 3, angle: Math.random() * Math.PI * 2, speed: 0.04, color: '244,114,182', size: 3 },
          { orbitR: coreRadius * 4.5, angle: Math.random() * Math.PI * 2, speed: 0.032, color: '34,211,238', size: 2.5 },
          { orbitR: coreRadius * 6, angle: Math.random() * Math.PI * 2, speed: 0.024, color: '132,204,22', size: 2 },
        ],
        alpha: 0.5,
      };
    });
  }

  function makeIcons() {
    icons = Array.from({ length: 15 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      icon: CHEM_ICONS[Math.floor(Math.random() * CHEM_ICONS.length)],
      size: Math.random() * 24 + 20,
      alpha: Math.random() * 0.35 + 0.35,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.012,
    }));
  }

  function drawAtom(atom) {
    for (const e of atom.electrons) {
      ctx.beginPath();
      ctx.arc(atom.x, atom.y, e.orbitR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${e.color},${atom.alpha * 0.5})`;
      ctx.lineWidth = 0.6;
      ctx.stroke();
    }

    for (const e of atom.electrons) {
      const ex = atom.x + Math.cos(e.angle) * e.orbitR;
      const ey = atom.y + Math.sin(e.angle) * e.orbitR;
      ctx.beginPath();
      ctx.arc(ex, ey, e.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${e.color},${atom.alpha})`;
      ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(atom.x, atom.y, atom.coreRadius, 0, Math.PI * 2);
    const gradient = ctx.createRadialGradient(atom.x, atom.y, 0, atom.x, atom.y, atom.coreRadius);
    gradient.addColorStop(0, `rgba(${atom.coreColor},${atom.alpha * 1.3})`);
    gradient.addColorStop(1, `rgba(${atom.coreColor},${atom.alpha * 0.5})`);
    ctx.fillStyle = gradient;
    ctx.fill();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    
    // Draw icons (faster)
    ctx.font = '20px sans-serif';
    for (const icon of icons) {
      icon.x += icon.vx;
      icon.y += icon.vy;
      icon.rotation += icon.rotSpeed;
      
      if (icon.x < -30) icon.x = W + 30;
      if (icon.x > W + 30) icon.x = -30;
      if (icon.y < -30) icon.y = H + 30;
      if (icon.y > H + 30) icon.y = -30;
      
      ctx.save();
      ctx.translate(icon.x, icon.y);
      ctx.rotate(icon.rotation);
      ctx.font = `${icon.size}px sans-serif`;
      ctx.globalAlpha = icon.alpha;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(icon.icon, 0, 0);
      ctx.restore();
    }
    
    // Draw atoms
    for (const atom of atoms) {
      atom.x += atom.vx;
      atom.y += atom.vy;
      
      const maxOrbit = Math.max(...atom.electrons.map(e => e.orbitR));
      const padding = maxOrbit + 30;
      
      if (atom.x < padding) { atom.x = padding; atom.vx *= -1; }
      if (atom.x > W - padding) { atom.x = W - padding; atom.vx *= -1; }
      if (atom.y < padding) { atom.y = padding; atom.vy *= -1; }
      if (atom.y > H - padding) { atom.y = H - padding; atom.vy *= -1; }
      
      for (const e of atom.electrons) {
        e.angle += e.speed;
      }
      
      drawAtom(atom);
    }
    
    // Atom collision detection and repulsion
    for (let i = 0; i < atoms.length; i++) {
      for (let j = i + 1; j < atoms.length; j++) {
        const a1 = atoms[i];
        const a2 = atoms[j];
        const maxR1 = Math.max(...a1.electrons.map(e => e.orbitR));
        const maxR2 = Math.max(...a2.electrons.map(e => e.orbitR));
        const minDist = maxR1 + maxR2 + 20;
        
        const dx = a2.x - a1.x;
        const dy = a2.y - a1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < minDist && dist > 0) {
          const overlap = minDist - dist;
          const nx = dx / dist;
          const ny = dy / dist;
          const push = overlap * 0.5 + 0.5;
          
          a1.x -= nx * push;
          a1.y -= ny * push;
          a2.x += nx * push;
          a2.y += ny * push;
          
          const relVx = a1.vx - a2.vx;
          const relVy = a1.vy - a2.vy;
          a1.vx -= relVx * 0.1;
          a1.vy -= relVy * 0.1;
          a2.vx += relVx * 0.1;
          a2.vy += relVy * 0.1;
        }
      }
    }
    
    // Draw particles
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
      ctx.fill();
    }
    
    // Connections between particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(168,85,247,${0.08 * (1 - dist / 80)})`;
          ctx.lineWidth = 0.4;
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(draw);
  }

  resize();
  makeParticles();
  makeAtoms();
  makeIcons();
  draw();
  window.addEventListener('resize', () => { resize(); makeParticles(); makeAtoms(); makeIcons(); });
}
