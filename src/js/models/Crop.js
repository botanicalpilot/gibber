import axios from 'axios';


export default class Crop {
    constructor(id) {
        this.id = id;
    }

    async getCrop() {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const res = await axios.get(`${proxy}https://thallus-api.herokuapp.com/api/${id}`);
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.common = res.data.crop.common_name;
            this.scientific = res.data.crop.scientific_name;
            this.sowAll = res.data.crop.sow_all_season;
            this.indoorStart = res.data.crop.sow_indoor_start;
            this.indoorEnd = res.data.crop.sow_indoor_end;
            this.sowStart = res.data.crop.sow_outdoor_start;
            this.sowEnd = res.data.crop.sow_outdoor_end;
            this.sowStart2 = res.data.crop.sow_outdoor_start_2;
            this.sowEnd2 = res.data.crop.sow_outdoor_end_2;
            this.startAll = res.data.crop.start_all_season;
            this.startBegin = res.data.crop.start_outdoor_start;
            this.startEnd = res.data.crop.start_outdoor_end;
            this.startBegin2 = res.data.crop.start_outdoor_start_2;
            this.startEnd2 = res.data.crop.start_outdoor_end_2;
        } catch(error){
            console.log(error); 
            alert('Something went wrong :(');
        }
    }      
}
