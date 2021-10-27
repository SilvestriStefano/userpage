export function getIndex(username,password) {
    let arr = JSON.parse(localStorage.getItem('users')) || [];
    let i=-1;
    arr.forEach((element,index) => {
        if ((element.userName === username || element.email === username) && element.password===password) {
            i=index
        }
    })
    return i
}