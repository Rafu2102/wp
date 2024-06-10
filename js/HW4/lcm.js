// 計算兩個數字的最大公因數（GCD）
function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// 計算兩個數字的最小公倍數（LCM）
function lcm(a, b) {
    return Math.abs(a * b) / gcd(a, b);
}

// 示例
console.log(lcm(12, 15)); // 輸出 60
console.log(lcm(7, 5));   // 輸出 35
console.log(lcm(21, 6));  // 輸出 42
console.log(lcm(9, 28));  // 輸出 252

