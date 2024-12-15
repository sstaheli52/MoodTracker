// Variables
const trackerTable = document.querySelector("#trackerTable tbody");
const backButton = document.getElementById("backToMoodTrackerButton");
const timeTracking = JSON.parse(localStorage.getItem("timeTracking")) || [];

// Render Tracker Table
function renderTrackerTable() {
  trackerTable.innerHTML = "";
  timeTracking.forEach((entry) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${entry.date}</td><td>${entry.time} seconds</td>`;
    trackerTable.appendChild(row);
  });
}

// Event Listener for Back Button
backButton.addEventListener("click", () => {
  window.location.href = "index.html";
});

// Initialize
window.onload = renderTrackerTable;
