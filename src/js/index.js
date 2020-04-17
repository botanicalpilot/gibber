import Search from './models/Search';
// import { elements } from './views/base';
// import axios from 'axios';


// window.onload(console.log(axios.get(`https://thallus-api.herokuapp.com/api/crops`)))
const state = {};

// /*
// Search Controller for crops
// */

const controlSearch = async () => {
    state.search = new Search();
    await state.search.getResults();
}


// elements.searchForm.addEventListener('submit', e => {
//     controlSearch();
// })

// import axios from 'axios';

// getResults(query) {
//     const proxy = 'https://cors-anywhere.herokuapp.com/';
//     try {
//         const res = await axios(`${proxy}https://thallus-api.herokuapp.com/api/crops?common_name=${query}`);
//         const crops = res.data.crops;
//         console.log(res.data.scientific_name);
//         console.log(res)
//     } catch(error){
//         alert(error);
//     }
// }

// getResults('pepper')