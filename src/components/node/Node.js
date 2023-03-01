import React, { useState } from 'react'
import ReactDOM from 'react-dom';
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
        const startPos = { row, col };
        e.dataTransfer.setData('text/plain', JSON.stringify(startPos));
    }

    const handleDrop = (e) => {
        e.preventDefault();
        console.log(row, col)
        setStartPoint({ row: row, col: col })
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const checkPosition = (row, col) => {
        if(startPoint.row === row && startPoint.col === col){
            return true;
        } else return false;
    } 

    return (
        <div
            id={`node-${row}-${col}`}
            className={`node ${extraClassName}`}
            onMouseDown={mouseDisabled || dragging ? null : () => onMouseDown(row, col)}
            onMouseEnter={mouseDisabled ? null : () => onMouseEnter(row, col)}
            onMouseUp={() => {
                onMouseUp()
            }}
            onDragStart={mouseDisabled ? null : startPoint.row === row && startPoint.col === col ? handleDragStart : null}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            draggable={checkPosition(row, col) ? true : false}
            {...(isStart ? { onMouseOver: () => setDragging(true) } : null)}
        >
            {checkPosition(row, col) && <PlayArrowRoundedIcon />}
        </div>
    )
}

export default Node

