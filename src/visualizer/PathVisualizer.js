import React, { useEffect, useState } from 'react'
import Node from '../components/node/Node';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';
import { getInitialGrid, getNewGridWithWallToggled } from '../components/grid/grid'
import './PathVisualizer.css'




const PathVisualizer = () => {

    const [grid, setGrid] = useState([]);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    const [mouseDisabled, setMouseDisabled] = useState(false)
    const [startPoint, setStartPoint] = useState({ row: 10, col: 15 })
    const [finishPoint, setFinishPoint] = useState({row: 10, col:35 })
    const [allowStartDrop, setAllowStartDrop] = useState(false)
    const [allowFinishDrop, setAllowFinishDrop] = useState(false)

    useEffect(() => {
        const initialGrid = getInitialGrid(startPoint, finishPoint);
        setGrid(initialGrid);
        console.log(initialGrid)
    }, []);



    const handleMouseDown = (row, col) => {
        if (startPoint.row === row && startPoint.col === col) return;
        if(finishPoint.row === row && finishPoint.col === col) return;
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);
        setMouseIsPressed(true);
    };

    const handleMouseEnter = (row, col) => {
        if (!mouseIsPressed) return;
        if (startPoint.row === row && startPoint.col === col) return;
        if(finishPoint.row === row && finishPoint.col === col) return;
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);
    };

    const handleMouseUp = () => {
        setMouseIsPressed(false);
    };

    const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder, finishNode) => {
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
            }, 50 * i);
        }
    };

    const visualizeDijkstra = () => {
        setMouseDisabled(true)
        const startNode = grid[startPoint.row][startPoint.col];
        const finishNode = grid[finishPoint.row][finishPoint.col];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder, finishNode);
    };

    const clearGrid = () => {
        setMouseDisabled(false)
        const initialGrid = getInitialGrid(startPoint, finishPoint);
        setGrid(initialGrid);
        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 50; col++) {
                const element = document.getElementById(`node-${row}-${col}`);
                if (element) element.className = 'node';
            }
        }
    }

    return (
        <>
            <button onClick={() => visualizeDijkstra()}>
                Visualize Dijkstra's Algorithm
            </button>
            <button onClick={() => clearGrid()}>
                Clear Grid
            </button>
            <div style={{ margin: '100px 0 0' }} draggable={false}>
                {grid.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx} draggable={false}>
                            {row.map((node, nodeIdx) => {
                                const { row, col, isFinish, isStart, isWall } = node;
                                return (
                                    <Node
                                        key={nodeIdx}
                                        col={col}
                                        row={row}
                                        grid={grid}
                                        setGrid={setGrid}
                                        isFinish={isFinish}
                                        isStart={isStart}
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

export default PathVisualizer

