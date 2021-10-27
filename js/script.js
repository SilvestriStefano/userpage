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
    loginForm = id(document, '#loginForm'),
    updateForm = id(document,'#updateForm');

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
        password = loginForm.querySelector('input[type="password"]'),
        updateForm = id(document,'#updateForm');

    let currentIndex = getIndex(username.value,password.value);
    if (currentIndex==-1){
        Swal.fire({
            icon:'error',
            title: 'Login failed!',
            text: 'You have entered incorrect credentials.'
        })
    }else{
        id(loginForm,'#error').classList.add('hidden');
        loginForm.parentNode.classList.toggle('hidden');
        updateForm.parentNode.classList.toggle('hidden');

        let currentUser = getUser(currentIndex);
        
        id(updateForm, "#updateUsername").value = currentUser.userName;
        id(updateForm, "#updateName").value = currentUser.name;
        id(updateForm, "#updateLastname").value = currentUser.lastName;
        id(updateForm, "#updateEmail").value = currentUser.email;
        id(updateForm, '#updateDob').value = currentUser.dob;
        id(updateForm, '#updatePhone').value = currentUser.phone;

        id(updateForm, '#updateEmail').disabled = true;
        sessionStorage.setItem('login',JSON.stringify(currentUser));
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

updateForm.addEventListener('submit',function(e){
    e.preventDefault();

    let tempUser = JSON.parse(sessionStorage.getItem('login'));
    let currentUser = new User(tempUser.name, tempUser.userName, tempUser.email, tempUser.password);

    currentUser.userName = id(updateForm, "#updateUsername").value;
    currentUser.name = id(updateForm, "#updateName").value;
    currentUser.lastName = id(updateForm, "#updateLastname").value;
    currentUser.dob = id(updateForm, '#updateDob').value;
    currentUser.phone = id(updateForm, '#updatePhone').value;
    Swal.fire({
        title:"Update your porfile?",
        icon:'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update!'
    }).then((result)=>{
        if(result.isConfirmed){
            Swal.fire(
                'Updated!',
                'You will now be redirected to the login page',
                'success'
            );
            let submitIndex = getIndex(currentUser.email, currentUser.password);
            currentUser.update(submitIndex);
            loginForm.parentNode.classList.toggle('hidden');
            updateForm.parentNode.classList.toggle('hidden');
            updateForm.reset();
            sessionStorage.removeItem('login');
        }
    });
});

let logout = updateForm.querySelector('input[name="logout"]');
logout.addEventListener('click', function(el){
    el.preventDefault();
    loginForm.parentNode.classList.toggle('hidden');
    updateForm.parentNode.classList.toggle('hidden');
    updateForm.reset();
    sessionStorage.removeItem('login');
})