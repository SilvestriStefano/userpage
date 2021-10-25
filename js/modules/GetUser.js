export function getUser(obj) {
    let arr = JSON.parse(localStorage.getItem('users')) || [];
    let i=-1;
    arr.forEach((element,index) => {
        if ((element.usrNm === obj.usrNm || element.eMl === obj.eMl) && element.pwd===obj.pwd) {
            i=index
        }
    })
    return i
}


// let [arrayStorage,index] = logUser({usrNm:'',eMl:'',pwd:''})
// arrayStorage[index].pwd