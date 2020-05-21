import axios from 'axios';

export default class Search {
    // constructor(query) {
    //     this.query = query;
    // }

    async resultsOnLoad() {
        try{
            const res = await axios.get(`https://thallus-api.herokuapp.com/api/crops?common_name=`);
            
            // if res returns empty array, try again by searching with scientific name. 
            this.result = res.data;

        }catch (error) {
            console.log(error)
            alert(error) 
        }
    }
    async getResults(query) {
        try{
            console.log(`query: ${query}`)
            const res = await axios.get(`https://thallus-api.herokuapp.com/api/crops?common_name=${query}`);
            
            // if res returns empty array, try again by searching with scientific name. 
            if(res.data.length < 1){
                const res2 = await axios.get(`https://thallus-api.herokuapp.com/api/crops?scientific_name=${query}`)
                this.result = res2.data
            } else {this.result = res.data;}

        }catch (error) {
            console.log(error)
            alert(error) 
        }
    }
}