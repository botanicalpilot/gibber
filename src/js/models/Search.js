import axios from 'axios';

export default class Search {
    // constructor(query) {
    //     this.query = query;
    // }

    async getResults(param, query) {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        try{
            console.log(`param: ${param}`)
            console.log(`query: ${query}`)
            const res = await axios.get(`${proxy}https://thallus-api.herokuapp.com/api/crops?${param}_name=${query}`);
            this.result = res.data;
        } catch (error) {
            console.log(error)
            alert(error) 
        }
    }
}