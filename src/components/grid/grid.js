
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export function getInitialGrid(start) {
    const grid = [];
    for (let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
            currentRow.push(createNode(col, row, start));
        }
        grid.push(currentRow);
    }
    return grid;
};

function createNode(col, row, start) {
    return {
        col,
        row,
        isStart: row === start.row && col === start.col,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
    };
};

export function getNewGridWithWallToggled(grid, row, col) {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};



