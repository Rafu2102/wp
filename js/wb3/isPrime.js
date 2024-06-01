function isPrime(n) {
    for(let i=2 ; i<n ; i++){
        if(n%i == 0) return false
    }    
    return true    
}

console.log("isPrime(7)=",isPrime(7))
console.log("isPrime(9)=",isPrime(9))
