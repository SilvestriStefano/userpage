export function getIndex(username,password) {
    let arr = JSON.parse(localStorage.getItem('users')) || [];
    let i=-1;
    arr.forEach((element,index) => {
        if ((element.usrNm === username || element.eMl === username) && element.pwd===password) {
            i=index
        }
    })
    return i
}


// let [arrayStorage,index] = logUser({usrNm:'',eMl:'',pwd:''})
// arrayStorage[index].pwd