import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SudokuService} from '../../services';
import {SudokuCellModel} from '../../models/sudoku-cell.model';
import {GameService} from '../../services/game.service';
import {Observable} from 'rxjs';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit {
	constructor(private sudokuService: SudokuService,
				private gameService: GameService) {
	}

	ngOnInit() {
		setTimeout(() => {
			this._generateSudoku();
		});
	}

	public get gameStatus(): Observable<'' | 'SUCCESS' | 'FAILURE'> {
		return this.gameService.gameStatus;
	}

	public get gameState(): Observable<SudokuCellModel[][]> {
		return this.gameService.currentGameState;
	}

	public undoClickHandler(): void {
		this.gameService.undo();
	}

	public refreshClickHandler(): void {
		this.gameService.refresh();
		this._generateSudoku();
	}

	private _generateSudoku(): void {
		this.sudokuService.getNewSudoku(50).then((result) => {
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

				this.gameService.setNewGameState(sudoku);
			}
		});
	}
}
