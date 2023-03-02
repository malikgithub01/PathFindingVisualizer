export function getInitialGrid(start, finish) {
    const grid = [];
    for (let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
            currentRow.push(createNode(col, row, start, finish));
        }
        grid.push(currentRow);
    }
    return grid;
};

function createNode(col, row, start, finish) {
    return {
        col,
        row,
        isStart: row === start.row && col === start.col,
        isFinish: row === finish.row && col === finish.col,
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



