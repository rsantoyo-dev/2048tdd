import {
    flipGrid,
    isValidMove,
    createGrid,
    newGame,
    findFreeCell,
    generateRandom2Or4Number,
    rotateGrid,
    move, isGameOver
} from './GridManager';

describe("Grid Manager", () => {
    it("should populate an squared grid of n length", () => {
        const mockSize = 4;
        const grid = createGrid(mockSize);
        expect(grid.length).toBe(mockSize);
    });

    it("a new generated grid has to be empty filled", () => {
        const mockSize = 4;
        expect(createGrid(mockSize)).toEqual([
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]]);
    });

    it("a new game should empty the board and add 2 new numbers", () => {
        const mockSize = 4;
        let numberCount = 0;

        const mockArray = newGame(mockSize);
        for (let i = 0; i < mockSize; i++) {
            for (let j = 0; j < mockSize; j++) {
                if (mockArray[i][j] === 2 || mockArray[i][j] === 4) {
                    numberCount++;
                }
            }
        }
        expect(numberCount).toBe(2);
    });

    it("should rotate the grid", () => {
        const mockGrid = [
            [2, 2, 4, 0],
            [2, 0, 4, 0],
            [0, 2, 4, 4],
            [4, 2, 4, 4]
        ]
        expect(rotateGrid(mockGrid)).toEqual([
            [2, 2, 0, 4],
            [2, 0, 2, 2],
            [4, 4, 4, 4],
            [0, 0, 4, 4]
        ])
    });
    it("should flip the grid", () => {
        const mockGrid = [
            [2, 2, 4, 0],
            [2, 0, 4, 0],
            [0, 2, 4, 4],
            [4, 2, 4, 4]
        ]
        expect(flipGrid(mockGrid)).toEqual([
            [0, 4, 2, 2],
            [0, 4, 0, 2],
            [4, 4, 2, 0],
            [4, 4, 2, 4]
        ])
    });

    it("should not be game over", () => {
        const mockGrid = [
            [2, 2, 4, 0],
            [2, 0, 4, 0],
            [0, 2, 4, 4],
            [4, 2, 4, 4]
        ]
        expect(isGameOver(mockGrid)).toBeFalsy();
    });
    it("should be game over", () => {
        const mockGrid = [
            [2, 8, 4, 2],
            [16, 32, 64, 4],
            [2, 4, 2, 16],
            [16, 8, 4, 2]
        ]
        expect(isGameOver(mockGrid)).toBeTruthy();
        const mockGrid2 = [
            [2, 4, 8, 4],
            [4, 64, 32, 2],
            [8, 32, 8, 16],
            [2, 16, 2, 4]
        ]
        expect(isGameOver(mockGrid2)).toBeTruthy();
    });

    it("should be a valid move", () => {
        const mockGrid = [
            [2, 2, 4, 0],
            [2, 0, 4, 0],
            [0, 2, 4, 4],
            [4, 2, 4, 4]
        ]
        expect(isValidMove(mockGrid)).toBeTruthy();
    });

    it("should not be a valid move", () => {
        const mockGrid = [
            [2, 8, 4, 0],
            [2, 8, 4, 0],
            [4, 2, 4, 2],
            [0, 0, 0, 0]
        ]
        expect(isValidMove(mockGrid)).toBeFalsy();
    });


    describe("moving", () => {

        it("move left should process all rows and add new number", () => {
            const mockGrid = [
                [2, 2, 4, 0],
                [2, 0, 4, 0],
                [0, 2, 4, 4],
                [4, 2, 4, 4]
            ]
            const mockResult = [
                [4, 4, 0, 0],
                [2, 4, 0, 0],
                [2, 8, 0, 0],
                [4, 2, 8, 0]
            ]
            let differences = [];
            const processed = move(mockGrid)
            for (let i = 0; i < mockResult.length; i++) {
                for (let j = 0; j < mockResult.length; j++) {
                    if (mockResult[i][j] !== processed[i][j]) {
                        differences.push(processed[i][j]);
                    }
                }
            }
            expect(differences.length).toBe(1)
            const isValidNUmber = (differences[0] === 2 || differences[0] === 4);
            expect(isValidNUmber).toBeTruthy();
        });


    })


    describe("number generator", () => {
        it("a random number (2 || 4) should be added. after n*n grid size, all fields should be 2 0r 4", () => {
            const mockSize = 4;
            let mockArray = createGrid(mockSize);

            for (let i = 0; i < mockSize * mockSize; i++) {
                mockArray = findFreeCell(mockArray)
            }
            for (let i = 0; i < mockSize; i++) {
                for (let j = 0; j < mockSize; j++) {
                    expect(mockArray[i][j] !== 0).toBeTruthy();
                }
            }
        });

        it("should return a 2 or 4", () => {
            const randomNumber = generateRandom2Or4Number();
            expect(randomNumber === 2 || randomNumber === 4).toBeTruthy();
        });
        it("2 has more possibilities than 4", () => {
            let num = 0;
            for (let i = 0; i < 100; i++) {
                (generateRandom2Or4Number() === 2) && num++;
            }
            expect(num).toBeGreaterThan(50);
        });
    })


})
