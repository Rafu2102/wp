var w2i = {
    Sunday:0,
    Monday:1, 
    Tuesday:2, 
    Wednesday:3, 
    Thursday:4, 
    Friday:5, 
    Saturday:6, 
    
}

function weekToIndex(week) {
    return w2i[week]
}

let week = Deno.args[0]
console.log(week, '=', weekToIndex(week))
// 要先deno run weekDay.js