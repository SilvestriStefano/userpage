export function labelBob(inputTag){
    /* fancy animation to the label of an input */
  if (inputTag.value == '') {
    inputTag.nextElementSibling == null ? '' : inputTag.nextElementSibling.classList.remove('bob');
  } else {
    inputTag.nextElementSibling == null ? '' : inputTag.nextElementSibling.classList.add('bob');
  }
};

export function wrong(input,messaggio){
    input.classList.add('wrong');
    input.value="";
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