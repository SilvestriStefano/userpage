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
} from "./modules/Wrong.js"

let id = (doc, id) => doc.querySelector(id);
let classes = (doc, classes) => doc.querySelectorAll(classes);

let regForm = id(document, '#registerForm'),
    loginForm = id(document, '#loginForm');

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
    } else if (existsInStorage(username.value, 'usrNm')) {
        wrong(username, 'Username already exists');
    } else if (existsInStorage(email.value, 'eMl')) {
        wrong(email, 'Email already exists');
    } else if (password.value != passwordtemp.value) {
        wrong(passwordtemp, 'Passwords do not match');
    } else {

        wrongClear(regForm, 'wrong');

        let userNew = new User(name.value, username.value, email.value, password.value);

        userNew.save();
    }


})
loginForm.addEventListener('submit', event2 => {
    event2.preventDefault();
    let username = loginForm.querySelector('input[type="text"]'),
        password = loginForm.querySelector('input[type="password"]'),
        updateForm = id(document,'#updateForm');

    let currentIndex = getIndex(username.value,password.value);
    if (currentIndex==-1){
        id(loginForm,'#error').classList.remove('hidden');
    }else{
        id(loginForm,'#error').classList.add('hidden');
        loginForm.parentNode.classList.toggle('hidden');
        updateForm.parentNode.classList.toggle('hidden');

        let currentUser = getUser(currentIndex);
        id(updateForm, "updateUsername").value = currentUser.usrNm;
        id(updateForm, "updateName").value = currentUser.nm;
        id(updateForm, "updateLastname").value = currentUser.lstNm;
        id(updateForm, "updateEmail").value = currentUser.eMl;
        id(updateForm, 'updateDob').value = currentUser.dob;
        id(updateForm, 'updatePhone').value = currentUser.phn;
    }
})

let pulsanti = document.querySelectorAll('#registerForm input[type="button"],#loginForm input[type="button"]');
pulsanti.forEach(elem => {
    elem.addEventListener('click', eve => {
        eve.preventDefault();
        console.log(regForm.parentNode)
        regForm.parentNode.classList.toggle('hidden');
        loginForm.parentNode.classList.toggle('hidden');
    })
})