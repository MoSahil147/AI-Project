from flask import Flask, request, jsonify
from flask_cors import CORS
from graph import Graph
from bfs import bfs
import os

app = Flask(__name__)
CORS(app)

LAYOUT_FILE = os.path.join(os.path.dirname(__file__), 'data', 'building_layout.json')
building_graph = Graph(LAYOUT_FILE)

@app.route('/evacuation', methods=['GET'])
def evacuation():
    start = request.args.get('start')
    if not start or start not in building_graph.nodes:
        return jsonify({"error": "Invalid or missing start node."}), 400

    path = bfs(building_graph, start)
    if not path:
        return jsonify({"error": "No exit found from the specified start node."}), 404

    return jsonify({"path": path}), 200

if __name__ == '__main__':
    app.run(debug=True)