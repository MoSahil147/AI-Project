from flask import Flask, request, jsonify
from graph import Graph #import the graph class to load the buliding layout
from bfs import bfs #import BFS algo
import os

app = Flask(__name__)

LAYOUT_FILE = os.path.join(os.path.dirname(__file__), 'data', 'building_layout.json')

building_graph = Graph(LAYOUT_FILE)

@app.route('/evecuation', methods=['GET'])
def evacuation():
    """
    API endpoint that computes the evacuation path from a specified starting node.
    
    Example usage:
      GET /evacuation?start=A
    
    Returns:
      - A JSON object with the computed path if an exit is found.
      - An error message with an appropriate HTTP status code otherwise.
    """
    start = request.args.get('start')
    if not start or start not in building_graph.nodes:
        return jsonify({'error': 'Invalid start node'}), 400
    
    path = bfs(building_graph, start)
    if not path:
        return jsonify({'error': 'No exit found'}), 404
    
    return jsonify({"path": path}), 200

if __name__ == '__main__':
    app.run(debug=True) #run the app in debug mode
