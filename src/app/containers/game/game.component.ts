import {Component, OnInit} from '@angular/core';
import {SudokuService} from '../../services';
import {Difficulty} from '../../constants/difficulty';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
	public sudoku: number[][];
	private _solvedSudoku: number[][];

	constructor(private sudokuService: SudokuService) {
	}

	ngOnInit() {
		this.generateSudoku();
	}

	public generateSudoku(): void {
		this.sudokuService.getNewSudoku(Difficulty.Easy).then((result) => {
			if (result) {
				this.sudoku = result.unsolved;
				this._solvedSudoku = result.solved;
			}
		});
	}
}
