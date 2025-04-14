import json

class Graph:
    def __init__(self, layout_file):
        self.nodes = {}
        self.adjacency_list = {}
        self.load_layout(layout_file)
        
    def load_layout(self, layout_file):
        #Loading building layout from the JSON file and initlalsing nodes and edges
        
        with open(layout_file, 'r') as f:
            data = json.load(f)
            
        #start with the exit status and prepare for empty neighbour list
        for node in data['nodes']:
            node_id = node['id']
            self.nodes[node_id] = node
            self.adjacency_list[node_id] = [] #initialise and empty list for neighbour
            
        for edge in data['edges']:
            from_node = edge['from']
            to_node = edge['to']
            self.adjacency_list[from_node].append(to_node)
            self.adjacency_list[to_node].append(from_node)

    def is_exit(self, node_id):
        #Check if the node is exit
        
        return self.nodes[node_id].get('exit', False)