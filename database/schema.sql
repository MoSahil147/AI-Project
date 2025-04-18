--table for building nodes like rooms, staircases, etc
CREATE TABLE IF NOT EXISTS building_nodes (
    id TEXT PRIMARY KEY,
    is_exit BOOLEAN NOT NULL --marking wether node is an exit (true/false)
);

-- table for building edges.
CREATE TABLE IF NOT EXISTS building_edges (
    id INTEGER PRIMARY KEY AUTOINCREMENT, --unique id for each node, auto-incremented
    from_node TEXT NOT NULL,
    to_node TEXT NOT NULL,
    FOREIGN KEY (from_node) REFERENCES building_nodes(id), -- used Foreign Key to ensures that from_node must exist in building_nodes table
    FOREIGN KEY (to_node) REFERENCES building_nodes(id) -- similarly for to_node
);