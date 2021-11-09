const createRow = (n: number): Array<number> => {
    return new Array(n).fill(0);
}

const processRow = (row: Array<number>): Array<number> => {
    return fillArray(cleanEmptyCells(mergeRepeated(cleanEmptyCells(row))), row.length);
}

const fillArray = (row: Array<number>, rowSize: number): Array<number> => {
    for (let i = row.length; i < rowSize; i++) {
        row.push(0);
    }
    return row;
}

const cleanEmptyCells = (row: Array<number>): Array<number> => {
    return row.filter(x => x !== 0);
}

const mergeRepeated = (row: Array<number>): Array<number> => {
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i + 1] === row[i]) {
            row[i] = row[i] * 2;
            row[i + 1] = 0;
        }
    }
    return row;
}

const rowScore = (row: Array<number>): number => {
    return row.reduce((previous, current) => previous + current);
}

const hasMoves = (row: Array<number>): boolean => {
    let hasMoves = false;
    processRow(row).forEach((x, i) => {
        if(x !== row[i]){
            hasMoves = true;
        }
    })
    return hasMoves;
}


export {createRow, processRow, fillArray, cleanEmptyCells, rowScore, mergeRepeated, hasMoves}
