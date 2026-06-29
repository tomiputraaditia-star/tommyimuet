let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

const diaryText = 
`Selamat ulang tahun yaa! 🥳🎂
Selamat bertambah umur, semoga yang bertambah bukan cuma angka di KTP, tapi juga rezeki, kebahagiaan, kesehatan, dan isi rekening. 😆
Terima kasih sudah jadi teman yang seru, kadang nyebelin, tapi tetap bikin hari-hari jadi lebih berwarna. Semoga semua doa dan harapanmu pelan-pelan jadi kenyataan. Tetap jadi orang baik, jangan gampang nyerah, dan jangan lupa bahagia. Oh iya... semoga makin dewasa, tapi jangan dewasa banget, nanti jadi nggak asik. 🤣
Happy Birthday! Semoga tahun ini jadi tahun terbaik buat kamu! 💙`;

let typingStarted = false;

function nextSlide() {
  slides[currentSlide].classList.remove("active");
  currentSlide++;

  if (currentSlide >= slides.length) {
    currentSlide = slides.length - 1;
  }

  slides[currentSlide].classList.add("active");

  if (currentSlide === 2 && !typingStarted) {
    typingStarted = true;
    typeDiary();
  }

  createConfetti(30);
}

musicBtn.addEventListener("click", () => {
  music.volume = 0.5;
  music.play();
  musicBtn.innerText = "🎵 Music On";
});

document.body.addEventListener("click", () => {
  music.autoplay().catch(() => {});
}, { once: true });

function typeDiary() {
  const textElement = document.getElementById("typingText");
  let index = 0;

  function typing() {
    if (index < diaryText.length) {
      textElement.innerHTML += diaryText.charAt(index) === "\n" ? "<br>" : diaryText.charAt(index);
      index++;
      setTimeout(typing, 35);
    }
  }

  typing();
}

function blowCandle() {
  const flame = document.querySelector(".flame");
  const wishText = document.getElementById("wishText");

  flame.style.display = "none";
  wishText.innerText = "Yeay! Semoga semua harapanmu terkabul 💙";
  createConfetti(100);
}

function openGift() {
  document.getElementById("giftBox").style.display = "none";
  document.querySelector("#giftBox + .hint").style.display = "none";

  const videoBox = document.getElementById("videoBox");
  const video = document.getElementById("specialVideo");

  videoBox.style.display = "block";
  video.play();

  createConfetti(150);
}

function restart() {
  slides[currentSlide].classList.remove("active");
  currentSlide = 0;
  slides[currentSlide].classList.add("active");

  document.getElementById("typingText").innerHTML = "";
  typingStarted = false;

  document.querySelector(".flame").style.display = "block";
  document.getElementById("wishText").innerText = "Klik apinya untuk meniup lilin";

  document.getElementById("giftBox").style.display = "block";
  document.querySelector("#giftBox + .hint").style.display = "block";
  document.getElementById("videoBox").style.display = "none";
}

/* BALON WARNA-WARNI */
function createBalloons() {
  const balloonContainer = document.getElementById("balloons");
  const colors = [
    "#ff4d6d",
    "#ffbe0b",
    "#8ac926",
    "#1982c4",
    "#6a4c93",
    "#ff006e",
    "#00bbf9",
    "#f15bb5",
    "#fee440",
    "#00f5d4"
  ];

  for (let i = 0; i < 35; i++) {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");

    const size = Math.random() * 35 + 40;
    balloon.style.width = `${size}px`;
    balloon.style.height = `${size * 1.3}px`;
    balloon.style.left = `${Math.random() * 100}%`;
    balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.animationDuration = `${Math.random() * 8 + 7}s`;
    balloon.style.animationDelay = `${Math.random() * 8}s`;

    balloonContainer.appendChild(balloon);
  }
}

/* CONFETTI */
function createConfetti(amount = 80) {
  const confettiContainer = document.getElementById("confetti");
  const colors = [
    "#ff4d6d",
    "#ffbe0b",
    "#8ac926",
    "#1982c4",
    "#6a4c93",
    "#00bbf9",
    "#f15bb5"
  ];

  for (let i = 0; i < amount; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = `${Math.random() * 3 + 3}s`;
    confetti.style.animationDelay = `${Math.random()}s`;

    confettiContainer.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 6000);
  }
}

/* SPARKLE CURSOR */
document.addEventListener("mousemove", (e) => {
  const sparkle = document.createElement("div");
  sparkle.innerText = "✨";
  sparkle.style.position = "absolute";
  sparkle.style.left = `${e.pageX}px`;
  sparkle.style.top = `${e.pageY}px`;
  sparkle.style.pointerEvents = "none";
  sparkle.style.fontSize = "14px";
  sparkle.style.zIndex = "9999";
  sparkle.style.animation = "sparkle .8s linear forwards";

  document.body.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 800);
});

const style = document.createElement("style");
style.innerHTML = `
@keyframes sparkle {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-25px) scale(0);
  }
}
`;
document.head.appendChild(style);

createBalloons();
createConfetti(100);