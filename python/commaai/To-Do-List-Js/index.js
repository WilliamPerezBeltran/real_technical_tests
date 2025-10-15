// DOM: Html en forma de objetos para manipularlo en js
document.addEventListener('DOMContentLoaded', () => { // Event that does not execute js until the html file is fully loaded.
    const alert = document.getElementById('alert');
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const table = document.getElementById('table');
    const btn = document.getElementById('add');
    let id = 1;

    function removeTodo (id) { // Function to know in which row the delete button is located.
        document.getElementById(id).remove();
    }

    function addTodo() {
        // This is because JS is a dynamically typed and weak language.
        // == : Evaluates the value of the variable
        // === : Evaluates variable value and data type
        if (title.value === '' || description.value === '') {
            alert.classList.remove('d-none');
            alert.innerText = 'Title and Description are required';
            return;
        }

        alert.classList.add('d-none');
        const row = table.insertRow();
        row.setAttribute('id', id++)
        row.innerHTML = `
            <td>${title.value}</td>
            <td>${description.value}</td>
            <td class="text-center">
                <input type="checkbox">
            </td>
            <td class="text-right">
                <button class="btn btn-primary mb-1">
                  <i class="fa fa-pencil"></i>
                </button>
            </td>
        `;

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
        removeBtn.onclick = function (e) { // Row: Event
            // e is for passing a parameter to removeTodo
            removeTodo(row.getAttribute('id'));
        }
        row.children[3].appendChild(removeBtn);
        
    }

    btn.onclick = addTodo; // Not addTodo() : Since it returns the function, as nothing is returned in this function, it would return undefined
});
