import {
    User,
    getUserFromLocal,
    getUserIndexInLocal
} from "./modules/User.js";
import { 
    labelBob,
    wrong,
    wrongClear,
    existsInStorage
 } from "./modules/utilities.js";

let id = (doc, id) => doc.querySelector(id);

let regForm = id(document, '#registerForm'),
    loginForm = id(document, '#loginForm');

let bob = document.querySelectorAll('input:not(:required):not([type="submit"]):not([type="button"])');
bob.forEach(function (inp) {
    labelBob(inp);
    inp.addEventListener('change', function (event) {
        labelBob(this);
    })
})

/*============== 
    Sign Up 
================*/

regForm.reset();
regForm.addEventListener('submit', event1 => {
    event1.preventDefault();
    let name = id(regForm, "#name"),
        lastname = id(regForm, "#lastname"),
        username = id(regForm, "#username"),
        email = id(regForm, "#email"),
        password = id(regForm, "#pwd"),
        passwordtemp = id(regForm, '#confirm-pwd'),
        dob = id(regForm, '#dob'),
        phone = id(regForm, '#phone');

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
        let newObj = {
            name: name.value,
            lastName: lastname.value,
            userName: username.value,
            email: email.value,
            password: password.value,
            dob: dob.value,
            phone: phone.value,
            events: []
        };
        let userNew = new User(newObj);

        userNew.save();
        regForm.reset();
        sessionStorage.setItem('login', JSON.stringify(userNew));
        location.href = 'profile.html';
    }
})


/*============== 
    Sign In 
================*/
loginForm.addEventListener('submit', event2 => {
    event2.preventDefault();
    let username = loginForm.querySelector('input[type="text"]'),
        password = loginForm.querySelector('input[type="password"]');

    let currentIndex = getUserIndexInLocal(username.value, password.value);
    if (currentIndex == -1) {
        Swal.fire({
            icon: 'error',
            title: 'Login failed!',
            text: 'You have entered incorrect credentials.'
        })
    } else {
        loginForm.parentNode.classList.toggle('hidden');

        let currentUser = getUserFromLocal(currentIndex);
        sessionStorage.setItem('login', JSON.stringify(currentUser));
        location.href = 'profile.html';
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