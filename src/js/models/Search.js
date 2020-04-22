import axios from 'axios';

export default class Search {
    // constructor(query) {
    //     this.query = query;
    // }

    async getResults(query) {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        try{
            console.log(`query: ${query}`)
            const res = await axios.get(`${proxy}https://thallus-api.herokuapp.com/api/crops?common_name=${query}`);
            
            if(res.data.length < 1){
                const res2 = await axios.get(`${proxy}https://thallus-api.herokuapp.com/api/crops?scientific_name=${query}`)
                this.result = res2.data
            } else {this.result = res.data;}
            
        }catch (error) {
            console.log(error)
            alert(error) 
        }
    }
}