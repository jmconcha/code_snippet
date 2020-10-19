'use strict';

let testg;

window.addEventListener('load', function () {
    let todos = [];

    function addToDo(todo) {
        if (!todo)
            return;

        if (todos.includes(todo)) {
            alert("Already Listed");
            return;
        }

        let ul = document.querySelector('ul');
        let li = document.createElement('li');
        let markup = '<i class="fa fa-check"></i>' + 
            `<span class="to-do-name">${todo}</span>` + 
            ' <i class="fa fa-times"></i>';

        
        li.setAttribute('class', 'todo');
        li.innerHTML = markup;
        li.children[2].onclick = removeToDo;
        li.onclick = checkToDo;

        
        todos.push(todo);
        ul.appendChild(li);
    }

    function checkToDo() {
        this.classList.toggle('checked');
    }

    function removeToDo() {
        let ul = document.querySelector('ul');
        let todo = this.previousElementSibling.textContent;
        
        todos = todos.filter((val) => val !== todo);
        ul.removeChild(this.parentNode);
    }

    document.getElementById('toDoField').onsubmit = function () {
        addToDo(this.elements[0].value);
        this.elements[0].value = '';
        return false;
    };

    let times = document.querySelectorAll('.fa-times');
    for (let item of times) {
        item.onclick = removeToDo;
    }
});