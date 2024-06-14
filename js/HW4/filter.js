function filter(a, f) {
    let result = [];
    for (let i = 0; i < a.length; i++) {
        if (f(a[i])) {
            result.push(a[i]);
        }
    }
    return result;
}

// 示例
console.log(filter([1, 2, 3, 4], function(x) { return x % 2 === 1; })); // 输出 [1, 3]
console.log(filter([10, 15, 20, 25], function(x) { return x > 15; })); // 输出 [20, 25]
