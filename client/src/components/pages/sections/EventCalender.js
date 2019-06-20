import React, {Component} from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

import 'react-big-calendar/lib/sass/styles.scss'

class EventCalender extends Component {

    state = {
        localizer: BigCalendar.momentLocalizer(moment),
        events: [
            {
                id: 12.5,
                title: 'Final Exams - SEM 1',
                start: new Date(2019, 5, 6, 19, 30, 0),
                end: new Date(2019, 5, 6, 23, 30, 0),
            },
            {
                id: 13,
                title: 'First Day - SEM 2',
                start: new Date(2019, 6, 1, 8, 30, 0),
                end: new Date(2019, 6, 1, 5, 30, 0),
            },
            {
                id: 14,
                title: 'AF Viva',
                start: new Date(new Date().setHours(new Date().getHours() - 3)),
                end: new Date(new Date().setHours(new Date().getHours() + 3)),
            }
        ]
    }


    render() {
        return (
            <BigCalendar
                localizer={this.state.localizer}
                events={this.state.events}
                startAccessor="start"
                endAccessor="end"
            />
        )
    }
}

export default EventCalender;

