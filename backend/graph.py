import json


class Graph:
    def __init__(self, layout_file):
        self.nodes = {} #storing node info
        self.adjacency_list = {} #storing connections between nodes
        self.load_layout(layout_file) #load graph structure from JSON file

    def load_layout(self, layout_file):
        #open the file and we will parse it using the .load function
        with open(layout_file, 'r') as f:
            data = json.load(f)

        # Initialize every node
        for node in data['nodes']:
            self.nodes[node['id']] = node #will store node with its id as the key
            self.adjacency_list[node['id']] = []

        # Fill adjacency list from edges (undirected)
        for edge in data['edges']:
            self.adjacency_list[edge['from']].append(edge['to']) # connecting from_node to to_node
            self.adjacency_list[edge['to']].append(edge['from']) #connecting to_node back to from_node (undirected)

    def is_exit(self, node_id):
        return self.nodes[node_id].get('exit', False) #return True if node is marked as an exit, otherwise return False