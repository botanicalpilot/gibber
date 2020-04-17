import axios from 'axios';

export default class Search {
    // constructor(query) {
    //     this.query = query;
    // }

    async getResults(query) {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        try{
            const res = await axios.get(`${proxy}https://thallus-api.herokuapp.com/api/crops?common_name=${query}`);
            this.result = res.data;
        } catch (error) {
            console.log(error)
            alert(error) 
        }
    }
}