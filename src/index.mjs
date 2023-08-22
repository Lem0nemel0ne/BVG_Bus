// index.mjs

// Function to fetch delay data and update UI
async function fetchAndDisplayDelays(stationId, listId) {
  try {
    // Fetch data from BVG API
    const response = await fetch(`https://v6.bvg.transport.rest/stops/${stationId}/departures?duration=30&results=5&linesOfStops=false&remarks=true&language=en`);
    const data = await response.json();

    // Update UI with delay and ETA information
    const listItems = document.querySelectorAll(`#${listId} li`);

    data.departures.forEach((departure, index) => {
      const listItem = listItems[index];
      const delayMinutes = departure.delay / 60;
      const formattedDelay = delayMinutes > 0 ? `${delayMinutes} min` : 'On time';
      const busNumber = departure.line.name; // Get the bus number
      const eta = new Date(departure.when).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }); // Calculate ETA
      listItem.textContent = `Bus ${busNumber}: ${formattedDelay} ${eta}`; // Display bus number, delay, and ETA
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Call the function to update the tables for Bouche station when the page loads
window.onload = function () {
  fetchAndDisplayDelays('900190506', 'stationBouche');
  fetchAndDisplayDelays('900120521', 'stationMarkgrafendamm'); // Replace with the actual station ID
};

// Add event listener to the update button
const updateButton = document.getElementById('updateButton');
updateButton.addEventListener('click', function () {
  fetchAndDisplayDelays('900190506', 'stationBouche');
  fetchAndDisplayDelays('900120521', 'stationMarkgrafendamm'); // Replace with the actual station ID
});

// Auto-update every 10 seconds
setInterval(function () {
  fetchAndDisplayDelays('900190506', 'stationBouche');
  fetchAndDisplayDelays('900120521', 'stationMarkgrafendamm'); // Replace with the actual station ID
}, 10000); // 10000 milliseconds = 10 seconds
