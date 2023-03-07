import React from 'react'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import './Node.css';
import { getNewGridWithWallToggled } from '../grid/grid';

const Node = (props) => {
    const {
        col,
        row,
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
        setFinishPoint,
        grid,
        setGrid
    } = props;


    const extraClassName = isWall ? 'node-wall' : '';

    const handleDragStart = (e) => {
        if (checkStartPosition(row, col)) setAllowStartDrop(true)
        if (checkFinishPosition(row, col)) setAllowFinishDrop(true)
    }

    const handleDrop = (e) => {
        if (allowStartDrop) {
            if (checkFinishPosition(row, col)) return;
            setStartPoint({ row: row, col: col })
            setAllowStartDrop(false)
            if (isWall) {
                const newGrid = getNewGridWithWallToggled(grid, row, col);
                setGrid(newGrid);
            }
        }
        if (allowFinishDrop) {
            if (checkStartPosition(row, col)) return;
            setFinishPoint({ row: row, col: col })
            setAllowFinishDrop(false)
            if (isWall) {
                const newGrid = getNewGridWithWallToggled(grid, row, col);
                setGrid(newGrid);
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const checkStartPosition = (row, col) => {
        if (startPoint.row === row && startPoint.col === col) return true;
        else return false;
    }

    const checkFinishPosition = (row, col) => {
        if (finishPoint.row === row && finishPoint.col === col) return true;
        else return false;
    }

    return (
        <div
            id={`node-${row}-${col}`}
            className={`node ${extraClassName}`}
            onMouseDown={mouseDisabled ? null : () => onMouseDown(row, col)}
            onMouseEnter={mouseDisabled ? null : () => onMouseEnter(row, col)}
            onMouseUp={() => onMouseUp()}
            onDragStart={mouseDisabled ? null : handleDragStart}
            onDrop={mouseDisabled ? null : handleDrop}
            onDragEnd={mouseDisabled ? null : () => {
                setAllowStartDrop(false);
                setAllowFinishDrop(false);
            }}
            onDragOver={handleDragOver}
            draggable={!mouseDisabled && (checkStartPosition(row, col) || checkFinishPosition(row, col)) ? true : false}
        >
            {checkStartPosition(row, col) && <PlayArrowRoundedIcon />}
            {checkFinishPosition(row, col) && <FlagRoundedIcon />}
        </div>
    )
}

export default Node

