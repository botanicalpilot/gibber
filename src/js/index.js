import Search from './models/Search';
import Select from './models/Select';
import Crop from './models/Crop';
import * as searchView from './views/searchView';
import * as selectView from './views/selectView';
import * as calendarButtons from './views/calendarButtons';
import { elements, renderLoader, clearLoader } from './views/base';
import Calendar from 'tui-calendar';
import "tui-calendar/dist/tui-calendar.css";
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import {addToCalendar} from '../../node_modules/js-add-to-calendar-buttons';


// import axios from 'axios';

// Set state of the app which will include the state for
/*
-Search object
-selected crops
*/
const state = {};

/*
On load, automatically return all results from API
*/
window.onload = async () => {
    state.search = new Search();
        renderLoader(elements.searchRes)
        try{
            await state.search.resultsOnLoad();
            clearLoader();
            searchView.renderResults(state.search.result);
            
        } catch(error) {
            console.log(error)
            alert(`Something went wrong.`)
        }
}

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
    useCreationPopup: true,
    useDetailPopup: true
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
            const indoorItem = state.IndoorSelection.addItem(state.crop.common, state.crop.scientific, state.crop.indoorStart, state.crop.indoorEnd, '#8C5866');
            console.log(indoorItem);
            selectView.renderItem(growingChoice, indoorItem);
            calendar.createSchedules([indoorItem]);

            var myCalendar = addToCalendar({
                options: {
                    class: 'my-class',
                    id: state.crop.id                               // If you don't pass an id, one will be generated for you.
                },
                data: {
                    title: `Start ${state.crop.common} from seed indoors`,     // Event title
                    start: new Date(state.crop.indoorStart),   // Event start date
                    // timezone: America/Los_Angeles,					// converts the time to the IANA timezone 
                    end: new Date(state.crop.indoorEnd),     // If an end time is set, this will take precedence over duration
                    // duration: 120,                            // Event duration (IN MINUTES)
                    // allday: true,													// Override end time, duration and timezone, triggers 'all day'
                    address: 'Portland, OR, USA',
                    description: `Sow ${state.crop.common} (${state.crop.scientific}) indoors before planting out starts later in the growing season`
                }
            });
            document.querySelector(`[data-calid=${indoorItem.id}]`).appendChild(myCalendar);
    } else if(growingChoice === 'sow'){
        // create a new selection if there isn't any. 
        if (!state.sowSelection) state.sowSelection = new Select();

        // add crop to the selection
            const sowItem = state.sowSelection.addItem(state.crop.common, state.crop.scientific, state.crop.sowStart, state.crop.sowEnd, '#518C7B');
            console.log(sowItem);
            selectView.renderItem(growingChoice, sowItem);
            calendar.createSchedules([sowItem]);

            var myCalendar = addToCalendar({
                options: {
                    class: 'my-class',
                    id: state.crop.id,                              // If you don't pass an id, one will be generated for you.
                },
                data: {
                    title: `Start ${state.crop.common} from seed indoors`,     // Event title
                    start: new Date(state.crop.indoorStart),   // Event start date
                    // timezone: America/Los_Angeles,					// converts the time to the IANA timezone 
                    end: new Date(state.crop.indoorEnd),     // If an end time is set, this will take precedence over duratin
                    // duration: 120,                            // Event duration (IN MINUTES)
                    // allday: true,													// Override end time, duration and timezone, triggers 'all day'
                    address: 'Portland, OR, USA',
                    description: `Sow ${state.crop.common} (${state.crop.scientific}) indoors before planting out starts later in the growing season`
                }
            });
            document.querySelector(`[data-calid=${sowItem.id}]`).appendChild(myCalendar);
            

    } else if(growingChoice === 'start'){
        // create a new selection if there isn't any. 
        if (!state.startSelection) state.startSelection = new Select();

        // add crop to the selection
            const startItem = state.startSelection.addItem(state.crop.common, state.crop.scientific, state.crop.startBegin, state.crop.startEnd, '#D9A168');
            console.log(startItem);
            selectView.renderItem(growingChoice, startItem);
            calendar.createSchedules([startItem]);

            var myCalendar = addToCalendar({
                options: {
                    class: 'my-class',
                    id: state.crop.id                               // If you don't pass an id, one will be generated for you.
                },
                data: {
                    title: `Start ${state.crop.common} from seed indoors`,     // Event title
                    start: new Date(state.crop.indoorStart),   // Event start date
                    // timezone: America/Los_Angeles,					// converts the time to the IANA timezone 
                    end: new Date(state.crop.indoorEnd),     // If an end time is set, this will take precedence over duration
                    // duration: 120,                            // Event duration (IN MINUTES)
                    // allday: true,													// Override end time, duration and timezone, triggers 'all day'
                    address: 'Portland, OR, USA',
                    description: `Sow ${state.crop.common} (${state.crop.scientific}) indoors before planting out starts later in the growing season`
                }
            });
            document.querySelector(`[data-calid=${startItem.id}]`).appendChild(myCalendar);
    }
}






// handle delete events for selected indoor crops
elements.cropSelection.addEventListener('click', e => {
    const id = e.target.closest('.crop__item').dataset.itemid;
    console.log(id)
    // handle delete event
    if(e.target.matches('.crop__delete, .crop__delete *')) {
        // delete from state
        console.log(id)
        calendar.deleteSchedule(id, 1);
        state.IndoorSelection.deleteItem(id);

        // delete from UI
        selectView.deleteItem(id);
   }
});

// delete sow selection crops
// elements.sowSelection.addEventListener('click', e => {
//     const id = e.target.closest('.sow__item').dataset.itemid;

//     // handle delete event
//     if(e.target.matches('.sow__delete, .sow__delete *')) {
//         // delete from state
//         calendar.deleteSchedule(id, 1);
//         state.sowSelection.deleteItem(id);

//         // delete from UI
//         selectView.deleteItem(id);
//    }
// });

// delete start selection crops
// elements.startSelection.addEventListener('click', e => {
//     const id = e.target.closest('.start__item').dataset.itemid;

//     // handle delete event
//     if(e.target.matches('.start__delete, .start__delete *')) {
//         // delete from state
//         calendar.deleteSchedule(id, 1);
//         state.startSelection.deleteItem(id);

//         // delete from UI
//         selectView.deleteItem(id);
//    }
// });




elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

// Handle button clicks to select crops
elements.searchRes.addEventListener('click', e => {
    let addButton = e.target.closest('.indoorAdd')
    let sowButton  = e.target.closest('.sowAdd')
    let startButton = e.target.closest('.startAdd')
    if(addButton){
        console.log(state.crop)
        console.log("bitch")
        controlSelect('indoor');
            
    } else if (sowButton){
        console.log(state.crop)
        controlSelect('sow');
        
    } else if(startButton){
        console.log(state.crop)
        controlSelect('start');
        

    }
});






