import {Component} from '@angular/core';

@Component({
	selector: 'app-actions-panel',
	templateUrl: './actions-panel.component.html',
	styleUrls: ['./actions-panel.component.scss']
})
export class ActionsPanelComponent {
	public numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	public forwardClickHandler(): void {

	}

	public backwardClickHandler(): void {

	}

	public numberClickHandler(n: number): void {

	}

	public cancelClickHandler(): void {

	}
}
