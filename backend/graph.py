import json

class Graph:
    def __init__(self, layout_file):
        self.nodes = {}
        self.adjacency_list = {}
        self.load_layout(layout_file)

    def load_layout(self, layout_file):
        with open(layout_file, 'r') as f:
            data = json.load(f)

        for node in data['nodes']:
            self.nodes[node['id']] = node
            self.adjacency_list[node['id']] = []

        for edge in data['edges']:
            self.adjacency_list[edge['from']].append(edge['to'])
            self.adjacency_list[edge['to']].append(edge['from'])

    def is_exit(self, node_id):
        return self.nodes[node_id].get('exit', False)