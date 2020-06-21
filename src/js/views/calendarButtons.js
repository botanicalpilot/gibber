import {addToCalendar} from '../../../node_modules/add-to-calendar-buttons';
import { elements } from './base';


export const calendarButton = (title, start, end, scientific, growingChoice) => {
     const makeCalButton = addToCalendar({
        options: {
            class: 'my-class',
            id: 'my-id'                               // If you don't pass an id, one will be generated for you.
        },
        data: {
            title: `Start ${title} from seed indoors`,     // Event title
            start: new Date(start),   // Event start date
            // timezone: America/Los_Angeles,					// converts the time to the IANA timezone 
            end: new Date(end),     // If an end time is set, this will take precedence over duration
            // duration: 120,                            // Event duration (IN MINUTES)
            // allday: true,													// Override end time, duration and timezone, triggers 'all day'
            address: 'Portland, OR, USA',
            description: `Sow ${title} (${scientific}) indoors before planting out starts later in the growing season`
        }
    });
    elements.calendarButton.InsertinsertAdjacentHTML('beforeend', makeCalButton);
} 