import Search from './models/Search';
// import { elements } from './views/base';
// import axios from 'axios';

// Set state of the app which will include the state for
/*
-Search object
-selected crops
*/
const state = {};

// /*
// Search Controller for crops
// */
const controlSearch = async () => {
    const query = 'pepper'
    if (query) {
        state.search = new Search();
        await state.search.getResults(query);
        console.log(state.search.result)
    }
    
}


document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});
