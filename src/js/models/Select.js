import uniqid from 'uniqid';

export default class Select {
    constructor() {
        this.crops = [];
    }

    addItem(id, common, scientific, start, end, image, color) {

        const item = {
            id: uniqid(),
            calendarId: 1,
            title: common, 
            category: 'time',
            dueDateClass:'',
            start: start, 
            end: end, 
            image:image,
            bgColor: color,
        }
        this.crops.push(item);
        return(item);
    }

    deleteItem(id) {
        // findIndex of element by looping through all the elements until an Id matches
        const index = this.crops.findIndex(el => el.id === id);
        // remove that element by the index
        this.crops.splice(index, 1);
    }
}