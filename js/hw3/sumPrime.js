//質數
function isPrime(n) {
    for(let i=2 ; i<n ; i++){
        if(n%i == 0) return false
    }    
    return true    
}
//質數總和
function sumPrime(n){
    let j =0
    for(let i=2 ; i<n ; i++){
        if(isPrime(i)){
            j+=i;
        }
    }
    return j
}

let n=100
console.log(sumPrime(n))