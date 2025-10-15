// Add things 
import Alert from "./alert.js";
export default class AddToDo {
    constructor() {
        this.btn = document.getElementById('add');
        this.title = document.getElementById('title');
        this.description = document.getElementById('description');

        this.alert = new Alert('alert');
    }

    onClick(callback) { // Callback: function to be received and executed after
        this.btn.onclick = () => {
            if (title.value === '' || description.value === '') {
                this.alert.show('Title and Description are required');
            } else {
                this.alert.hide();
                callback(this.title.value, this.description.value);
            }
        }
    }
}