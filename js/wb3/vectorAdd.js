function vetorAdd(a,b){
    let n =[]
    for(let i=0 ; i<a.length ; i++){
        n.push(a[i]+b[i]);
    }
    return n
}
let a=[1,3,5]
let b=[2,4,6]
console.log(vetorAdd(a,b))