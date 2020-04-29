import uniqid from 'uniqid';

export default class Select {
    constructor() {
        this.crops = [];
    }

    addItem(common, scientific, startDate, endDate) {
        
            // let current = new Date()
            // let year  = current.getFullYear()
            // return rawDate.replace("2020", year)
        

        const item = {
            id: uniqid(),
            common, 
            scientific,
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