// Global variable to store building data
let buildingData = null;

// Fetch building layout for map rendering when page loads
window.addEventListener('DOMContentLoaded', function() {
  // Fetch building data from backend
  fetch('http://127.0.0.1:5000/building-data')
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to load building data");
      }
      return response.json();
    })
    .then(data => {
      buildingData = data;
      // Get canvas and draw initial map
      const canvas = document.getElementById('buildingMap');
      drawBuildingMap(buildingData, canvas);
    })
    .catch(error => {
      console.error('Error loading building data:', error);
      alert('Error loading building map. Please ensure the server is running.');
    });
});

// Event listener for Find Path button
document.getElementById('findPathBtn').addEventListener('click', function () {
  const startNode = document.getElementById('startNode').value.trim().toUpperCase();
  const pathOutput = document.getElementById('pathOutput');
  const textDirections = document.getElementById('textDirections');
  
  // Reset the map and show loading message
  pathOutput.innerText = "Calculating path...";
  textDirections.innerText = "";
  
  if (startNode === "") {
    pathOutput.innerText = "Please enter a valid location.";
    return;
  }
  
  // Make API call to get evacuation path
  fetch(`http://127.0.0.1:5000/evacuation?start=${startNode}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("API call failed");
      }
      return response.json();
    })
    .then(data => {
      if (data.path) {
        // Show path as node sequence
        pathOutput.innerText = data.path.join(" → ");
        
        // Generate descriptive directions
        let directions = "Directions: ";
        data.path.forEach((nodeId, index) => {
          const node = buildingData.nodes.find(n => n.id === nodeId);
          if (index === 0) {
            directions += `Start at ${node.name} (${nodeId})`;
          } else if (index === data.path.length - 1) {
            directions += ` → Proceed to ${node.name} (${nodeId}) and evacuate the building`;
          } else {
            directions += ` → Continue to ${node.name} (${nodeId})`;
          }
        });
        textDirections.innerText = directions;
        
        // Redraw map and highlight path
        const canvas = document.getElementById('buildingMap');
        drawBuildingMap(buildingData, canvas);
        highlightPath(buildingData, data.path, canvas);
      } else {
        pathOutput.innerText = data.error || "No path found.";
        textDirections.innerText = "";
        
        // Redraw map without path
        const canvas = document.getElementById('buildingMap');
        drawBuildingMap(buildingData, canvas);
      }
    })
    .catch(error => {
      pathOutput.innerText = "Error fetching evacuation path.";
      textDirections.innerText = "";
      console.error(error);
    });
});