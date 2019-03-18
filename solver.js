class SudokuSolver {
    deepcopyPuzzle(puzzle) {
        let result = [];

        for (let i = 0; i < 9; i++) {
            let subarr = [];

            for (let j = 0; j < 9; j++) {
                subarr.push(puzzle[i][j]);
            }

            result.push(subarr);
        }

        return result;
    }

    solve(puzzle) {
        let solution = this.deepcopyPuzzle(puzzle);
        
        if (this.solveHelper(solution)) {
            return solution;
        } else {
            return false;
        }
    }

    solveHelper(solution) {
        let minPossibleValueCountCell = null;

        while (true) {
            minPossibleValueCountCell = null;

            for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
                for (let columnIndex = 0; columnIndex < 9; columnIndex++) {
                    if (solution[rowIndex][columnIndex] !== 0) {
                        continue;
                    }

                    let possibleValues = this.findPossibleValues(rowIndex, columnIndex, solution);
                    let possibleValueCount = possibleValues.length;

                    if (possibleValueCount === 0) {
                        return false;
                    }

                    if (possibleValueCount === 1) {
                        solution[rowIndex][columnIndex] = possibleValues.pop();
                    }

                    if (!minPossibleValueCountCell || possibleValueCount < minPossibleValueCountCell[1].length) {
                        minPossibleValueCountCell = [[rowIndex, columnIndex], possibleValues];
                    }
                }

                if (!minPossibleValueCountCell) {
                    return true;
                } else if (minPossibleValueCountCell[1].length > 1) {
                    break;
                }
            }
        }

        let [r, c] = minPossibleValueCountCell[0];

        minPossibleValueCountCell[1].forEach((v) => {
            solutionCopy = this.deepcopyPuzzle(solution);
            solutionCopy[r, c] = v;

            if (this.solveHelper(solutionCopy )) {
                for (let r = 0; r < 9; r++) {
                    for (let c = 0; c < 9; c++) {
                        solution[r, c] = solutionCopy[r, c];
                    }
                }

                return true;
            }
        });

        return false;
    }

    findPossibleValues(rowIndex, columnIndex, puzzle) {
        let values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let rowValues = this.getRowValues( rowIndex, puzzle );
        let columnValues = this.getColumnValues( columnIndex, puzzle );
        let blockValues = this.getBlockValues( rowIndex, columnIndex, puzzle );
        
        values = values.filter(x => !rowValues.includes(x));
        values = values.filter(x => !columnValues.includes(x));
        values = values.filter(x => !blockValues.includes(x));

        return values
    }

    getRowValues(rowIndex, puzzle) {
        return [...puzzle[rowIndex]];
    }

    getColumnValues(columnIndex, puzzle) {
        const result = [];

        for (let i=0; i<9; i++) {
            result.push(puzzle[i][columnIndex]);
        }

        return result;
    }
    
    getBlockValues(rowIndex, columnIndex, puzzle) {
        let blockRowStart = 3 * Math.floor(rowIndex / 3);
        let blockColumnStart = 3 * Math.floor(columnIndex / 3);
        let result = [];

        for (let r=0; r<9; r++) {
            for (let c=0; c<9; c++) {
                result.push(puzzle[ blockRowStart + r ][ blockColumnStart + c ]);
            }
        }

        return result;
    }
}

let puzzle = [
    [ 0, 0, 0, 0, 6, 0, 7, 0, 0 ],
    [ 0, 5, 9, 0, 0, 0, 0, 0, 0 ],
    [ 0, 1, 0, 2, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 1, 0, 0, 0, 0, 0 ],
    [ 6, 0, 0, 5, 0, 0, 0, 0, 0 ],
    [ 3, 0, 0, 0, 0, 0, 4, 6, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 9, 1 ],
    [ 8, 0, 0, 7, 4, 0, 0, 0, 0 ]
];

const solver = new SudokuSolver();
console.log(solver.solve(puzzle));
