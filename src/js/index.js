import Search from './models/Search';
import Select from './models/Select';
import Crop from './models/Crop';
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

const controlCrop = async () => {
    const id = window.location.hash.replace('#', '')

    if(id){
        state.crop = new Crop(id);
        try {
            await state.crop.getCrop();
        } catch (error) {
            alert("Error processing crop")
        }
    }
}

// listen for hashchange or load
['hashchange'].forEach(event => window.addEventListener(event, controlCrop));


/*
Select Controllers
controllers for indoor, sow, and start selection populated by selections made from UI
*/
const controlIndoor = () => {
    // create a new selection if there isn't any. 
    if (!state.IndoorSelection) state.IndoorSelection = new Select();

    // add crop to the selection
        const indoorItem = state.IndoorSelection.addItem(state.crop.common, state.crop.scientific, state.crop.indoorStart, state.crop.indoorEnd);
        selectView.renderItem(indoorItem);
}

// handle delete events for selected indoor crops
elements.indoorSelection.addEventListener('click', e => {
    const id = e.target.closest('.indoor__item').dataset.itemid;

    // handle delete event
    if(e.target.matches('.indoor__delete, .indoor__delete *')) {
        // delete from state
        state.list.deleteItem(id);

        // delete from UI
        listView.deleteItem(id);
   }
})
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});





/*
Calendar Controller
*/
var calendar = new Calendar('#calendar', {
    defaultView: 'month',
    taskView: false,
    template: {
        monthDayname: function(dayname) {
            return `<span class="calendar-week-dayname-name">${dayname.label}</span>`;
        }
    }
});



// Handle button clicks to select crops
// let indoorAdd = document.querySelector('.indoorAdd')
// elements.indoorAdd.addEventListener('click', e => {
//     controlIndoor();
//     console.log("hello")
// });



