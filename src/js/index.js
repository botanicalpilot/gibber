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
import {addToCalendar} from '../../node_modules/add-to-calendar-buttons';


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
Add date prototype to increment a day went converting dates from API and sending to calendar
*/
const dateFormat = date => {
    return searchView.splitDate(date).split('-').reverse().join('-').concat(' 00:00:00')
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

// pagination function for results from search controller
elements.searchResPages.addEventListener('click', e => {
    const btn  = e.target.closest('.btn-inline')

    if(btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

// listen for hashchange or load
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlCrop));




/*
Select Controllers
controllers for indoor, sow, and start selection populated by selections made from UI
*/
const controlSelect = growingChoice => {
    if(growingChoice === 'indoor'){
        // create a new selection if there isn't any. 
        if (!state.indoorSelection) state.indoorSelection = new Select();

        // add crop to the selection
            const indoorItem = state.indoorSelection.addItem(state.crop.id, state.crop.common, state.crop.scientific, dateFormat(state.crop.indoorStart), dateFormat(state.crop.indoorEnd), state.crop.photo_ref, '#8C5866');
            console.log(indoorItem);
            selectView.renderItem(growingChoice, indoorItem);
            calendar.createSchedules([indoorItem]);

            const generateCalendarButtons = addToCalendar({
                options: {
                    class: 'my-class',
                    id: state.crop.id                       
                },
                data: {
                    title: `Start ${state.crop.common} from seed indoors`,     
                    start: new Date(dateFormat(state.crop.indoorStart)),   			
                    end: new Date(dateFormat(state.crop.indoorEnd)),    													
                    address: 'Portland, OR, USA',
                    description: `Sow ${state.crop.common} (${state.crop.scientific}) indoors before planting out starts later in the growing season`
                }
            });
            const mobileCalendarButtons = addToCalendar({
                options: {
                    class: 'my-class',
                    id: `mobile-${state.crop.id}`                            
                },
                data: {
                    title: `Start ${state.crop.common} from seed indoors`,     
                    start: new Date(dateFormat(state.crop.indoorStart)),  
                    end: new Date(dateFormat(state.crop.indoorEnd)),     
                    address: 'Portland, OR, USA',
                    description: `Sow ${state.crop.common} (${state.crop.scientific}) indoors before planting out starts later in the growing season`
                }
            });
            document.querySelector(`[data-calid="${indoorItem.id}"]`).appendChild(generateCalendarButtons);
            document.querySelector(`[mobile-calid="${indoorItem.id}"]`).appendChild(mobileCalendarButtons);
    } else if(growingChoice === 'sow'){
        // create a new selection if there isn't any. 
        if (!state.sowSelection) state.sowSelection = new Select();

        // add crop to the selection
            const sowItem = state.sowSelection.addItem(state.crop.id, state.crop.common, state.crop.scientific,dateFormat(state.crop.sowStart),dateFormat(state.crop.sowEnd), state.crop.photo_ref, '#518C7B');
            selectView.renderItem(growingChoice, sowItem); 
            calendar.createSchedules([sowItem]);
            
            const generateCalendarButtons = addToCalendar({
                options: {
                    class: 'my-class',
                    id: state.crop.id,                              
                },
                data: {
                    title: `Start ${state.crop.common} from seed indoors`,     
                    start: new Date(dateFormat(state.crop.sowStart)),  
                    end: new Date(dateFormat(state.crop.sowEnd)),     
                    address: 'Portland, OR, USA',
                    description: `Sow ${state.crop.common} (${state.crop.scientific}) indoors before planting out starts later in the growing season`
                }
            });
            const mobileCalendarButtons = addToCalendar({
                options: {
                    class: 'my-class',
                    id: `mobile-${state.crop.id}`                               
                },
                data: {
                    title: `Start ${state.crop.common} from seed indoors`,   
                    start: new Date(dateFormat(state.crop.sowStart)),   
                    end: new Date(dateFormat(state.crop.sowEnd)),     
                    address: 'Portland, OR, USA',
                    description: `Sow ${state.crop.common} (${state.crop.scientific}) indoors before planting out starts later in the growing season`
                }
            });
            document.querySelector(`[data-calid=${sowItem.id}]`).appendChild(generateCalendarButtons);
            document.querySelector(`[mobile-calid=${sowItem.id}]`).appendChild(mobileCalendarButtons);

    } else if(growingChoice === 'start'){
        // create a new selection if there isn't any. 
        if (!state.startSelection) state.startSelection = new Select();

        // add crop to the selection
            const startItem = state.startSelection.addItem(state.crop.id, state.crop.common, state.crop.scientific, dateFormat(state.crop.startBegin), dateFormat(state.crop.startEnd), state.crop.photo_ref, '#D9A168');
            console.log(startItem);
            selectView.renderItem(growingChoice, startItem);
            calendar.createSchedules([startItem]);

            const generateCalendarButtons = addToCalendar({
                options: {
                    class: 'my-class',
                    id: state.crop.id                               
                },
                data: {
                    title: `Plant ${state.crop.common} starts`,     
                    start: new Date(dateFormat(state.crop.startBegin)),   
                    end: new Date(dateFormat(state.crop.startEnd)),     
                    address: 'Portland, OR, USA',
                    description: `Sow ${state.crop.common} (${state.crop.scientific}) indoors before planting out starts later in the growing season`
                }
            });
            const mobileCalendarButtons = addToCalendar({
                options: {
                    class: 'my-class',
                    id: `mobile-${state.crop.id}`                              
                },
                data: {
                    title: `Plant ${state.crop.common} starts`,     
                    start: new Date(dateFormat(state.crop.startBegin)),   
                    end: new Date(dateFormat(state.crop.startEnd)),     
                    address: 'Portland, OR, USA',
                    description: `Sow ${state.crop.common} (${state.crop.scientific}) indoors before planting out starts later in the growing season`
                }
            });
            document.querySelector(`[data-calid=${startItem.id}]`).appendChild(generateCalendarButtons);
            document.querySelector(`[mobile-calid=${startItem.id}]`).appendChild(mobileCalendarButtons);
            elements.calendarButtonLabel.innerHTML.replace('Add to calendar', 'Export Crop')
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
        if (state.indoorSelection) {
            state.indoorSelection.deleteItem(id);
        } else if (state.sowSelection) {
            state.sowSelection.deleteItem(id);
        } else {
            state.startSelection.deleteItem(id);
        }
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
    let addButton = e.target.closest('.indoorAdd')
    let sowButton = e.target.closest('.sowAdd')
    let startButton = e.target.closest('.startAdd')
    if(addButton){
        console.log(state.crop)
        controlSelect('indoor');
    } else if (sowButton){
        console.log(state.crop)
        controlSelect('sow');
    } else if(startButton){
        console.log(state.crop)
        controlSelect('start');
    }
});


/*
Calendar Controller
*/

// Display month name
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
    taskView: true,    
});

// Change Calendar View
elements.dayCalendarToggle.addEventListener('click', () => {
    calendar.changeView('day', true)
})
elements.monthCalendarToggle.addEventListener('click', () => {
    calendar.changeView('month', true)
})

elements.calendarButtonLabel.innerHTML = elements.calendarButtonLabel.innerHTML.replace('Add to calendar', 'Export Crop')










