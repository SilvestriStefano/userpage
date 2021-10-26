export function wrong(input,messaggio){
    input.classList.add('wrong');
    input.placeholder = messaggio;
};

export function wrongClear(form,classname){
    form.querySelectorAll('input').forEach(el=>el.classList.remove(classname));
};

export function existsInStorage(dato, proprieta) {
    let arr = JSON.parse(localStorage.getItem('users')) || [];
    let check = false;
    arr.forEach((element) => {
        if (element[proprieta] === dato ) {
            check = true;
        }
    })
    return check;
};