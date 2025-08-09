
const WHO_FACTORS = {
  "Friend": 1.5,
  "Cousin for a wedding": 3.2,
  "Plumber": 0.6,
  "Food Delivery": 0.8,
  "Sibling": 1.2,
  "Boss": 0.5,
  "Random Person": 1.8,
  "Emergency Service": -0.3
};

const OCCASION_FACTORS = {
  "Casual Coffee": 1.8,
  "Formal Event": 2.6,
  "Emergency": -0.5,
  "Wedding": 3.0,
  "Gym": 1.4,
  "Just dropping by": 1.7
};

const LOCATION_FACTORS = {
  "Just left home": 1.0,
  "Reached signal": 0.3,
  "Traffic on the way": 1.6,
  "Stuck at chai stall": 2.2,
  "At work": 0.9
};

const WHO_EMOJIS = {
  "Friend": "👫",
  "Cousin for a wedding": "👰",
  "Plumber": "👨‍🔧",
  "Food Delivery": "🛵",
  "Sibling": "👨‍👧‍👦",
  "Boss": "👔",
  "Random Person": "🧍",
  "Emergency Service": "🚨"
};

const OCCASION_EMOJIS = {
  "Casual Coffee": "☕",
  "Formal Event": "🎩",
  "Emergency": "🚑",
  "Wedding": "💍",
  "Gym": "🏋️",
  "Just dropping by": "🏠"
};

const LOCATION_EMOJIS = {
  "Just left home": "🏠",
  "Reached signal": "🚦",
  "Traffic on the way": "🚗💨",
  "Stuck at chai stall": "☕",
  "At work": "💼"
};

const REACTION_EMOJIS = [
  { threshold: 5, emoji: "😊" },
  { threshold: 15, emoji: "😐" },
  { threshold: 30, emoji: "😒" },
  { threshold: 60, emoji: "😠" },
  { threshold: 120, emoji: "💀" }
];

const PROGRESS_EMOJIS = [
  "🐢", "🐌", "🚶", "🏃", "🚗", "🚀"
];

function computeRealMinutes(stated, who, occasion, location) {
  let base = Number(stated) || 0;
  let multiplier = 1 + WHO_FACTORS[who] + OCCASION_FACTORS[occasion] + LOCATION_FACTORS[location];
  let friendshipFactor = (1.5 - 0.6) * 1.1;
  const optimismBias = Math.max(0, 5 - Math.log(Math.max(1, base)));
  let result = Math.round((base * multiplier * 0.2) + (friendshipFactor * base) + optimismBias + 10);
  const chaos = WHO_FACTORS[who] + LOCATION_FACTORS[location];
  const maxVariance = Math.min(0.35, chaos / 10);
  const delta = Math.round(result * (Math.random() * maxVariance * (Math.random() > 0.5 ? 1 : -1)));
  result = Math.max(0, result + delta);
  if (base <= 5 && who === "Friend") result = Math.max(result, base * 3 + 7);
  return result;
}

function createConfetti() {
  const colors = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff'];
  const container = document.getElementById('confetti');
  container.innerHTML = '';
  
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
    confetti.style.animationDelay = Math.random() * 2 + 's';
    container.appendChild(confetti);
  }
}

function getReactionEmoji(minutes) {
  for (let i = REACTION_EMOJIS.length - 1; i >= 0; i--) {
    if (minutes >= REACTION_EMOJIS[i].threshold) {
      return REACTION_EMOJIS[i].emoji;
    }
  }
  return "😊";
}

function updateProgressEmoji(progress) {
  const index = Math.min(Math.floor(progress / 20), PROGRESS_EMOJIS.length - 1);
  document.getElementById('progressEmoji').textContent = PROGRESS_EMOJIS[index];
}

// Update emoji displays when selections change
document.getElementById('who').addEventListener('change', function() {
  document.getElementById('whoDisplay').textContent = WHO_EMOJIS[this.value];
});

document.getElementById('occasion').addEventListener('change', function() {
  document.getElementById('occasionDisplay').textContent = OCCASION_EMOJIS[this.value];
});

document.getElementById('location').addEventListener('change', function() {
  document.getElementById('locationDisplay').textContent = LOCATION_EMOJIS[this.value];
});

// Initialize emoji displays
document.getElementById('whoDisplay').textContent = WHO_EMOJIS[document.getElementById('who').value];
document.getElementById('occasionDisplay').textContent = OCCASION_EMOJIS[document.getElementById('occasion').value];
document.getElementById('locationDisplay').textContent = LOCATION_EMOJIS[document.getElementById('location').value];

document.getElementById("convert").addEventListener("click", async () => {
  const stated = document.getElementById("stated").value;
  const who = document.getElementById("who").value;
  const occasion = document.getElementById("occasion").value;
  const location = document.getElementById("location").value;
  const logs = document.getElementById("logs");
  const etaDisplay = document.getElementById("eta");
  const progressBar = document.getElementById("progressBar");
  const etaReaction = document.getElementById("etaReaction");

  logs.innerHTML = "";
  progressBar.style.width = "0%";
  updateProgressEmoji(0);

  const steps = [
    "Calibrating optimism sensors... 🌈",
    "Analyzing last-minute saree emergencies... 👗",
    "Measuring chai-to-door ratio... ☕",
    "Consulting ancestral punctuality database... 📜",
    "Applying friendship fudge factors... 👯",
    "Calculating traffic karma... 🚦",
    "Adjusting for '5 minutes only' syndrome... ⏱️",
    "Factoring in unexpected relatives... 👨‍👩‍👧‍👦",
    "Finalizing real Indian time... 🇮🇳"
  ];

  for (let i = 0; i < steps.length; i++) {
    logs.innerHTML += `<div>${steps[i]}</div>`;
    const progress = ((i + 1) / steps.length) * 100;
    progressBar.style.width = `${progress}%`;
    updateProgressEmoji(progress);
    
    // Random fun effects during loading
    if (Math.random() > 0.7) {
      document.body.style.transform = `rotate(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 1}deg)`;
      setTimeout(() => {
        document.body.style.transform = 'rotate(0deg)';
      }, 300);
    }
    
    await new Promise(r => setTimeout(r, 300 + Math.random() * 300));
  }

  const minutes = computeRealMinutes(stated, who, occasion, location);
  etaDisplay.textContent = `${minutes} minutes`;
  etaReaction.textContent = getReactionEmoji(minutes);
  
  // Special reactions for extreme cases
  if (minutes > 120) {
    etaReaction.textContent = "💀☠️⚰️";
    logs.innerHTML += `<div>Might as well cancel your plans... 😭</div>`;
  } else if (minutes > 60) {
    logs.innerHTML += `<div>Bring a book to read while you wait... 📚</div>`;
  }
  
  logs.innerHTML += `<div>Final Real ETA: <strong>${minutes} minutes</strong> ⏳</div>`;
  logs.scrollTop = logs.scrollHeight;
  
  // Celebration!
  createConfetti();
  
  // Fun animation for the result
  etaDisplay.style.animation = 'none';
  void etaDisplay.offsetWidth; // Trigger reflow
  etaDisplay.style.animation = 'pulse 0.5s 3';
  
  // Random celebration effect
  if (Math.random() > 0.5) {
    document.querySelector('.container').style.animation = 'wobble 0.5s 3';
  }
});

