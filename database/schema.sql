CREATE TABLE IF NOT EXISTS building_nodes (
    id TEXT PRIMARY KEY,
    is_exit BOOLEAN NOT NULL
);

-- Create table for building edges.
CREATE TABLE IF NOT EXISTS building_edges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    from_node TEXT NOT NULL,
    to_node TEXT NOT NULL,
    FOREIGN KEY (from_node) REFERENCES building_nodes(id),
    FOREIGN KEY (to_node) REFERENCES building_nodes(id)
);