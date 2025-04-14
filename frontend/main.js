document.getElementById('findPathBtn').addEventListener('click', function () {
    const startNode = document.getElementById('startNode').value.trim();
    const pathOutput = document.getElementById('pathOutput');
    
    pathOutput.innerText = "Calculating path...";
  
    if (startNode === "") {
      pathOutput.innerText = "Please enter a valid node.";
      return;
    }
  
    // IMPORTANT: Must match host & port from app.py
    fetch(`http://127.0.0.1:5000/evacuation?start=${startNode}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("API call failed");
        }
        return response.json();
      })
      .then(data => {
        if (data.path) {
          pathOutput.innerText = data.path.join(" -> ");
        } else {
          pathOutput.innerText = data.error;
        }
      })
      .catch(error => {
        pathOutput.innerText = "Error fetching evacuation path.";
        console.error(error);
      });
  });