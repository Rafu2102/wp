function matrixMultiply(a, b) {
    let n = [];
    for (let i = 0; i < a.length; i++) {
        n[i] = [];
        for (let j = 0; j < b[0].length; j++) {
            let l = 0;
            for (let k = 0; k < a[i].length; k++) {
                l += a[i][k] * b[k][j];
            }
            n[i][j] = l;
        }
    }
    return n;
}

let a1 = [[1, 3], [5, 7]];
let b1 = [[2, 4], [6, 8]];
console.log(matrixMultiply(a1, b1));