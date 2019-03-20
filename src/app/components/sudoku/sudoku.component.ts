import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {SudokuCellModel} from '../../models/sudoku-cell.model';
import {GameService} from '../../services/game.service';

@Component({
	selector: 'app-sudoku',
	templateUrl: './sudoku.component.html',
	styleUrls: ['./sudoku.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SudokuComponent {
	@Input() public sudoku: number[][];

	constructor(private gameService: GameService) {}

	public cellClickedHandler(cell: SudokuCellModel): void {
		const newState = JSON.parse(JSON.stringify(this.gameService.getCurrentGameState()));
		const newCell = newState.reduce((r, i) => [...r, ...i], []).find(x => x.X === cell.X && x.Y === cell.Y);

		if (!newCell.isPredefined) {
			const selectedNumbers = this.gameService.getSelectedNumbers();

			newCell.values = newCell.values.find(x => selectedNumbers.includes(x))
				? newCell.values.filter(x => !selectedNumbers.includes(x))
				: [...selectedNumbers, ...newCell.values];
		}

		this.gameService.setNewGameState(newState);
	}
}
