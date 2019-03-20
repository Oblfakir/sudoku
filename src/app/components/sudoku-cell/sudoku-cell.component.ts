import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {SudokuCellModel} from '../../models/sudoku-cell.model';
import {GameService} from '../../services/game.service';
import {Observable} from 'rxjs';

@Component({
	selector: 'app-sudoku-cell',
	templateUrl: './sudoku-cell.component.html',
	styleUrls: ['./sudoku-cell.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SudokuCellComponent {
	@Input() public sudokuCell: SudokuCellModel;
	@Output() public clicked: EventEmitter<SudokuCellModel> = new EventEmitter<SudokuCellModel>();

	constructor(private gameService: GameService) {}

	public get lastSelectedNumber(): Observable<number> {
		return this.gameService.lastSelectedNumber;
	}

	public cellClickHandler(): void {
		this.clicked.emit(this.sudokuCell);
	}
}
