import uniqid from 'uniqid';

export default class Select {
    constructor() {
        this.crops = [];
    }

    addItem(count, unit) {
        const item = {
            id: uniqid(),
            start, 
            end
    
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

    updateCount(id, newCount) {
        // loop through elements and change matches with the newCount passed in 
        this.crops.find(el => el.id === id).count = newCount;
    }
}