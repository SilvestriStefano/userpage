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


let calendar = new FullCalendar.Calendar(calendarEl, {
    selectable: true,
    editable: true,
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

        var eventID = info.event.id;
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
        
        startDate.value = moment(info.startStr).format('YYYY-MM-DDTHH:mm') ;
        endDate.value = moment(info.endStr).subtract(1, 'seconds').format('YYYY-MM-DDTHH:mm');
    },
    events:  getUserEvents(),
});

