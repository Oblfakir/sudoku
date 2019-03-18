import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SolverService {

}

// class DoX {
//
// 	constructor(V, H) {
// 		this.V = V;
// 		this.L = this;
// 		this.R = this;
// 		this.U = this;
// 		this.D = this;
// 		this.S = 1;
// 		this.H = H || this;
// 		H && (H.S += 1);
// 	}
// }
//
// const addRight = (e, n) => {
// 	n.R = e.R;
// 	n.L = e;
// 	e.R.L = n;
// 	return e.R = n;
// };
//
// const addBelow = (e, n) => {
// 	n.D = e.D;
// 	n.U = e;
// 	e.D.U = n;
// 	return e.D = n;
// };
//
// const search = function(h, s) {
// 	if (h.R == h) {
// 		printSol(s);
// 	} else {
// 		let c = chooseColumn(h);
// 		cover(c);
// 		for (let r = c.D; r != c; r = r.D) {
// 			s.push(r);
// 			for (let j = r.R; r !=j; j = j.R) {
// 				cover(j.H);
// 			}
// 			search(h, s);
// 			r = s.pop();
// 			for (let j = r.R; j != r; j = j.R) {
// 				uncover(j.H);
// 			}
// 		}
// 		uncover(c);
// 	}
// };
//
// const chooseColumn = h => {
// 	let s = Number.POSITIVE_INFINITY;
// 	let c = h;
// 	for(let j = h.R; j != h; j = j.R) {
// 		if (j.S < s) {
// 			c = j;
// 			s = j.S;
// 		}
// 	}
// 	return c;
// };
//
// const cover = c => {
// 	c.L.R = c.R;
// 	c.R.L = c.L;
// 	for (let i = c.D; i != c; i = i.D) {
// 		for (let j = i.R; j != i; j = j.R) {
// 			j.U.D = j.D;
// 			j.D.U = j.U;
// 			j.H.S = j.H.S - 1;
// 		}
// 	}
// };
//
// const uncover = c => {
// 	for (let i = c.U; i != c; i = i.U) {
// 		for (let j = i.L; i != j; j = j.L) {
// 			j.H.S = j.H.S + 1;
// 			j.U.D = j;
// 			j.D.U = j;
// 		}
// 	}
// 	c.L.R = c;
// 	c.R.L = c;
// };
//
// const printGrid = function(a) {
//
// 	const getChar = c => {
// 		let r = Number(c);
// 		if (isNaN(r)) { return c }
//
// 		let o = 48;
// 		if (r > 9 && r < 36) { o = 55 }
// 		if (r >= 36) { o = 61 }
// 		return String.fromCharCode(r + o)
// 	};
//
// 	a = 'string' == typeof a ? a.split('') : a;
//
// 	let U = Math.sqrt(a.length);
// 	let N = Math.sqrt(U);
// 	let line = new Array(N).fill('+').reduce((p, c) => {
// 		p.push(... Array.from(new Array(1 + N*2).fill('-')));
// 		p.push(c);
// 		return p;
// 	}, ['\n+']).join('') + '\n';
//
// 	a = a.reduce(function(p, c, i) {
// 		let d = i && !(i % U), G = i && !(i % N);
// 		i = !(i % (U * N));
// 		d && !i && (p += '|\n| ');
// 		d && i && (p += '|');
// 		i && (p = '' + p + line + '| ');
// 		return '' + p + (G && !d ? '| ' : '') + getChar(c) + ' ';
// 	}, '') + '|' + line;
// 	console.log(a);
//
// };
//
// const printSol = a => {
// 	printGrid(a.reduce((p, c) => {
// 		let [i, v] = c.V.split(':');
// 		p[i * 1] = v;
// 		return p;
// 	}, new Array(a.length).fill('.')));
// };
//
// const gridMeta = s => {
// 	const g = s.split('');
// 	const cellCount = g.length;
// 	const tokenCount = Math.sqrt(cellCount);
// 	const N = Math.sqrt(tokenCount);
// 	const g2D = g.map(e => isNaN(e * 1) ?
// 		new Array(tokenCount).fill(1).map((_, i) => i + 1) :
// 		[e * 1]);
// 	return [cellCount, N, tokenCount, g2D];
// };
//
// const indexesN = n => i => {
// 	let c = Math.floor(i / (n * n));
// 	i %= n * n;
// 	return [c, i, Math.floor(c / n) * n + Math.floor(i / n)];
// };
//
// const reduceGrid = puzString => {
//
// 	printGrid(puzString);
// 	console.log(puzString);
//
// 	const [
// 		numCells,
// 		N,
// 		U,
// 		g2D
// 	] = gridMeta(puzString);
//
// 	const getIndex = indexesN(N);
// 	const headRow = new Array(4 * numCells)
// 		.fill('')
// 		.map((_, i) => new DoX(`H${i}`));
//
// 	let H = new DoX('ROOT');
// 	headRow.reduce((p, c) => addRight(p, c), H);
//
// 	for (let i = 0; i < numCells; i++) {
// 		const [ri, ci, bi] = getIndex(i);
// 		g2D[i].forEach(num => {
// 			let id = `${i}:${num}`;
// 			let candIdx = num - 1;
//
// 			const A = headRow[i];
// 			const B = headRow[numCells + candIdx + (ri * U)];
// 			const C = headRow[(numCells * 2) + candIdx + (ci * U)];
// 			const D = headRow[(numCells * 3) + candIdx + (bi * U)];
//
// 			let rcc = addBelow(A.U, new DoX(id, A));
//
// 			let rnc = addBelow(B.U, addRight(rcc, new DoX(id, B)));
//
// 			let cnc = addBelow(C.U, addRight(rnc, new DoX(id, C)));
//
// 			addBelow(D.U, addRight(cnc, new DoX(id, D)));
// 		});
// 	}
// 	search(H, []);
// };
//
// //   [
// //     '819..5.....2...75..371.4.6.4..59.1..7..3.8..2..3.62..7.5.7.921..64...9.....2..438',
// //     '53..247....2...8..1..7.39.2..8.72.49.2.98..7.79.....8.....3.5.696..1.3...5.69..1.',
// //     '..3.2.6..9..3.5..1..18.64....81.29..7.......8..67.82....26.95..8..2.3..9..5.1.3..',
// //     '394..267....3..4..5..69..2..45...9..6.......7..7...58..1..67..8..9..8....264..735',
// //     '97.3...6..6.75.........8.5.......67.....3.....539..2..7...25.....2.1...8.4...73..',
// //     '4......6.5...8.9..3....1....2.7....1.9.....4.8....3.5....2....7..6.5...8.1......6',
// //     '85...24..72......9..4.........1.7..23.5...9...4...........8..7..17..........36.4.',
// //     '..1..5.7.92.6.......8...6...9..2.4.1.........3.4.8..9...7...3.......7.69.1.8..7..',
// //     '.9...4..7.....79..8........4.58.....3.......2.....97.6........4..35.....2..6...8.',
// //     '12.3....435....1....4........54..2..6...7.........8.9...31..5.......9.7.....6...8',
// //     '9..2..5...4..6..3...3.....6...9..2......5..8...7..4..37.....1...5..2..4...1..6..9',
// //     '1....7.9..3..2...8..96..5....53..9...1..8...26....4...3......1..4......7..7...3..',
// //     '12.4..3..3...1..5...6...1..7...9.....4.6.3.....3..2...5...8.7....7.....5.......98',
// //     '..............3.85..1.2.......5.7.....4...1...9.......5......73..2.1........4...9',
// //     '.......39.....1..5..3.5.8....8.9...6.7...2...1..4.......9.8..5..2....6..4..7.....',
// //     '....839..1......3...4....7..42.3....6.......4....7..1..2........8...92.....25...6',
// //     '..3......4...8..36..8...1...4..6..73...9..........2..5..4.7..686........7..6..5..'
// //   ].forEach(reduceGrid);
//
// reduceGrid('819..5.....2...75..371.4.6.4..59.1..7..3.8..2..3.62..7.5.7.921..64...9.....2..438');