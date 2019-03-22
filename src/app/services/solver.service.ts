import {Injectable} from '@angular/core';

class DoX {
	public V: any;
	public L: any;
	public R: any;
	public U: any;
	public S: any;
	public D: any;
	public H: any;

	constructor(V, H?) {
		this.V = V;
		this.L = this;
		this.R = this;
		this.U = this;
		this.D = this;
		this.S = 1;
		this.H = H || this;
		H && (H.S += 1);
	}
}

@Injectable({
	providedIn: 'root'
})
export class SolverService {
	public solveSudoku(unsolved: number[][]): Promise<number[][]> {
		let res = '';

		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				res += unsolved[i][j];
			}
		}

		return new Promise((resolve) => {
			this.reduceGrid(res.split('0').join('.'), (r) => {
				const result = [];

				for (let i = 0; i < 9; i++) {
					const subarr = [];

					for (let j = 0; j < 9; j++) {
						subarr.push(Number(r[i * 9 + j]));
					}

					result.push(subarr);
				}

				resolve(result);
			});
		});
	}

	private addRight(e, n) {
		n.R = e.R;
		n.L = e;
		e.R.L = n;
		return e.R = n;
	}

	private addBelow(e, n) {
		n.D = e.D;
		n.U = e;
		e.D.U = n;
		return e.D = n;
	}

	private search(h, s, callback) {
		if (h.R === h) {
			const solution = new Array(81);
			s.map(c => {
				const a = c.V.split(':');
				return {n: a[0], v: a[1]};
			})
			.forEach(c => solution[c.n] = c.v);

			callback(solution);
		} else {
			const c = this.chooseColumn(h);
			this.cover(c);
			for (let r = c.D; r !== c; r = r.D) {
				s.push(r);
				for (let j = r.R; r !== j; j = j.R) {
					this.cover(j.H);
				}
				this.search(h, s, callback);
				r = s.pop();
				for (let j = r.R; j !== r; j = j.R) {
					this.uncover(j.H);
				}
			}
			this.uncover(c);
		}
	}

	private chooseColumn(h) {
		let s = Number.POSITIVE_INFINITY;
		let c = h;
		for (let j = h.R; j !== h; j = j.R) {
			if (j.S < s) {
				c = j;
				s = j.S;
			}
		}
		return c;
	}

	private cover(c) {
		c.L.R = c.R;
		c.R.L = c.L;
		for (let i = c.D; i !== c; i = i.D) {
			for (let j = i.R; j !== i; j = j.R) {
				j.U.D = j.D;
				j.D.U = j.U;
				j.H.S = j.H.S - 1;
			}
		}
	}

	private uncover(c) {
		for (let i = c.U; i !== c; i = i.U) {
			for (let j = i.L; i !== j; j = j.L) {
				j.H.S = j.H.S + 1;
				j.U.D = j;
				j.D.U = j;
			}
		}
		c.L.R = c;
		c.R.L = c;
	}

	private gridMeta(s) {
		const g = s.split('');
		const cellCount = g.length;
		const tokenCount = Math.sqrt(cellCount);
		const N = Math.sqrt(tokenCount);
		const g2D = g.map(e => isNaN(e * 1) ?
			new Array(tokenCount).fill(1).map((_, i) => i + 1) :
			[e * 1]);
		return [cellCount, N, tokenCount, g2D];
	}

	private indexesN(n) {
		return function (i) {
			const c = Math.floor(i / (n * n));
			i %= n * n;
			return [c, i, Math.floor(c / n) * n + Math.floor(i / n)];
		};
	}

	private reduceGrid(puzString, callback) {
		const [
			numCells,
			N,
			U,
			g2D
		] = this.gridMeta(puzString);

		const getIndex = this.indexesN(N);
		const headRow = new Array(4 * numCells)
			.fill('')
			.map((_, i) => new DoX(`H${i}`));

		const H = new DoX('ROOT');
		headRow.reduce((p, c) => this.addRight(p, c), H);

		for (let i = 0; i < numCells; i++) {
			const [ri, ci, bi] = getIndex(i);
			g2D[i].forEach(num => {
				const id = `${i}:${num}`;
				const candIdx = num - 1;
				const A = headRow[i];
				const B = headRow[numCells + candIdx + (ri * U)];
				const C = headRow[(numCells * 2) + candIdx + (ci * U)];
				const D = headRow[(numCells * 3) + candIdx + (bi * U)];
				const rcc = this.addBelow(A.U, new DoX(id, A));
				const rnc = this.addBelow(B.U, this.addRight(rcc, new DoX(id, B)));
				const cnc = this.addBelow(C.U, this.addRight(rnc, new DoX(id, C)));
				this.addBelow(D.U, this.addRight(cnc, new DoX(id, D)));
			});
		}
		this.search(H, [], (sol) => callback(sol));
	}
}
