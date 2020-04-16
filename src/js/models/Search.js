import axios from 'axios';

export default class Search {
    // constructor(query) {
    //     this.query = query;
    // }

    async getResults() {
        try{
            console.log("hello")
            const res = await axios.get(`https://thallus-api.herokuapp.com/api/crops/`);
            this.result = res.data.crops;
            console.log(this.result)
            
        } catch (error) {
            console.log(error)
            alert(error)
            
        }
    }
}