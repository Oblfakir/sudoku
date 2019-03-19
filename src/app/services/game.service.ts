import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class GameService {
	private _selectedNumbers: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

	public get selectedNumbers(): Observable<number[]> {
		return this._selectedNumbers.asObservable();
	}

	public getSelectedNumbers(): number[] {
		return this._selectedNumbers.getValue();
	}

	public toggleNumber(n: number): void {
		const selectedNumbers = this._selectedNumbers.getValue().includes(n)
			? this._selectedNumbers.getValue().filter(x => x !== n)
			: [...this._selectedNumbers.getValue(), n];
		this._selectedNumbers.next(selectedNumbers);
	}

	public cancelNumbers(): void {
		this._selectedNumbers.next([]);
	}

	public invertNumbers(): void {
		const selectedNumbers = this.getSelectedNumbers();
		this._selectedNumbers.next([1, 2, 3, 4, 5, 6, 7, 8, 9].filter(x => !selectedNumbers.includes(x)));
	}
}
