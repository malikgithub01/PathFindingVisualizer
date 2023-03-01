import React, { useState } from 'react'
import './Node.css';

const Node = (props) => {
    const [dragging, setDragging] = useState(false)
    const {
        col,
        isFinish,
        isStart,
        isWall,
        onMouseDown,
        onMouseEnter,
        onMouseUp,
        row,
        startPoint,
        setStartPoint,
        setMouseDisabled
    } = props;

    const extraClassName = isFinish
        ? 'node-finish'
        : isStart
            ? 'node-start'
            : isWall
                ? 'node-wall'
                : '';

    const handleDragStart = (e) => {
        setMouseDisabled(true)
        const startPos = { row, col };
        e.dataTransfer.setData('text/plain', JSON.stringify(startPos));
    }

    const handleDrop = (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        const startPos = JSON.parse(data);
        setStartPoint({row: row, col: col})
        const oldStartNode = document.getElementById(`node-${startPos.row}-${startPos.col}`);
        oldStartNode.className = 'node'
        const newStartNode = document.getElementById(`node-${row}-${col}`);
        newStartNode.className = 'node node-start'
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setMouseDisabled(false)
    };


    return (
        <div
            id={`node-${row}-${col}`}
            className={`node ${extraClassName}`}
            onMouseDown={dragging ? null : () => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseUp={() => onMouseUp()}
            onDragStart={startPoint.row === row && startPoint.col === col ? handleDragStart : null}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            draggable={isStart ? true : false}
            {...(isStart ? { onMouseOver: () => setDragging(true) } : null)}
        />
    )
}

export default Node

