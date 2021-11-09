import {createRow, hasMoves, processRow} from './RowManager';


const move = (grid: number[][]): number[][] => {
    return isValidMove(grid) ? findFreeCell(grid.map((row) => processRow(row))) : grid;
}

const createGrid = (gridSize: number): number[][] => {
    const grid: number[][] = []
    for (let i = 0; i < gridSize; i++) {
        grid.push(createRow(gridSize))
    }
    return grid
}

const newGame = (n: number): number[][] => {
    let newGame: number[][] = createGrid(n);
    newGame = findFreeCell(findFreeCell(newGame));
    return newGame;
}

const findFreeCell = (grid: number[][]): number[][] => {
    let freeSpacesArray: Array<{ x: number, y: number }> = [];
    grid.forEach((row, i) => {
        row.forEach((cell, j) => {
            (cell === 0) && freeSpacesArray.push({x: i, y: j})
        })
    })
    if (freeSpacesArray.length > 0) {
        const randomCell = Math.floor(Math.random() * freeSpacesArray.length);
        grid[freeSpacesArray[randomCell].x][freeSpacesArray[randomCell].y] = generateRandom2Or4Number();
    }
    return grid;
}

const isGameOver = (grid: number[][]): boolean => {
    let gameOver: boolean = true;
    grid.forEach((row) => {
        if (hasMoves(row)) {
            gameOver = false;
        }
    })
    rotateGrid(grid).forEach((row) => {
        if (hasMoves(row)) {
            gameOver = false;
        }
    })
    return gameOver;
}

const rotateGrid = (grid: number[][]): number[][] => {
    const rotatedBoard: number[][] = createGrid(grid.length);
    grid.forEach((row, i) => {
        row.forEach((cell, j) => {
            rotatedBoard[i][j] = grid[j][i];
        })
    })
    return rotatedBoard;
}

const flipGrid = (grid: number[][]): number[][] => {
    let toFlip :number[][];
    toFlip = [...grid]
    return toFlip.map((row) => row.reverse());
}


const isValidMove = (grid: number[][]): boolean => {
    let validMove: boolean = false;
    grid.forEach((row) => {
        if (hasMoves(row)) {
            validMove = true;
        }
    })
    return validMove;
}

const generateRandom2Or4Number = (): number => {
    return Math.random() >= .9 ? 4 : 2;
}

export {
    move,
    flipGrid,
    isValidMove,
    createGrid,
    newGame,
    isGameOver,
    findFreeCell,
    generateRandom2Or4Number,
    rotateGrid,

}

