export class User {
    constructor(userObj) {
        this.name = userObj.name;
        this.lastName = userObj.lastName;
        this.userName = userObj.userName;
        this.email = userObj.email;
        this.password = userObj.password;
        this.dob = userObj.dob;
        this.phone = userObj.phone;
        this.events= userObj.events;
    };
    set updateLstNm(lastName) {
        this.lastName = lastName;
    };
    set updateDOB(dob) {
        this.dob = dob;
    };
    set updatePhn(phone) {
        this.phone = phone;
    };
    save() {
        let arr = JSON.parse(localStorage.getItem('users')) || [];
        arr.push(this);
        localStorage.setItem('users', JSON.stringify(arr));
    };
    
    update(index) {
        let arr = JSON.parse(localStorage.getItem('users'));
        arr[index] = this;
        localStorage.setItem('users', JSON.stringify(arr));
    };

};

export function getUserIndexInLocal(username,password) {
    let arr = JSON.parse(localStorage.getItem('users')) || [];
    let i=-1;
    arr.forEach((element,index) => {
        if ((element.userName === username || element.email === username) && element.password===password) {
            i=index
        }
    })
    return i
}

export function getUserFromLocal(index){
    let arr = JSON.parse(localStorage.getItem('users'));
    return arr[index];
};
export function getUserFromSession(){
    return JSON.parse(sessionStorage.getItem('login'));
};

export function getUserEvents() {
    return JSON.parse(sessionStorage.getItem('login')).events;
};

export function updateLocal() {
  /*used to update the localStorage */
  let currentUser = new User(getUserFromSession());
  let index = getUserIndexInLocal(currentUser.email, currentUser.password);
  currentUser.update(index);
};
