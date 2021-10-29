let btnCalendar = document.querySelector('input[name="calendar"]')
let calendarEl = document.getElementById('calendar-container');


btnCalendar.addEventListener('click', function () {
    calendarEl.classList.toggle('hidden')
    calendar.render();
})



let calendar = new FullCalendar.Calendar(calendarEl, {
    selectable: true,
    initialView: 'dayGridMonth',
    initialDate: '2021-10-07',
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    select: function (info) {
        alert('selected ' + info.startStr + ' to ' + info.endStr)
    },
    events: []
});

