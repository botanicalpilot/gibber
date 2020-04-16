import Search from './models/Search';
import { elements } from './views/base';
import axios from 'axios';


window.onload(console.log(axios.get(`https://thallus-api.herokuapp.com/api/crops`)))
const state = {};

/*
Search Controller for crops
*/

const controlSearch = async () => {
    state.search = new Search();
    await state.search.getResults();
}

elements.searchForm.addEventListener('submit', e => {
    controlSearch();
})