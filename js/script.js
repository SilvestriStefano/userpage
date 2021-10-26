import {
    User
} from "./modules/User.js"
import {
    getUser
} from "./modules/GetUser.js"

let id = (doc, id) => doc.querySelector(id);
let classes = (doc, classes) => doc.querySelectorAll(classes);

let regForm = id(document, '#registerForm'),
    loginForm = id(document, '#loginForm');

regForm.addEventListener('submit', event1 => {
    event1.preventDefault();
    let username = id(regForm, "#username").value,
        name = id(regForm, "#name").value,
        email = id(regForm, "#email").value,
        password = id(regForm, "#pwd").value;

    let userNew = new User(name, username, email, password);
    console.log("esiste nello storage?:" , userNew.existsInStorage() )


})
loginForm.addEventListener('submit', event2 => {
    event2.preventDefault();
})