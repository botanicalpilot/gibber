import Search from './models/Search';
import Select from './models/Select';
import * as searchView from './views/searchView';
import * as selectView from './views/selectView';
import { elements, renderLoader, clearLoader } from './views/base';
import Calendar from 'tui-calendar';
import "tui-calendar/dist/tui-calendar.css";
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';


// import axios from 'axios';

// Set state of the app which will include the state for
/*
-Search object
-selected crops
*/
const state = {};

/*
Search Controller for crops
*/
const controlSearch = async () => {
    const query = searchView.getInput();
    if (query) {
        state.search = new Search();
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes)
        try{
            await state.search.getResults(query);
            clearLoader();
            searchView.renderResults(state.search.result);
            
        } catch(error) {
            console.log(error)
            alert(`Something went wrong with your search. See error in console.`)
        }
    }
}

/*
Select Controllers
controllers for indoor, sow, and start lists populated by selections made from UI
*/
const controlIndoor = () => {
    // create a new list if there isn't any. 
    if (!state.list) state.list = new Select();

    // add each ingredient to the list
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
}





/*
Calendar Controller
*/

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});




var calendar = new Calendar('#calendar', {
    defaultView: 'month',
    taskView: false,
    template: {
        monthDayname: function(dayname) {
            return `<span class="calendar-week-dayname-name">${dayname.label}</span>`;
        }
    }
});


  

