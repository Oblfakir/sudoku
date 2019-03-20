import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {SudokuService} from '../../services';
import {Difficulty} from '../../constants/difficulty';
import {SudokuCellModel} from '../../models/sudoku-cell.model';
import {GameService} from '../../services/game.service';
import {Observable, Subscription} from 'rxjs';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit, OnDestroy {
	private _subs: Subscription[] = [];

	public get gameState(): Observable<SudokuCellModel[][]> {
		return this.gameService.currentGameState;
	}

	constructor(private sudokuService: SudokuService,
				private gameService: GameService) {
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

				this.gameService.setNewGameState(sudoku);
			}
		});
	}

	private _subscribeToGameStatus(): void {
		const sub = this.gameService.gameStatus
			.subscribe((status: string) => {
				console.log(status);
			});

		this._subs.push(sub);
	}

	public ngOnDestroy(): void {
		this._subs.forEach(sub => sub.unsubscribe());
	}
}
