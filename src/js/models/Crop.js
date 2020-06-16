import axios from 'axios';


export default class Crop {
    constructor(id) {
        this.id = id;
    }



    async getCrop() {
        try {
            const res = await axios.get(`https://thallus-api.herokuapp.com/api/crops/${this.id}`);
            this.common = res.data.common_name;
            this.scientific = res.data.scientific_name;
            this.sowAll = res.data.sow_all_season;
            this.indoorStart = res.data.sow_indoor_start;
            this.indoorEnd = res.data.sow_indoor_end;
            this.sowStart = res.data.sow_outdoor_start;
            this.sowEnd = res.data.sow_outdoor_end;
            this.sowStart2 = res.data.sow_outdoor_start_2;
            this.sowEnd2 = res.data.sow_outdoor_end_2;
            this.startAll = res.data.start_all_season;
            this.startBegin = res.data.start_outdoor_start;
            this.startEnd = res.data.start_outdoor_end;
            this.startBegin2 = res.data.start_outdoor_start_2;
            this.startEnd2 = res.data.start_outdoor_end_2;
            this.photo_ref = res.data.photo_ref;
        } catch(error){
            console.log(error); 
            alert('Something went wrong :(');
        }
    }      
}
