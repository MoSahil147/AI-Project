document.getElementById('findPathBtn').addEventListener('click', function () {
    const startNode = document.getElementById('startNode').value.trim(); // we are reading the input value from text box with 'startNode' ID
    const pathOutput = document.getElementById('pathOutput'); // get the reference to element where the output will be displayed
    
    //simple loading message while the request is being processed
    pathOutput.innerText = "Calculating path...";
  
    //if input box is empty we will show ans error message as below and stop
    if (startNode === "") {
      pathOutput.innerText = "Please enter a valid node.";
      return;
    }
  
    // will send a GET request to the Flask backend with the start node as a query parameter
    // This URL must match what Flask is running on (127.0.0.1:5000)
    fetch(`http://127.0.0.1:5000/evacuation?start=${startNode}`)
      .then(response => {
        //checking wether the respose is successful? (if 200 means Okay)
        if (!response.ok) {
          throw new Error("API call failed"); // throw error if not, will catch it later
        }
        return response.json(); // converting the response from JSON string to a JS object
      })
      .then(data => {
        // if the response is successful, we will display the path
        if (data.path) {
          pathOutput.innerText = data.path.join(" -> ");
        } else {
          //if there is no path, then show the error returned by the backend
          pathOutput.innerText = data.error;
        }
      })
      .catch(error => {
        //if anything fails like server not running or bakend not connected, we will display the below message
        pathOutput.innerText = "Error fetching evacuation path.";
        console.error(error); // will Log full error in console for debugging 
      });
  });