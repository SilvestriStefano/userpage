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
    let username = id(regForm, "#username"),
        name = id(regForm, "name"),
        email = id(regForm, "#email"),
        password = id(regForm, "#password");

    let userNew = new User(name, username, email, password);
    console.log("esiste nello storage?:" , userNew.existsInStorage() )


})
loginForm.addEventListener('submit', event2 => {
    event2.preventDefault();
})