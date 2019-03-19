import {Component, OnInit} from '@angular/core';
import {SudokuService} from '../../services';
import {Difficulty} from '../../constants/difficulty';
import {SudokuCellModel} from '../../models/sudoku-cell.model';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
	public sudoku: SudokuCellModel[][];

	constructor(private sudokuService: SudokuService) {
	}

	ngOnInit() {
		this.generateSudoku();
	}

	public generateSudoku(): void {
		this.sudokuService.getNewSudoku(Difficulty.Easy).then((result) => {
			if (result) {
				const sudoku = [];
				const { solved, unsolved } = result;

				for (let i = 0; i < 9; i++) {
					const subarr = [];

					for (let j = 0; j < 9; j++) {
						subarr.push(new SudokuCellModel(j, i, unsolved[i][j], solved[i][j], unsolved[i][j] === solved[i][j]));
					}

					sudoku.push(subarr);
				}

				this.sudoku = sudoku;
			}
		});
	}
}
