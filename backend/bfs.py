from collections import deque

def bfs(graph, start_node):
    visited = set()
    predecessor = {}
    queue = deque([start_node])
    visited.add(start_node)

    while queue:
        current = queue.popleft()
        # If this node is an exit, reconstruct the path
        if graph.is_exit(current):
            return reconstruct_path(predecessor, start_node, current)

        for neighbor in graph.adjacency_list[current]:
            if neighbor not in visited:
                visited.add(neighbor)
                predecessor[neighbor] = current
                queue.append(neighbor)

    return []  # Return empty if no exit is found

def reconstruct_path(predecessor, start, end):
    path = [end]
    while end != start:
        end = predecessor[end]
        path.append(end)
    path.reverse()
    return path