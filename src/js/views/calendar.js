import Calendar from 'tui-calendar';
import "tui-calendar/dist/tui-calendar.css";

import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

const calendar = new Calendar('#calendar', {
    defaultView: 'month',
    taskView: true,
    template: {
        monthDayname: function(dayname) {
            return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
        }
    }
});

export calendar