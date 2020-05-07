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
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlCrop));


/*
Calendar Controller
*/
let dateMonth = new Date();
const month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
let currentMonth = month[dateMonth.getMonth()];

elements.calendarMonth.insertAdjacentHTML('afterbegin', currentMonth)
var calendar = new Calendar('#calendar', {
    defaultView: 'month',
    taskView: false,
    scheduleView: 'time',
    calendarId: '1',
    template: {
        monthDayname: function(dayname) {
            return `<span class="calendar-week-dayname-name">${dayname.label}</span>`;
        }
    }
});





/*
Select Controllers
controllers for indoor, sow, and start selection populated by selections made from UI
*/
const controlSelect = growingChoice => {
    if(growingChoice === 'indoor'){
        // create a new selection if there isn't any. 
        if (!state.IndoorSelection) state.IndoorSelection = new Select();

        // add crop to the selection
            const indoorItem = state.IndoorSelection.addItem(state.crop.common, state.crop.scientific, state.crop.indoorStart, state.crop.indoorEnd);
            console.log(indoorItem);
            selectView.renderItem(growingChoice, indoorItem);
            console.log(indoorItem)
            calendar.createSchedules([indoorItem]);
    } else if(growingChoice === 'sow'){
        // create a new selection if there isn't any. 
        if (!state.sowSelection) state.sowSelection = new Select();

        // add crop to the selection
            const sowItem = state.sowSelection.addItem(state.crop.common, state.crop.scientific, state.crop.sowStart, state.crop.sowEnd);
            console.log(sowItem);
            selectView.renderItem(growingChoice, sowItem);
            calendar.createSchedules([sowItem]);
    } else if(growingChoice === 'start'){
        // create a new selection if there isn't any. 
        if (!state.startSelection) state.startSelection = new Select();

        // add crop to the selection
            const startItem = state.startSelection.addItem(state.crop.common, state.crop.scientific, state.crop.startStart, state.crop.startEnd);
            console.log(startItem);
            selectView.renderItem(growingChoice, startItem);
            calendar.createSchedules([startItem]);
    }
}






// handle delete events for selected indoor crops
elements.indoorSelection.addEventListener('click', e => {
    const id = e.target.closest('.indoor__item').dataset.itemid;
    console.log(id)
    // handle delete event
    if(e.target.matches('.indoor__delete, .indoor__delete *')) {
        // delete from state
        console.log(id)
        calendar.deleteSchedule(id, 1);
        state.IndoorSelection.deleteItem(id);

        // delete from UI
        selectView.deleteItem(id);
   }
});

// delete sow selection crops
elements.sowSelection.addEventListener('click', e => {
    const id = e.target.closest('.sow__item').dataset.itemid;

    // handle delete event
    if(e.target.matches('.sow__delete, .sow__delete *')) {
        // delete from state
        calendar.deleteSchedule(id, 1);
        state.sowSelection.deleteItem(id);

        // delete from UI
        selectView.deleteItem(id);
   }
});

// delete start selection crops
elements.startSelection.addEventListener('click', e => {
    const id = e.target.closest('.start__item').dataset.itemid;

    // handle delete event
    if(e.target.matches('.start__delete, .start__delete *')) {
        // delete from state
        calendar.deleteSchedule(id, 1);
        state.startSelection.deleteItem(id);

        // delete from UI
        selectView.deleteItem(id);
   }
});




elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

// Handle button clicks to select crops
elements.searchRes.addEventListener('click', e => {
    if(e.target.matches ('.indoorAdd')){
        controlSelect('indoor');
            
    } else if (e.target.matches ('.sowAdd')){
        controlSelect('sow');
        
    } else if(e.target.matches ('.startAdd')){
        controlSelect('start');
        

    }
});



