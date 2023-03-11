import React, { useEffect, useState } from 'react'
import Node from '../components/node/Node';
import { dijkstra } from '../algorithms/pathfinder/dijkstra';
import { aStar } from '../algorithms/pathfinder/a-star';
import { greedyBestFirstSearch } from '../algorithms/pathfinder/greedyBFS';
import { getNodesInShortestPathOrder } from '../algorithms/pathfinder/getShortestPath';
import { getInitialGrid, getNewGridWithWallToggled } from '../components/grid/grid'
import { recursiveDivisionMaze } from '../algorithms/maze/recursiveDivision';
import Buttons from '../components/buttons/Buttons';




const Visualizer = () => {

    const [grid, setGrid] = useState([]);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    const [mouseDisabled, setMouseDisabled] = useState(false)
    const [startPoint, setStartPoint] = useState({ row: 10, col: 15 })
    const [finishPoint, setFinishPoint] = useState({ row: 10, col: 35 })
    const [allowStartDrop, setAllowStartDrop] = useState(false)
    const [allowFinishDrop, setAllowFinishDrop] = useState(false)
    const [animationFinished, setAnimationFinished] = useState(true)

    useEffect(() => {
        setInitGrid()
    }, []);

    const setInitGrid = () => {
        const initialGrid = getInitialGrid();
        setGrid(initialGrid);
    }

    const handleMouseDown = (row, col) => {
        if (startPoint.row === row && startPoint.col === col) return;
        if (finishPoint.row === row && finishPoint.col === col) return;
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);
        setMouseIsPressed(true);
    };

    const handleMouseEnter = (row, col) => {
        if (!mouseIsPressed) return;
        if (startPoint.row === row && startPoint.col === col) return;
        if (finishPoint.row === row && finishPoint.col === col) return;
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);
    };

    const handleMouseUp = () => {
        setMouseIsPressed(false);
    };

    const animateVisitedNodes = (visitedNodesInOrder, nodesInShortestPathOrder, finishNode) => {
        setAnimationFinished(false)
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                if (finishNode.isVisited) {
                    setTimeout(() => {
                        animateShortestPath(nodesInShortestPathOrder);
                    }, 10 * i);
                    return;
                } else {
                    setTimeout(() => {
                        alert("Impossible to find a path")
                    }, 10 * i * 1.3)
                    setAnimationFinished(true)
                }
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                const element = document.getElementById(`node-${node.row}-${node.col}`);
                if (element) {
                    element.className = 'node node-visited node-visited-after';
                }
            }, 10 * i);
        }
    };

    const animateShortestPath = (nodesInShortestPathOrder) => {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                const element = document.getElementById(`node-${node.row}-${node.col}`);
                if (element) element.className = 'node node-shortest-path';
                if (i === nodesInShortestPathOrder.length - 1) setAnimationFinished(true)
            }, 50 * i);
        }
    };

    const animateAddedWalls = (walls, grid) => {
        for (let i = 0; i < walls.length; i++) {
            setTimeout(() => {
                const wall = walls[i];
                const newGrid = getNewGridWithWallToggled(grid, wall[0], wall[1]);
                setGrid(newGrid);
                if (i === walls.length - 1) {
                    setMouseDisabled(false)
                    setAnimationFinished(true)
                }
            }, 20 * i)
        }
    }

    const visualizeDijkstra = () => {
        setMouseDisabled(true)
        const startNode = grid[startPoint.row][startPoint.col];
        const finishNode = grid[finishPoint.row][finishPoint.col];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        animateVisitedNodes(visitedNodesInOrder, nodesInShortestPathOrder, finishNode);
    };

    const visualizeAStar = () => {
        setMouseDisabled(true)
        const startNode = grid[startPoint.row][startPoint.col];
        const finishNode = grid[finishPoint.row][finishPoint.col];
        const visitedNodesInOrder = aStar(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        animateVisitedNodes(visitedNodesInOrder, nodesInShortestPathOrder, finishNode)
    }

    const visualizeGreedyBSF = () => {
        setMouseDisabled(true)
        const startNode = grid[startPoint.row][startPoint.col];
        const finishNode = grid[finishPoint.row][finishPoint.col];
        const visitedNodesInOrder = greedyBestFirstSearch(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        animateVisitedNodes(visitedNodesInOrder, nodesInShortestPathOrder, finishNode)
    }

    const visualizeRecursiveDivision = () => {
        setMouseDisabled(true)
        setAnimationFinished(false)
        const initialGrid = getInitialGrid();
        setGrid(initialGrid);
        let walls = recursiveDivisionMaze(initialGrid, startPoint, finishPoint)
        animateAddedWalls(walls, initialGrid)
    }

    const clearGrid = () => {
        setMouseDisabled(false)
        setInitGrid()
        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 50; col++) {
                const element = document.getElementById(`node-${row}-${col}`);
                if (element) element.className = 'node';
            }
        }
    }

    const clearVisited = () => {
        setMouseDisabled(false)
        const newGrid = grid.slice()
        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 50; col++) {
                const node = newGrid[row][col]
                const newNode = {
                    ...node,
                    distance: Infinity,
                    isVisited: false,
                    previousNode: null,
                    fScore: Infinity
                };
                newGrid[row][col] = newNode
                const element = document.getElementById(`node-${row}-${col}`);
                if (element && !newNode.isWall) {
                    element.className = 'node';
                }
            }
        }
        setGrid(newGrid)
    }

    return (
        <>
            <Buttons
                mouseDisabled={mouseDisabled}
                animationFinished={animationFinished}
                visualizeDijkstra={visualizeDijkstra}
                visualizeAStar={visualizeAStar}
                visualizeGreedyBSF={visualizeGreedyBSF}
                visualizeRecursiveDivision={visualizeRecursiveDivision}
                clearGrid={clearGrid}
                clearVisited={clearVisited}
            />
            <div draggable={false}>
                {grid.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx} draggable={false}>
                            {row.map((node, nodeIdx) => {
                                const { row, col, isWall } = node;
                                return (
                                    <Node
                                        key={nodeIdx}
                                        col={col}
                                        row={row}
                                        grid={grid}
                                        setGrid={setGrid}
                                        isWall={isWall}
                                        startPoint={startPoint}
                                        setStartPoint={setStartPoint}
                                        finishPoint={finishPoint}
                                        setFinishPoint={setFinishPoint}
                                        allowStartDrop={allowStartDrop}
                                        setAllowStartDrop={setAllowStartDrop}
                                        allowFinishDrop={allowFinishDrop}
                                        setAllowFinishDrop={setAllowFinishDrop}
                                        mouseDisabled={mouseDisabled}
                                        setMouseDisabled={setMouseDisabled}
                                        onMouseDown={(row, col) => handleMouseDown(row, col)}
                                        onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                                        onMouseUp={() => handleMouseUp()}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Visualizer

