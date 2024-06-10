function gradient(f, p) {
    const h = 1e-5;  // 微小的增量值
    const n = p.length;
    let grad = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        let p1 = [...p];
        let p2 = [...p];
        p1[i] += h;
        p2[i] -= h;
        grad[i] = (f(...p1) - f(...p2)) / (2 * h);
    }

    return grad;
}

// 示例函數
function f(x, y) {
    return x * x + y * y;
}

// 計算 f 在點 (3, 4) 處的梯度
console.log(gradient(f, [3, 4]));  // 輸出接近 [6, 8]
