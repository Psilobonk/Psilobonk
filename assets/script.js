// Mycelium background
const canvas = document.getElementById("myceliumWeb");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let w, h, spores;
  const init = () => {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
    spores = Array.from({ length: 60 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));
  };
  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < spores.length; i++) {
      const a = spores[i];
      a.x += a.vx;
      a.y += a.vy;
      if (a.x < 0 || a.x > w) a.vx *= -1;
      if (a.y < 0 || a.y > h) a.vy *= -1;
      for (let j = i + 1; j < spores.length; j++) {
        const b = spores[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(0,255,128,${(1 - dist / 150) * 0.2})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }
  };
  const animate = () => {
    draw();
    requestAnimationFrame(animate);
  };
  addEventListener("resize", init);
  init();
  animate();
}

// Lore toggle
const toggleMyth = document.getElementById("toggleMyth");
const fullMyth = document.getElementById("fullMyth");
toggleMyth?.addEventListener("click", () => {
  fullMyth.classList.toggle("hidden");
  toggleMyth.textContent = fullMyth.classList.contains("hidden")
    ? "Read the Full Myth"
    : "Hide the Myth";
});

// Book of Charts reveal
const chartsBtn = document.getElementById("chartsButton");
const chartsLinks = document.getElementById("chartsLinks");
chartsBtn?.addEventListener("click", () => {
  const isHidden = chartsLinks.classList.toggle("hidden");
  chartsBtn.textContent = isHidden
    ? "Open the Book of Charts"
    : "Close the Book of Charts";
}); /* ===== Mascot boop (toggle eyes open/closed) ===== */
(() => {
  const img = document.getElementById('mascot');
  const btn = document.getElementById('boopBtn');
  if (!img || !btn) return;

  const closed = 'assets/Psilobonk_EyesClosed.png';
  const open = 'assets/Psilobonk_EyesOpen.png';
  let isOpen = false;

  const boop = () => {
    isOpen = !isOpen;
    img.src = isOpen ? open : closed;

    // gentle pulse on boop
    img.style.transition = 'transform 160ms ease';
    img.style.transform = 'scale(1.02)';
    setTimeout(() => (img.style.transform = 'scale(1)'), 160);
  };

  btn.addEventListener('click', boop);

  // also boop on image tap (mobile delight)
  img.addEventListener('click', boop);
})();
