const colors = [
  "#ff6f91",
  "#ff9671",
  "#ffc75f",
  "#f9f871",
  "#ff4c4c",
  "#ffcc00"
];

const letters = "HAPPY BIRTHDAY";
let letterIndex = 0;

function getRandomLetter() {
  const letter = letters.charAt(letterIndex);
  letterIndex = (letterIndex + 1) % letters.length;
  return letter;
}

function createFirework(x, y) {
  const launchHeight = Math.random() * (window.innerHeight / 4) + window.innerHeight / 4;
  const projectile = document.createElement("div");
  projectile.classList.add("projectile");
  document.body.appendChild(projectile);
  projectile.style.left = `${x}px`;
  projectile.style.top = `${y}px`;

  anime({
    targets: projectile,
    translateY: -launchHeight,
    duration: 1200,
    easing: "easeOutQuad",
    complete: () => {
      projectile.remove();
      createBurst(x, y - launchHeight);
    }
  });
}

function createBurst(x, y) {
  const numLetters = 15;
  const numSparkles = 50;

  for (let i = 0; i < numLetters; i++) {
    createParticle(x, y, false);
  }

  for (let i = 0; i < numSparkles; i++) {
    createParticle(x, y, true);
  }

  createText(x, y);
}

function createParticle(x, y, isSparkle) {
  const el = document.createElement("div");
  el.classList.add(isSparkle ? "sparkle" : "particle");

  if (!isSparkle) {
    el.textContent = getRandomLetter();
    el.style.color = colors[Math.floor(Math.random() * colors.length)];
  } else {
    el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  }

  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  document.body.appendChild(el);

  animateParticle(el, isSparkle);
}

function animateParticle(el, isSparkle) {
  const angle = Math.random() * Math.PI * 2;
  const distance = anime.random(100, 200);
  const duration = anime.random(1200, 2000);
  const fallDistance = anime.random(20, 80);
  const scale = isSparkle ? Math.random() * 0.5 + 0.5 : Math.random() * 1 + 0.5;

  anime.timeline({
    targets: el,
    easing: "easeOutCubic",
    duration: duration,
    complete: () => el.remove()
  })
  .add({
    translateX: Math.cos(angle) * distance,
    translateY: Math.sin(angle) * distance,
    scale: [0, scale],
    opacity: [1, 0.9]
  })
  .add({
    translateY: `+=${fallDistance}px`,
    opacity: [0.9, 0],
    easing: "easeInCubic",
    duration: duration / 2
  });
}

function createText(x, y) {
  const textEl = document.createElement("div");
  textEl.classList.add("firework-text");
  textEl.innerHTML = "🎉 Happy Birthday 🎉<br>sayangggg🫶";
  document.body.appendChild(textEl);

  // Posisi di titik ledakan
  textEl.style.left = `${x}px`;
  textEl.style.top = `${y}px`;
  textEl.style.transform = "translate(-50%, -50%)";

  anime({
    targets: textEl,
    translateY: -50,
    opacity: [0, 1],
    duration: 2000,
    easing: "easeOutCubic",
    complete: () => textEl.remove()
  });
}


document.addEventListener("click", (e) => {
  createFirework(e.clientX, e.clientY);
  const bgMusic = document.getElementById("bgMusic");
  bgMusic.muted = false;  // unmute musik saat pertama diklik
  bgMusic.play();
});

window.onload = function () {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  createFirework(centerX, centerY);

  const bgMusic = document.getElementById("bgMusic");
  bgMusic.play().catch(() => {
    console.log("Autoplay diblokir, musik akan aktif setelah klik pertama.");
  });
};
