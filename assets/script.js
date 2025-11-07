/* ===== Mycelium Web Animation (lightweight, mobile-friendly) ===== */
(() => {
  const canvas = document.getElementById('myceliumWeb');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, spores;

  const init = () => {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
    spores = Array.from({length: 60}, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    ctx.lineWidth = 0.7;
    for (let i = 0; i < spores.length; i++) {
      const a = spores[i];
      a.x += a.vx; a.y += a.vy;
      if (a.x < 0 || a.x > w) a.vx *= -1;
      if (a.y < 0 || a.y > h) a.vy *= -1;
      for (let j = i + 1; j < spores.length; j++) {
        const b = spores[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(0,255,128,${(1 - dist/150) * 0.2})`;
          ctx.stroke();
        }
      }
    }
  };

  const tick = () => { draw(); requestAnimationFrame(tick); };
  addEventListener('resize', init);
  init(); tick();
})();

/* ===== Lore toggle ===== */
(() => {
  const btn = document.getElementById('toggleMyth');
  const panel = document.getElementById('fullMyth');
  btn?.addEventListener('click', () => {
    panel.classList.toggle('hidden');
    btn.textContent = panel.classList.contains('hidden') ? 'Read the Full Myth' : 'Hide the Myth';
  });
})();

/* ===== Book of Charts reveal ===== */
(() => {
  const btn = document.getElementById('chartsButton');
  const links = document.getElementById('chartsLinks');
  btn?.addEventListener('click', () => {
    const hidden = links.classList.toggle('hidden');
    btn.textContent = hidden ? 'Open the Book of Charts' : 'Close the Book of Charts';
  });
})();

/* ===== Mascot: auto-blink + boop + press/hold keeps eyes open ===== */
(() => {
  const img = document.getElementById('mascot');
  const btn = document.getElementById('boopBtn');
  if (!img) return;

  const CLOSED = 'assets/Psilobonk_EyesClosed.png';
  const OPEN   = 'assets/Psilobonk_EyesOpen.png';

  let eyesOpen = false;
  let blinkTimer;

  const setEyes = (open) => {
    eyesOpen = open;
    img.src = eyesOpen ? OPEN : CLOSED;
  };

  const pulse = () => {
    img.style.transition = 'transform 160ms ease';
    img.style.transform = 'scale(1.02)';
    setTimeout(() => (img.style.transform = 'scale(1)'), 160);
  };

  const boop = () => { setEyes(!eyesOpen); pulse(); };

  const scheduleBlink = () => {
    clearTimeout(blinkTimer);
    const next = 4000 + Math.random() * 3000; // 4–7s
    blinkTimer = setTimeout(() => {
      const wasOpen = eyesOpen;
      setEyes(false);
      setTimeout(() => setEyes(wasOpen || true), 160);
      scheduleBlink();
    }, next);
  };

  btn?.addEventListener('click', boop);
  img.addEventListener('click', boop);
  img.addEventListener('touchstart', () => setEyes(true));
  img.addEventListener('touchend', () => setEyes(false));

  scheduleBlink();
})();

/* ===== Auto-activate live Psilobonk chart after Pump.fun graduation =====
   Put your mint into: <code id="mint" data-mint="YOUR_MINT"></code>
   The notice section will be auto-swapped with a live DexScreener embed.
======================================================================= */
(() => {
  const holder = document.getElementById('chartNotice');
  const mintEl = document.getElementById('mint');
  if (!holder || !mintEl) return;

  const mint = (mintEl.dataset.mint || '').trim();
  const valid = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(mint) && !/PASTE/i.test(mint);

  if (!valid) return; // keep the Coming Soon notice

  // Swap with live DexScreener embed
  const iframe = document.createElement('iframe');
  iframe.src = `https://dexscreener.com/solana/${mint}?embed=1&theme=dark`;
  iframe.loading = 'lazy';
  iframe.width = '100%';
  iframe.height = '520';
  iframe.style.border = '0';
  iframe.style.borderRadius = '12px';
  holder.innerHTML = `
    <h2>$Psilobonk Live Chart</h2>
    <p>Powered by DexScreener • auto-added after Pump.fun graduation</p>
  `;
  holder.appendChild(iframe);
})();

/* ===== Footer year ===== */
(() => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
