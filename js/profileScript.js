import {
  User,
  getUser
} from "./modules/User.js"
import {
  getIndex
} from "./modules/getIndex.js"

let id = (doc, id) => doc.querySelector(id);

let updateForm = id(document, '#updateForm');
let updateButton = document.querySelector('input[name="update"]')
let welcome = id(document, '#profile')

function dataUpdate() {

  let tempUser = JSON.parse(sessionStorage.getItem('login'));
  let userData = id(welcome, '#user-data')
  userData.innerHTML = ''
  for (const prop in tempUser) {
    if (prop != 'password' && tempUser[prop] != '') {
      let userInfo = document.createElement('div')
      userInfo.innerText = tempUser[prop]
      userInfo.classList.add('info')
      userData.append(userInfo)
    }
  }
}

updateButton.addEventListener('click', eve => {
  eve.preventDefault();
  // welcome.classList.toggle('hidden');
  updateForm.parentNode.classList.toggle('hidden');
  let tempUser = JSON.parse(sessionStorage.getItem('login'));
  
  id(updateForm, "#updateUsername").value = tempUser.userName;
  id(updateForm, "#updateName").value = tempUser.name;
  id(updateForm, "#updateLastname").value = tempUser.lastName;
  id(updateForm, "#updateEmail").value = tempUser.email;
  id(updateForm, '#updateDob').value = tempUser.dob;
  id(updateForm, '#updatePhone').value = tempUser.phone;
  
  id(updateForm, '#updateEmail').disabled = true;
})


/*================ 
    User Data
==================*/

dataUpdate()


/*================ 
    Update Form 
==================*/


updateForm.addEventListener('submit', function (e) {
  e.preventDefault();

  let tempUser = JSON.parse(sessionStorage.getItem('login'));
  let currentUser = new User(tempUser);

  currentUser.userName = id(updateForm, "#updateUsername").value;
  currentUser.name = id(updateForm, "#updateName").value;
  currentUser.lastName = id(updateForm, "#updateLastname").value;
  currentUser.dob = id(updateForm, '#updateDob').value;
  currentUser.phone = id(updateForm, '#updatePhone').value;
  Swal.fire({
    title: "Update your porfile?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, update!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Updated!',
        'success'
      );
      let submitIndex = getIndex(currentUser.email, currentUser.password);
      currentUser.update(submitIndex);
      sessionStorage.setItem('login', JSON.stringify(currentUser))
      dataUpdate()
      /*
      updateForm.parentNode.classList.toggle('hidden');
      updateForm.reset();
      sessionStorage.removeItem('login');
      */
    }
  });
});

let logout = welcome.querySelector('#profile .container a');
logout.addEventListener('click', function (el) {
  el.preventDefault();
  sessionStorage.removeItem('login');
  location.href = 'index.html'
})
