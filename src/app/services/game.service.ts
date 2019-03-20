import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {SudokuCellModel} from '../models/sudoku-cell.model';
import {filter} from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class GameService {
	private _currentGameState: BehaviorSubject<SudokuCellModel[][]> = new BehaviorSubject<SudokuCellModel[][]>(null);
	private _undoHistory: SudokuCellModel[][][] = [];
	private _redoHistory: SudokuCellModel[][][] = [];
	private _selectedNumbers: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
	private _gameStatus: BehaviorSubject<string> = new BehaviorSubject<string>('');

	constructor() {
		this._currentGameState
			.pipe(
				filter(x => !!x)
			)
			.subscribe((gameState: SudokuCellModel[][]) => {
			const status = this._checkGameStatus(gameState);

			if (status) {
				this._gameStatus.next(status);
			}
		});
	}

	public get gameStatus(): Observable<string> {
		return this._gameStatus.asObservable();
	}

	public get currentGameState(): Observable<SudokuCellModel[][]> {
		return this._currentGameState.asObservable();
	}

	public getCurrentGameState(): SudokuCellModel[][] {
		return this._currentGameState.getValue();
	}

	public get isUndoAvailable(): boolean {
		return this._undoHistory.length > 1;
	}

	public get isRedoAvailable(): boolean {
		return this._redoHistory.length > 0;
	}

	public setNewGameState(state: SudokuCellModel[][]): void {
		const newState = JSON.parse(JSON.stringify(state));
		this._undoHistory.push(this._getCurrentGameStateCopy());
		this._currentGameState.next(newState);
	}

	public undo(): void {
		const state = this._undoHistory.pop();
		this._redoHistory.push(this._getCurrentGameStateCopy());
		this._currentGameState.next(state);
	}

	public redo(): void {
		const state = this._redoHistory.pop();
		this._undoHistory.push(this._getCurrentGameStateCopy());
		this._currentGameState.next(state);
	}

	public get selectedNumbers(): Observable<number[]> {
		return this._selectedNumbers.asObservable();
	}

	public getSelectedNumbers(): number[] {
		return this._selectedNumbers.getValue();
	}

	public toggleNumber(n: number): void {
		const selectedNumbers = this._selectedNumbers.getValue().includes(n)
			? this._selectedNumbers.getValue().filter(x => x !== n)
			: [...this._selectedNumbers.getValue(), n];
		this._selectedNumbers.next(selectedNumbers);
	}

	public cancelNumbers(): void {
		this._selectedNumbers.next([]);
	}

	public invertNumbers(): void {
		const selectedNumbers = this.getSelectedNumbers();
		this._selectedNumbers.next([1, 2, 3, 4, 5, 6, 7, 8, 9].filter(x => !selectedNumbers.includes(x)));
	}

	private _getCurrentGameStateCopy(): any {
		return JSON.parse(JSON.stringify(this._currentGameState.getValue()));
	}

	private _checkGameStatus(gameState: SudokuCellModel[][]): string {
		let allCellsFilled = true;

		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				if (gameState[i][i].values.length !== 1) {
					allCellsFilled = false;
				}

				if (!allCellsFilled) {
					break;
				}
			}

			if (!allCellsFilled) {
				break;
			}
		}

		let sudokuValid = true;

		if (allCellsFilled) {
			for (let i = 0; i < 9; i++) {
				for (let j = 0; j < 9; j++) {
					const values = gameState[i][i].values;

					if (values[0] !== gameState[i][i].trueValue) {
						sudokuValid = false;
					}

					if (!sudokuValid) {
						break;
					}
				}

				if (!sudokuValid) {
					break;
				}
			}
		}

		return allCellsFilled
			? sudokuValid
				? 'SUCCESS'
				: 'FAILURE'
			: '';
	}
}
