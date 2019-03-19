import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {GeneratorService} from '../../services/generator.service';
import {SolverService} from '../../services/solver.service';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit {
	public sudoku: number[][];

	constructor(private generatorService: GeneratorService,
				private solverService: SolverService) {
	}

	ngOnInit() {
		this.generateSudoku();
	}

	public generateSudoku(): void {
		this.sudoku = this.generatorService.generateSudoku();
		const sudoku = '819..5.....2...75..371.4.6.4..59.1..7..3.8..2..3.62..7.5.7.921..64...9.....2..438'
			.split('.').join('0');
		const result = [];

		for (let i = 0; i < 9; i++) {
			const subarr = [];

			for (let j = 0; j < 9; j++) {
				subarr.push(sudoku[i * 9 + j]);
			}

			result.push(subarr);
		}

		this.solverService.solveSudoku(result).then(console.log);
	}
}
