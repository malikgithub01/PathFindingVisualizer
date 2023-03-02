import React, { useState } from 'react'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
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
        allowDrop,
        setAllowDrop,
        row,
        mouseDisabled,
        startPoint,
        setStartPoint,
    } = props;


    const extraClassName = isFinish
        ? 'node-finish'
        : isWall
            ? 'node-wall'
            : '';

    const handleDragStart = (e) => {
        if(checkPosition(row, col)){
            console.log("YO")
            setAllowDrop(true)
        }
    }

    const handleDrop = (e) => {
        if(allowDrop){
            setStartPoint({ row: row, col: col })
            setAllowDrop(false)
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const checkPosition = (row, col) => {
        if (startPoint.row === row && startPoint.col === col) {
            return true;
        } else return false;
    }

    return (
        <div
            id={`node-${row}-${col}`}
            className={`node ${extraClassName}`}
            onMouseDown={mouseDisabled || dragging ? null : () => onMouseDown(row, col)}
            onMouseEnter={mouseDisabled ? null : () => onMouseEnter(row, col)}
            onMouseUp={() => onMouseUp()}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onDragEnd={() => setAllowDrop(false)}
            onDragOver={handleDragOver}
            draggable={checkPosition(row, col) ? true : false}
            {...(isStart ? { onMouseOver: () => setDragging(true) } : null)}
        >
            {checkPosition(row, col) && <PlayArrowRoundedIcon />}
        </div>
    )
}

export default Node

