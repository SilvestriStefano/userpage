export class User {
    constructor(name, userName, email, password) {
        this.name = name;
        this.lastName = '';
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.dob = '';
        this.phone = '';
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
        arr[index];
        localStorage.setItem('users', JSON.stringify(arr));
    };

};

export function getUser(index){
    let arr = JSON.parse(localStorage.getItem('users'));
    return arr[index];
}