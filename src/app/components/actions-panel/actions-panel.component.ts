import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {GameService} from '../../services/game.service';
import {Observable} from 'rxjs';

@Component({
	selector: 'app-actions-panel',
	templateUrl: './actions-panel.component.html',
	styleUrls: ['./actions-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionsPanelComponent implements OnInit {
	public numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	constructor(private gameService: GameService) {}

	public get selectedNumbers(): Observable<number[]> {
		return this.gameService.selectedNumbers;
	}

	public get isUndoAvailable(): boolean {
		return this.gameService.isUndoAvailable;
	}

	public get isRedoAvailable(): boolean {
		return this.gameService.isRedoAvailable;
	}

	public ngOnInit(): void {
	}

	public redoClickHandler(): void {
		this.gameService.redo();
	}

	public undoClickHandler(): void {
		this.gameService.undo();
	}

	public numberClickHandler(n: number): void {
		this.gameService.toggleNumber(n);
	}

	public cancelClickHandler(): void {
		this.gameService.cancelNumbers();
	}

	public invertClickHandler(): void {
		this.gameService.invertNumbers();
	}
}
