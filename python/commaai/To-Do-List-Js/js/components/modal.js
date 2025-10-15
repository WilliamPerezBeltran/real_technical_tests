import Alert from "./alert.js";
export default class Modal {
    constructor() {
        this.title = document.getElementById('modal-title');
        this.description = document.getElementById('modal-description');
        this.btn = document.getElementById('modal-btn');
        this.completed = document.getElementById('modal-completed');
        this.toDo = null;

        this.alert = new Alert('modal-alert');
    }

    setValues(toDo) {
        this.toDo = toDo;
        this.title.value = toDo.title;
        this.description.value = toDo.description;
        this.completed.checked = toDo.completed;
    }

    // Click in btn save on Modal
    onClick(callback) {
        this.btn.onclick = () => {
            if (!this.title.value || !this.description.value) {
                this.alert.show('Title and Description are required');
                return;
            } else {
                this.alert.hide();
            }

            $('#modal').modal('toggle');

            callback(this.toDo.id, {
                title: this.title.value,
                description: this.description.value,
                completed: this.completed.checked,
            });
        }
    }
}