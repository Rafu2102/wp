function daysInYear(n){
    if ((n % 4 == 0 && n % 100 !== 0)|| n % 400 === 0 ){
        return 366; 
    } else {
        return 365; 
    }
}   
console.log('1991年有',(daysInYear(1991)),'天'); 
console.log('2004年有',(daysInYear(2004)),'天'); 
console.log('1900年有',(daysInYear(1900)),'天'); 
console.log('2000年有',(daysInYear(2000)),'天'); 