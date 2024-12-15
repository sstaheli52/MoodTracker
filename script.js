// Variables
let pageLoadTime = Date.now();
let moods = JSON.parse(localStorage.getItem("moods")) || [];
let timeTracking = JSON.parse(localStorage.getItem("timeTracking")) || [];

// DOM Elements
const dateInput = document.getElementById("date");
const moodSelect = document.getElementById("mood");
const saveButton = document.getElementById("saveMood");
const moodTable = document.querySelector("#moodTable tbody");
const moodChart = document.getElementById("moodChart");

// Chart Instance
let chartInstance;

// Initialize Pie Chart
function initializeChart() {
  const initialData = {
    labels: ["😄 Really Happy", "😊 Happy", "😌 Content", "😢 Sad", "😴 Tired"],
    datasets: [
      {
        data: [0, 0, 0, 0, 0],
        backgroundColor: ["#ffcc00", "#ff9900", "#00ccff", "#cc00ff", "#ff4444"],
      },
    ],
  };

  chartInstance = new Chart(moodChart, {
    type: "pie",
    data: initialData,
  });
}

// Update Time Spent
function updateTimeTracking() {
  const timeSpent = Math.floor((Date.now() - pageLoadTime) / 1000);
  const date = new Date().toISOString().split("T")[0];
  const existingEntry = timeTracking.find((entry) => entry.date === date);

  if (existingEntry) {
    existingEntry.time += timeSpent;
  } else {
    timeTracking.push({ date, time: timeSpent });
  }

  localStorage.setItem("timeTracking", JSON.stringify(timeTracking));
}

// Save Mood
function saveMood() {
  const date = dateInput.value;
  const mood = moodSelect.value;

  if (!date) {
    alert("Please select a date.");
    return;
  }

  moods = moods.filter((entry) => entry.date !== date);
  moods.push({ date, mood });

  localStorage.setItem("moods", JSON.stringify(moods));

  renderTable();
  renderChart();
}

// Render Table
function renderTable() {
  moodTable.innerHTML = "";
  moods.forEach((entry) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${entry.date}</td><td>${getEmoji(entry.mood)}</td>`;
    moodTable.appendChild(row);
  });
}

// Render Chart
function renderChart() {
  const moodCounts = moods.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {});

  const chartData = ["really happy", "happy", "content", "sad", "tired"].map(
    (mood) => moodCounts[mood] || 0
  );

  chartInstance.data.datasets[0].data = chartData;
  chartInstance.update();
}

// Helper Function
function getEmoji(mood) {
  const emojis = {
    "really happy": "😄",
    happy: "😊",
    content: "😌",
    sad: "😢",
    tired: "😴",
  };
  return emojis[mood] || "";
}

// Event Listeners
saveButton.addEventListener("click", saveMood);
window.addEventListener("beforeunload", updateTimeTracking);

// Initialize
initializeChart();
renderTable();
