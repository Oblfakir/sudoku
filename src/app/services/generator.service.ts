import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class GeneratorService {
	public generateSudoku(): number[][] {
		let result = this._getInitialField();

		for (let i = 0; i < 300; i ++) {
			const number = Math.floor(Math.random() * 5);

			switch (number) {
				case 0: {
					result = this._transpose(result);
					break;
				}
				case 1: {
					result = this._swapRowsInBlock(result);
					break;
				}
				case 2: {
					result = this._swapColumnsInBlock(result);
					break;
				}
				case 3: {
					result = this._swapColumns(result);
					break;
				}
				case 4: {
					result = this._swapRows(result);
					break;
				}
			}
		}

		return result;
	}

	private _transpose(field: number[][]): number[][] {
		const result = this._copyField(field);

		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				result[i][j] = field[j][i];
			}
		}

		return result;
	}

	private _swapRowsInBlock(field: number[][]): number[][] {
		const result = this._copyField(field);
		const numbers = this._get3DifferentRandomNumbers();
		const blockNumber = this._get3DifferentRandomNumbers()[0];
		const firstRowNumber = blockNumber * 3 + numbers[1];
		const secondRowNumber = blockNumber * 3 + numbers[2];

		for (let i = 0; i < 9; i++) {
			const n = result[i][firstRowNumber];
			result[i][firstRowNumber] = result[i][secondRowNumber];
			result[i][secondRowNumber] = n;
		}

		return result;
	}

	private _swapColumnsInBlock(field: number[][]): number[][] {
		const result = this._copyField(field);
		const numbers = this._get3DifferentRandomNumbers();
		const blockNumber = this._get3DifferentRandomNumbers()[0];
		const firstColumnNumber = blockNumber * 3 + numbers[1];
		const secondColumnNumber = blockNumber * 3 + numbers[2];

		for (let i = 0; i < 9; i++) {
			const n = result[firstColumnNumber][i];
			result[firstColumnNumber][i] = result[secondColumnNumber][i];
			result[secondColumnNumber][i] = n;
		}

		return result;
	}

	private _swapColumns(field: number[][]): number[][] {
		const result = this._copyField(field);
		const numbers = this._get3DifferentRandomNumbers();
		const firstColumnNumber = numbers[0];
		const secondColumnNumber = numbers[1];

		for (let i = 0; i < 9; i++) {
			const n1 = result[i][firstColumnNumber * 3];
			const n2 = result[i][firstColumnNumber * 3 + 1];
			const n3 = result[i][firstColumnNumber * 3 + 2];
			result[i][firstColumnNumber * 3] = result[i][secondColumnNumber * 3];
			result[i][firstColumnNumber * 3 + 1] = result[i][secondColumnNumber * 3 + 1];
			result[i][firstColumnNumber * 3 + 2] = result[i][secondColumnNumber * 3 + 2];
			result[i][secondColumnNumber * 3] = n1;
			result[i][secondColumnNumber * 3 + 1] = n2;
			result[i][secondColumnNumber * 3 + 2] = n3;
		}

		return result;
	}

	private _swapRows(field: number[][]): number[][] {
		const result = this._copyField(field);
		const numbers = this._get3DifferentRandomNumbers();
		const firstRowNumber = numbers[0];
		const secondRowNumber = numbers[1];

		for (let i = 0; i < 9; i++) {
			const n1 = result[firstRowNumber * 3][i];
			const n2 = result[firstRowNumber * 3 + 1][i];
			const n3 = result[firstRowNumber * 3 + 2][i];
			result[firstRowNumber * 3][i] = result[secondRowNumber * 3][i];
			result[firstRowNumber * 3 + 1][i] = result[secondRowNumber * 3 + 1][i];
			result[firstRowNumber * 3 + 2][i] = result[secondRowNumber * 3 + 2][i];
			result[secondRowNumber * 3][i] = n1;
			result[secondRowNumber * 3 + 1][i] = n2;
			result[secondRowNumber * 3 + 2][i] = n3;
		}

		return result;
	}

	private _copyField(field: number[][]): number[][] {
		const result = [];

		for (let i = 0; i < 9; i++) {
			const subarr = [];

			for (let j = 0; j < 9; j++) {
				subarr.push(field[i][j]);
			}

			result.push(subarr);
		}

		return result;
	}

	private _get3DifferentRandomNumbers(): number[] {
		const result = [Math.floor(Math.random() * 3), Math.floor(Math.random() * 3), Math.floor(Math.random() * 3)];

		return result[0] === result[1] || result[0] === result[2] || result[1] === result[2]
			? this._get3DifferentRandomNumbers()
			: result;
	}

	private _getInitialField(): number[][] {
		return [
			[1, 2, 3, 4, 5, 6, 7, 8, 9],
			[4, 5, 6, 7, 8, 9, 1, 2, 3],
			[7, 8, 9, 1, 2, 3, 4, 5, 6],
			[2, 3, 4, 5, 6, 7, 8, 9, 1],
			[5, 6, 7, 8, 9, 1, 2, 3, 4],
			[8, 9, 1, 2, 3, 4, 5, 6, 7],
			[3, 4, 5, 6, 7, 8, 9, 1, 2],
			[6, 7, 8, 9, 1, 2, 3, 4, 5],
			[9, 1, 2, 3, 4, 5, 6, 7, 8]
		];
	}
}
