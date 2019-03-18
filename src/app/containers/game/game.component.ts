import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {GeneratorService} from '../../services/generator.service';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit {
	public sudoku: number[][];

	constructor(private generatorService: GeneratorService) {
	}

	ngOnInit() {
		this.generateSudoku();
	}

	public generateSudoku(): void {
		this.sudoku = this.generatorService.generateSudoku();
	}
}
