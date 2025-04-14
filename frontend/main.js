// Add an event listener for the "Find Evacuation Path" button click.
document.getElementById('findPathBtn').addEventListener('click', function() {
    // Retrieve and trim the user input (starting node).
    const startNode = document.getElementById('startNode').value.trim();
    
    // Clear any previous results and indicate that path computation is underway.
    document.getElementById('pathOutput').innerText = "Computing path...";
    
    if (startNode === "") {
        document.getElementById('pathOutput').innerText = "Please enter a valid start node.";
        return;
    }
    
    // Send a GET request to the backend endpoint with the starting node as a query parameter.
    fetch(`http://localhost:5000/evacuation?start=${startNode}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error: " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // If the path is returned, display it; otherwise, show the error message.
            if (data.path) {
                document.getElementById('pathOutput').innerText = data.path.join(" -> ");
            } else if (data.error) {
                document.getElementById('pathOutput').innerText = data.error;
            }
        })
        .catch(error => {
            document.getElementById('pathOutput').innerText = "Error fetching evacuation path.";
            console.error(error);
        });
});