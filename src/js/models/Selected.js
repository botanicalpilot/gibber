import uniqid from 'uniqid';

export default class Select {
    constructor() {
        this.items = [];
    }

    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count, 
            unit, 
            ingredient
        }
        this.items.push(item);
        return(item);
    }

    deleteItem(id) {
        // findIndex of element by looping through all the elements until an Id matches
        const index = this.items.findIndex(el => el.id === id);
        // remove that element by the index
        this.items.splice(index, 1);
    }

    updateCount(id, newCount) {
        // loop through elements and change matches with the newCount passed in 
        this.items.find(el => el.id === id).count = newCount;
    }
}