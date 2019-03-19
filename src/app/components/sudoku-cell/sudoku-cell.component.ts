import {Component, Input} from '@angular/core';
import {SudokuCellModel} from '../../models/sudoku-cell.model';

@Component({
	selector: 'app-sudoku-cell',
	templateUrl: './sudoku-cell.component.html',
	styleUrls: ['./sudoku-cell.component.scss']
})
export class SudokuCellComponent {
	@Input() public sudokuCell: SudokuCellModel;
}
