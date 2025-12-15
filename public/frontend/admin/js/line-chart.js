// Global object to store chart instances by ID
let chartInstances = {};

function lineChart(id) {
  const url = "./graph-data.php?code=" + id;

  fetch(url)
    .then((response) => response.json())
    .then((jsonData) => {
      const labels = jsonData.labels;
      const data = jsonData.data;

      // Define colors for up to 8 bars
      const colors = [
        "rgba(255, 99, 132, 0.6)", // Red
        "rgba(75, 192, 192, 0.6)", // Green
        "rgba(54, 162, 235, 0.6)", // Blue
        "rgba(255, 159, 64, 0.6)", // Orange
        "rgba(153, 102, 255, 0.6)", // Purple
        "rgba(255, 206, 86, 0.6)", // Yellow
        "rgba(199, 199, 199, 0.6)", // Gray
        "rgba(83, 102, 255, 0.6)", // Indigo
      ];

      // Get canvas context
      const ctx = document.getElementById(id).getContext("2d");

      // Check if a chart already exists for this canvas id
      if (!chartInstances[id]) {
        // If no chart exists, create a new one
        chartInstances[id] = new Chart(ctx, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Votes",
                data: data,
                backgroundColor: colors.slice(0, labels.length), // Slice to match the number of labels
                borderColor: "rgba(83, 151, 216, 0.6)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      } else {
        // If a chart exists, update the existing chart data
        const chart = chartInstances[id];
        chart.data.labels = labels; // Update labels
        chart.data.datasets[0].data = data; // Update the dataset
        chart.data.datasets[0].backgroundColor = colors.slice(0, labels.length); // Update colors
        chart.update(); // Refresh the chart
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}
