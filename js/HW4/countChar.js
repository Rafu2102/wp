function countChar(str) {
    let charCount = {};

    for (let char of str) {
        if (charCount[char]) {
            charCount[char]++;  //重複的話遞增
        } else {
            charCount[char] = 1;
        }
    }

    return charCount;
}

let str = "sukisukisukidaisukidesuyooniisann";
let charCount = countChar(str);
console.log(charCount);