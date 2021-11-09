import {createRow, processRow, hasMoves, fillArray, cleanEmptyCells, rowScore, mergeRepeated} from './RowManager';

describe("Row Transform", () => {

    it("should populate an row of cells of n length", () => {
        const mockSize = 4;
        const row = createRow(mockSize);
        expect(row.length).toBe(mockSize);
    });

    it("a new generated row has to be empty filled", ()=>{
        const mockSize=4;
        const row = createRow(mockSize)
        for(let i=0; i<mockSize; i++){
            expect(row[i]).toBe(0)
        }
    })

   it("should remove 0 from row", () => {
       let mockRow = [0,2,0,4];
       let mockResult = [2,4];
       expect(cleanEmptyCells(mockRow)).toEqual(mockResult);
    })
    it("should return row score summing all items",()=>{
        expect(rowScore([2,8,4,0])).toEqual( 14);
    })

    it("should merge repeated neighbor numbers", () => {
        expect(mergeRepeated([2,2,4,4])).toEqual( [4,0,8,0]);
        expect(mergeRepeated([2,4,4])).toEqual( [2,8,0]);
        expect(mergeRepeated([2,2,4])).toEqual( [4,0,4]);
    });

    it("should fill array with zeros to the end of a row until the array reaches a given length ", () => {
        expect(fillArray([2,4], 4)).toEqual( [2,4,0,0]);
    })

    it("should return false if not available moves",()=>{
        expect(hasMoves([2,8,4,16])).toBeFalsy();
        expect(hasMoves([0,0,0,0])).toBeFalsy();
        expect(hasMoves([2,8,4,0])).toBeFalsy();
    })
    it("should return if available moves to left",()=>{
        expect(hasMoves([2,8,0,4])).toBeTruthy();
        expect(hasMoves([4,2,4,4])).toBeTruthy();
    })

    describe("class implementation", ()=>{
        it("given a row [2,2,4,4] when merged then return [4,8,0,0]", () => {
            expect(processRow([2,2,4,4])).toEqual( [4,8,0,0]);
        })
        it("given a row [2,0,4,4] when merged then return [2,8,0,0]", () => {
            expect(processRow([2,0,4,4])).toEqual( [2,8,0,0]);
        })
        it("given a row [0,0,4,4] when merged then return [8,0,0,0]", () => {
            expect(processRow([0,0,4,4])).toEqual( [8,0,0,0]);
        })
    })
})

