const WHO_FACTORS = {
  "Friend": 1.5,
  "Cousin for a wedding": 3.2,
  "Plumber": 0.6,
  "Food Delivery": 0.8,
  "Sibling": 1.2,
  "Boss": 0.5
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

document.getElementById("convert").addEventListener("click", async () => {
  const stated = document.getElementById("stated").value;
  const who = document.getElementById("who").value;
  const occasion = document.getElementById("occasion").value;
  const location = document.getElementById("location").value;
  const logs = document.getElementById("logs");
  const etaDisplay = document.getElementById("eta");
  const progressBar = document.getElementById("progressBar");

  logs.innerHTML = "";
  progressBar.style.width = "0%";

  // Steps with emojis 🎯
  const steps = [
    "🔮 Calibrating optimism sensors...",
    "👗 Analyzing last-minute saree emergencies...",
    "☕🚪 Measuring chai-to-door ratio...",
    "📜🕰️ Consulting ancestral punctuality database...",
    "🤝🍛 Applying friendship fudge factors..."
  ];

  for (let i = 0; i < steps.length; i++) {
    logs.innerHTML += `<div>${steps[i]}</div>`;
    progressBar.style.width = `${((i + 1) / steps.length) * 100}%`;
    await new Promise(r => setTimeout(r, 600)); // Slightly slower for comedic effect
  }

  const minutes = computeRealMinutes(stated, who, occasion, location);
  etaDisplay.textContent = `${minutes} minutes`;
  logs.innerHTML += `<div>✅ Calculated Real ETA: ${minutes} minutes.</div>`;
});



// document.getElementById("convert").addEventListener("click", () => {
//   const stated = document.getElementById("stated").value;
//   const who = document.getElementById("who").value;
//   const occasion = document.getElementById("occasion").value;
//   const location = document.getElementById("location").value;

//   // Redirect with parameters
//   window.location.href = `result.html?stated=${encodeURIComponent(stated)}&who=${encodeURIComponent(who)}&occasion=${encodeURIComponent(occasion)}&location=${encodeURIComponent(location)}`;
// });