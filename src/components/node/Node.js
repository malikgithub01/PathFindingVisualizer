import React, { useState } from 'react'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import './Node.css';

const Node = (props) => {
    const [dragging, setDragging] = useState(false)
    const {
        col,
        row,
        isFinish,
        isStart,
        isWall,
        onMouseDown,
        onMouseEnter,
        onMouseUp,
        allowStartDrop,
        setAllowStartDrop,
        allowFinishDrop,
        setAllowFinishDrop,
        mouseDisabled,
        startPoint,
        setStartPoint,
        finishPoint,
        setFinishPoint
    } = props;


    const extraClassName = isWall ? 'node-wall' : '';

    const handleDragStart = (e) => {
        if (checkStartPosition(row, col)) {
            setAllowStartDrop(true)
        }
        if (checkFinishPosition(row, col)) {
            setAllowFinishDrop(true)
        }
    }

    const handleDrop = (e) => {
        if (allowStartDrop) {
            setStartPoint({ row: row, col: col })
            setAllowStartDrop(false)
        }
        if (allowFinishDrop) {
            setFinishPoint({ row: row, col: col })
            setAllowFinishDrop(false)
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const checkStartPosition = (row, col) => {
        if (startPoint.row === row && startPoint.col === col) {
            return true;
        } else return false;
    }

    const checkFinishPosition = (row, col) => {
        if (finishPoint.row === row && finishPoint.col === col) {
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
            onDragEnd={() => {
                setAllowStartDrop(false);
                setAllowFinishDrop(false);
            }}
            onDragOver={handleDragOver}
            draggable={checkStartPosition(row, col) || checkFinishPosition(row, col) ? true : false}
            {...(isStart ? { onMouseOver: () => setDragging(true) } : null)}
            {...(isFinish ? { onMouseOver: () => setDragging(true) } : null)}
        >
            {checkStartPosition(row, col) && <PlayArrowRoundedIcon />}
            {checkFinishPosition(row, col) && <FlagRoundedIcon />}
        </div>
    )
}

export default Node

