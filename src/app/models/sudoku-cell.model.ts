export class SudokuCellModel {
	public X: number;
	public Y: number;
	public values: number[];
	public trueValue: number;
	public color: string;
	public isPredefined: boolean;

	constructor(X: number, Y: number, value: number, trueValue: number, isPredefined = false) {
		this.X = X;
		this.Y = Y;
		this.values = value ? [value] : [];
		this.trueValue = trueValue;
		this.color = '#FFFFFF';
		this.isPredefined = isPredefined;
	}
}
