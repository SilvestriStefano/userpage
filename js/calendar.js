let btnCalendar = document.querySelector('input[name="calendar"]')
let calendarEl = document.querySelector('#calendar');
let displayMemo = document.querySelector('#calendar-event')


btnCalendar.addEventListener('click', function () {
    calendarEl.parentElement.classList.toggle('hidden')
    calendar.render();
})


let calendar = new FullCalendar.Calendar(calendarEl, {
    selectable: true,
    initialView: 'dayGridMonth',
    initialDate: moment().format("YYYY-MM-DD"),//'2021-10-07',
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    select: function (info) {
        displayMemo.classList.remove('hidden')
        let startDate = displayMemo.querySelector('#startdate')
        let endDate = displayMemo.querySelector('#enddate')
        
        startDate.value = moment(info.startStr).format('YYYY-MM-DDTHH:mm') 
        endDate.value = moment(info.endStr).subtract(1, 'seconds').format('YYYY-MM-DDTHH:mm');
        // var result = new Date(info.endStr)
        // result.setDate(result.getDate()-1)
        //    console.log(moment(info.endStr).subtract(1, 'seconds').format('YYYY-MM-DDTHH:mm'));
    
    },
    events: []
});

