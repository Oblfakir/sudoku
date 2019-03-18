import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
	selector: 'app-sudoku',
	templateUrl: './sudoku.component.html',
	styleUrls: ['./sudoku.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SudokuComponent {
	@Input() public sudoku: number[][];
}
