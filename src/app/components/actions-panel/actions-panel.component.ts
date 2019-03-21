import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {GameService} from '../../services/game.service';
import {Observable} from 'rxjs';
import {filter, map, startWith} from 'rxjs/operators';
import {SudokuCellModel} from '../../models/sudoku-cell.model';

@Component({
	selector: 'app-actions-panel',
	templateUrl: './actions-panel.component.html',
	styleUrls: ['./actions-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionsPanelComponent implements OnInit {
	public numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	constructor(private gameService: GameService) {
	}

	public get selectedNumbers(): Observable<number[]> {
		return this.gameService.selectedNumbers;
	}

	public get filledNumbers(): Observable<number[]> {
		return this.gameService.currentGameState
			.pipe(
				map((gameStatus: SudokuCellModel[][]) => {
					if (!gameStatus) {
						return [];
					}

					const numbers = {};

					for (let i = 0; i < 9; i++) {
						for (let j = 0; j < 9; j++) {
							if (gameStatus[i][j].values.length === 1) {
								numbers[gameStatus[i][j].values[0]] = numbers[gameStatus[i][j].values[0]]
									? numbers[gameStatus[i][j].values[0]] + 1
									: 1;
							}
						}
					}

					return Object.keys(numbers)
						.filter(number => numbers[number] === 9)
						.map(x => Number(x));
				})
			);
	}

	public get isUndoAvailable(): boolean {
		return this.gameService.isUndoAvailable;
	}

	public get isRedoAvailable(): boolean {
		return this.gameService.isRedoAvailable;
	}

	public ngOnInit(): void {
	}

	public redoClickHandler(): void {
		this.gameService.redo();
	}

	public undoClickHandler(): void {
		this.gameService.undo();
	}

	public numberClickHandler(n: number): void {
		this.gameService.toggleNumber(n);
	}

	public cancelClickHandler(): void {
		this.gameService.cancelNumbers();
	}

	public invertClickHandler(): void {
		this.gameService.invertNumbers();
	}
}
