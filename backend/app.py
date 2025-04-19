from flask import Flask, request, jsonify #flask for webserver, request to get URL parameter and jsonify is mainly used to return JSON reponses
from flask_cors import CORS # this allows JS from the Frontend to access the backend API
from graph import Graph # We are using Graph class to represent the building layout well enough
from bfs import bfs #to get shortes evacuation path
import os #os helps in path management

app = Flask(__name__)
CORS(app)  # As per above imported library we are using to to allow the frontend to access the backend API

# here we are building the path
layout_path = os.path.join(os.path.dirname(__file__), 'data', 'building_layout.json')
building_graph = Graph(layout_path) # here nodes, edges and exit points are being build

# defining route API endpoints to handle GET requests for Evacuation path
@app.route('/evacuation', methods=['GET'])
def evacuation():
    """
    Endpoint: http://127.0.0.1:5000/evacuation?start=A
    """
    #extracting the starting node from url
    start = request.args.get('start')
    #validating if wether its start of start is in graph or not
    if not start or start not in building_graph.nodes:
        return jsonify({"error": "Invalid or missing start node."}), 400
    
    #we will call up the BFS algo to find out the shortest path
    path = bfs(building_graph, start)
    
    #if path doesnt exists 
    if not path:
        return jsonify({"error": "No exit found from the specified start node."}), 404

    #for successful computed path as JSON response
    return jsonify({"path": path}), 200

#we are running the Flask Server here
if __name__ == '__main__':
    # IMPORTANT: run on 127.0.0.1 to match the fetch call in main.js
    app.run(host='127.0.0.1', port=5000, debug=True)