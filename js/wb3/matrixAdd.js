function matrixAdd(a, b) {
    let n = [];
    for (let i = 0; i < a.length; i++) {            //矩陣從0開始!!!
        let k = [];
        for (let j = 0; j < a[0].length; j++) {     
            k.push(a[i][j] + b[i][j]);
        }
        n.push(k);
    }
    return n;
}

let a1 = [[1, 3], [5, 7]];
let b1 = [[2, 4], [6, 8]];
console.log(matrixAdd(a1, b1));