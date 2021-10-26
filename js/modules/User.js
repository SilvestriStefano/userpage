export class User {
    constructor(nm, usrNm, eMl, pwd) {
        this.nm = nm;
        this.lstNm = '';
        this.usrNm = usrNm;
        this.eMl = eMl;
        this.pwd = pwd;
        this.dob = '';
        this.phn = '';
    };
    set updateLstNm(lstNm) {
        this.lstNm = lstNm;
    };
    set updateDOB(dob) {
        this.dob = dob;
    };
    set updatePhn(phn) {
        this.phn = phn;
    };
    save() {
        let arr = JSON.parse(localStorage.getItem('users')) || [];
        arr.push(this);
        console.log(arr);
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