// Draw the building map with nodes and connections
function drawBuildingMap(buildingData, canvas) {
  const ctx = canvas.getContext('2d');
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw edges (connections between locations)
  buildingData.edges.forEach(edge => {
    const fromNode = buildingData.nodes.find(n => n.id === edge.from);
    const toNode = buildingData.nodes.find(n => n.id === edge.to);
    
    ctx.beginPath();
    ctx.moveTo(fromNode.x, fromNode.y);
    ctx.lineTo(toNode.x, toNode.y);
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.stroke();
  });
  
  // Draw nodes (locations)
  buildingData.nodes.forEach(node => {
    // Draw circle for each node
    ctx.beginPath();
    ctx.arc(node.x, node.y, 15, 0, 2 * Math.PI);
    ctx.fillStyle = node.exit ? '#4caf50' : '#2196f3';
    ctx.fill();
    
    // Add white border around node
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Add node label (location ID)
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(node.id, node.x, node.y);
  });
}

// Highlight the evacuation path on the map
function highlightPath(buildingData, path, canvas) {
  const ctx = canvas.getContext('2d');
  
  // Draw highlighted path
  for (let i = 0; i < path.length - 1; i++) {
    const currentNode = buildingData.nodes.find(n => n.id === path[i]);
    const nextNode = buildingData.nodes.find(n => n.id === path[i+1]);
    
    // Draw line for path
    ctx.beginPath();
    ctx.moveTo(currentNode.x, currentNode.y);
    ctx.lineTo(nextNode.x, nextNode.y);
    ctx.strokeStyle = '#ff5722';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Draw direction arrow
    drawArrow(ctx, currentNode.x, currentNode.y, nextNode.x, nextNode.y);
  }
}

// Helper function to draw direction arrows
function drawArrow(ctx, fromX, fromY, toX, toY) {
  const headLength = 10;
  const dx = toX - fromX;
  const dy = toY - fromY;
  const angle = Math.atan2(dy, dx);
  
  // Calculate position for arrow head (slightly before destination)
  const ratio = 0.8;
  const arrowX = fromX + dx * ratio;
  const arrowY = fromY + dy * ratio;
  
  // Draw arrow head
  ctx.beginPath();
  ctx.moveTo(arrowX, arrowY);
  ctx.lineTo(arrowX - headLength * Math.cos(angle - Math.PI/6), arrowY - headLength * Math.sin(angle - Math.PI/6));
  ctx.lineTo(arrowX - headLength * Math.cos(angle + Math.PI/6), arrowY - headLength * Math.sin(angle + Math.PI/6));
  ctx.closePath();
  ctx.fillStyle = '#ff5722';
  ctx.fill();
}