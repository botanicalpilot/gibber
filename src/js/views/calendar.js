import Calendar from 'tui-calendar';
import "../../../node_modules/tui-calendar/dist/tui-calendar.css";

import '../../../node_modules/tui-date-picker/dist/tui-date-picker.css';
import '../../../node_modules/tui-time-picker/dist/tui-time-picker.css';

export const calendar = new Calendar('#calendar', {
    defaultView: 'month',
    taskView: true,
    template: {
        monthDayname: function(dayname) {
            return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
        }
    }
});
