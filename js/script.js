import {
    User, getUser
} from "./modules/User.js"
import {
    getIndex
} from "./modules/getIndex.js"
import {
    wrong,
    wrongClear,
    existsInStorage
} from "./modules/wrong.js"

let id = (doc, id) => doc.querySelector(id);

let regForm = id(document, '#registerForm'),
    loginForm = id(document, '#loginForm');

let bob = document.querySelectorAll('input:not(:required):not([type="submit"]):not([type="button"])');
bob.forEach(function(inp){
    inp.addEventListener('change',function(event){
        if(this.value==''){
            this.nextElementSibling==null ? '' : this.nextElementSibling.classList.remove('bob');
        }else {
            this.nextElementSibling==null ? '' : this.nextElementSibling.classList.add('bob');
        };
    })
})

/*============== 
    Sign Up 
================*/
regForm.addEventListener('submit', event1 => {
    event1.preventDefault();
    let username = id(regForm, "#username"),
        name = id(regForm, "#name"),
        email = id(regForm, "#email"),
        password = id(regForm, "#pwd"),
        passwordtemp = id(regForm, '#confirm-pwd');

    wrongClear(regForm, 'wrong');

    if (!/\S/.test(name.value)) {
        name.classList.remove('wrong');
    } else if (existsInStorage(username.value, 'userName')) {
        wrong(username, 'Username already exists');
    } else if (existsInStorage(email.value, 'email')) {
        wrong(email, 'Email already exists');
    } else if (password.value != passwordtemp.value) {
        wrong(passwordtemp, 'Passwords do not match');
    } else {

        wrongClear(regForm, 'wrong');

        let userNew = new User(name.value, username.value, email.value, password.value);

        userNew.save();
    }
    regForm.reset();
})


/*============== 
    Sign In 
================*/
loginForm.addEventListener('submit', event2 => {
    event2.preventDefault();
    let username = loginForm.querySelector('input[type="text"]'),
        password = loginForm.querySelector('input[type="password"]');

    let currentIndex = getIndex(username.value,password.value);
    if (currentIndex==-1){
        Swal.fire({
            icon:'error',
            title: 'Login failed!',
            text: 'You have entered incorrect credentials.'
        })
    }else{
        loginForm.parentNode.classList.toggle('hidden');

        let currentUser = getUser(currentIndex);
        sessionStorage.setItem('login',JSON.stringify(currentUser));
        location.href='profile.html';
    };
    loginForm.reset();
})


/*============== 
    Buttons 
================*/

let pulsanti = document.querySelectorAll('#registerForm input[type="button"],#loginForm input[type="button"]');
pulsanti.forEach(elem => {
    elem.addEventListener('click', eve => {
        eve.preventDefault();
        regForm.parentNode.classList.toggle('hidden');
        loginForm.parentNode.classList.toggle('hidden');
    })
})
