document.addEventListener('DOMContentLoaded', function () {
    var chartContext = document.getElementById('myChart').getContext('2d');

    var shortButton = document.getElementById('shortDataButton');
    var longButton = document.getElementById('longDataButton');
    
    var currentChart = null;

    shortButton.addEventListener('click', function () {
        if (currentChart) {
            currentChart.destroy();
        }
        loadCSVDataAndCreateChart('/assets/projects/project-1-data/short_model.csv', "Short Projects Benchmark");
        toggleActive(shortButton, longButton);
    });

    longButton.addEventListener('click', function () {
        if (currentChart) {
            currentChart.destroy();
        }
        loadCSVDataAndCreateChart('/assets/projects/project-1-data/long_model.csv', "Long Projects Benchmark");
        toggleActive(longButton, shortButton);
    });

    function loadCSVDataAndCreateChart(csvFilePath, title) {
        Papa.parse(csvFilePath, {
            header: true,
            download: true,
            dynamicTyping: true,
            complete: function (parsedData) {
                const labels = parsedData.data.map(row => row.Week);
                const data = parsedData.data.map(row => row.Average);

                createChart(labels, data, title);
            }
        });
    }

    function createChart(labels, data, title) {
        currentChart = new Chart(chartContext, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: '',
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true, // Enable responsiveness
                // maintainAspectRatio: false, // Adjust aspect ratio to fit container
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Week Number'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Lines of Code per Author per Week'
                        },
                        suggestedMin: 0 // Start Y-axis from zero
                    }
                },
                plugins: {
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function (tooltipItem) {
                                return 'Average Value: ' + tooltipItem.formattedValue;
                            }
                        }
                    },
                    legend: {
                        display: false,
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: title
                    }
                }
            }
        });
    }

    function toggleActive(activeButton, inactiveButton) {
        activeButton.classList.add('qualification__active');
        inactiveButton.classList.remove('qualification__active');
    }
    
    // Load initial data on page load
    loadCSVDataAndCreateChart('/assets/projects/project-1-data/short_model.csv');
});
