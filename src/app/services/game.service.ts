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
	private _gameStatus: BehaviorSubject<'' | 'SUCCESS' | 'FAILURE'> = new BehaviorSubject<'' | 'SUCCESS' | 'FAILURE'>('');
	private _lastSelectedNumber: BehaviorSubject<number> = new BehaviorSubject<number>(0);

	constructor() {
		this._currentGameState
			.pipe(
				filter(x => !!x)
			)
			.subscribe((gameState: SudokuCellModel[][]) => {
				this._gameStatus.next(this._checkGameStatus(gameState));
			});
	}

	public refresh(): void {
		this._currentGameState.next(null);
		this._undoHistory = [];
		this._redoHistory = [];
		this._selectedNumbers.next([]);
		this._gameStatus.next('');
		this._lastSelectedNumber.next(0);
	}

	public get lastSelectedNumber(): Observable<number> {
		return this._lastSelectedNumber.asObservable();
	}

	public get gameStatus(): Observable<'' | 'SUCCESS' | 'FAILURE'> {
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
		const currentNumbers = this._selectedNumbers.getValue();
		const isNumberActive = currentNumbers.includes(n);

		this._lastSelectedNumber.next(isNumberActive ? 0 : n);

		const selectedNumbers = isNumberActive
			? currentNumbers.filter(x => x !== n)
			: [...currentNumbers, n];
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

	private _checkGameStatus(gameState: SudokuCellModel[][]): '' | 'SUCCESS' | 'FAILURE' {
		let allCellsFilled = true;

		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				if (gameState[i][j].values.length !== 1) {
					allCellsFilled = false;
				}
			}

			if (!allCellsFilled) {
				break;
			}
		}

		if (!allCellsFilled) {
			return '';
		}

		let sudokuValid = true;

		if (allCellsFilled) {
			for (let i = 0; i < 9; i++) {
				for (let j = 0; j < 9; j++) {
					const values = gameState[i][j].values;

					if (values[0] !== gameState[i][j].trueValue) {
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

		return sudokuValid
			? 'SUCCESS'
			: 'FAILURE';
	}
}
