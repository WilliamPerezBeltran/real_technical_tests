export default class Filters {
    constructor() {
        this.form = document.getElementById('filters');
        this.btn = document.getElementById('search');
    }

    onClick(callback) {
        this.btn.onclick = (e) => {
            e.preventDefault(); // Send to server. In this case, Local Storage
            const data = new FormData(this.form); // Capture form
            callback({
                type: data.get('type'),
                words: data.get('words')
            });
        }
    }
}