export function aStar(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    startNode.fScore = heuristic(startNode, finishNode);
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
      sortNodesByFScore(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
      if (closestNode.isWall) continue;
      if (closestNode.distance === Infinity) return visitedNodesInOrder;
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
      if (closestNode === finishNode) return visitedNodesInOrder;
      updateUnvisitedNeighbors(closestNode, grid, finishNode);
    }
  }
  
  function sortNodesByFScore(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.fScore - nodeB.fScore);
  }
  
  function updateUnvisitedNeighbors(node, grid, finishNode) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      const tentativeScore = node.distance + 1 + heuristic(neighbor, finishNode);
      if (tentativeScore < neighbor.fScore) {
        neighbor.distance = node.distance + 1;
        neighbor.fScore = tentativeScore;
        neighbor.previousNode = node;
      }
    }
  }

  function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
  }
  
  function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  }
  
  
  function heuristic(nodeA, nodeB) {
    const dx = Math.abs(nodeA.col - nodeB.col);
    const dy = Math.abs(nodeA.row - nodeB.row);
    return dx + dy; 
  }
  