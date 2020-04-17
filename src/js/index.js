import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';
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
    const query = searchView.getInput();
    console.log(query)
    if (query) {
        state.search = new Search();
        await state.search.getResults(query);
        searchView.renderResults(state.search.result);
    }
    
}


elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});
