function vetorAdd(a,b){
    let n =[]
    for(let i=0 ; i<a.length ; i++){    //矩陣從0開始!!!
        n.push(a[i]+b[i]);
    }
    return n
}
let a=[1,3]
let b=[2,4]
console.log(vetorAdd(a,b))