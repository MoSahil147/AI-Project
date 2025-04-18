from collections import deque #as BFS based on queue operations (FIFO), we impot deque

def bfs(graph, start_node):
    visited = set() #already visted
    predecessor = {} #dictionary to map each node to its predecessor, it will help better for path reconstruction
    queue = deque([start_node]) # initalise rhe queue with starting node
    visited.add(start_node) #marking the start node as visited

    while queue:
        current = queue.popleft() #as FIFO work, we are removing the first node from the queue
        # If this node is an exit then reconstruct the path
        if graph.is_exit(current):
            return reconstruct_path(predecessor, start_node, current)

        #if its not an exit, then explore unvisted neighbours
        for neighbor in graph.adjacency_list[current]:
            if neighbor not in visited:
                visited.add(neighbor) # mark visited
                predecessor[neighbor] = current #remembering how we reach this node
                queue.append(neighbor) #adding to queue to explore later

    return []  # Return empty and exit the loop if no exit is found, that means no valid route

def reconstruct_path(predecessor, start, end):
    path = [end] # we will start from exit
    while end != start:
        end = predecessor[end] #will move one step backward
        path.append(end) #add it to the path
    path.reverse() # as we started from the end, we need to reverse it to get the correct order
    return path