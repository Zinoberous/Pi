// // http://ajennings.net/blog/a-million-digits-of-pi-in-9-lines-of-javascript.html
// export function getPi() {
// 	let i = 1n;
// 	let x = 3n * (10n ** 120n); // 120 = 100 Stellen, 1020 = 1000 Stellen, 10020 = 10.000 Stellen, ...
// 	let pi = x;
// 	while (x > 0) {
// 		x = x * i / ((i + 1n) * 4n);
// 		pi += x / (i + 2n);
// 		i += 2n;
// 	}
// 	return pi / (10n ** 20n);
// }