import {Component, Input} from '@angular/core';
import {SudokuCellModel} from '../../models/sudoku-cell.model';
import {GameService} from '../../services/game.service';

@Component({
	selector: 'app-sudoku',
	templateUrl: './sudoku.component.html',
	styleUrls: ['./sudoku.component.scss']
})
export class SudokuComponent {
	@Input() public sudoku: number[][];

	constructor(private gameService: GameService) {}

	public cellClickedHandler(cell: SudokuCellModel): void {
		if (!cell.isPredefined) {
			const selectedNumbers = this.gameService.getSelectedNumbers();
			if (cell.values.find(x => selectedNumbers.includes(x))) {
				cell.values = cell.values.filter(x => !selectedNumbers.includes(x));
			} else {
				cell.values = [...selectedNumbers, ...cell.values];
			}
		}
	}
}
