import {
  User,
  getUser
} from "./modules/User.js"
import {
  getIndex
} from "./modules/getIndex.js"

let id = (doc, id) => doc.querySelector(id);

let updateForm = id(document, '#updateForm');


/*================ 
    Update Form 
==================*/

/*
id(updateForm, "#updateUsername").value = currentUser.userName;
id(updateForm, "#updateName").value = currentUser.name;
id(updateForm, "#updateLastname").value = currentUser.lastName;
id(updateForm, "#updateEmail").value = currentUser.email;
id(updateForm, '#updateDob').value = currentUser.dob;
id(updateForm, '#updatePhone').value = currentUser.phone;

id(updateForm, '#updateEmail').disabled = true;
*/

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
        'You will now be redirected to the login page',
        'success'
      );
      let submitIndex = getIndex(currentUser.email, currentUser.password);
      currentUser.update(submitIndex);
      updateForm.parentNode.classList.toggle('hidden');
      updateForm.reset();
      sessionStorage.removeItem('login');
    }
  });
});

let logout = updateForm.querySelector('input[name="logout"]');
logout.addEventListener('click', function (el) {
  el.preventDefault();
  sessionStorage.removeItem('login');
})


/*=============
    Calendar
===============*/
/*
let cal = document.querySelector('input[name="calendar"]')

cal.addEventListener('click', function () {
  var calendarEl = document.getElementById('calendar');
  calendarEl.classList.toggle('hidden');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    initialDate: '2021-10-07',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    selectable: true,
    select: function(info) {
      alert('selected ' + info.startStr + ' to ' + info.endStr);
    },
    events: [{
        title: 'All Day Event',
        start: '2021-10-01'
      },
      {
        title: 'Long Event',
        start: '2021-10-07',
        end: '2021-10-10'
      },
      {
        groupId: '999',
        title: 'Repeating Event',
        start: '2021-10-09T16:00:00'
      },
      {
        groupId: '999',
        title: 'Repeating Event',
        start: '2021-10-16T16:00:00'
      },
      {
        title: 'Conference',
        start: '2021-10-11',
        end: '2021-10-13'
      },
      {
        title: 'Meeting',
        start: '2021-10-12T10:30:00',
        end: '2021-10-12T12:30:00'
      },
      {
        title: 'Lunch',
        start: '2021-10-12T12:00:00'
      },
      {
        title: 'Meeting',
        start: '2021-10-12T14:30:00'
      },
      {
        title: 'Birthday Party',
        start: '2021-10-13T07:00:00'
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: '2021-10-28'
      }
    ]
  });

  calendar.render();
});
*/