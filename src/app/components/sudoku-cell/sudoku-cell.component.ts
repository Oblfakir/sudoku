import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SudokuCellModel} from '../../models/sudoku-cell.model';

@Component({
	selector: 'app-sudoku-cell',
	templateUrl: './sudoku-cell.component.html',
	styleUrls: ['./sudoku-cell.component.scss']
})
export class SudokuCellComponent {
	@Input() public sudokuCell: SudokuCellModel;
	@Output() public clicked: EventEmitter<SudokuCellModel> = new EventEmitter<SudokuCellModel>();

	public cellClickHandler(): void {
		this.clicked.emit(this.sudokuCell);
	}
}
