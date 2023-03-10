import React from 'react';
import './Buttons.css'

function Buttons(props) {
    const {
        mouseDisabled,
        animationFinished,
        visualizeAStar,
        visualizeDijkstra,
        visualizeGreedyBSF,
        visualizeRecursiveDivision,
        clearGrid,
        clearVisited
    } = props

    return (
        <>
            <div className='btn-container'>
                <p className='header-text'>Algorithm Visualizer</p>
                <div class="divider"></div>
                <button className='btn-main' disabled={mouseDisabled} onClick={() => !mouseDisabled && visualizeDijkstra()}>
                    Visualize Dijkstra's Algorithm
                </button>
                <button className='btn-main' disabled={mouseDisabled} onClick={() => !mouseDisabled && visualizeAStar()}>
                    Visualize A*'s Algorithm
                </button>
                <button className='btn-main' disabled={mouseDisabled} onClick={() => !mouseDisabled && visualizeGreedyBSF()}>
                    Visualize Greedy BSF
                </button>
                <button className='btn-main' disabled={mouseDisabled || !animationFinished} onClick={() => animationFinished && !mouseDisabled && visualizeRecursiveDivision()}>
                    Create Maze
                </button>
                <button className='btn-main' disabled={!animationFinished} onClick={() => animationFinished && clearVisited()}>
                    Clear Path
                </button>
                <button className='btn-main' disabled={!animationFinished} onClick={() => animationFinished && clearGrid()}>
                    Clear Grid
                </button>
            </div>
        </>
    );
}

export default Buttons;