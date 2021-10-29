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

export function getUser(index){
    let arr = JSON.parse(localStorage.getItem('users'));
    return arr[index];
}