from collections import deque

def bfs(graph, start_node):
    """
    Uses BFS to find the shortest path from the start node to the nearest exit.
    
    :param graph: An instance of the Graph class from graph.py.
    :param start_node: The starting node's id (a string).
    :return: A list of node ids representing the path from start_node to an exit, or an empty list if no exit is found.
    """
    visited = set()
    predecessor = {}
    
    queue = deque()
    queue.append(start_node)
    visited.add(start_node)
    
    while queue:
        current = queue.popleft()
        #check that current node is marked as an exit
        if graph.is_exit(current):
            #agar koi path as reached an exit, reconstruct the path from start to exit
            return reconstruct_path(predecessor, start_node, current)
        
        #explore those jo vist nahi kiya hai!
        for neighbor in graph.adjacency_list[current]:
            if neighbor not in visited:
                visited.add(neighbor)
                predecessor[neighbor] = current
                queue.append(neighbor)
                
    return []

def reconstruct_path(predecessor, start, end):
    """
    Reconstructs the path from the start node to the exit node using the predecessor mapping.
    
    :param predecessor: Dictionary mapping nodes to their predecessors.
    :param start: Starting node id.
    :param end: End node id (exit).
    :return: List of node ids representing the path.
    """ 

    path = [end]
    while end != start:
        end = predecessor[end]
        path.append(end)
    path.reverse()
    return path
