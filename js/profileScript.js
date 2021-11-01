import {
  User
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
    if (prop != 'password' && prop != 'events' && tempUser[prop] != '') {
      let userInfo = document.createElement('div')
      userInfo.innerText = tempUser[prop]
      userInfo.classList.add('info')
      userData.append(userInfo)
    }
  }
}

function updateLocal() {
  let tempUser = JSON.parse(sessionStorage.getItem('login'));
  let currentUser = new User(tempUser);

  let index = getIndex(currentUser.email, currentUser.password);
  currentUser.update(index);
}


updateButton.addEventListener('click', eve => {
  eve.preventDefault();
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
    }
  });
});

let logout = welcome.querySelector('#profile .container a');
logout.addEventListener('click', function (el) {
  el.preventDefault();
  sessionStorage.removeItem('login');
  location.href = 'index.html'
})

/*================ 
    calendar form
==================*/

let memoForm = id(document, '#calendar-event'),
  backButton = memoForm.querySelector('input[name="back"]');
backButton.addEventListener('click', function (e) {
  e.preventDefault()
  memoForm.classList.toggle('hidden')
  document.querySelector('#setevent').reset();
})
memoForm.addEventListener('submit', function (evn) {
  evn.preventDefault();
  if (evn.submitter.name == "update") {
    let userLog = JSON.parse(sessionStorage.getItem('login'));

    let eventUpdate = {
      id: eventID,
      title: id(memoForm, '#memo').value,
      start: id(memoForm, '#startdate').value,
      end: id(memoForm, '#enddate').value
    };

    userLog.events[userLog.events.findIndex(e=>e.id==eventID)] = eventUpdate;

    sessionStorage.setItem('login', JSON.stringify(userLog));
    memoForm.classList.toggle('hidden');

    calendar.getEventById(eventID).remove();
    calendar.addEvent(eventUpdate);
  } else {
    let userLog = JSON.parse(sessionStorage.getItem('login'));
    /*create event*/
    let tempID = userLog.events.length
    userLog.events.forEach( el => {
      if(el.id == tempID) {
        tempID++;
      } 
    });
    let eventNew = {
      id: tempID,
      title: id(memoForm, '#memo').value,
      start: id(memoForm, '#startdate').value,
      end: id(memoForm, '#enddate').value
    };
    /*update the sessionStorage*/
    userLog.events.push(eventNew);
    sessionStorage.setItem('login', JSON.stringify(userLog));

    /*add to the calendar*/
    calendar.addEvent(eventNew)
    memoForm.classList.toggle('hidden')
  }
  updateLocal();
  document.querySelector('#setevent').reset();
});

memoForm.querySelector('input[name="delete"]').addEventListener('click', evn => {
  evn.preventDefault();
  calendar.getEventById(eventID).remove();
  memoForm.classList.toggle('hidden');

  let userLog = JSON.parse(sessionStorage.getItem('login'));
  userLog.events = userLog.events.filter( el => el.id != eventID);
  sessionStorage.setItem('login', JSON.stringify(userLog));
  updateLocal();
  document.querySelector('#setevent').reset();
})

/*================ 
    Calendar
==================*/

let btnCalendar = document.querySelector('input[name="calendar"]')
let calendarEl = document.querySelector('#calendar');
let displayMemo = document.querySelector('#calendar-event')


btnCalendar.addEventListener('click', function () {
    calendarEl.parentElement.classList.toggle('hidden')
    calendar.render();
})

function getUserEvents(){
    return JSON.parse(sessionStorage.getItem('login')).events;
}

var eventID;

let calendar = new FullCalendar.Calendar(calendarEl, {
    selectable: true,
    editable:true,
    //editable: false,
    initialView: 'dayGridMonth',
    initialDate: moment().format("YYYY-MM-DD"),
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    eventClick: function(info) {
        displayMemo.classList.remove('hidden');
        let title = displayMemo.querySelector('#memo');
        let startDate = displayMemo.querySelector('#startdate');
        let endDate = displayMemo.querySelector('#enddate');
        displayMemo.querySelector('input[name="set"]').parentElement.classList.add('hidden');
        displayMemo.querySelector('input[name="update"]').parentElement.classList.remove('hidden');
        displayMemo.querySelector('input[name="delete"]').parentElement.classList.remove('hidden');

        eventID = 1* info.event.id;
        console.log(eventID);
        
        title.value = info.event.title;
        startDate.value =moment(info.event.start).format('YYYY-MM-DDTHH:mm');
        endDate.value = moment(info.event.end).format('YYYY-MM-DDTHH:mm');

    },
    select: function (info) {
        displayMemo.classList.remove('hidden');
        let startDate = displayMemo.querySelector('#startdate');
        let endDate = displayMemo.querySelector('#enddate');
        displayMemo.querySelector('input[name="set"]').parentElement.classList.remove('hidden');
        displayMemo.querySelector('input[name="update"]').parentElement.classList.add('hidden');
        displayMemo.querySelector('input[name="delete"]').parentElement.classList.add('hidden');
        
        startDate.value = moment(info.startStr).format('YYYY-MM-DDTHH:mm') ;
        endDate.value = moment(info.endStr).subtract(1, 'seconds').format('YYYY-MM-DDTHH:mm');
    },
    eventDrop: function(info){
        let userLog = JSON.parse(sessionStorage.getItem('login'));
        
        let tempID2 = userLog.events.findIndex(e=>e.id==info.event.id);

        userLog.events[tempID2].start = info.event.start
        userLog.events[tempID2].end = info.event.end

        sessionStorage.setItem('login', JSON.stringify(userLog));
        updateLocal();
    },
    events:  getUserEvents(),
    
});
