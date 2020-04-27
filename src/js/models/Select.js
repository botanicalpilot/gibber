import uniqid from 'uniqid';

export default class Select {
    constructor() {
        this.crops = [];
    }

    addItem(crop, startDate, endDate) {
        const item = {
            id: uniqid(),
            crop,
            startDate, 
            endDate
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