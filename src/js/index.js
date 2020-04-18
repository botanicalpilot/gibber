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
    if (query) {
        state.search = new Search();
        searchView.clearInput();
        searchView.clearResults();
        try{
            await state.search.getResults(query);
            searchView.renderResults(state.search.result);
        } catch(error) {
            console.log(error)
            alert(`Something went wrong with your search. See error in console.`)
        }
    }
}


elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});
