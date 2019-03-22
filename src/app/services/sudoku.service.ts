import {Injectable} from '@angular/core';
import {GeneratorService} from './generator.service';
import {SolverService} from './solver.service';

@Injectable({
	providedIn: 'root'
})
export class SudokuService {
	constructor(private generatorService: GeneratorService,
				private solverService: SolverService) {
	}

	public getNewSudoku(difficulty: number): Promise<{ solved: number[][], unsolved: number[][] } | false> {
		return new Promise((resolve) => {
			const solved = this.generatorService.generateSudoku();
			const flatSudoku = this._fieldToArray(solved);
			this._getDifferentRandomNumbers(difficulty).forEach(n => flatSudoku[n] = 0);
			const unsolved = this._arrayToField(flatSudoku);

			this.solverService.solveSudoku(unsolved)
				.then((result) => {
					return this._checkFieldsEquality(solved, result)
						? { solved, unsolved }
						: this.getNewSudoku(difficulty);
				})
				.then((result) => resolve(result));
		});
	}

	private _getDifferentRandomNumbers(count: number): number[] {
		const result = [];

		while (result.length < count) {
			const nextNumber = Math.floor(Math.random() * 82);

			if (!result.includes(nextNumber)) {
				result.push(nextNumber);
			}
		}

		return result;
	}

	private _fieldToArray(field: number[][]): number[] {
		const result = [];

		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				result.push(field[i][j]);
			}
		}

		return result;
	}

	private _arrayToField(array: number[]): number[][] {
		const result = [];

		for (let i = 0; i < 9; i++) {
			const subarr = [];

			for (let j = 0; j < 9; j++) {
				subarr.push(array[i * 9 + j]);
			}

			result.push(subarr);
		}

		return result;
	}

	private _checkFieldsEquality(field1: number[][], field2: number[][]): boolean {
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				if (field1[i][j] !== field2[i][j]) {
					return false;
				}
			}
		}

		return true;
	}
}
