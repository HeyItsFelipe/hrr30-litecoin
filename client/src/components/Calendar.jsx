import React from 'react';
import ReactDOM from 'react-dom';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
//importing hardcoded events so calendar can render
import events from '../events';
import $ from 'jquery';

// BigCalendar.momentLocalizer(moment);
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
// let allViews = Object.keys(BigCalendar.views).map(k => BigCalendar.views[k]);

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
      // events: [
      // {
      //   'title': 'Conference',
      //   'start': new Date(2017, 3, 11),
      //   'end': new Date(2017, 3, 13),
      //   desc: 'Big conference for important people'
      // },
      // {
      //   'title': 'Meeting',
      //   'start': new Date(2017, 3, 12, 10, 30, 0, 0),
      //   'end': new Date(2017, 3, 12, 12, 30, 0, 0),
      //   desc: 'Pre-meeting meeting, to prepare for the meeting'
      // },
      // {
      //   'title': 'Lunch',
      //   'start':new Date(2017, 3, 12, 12, 0, 0, 0),
      //   'end': new Date(2017, 3, 12, 13, 0, 0, 0),
      //   desc: 'Power lunch'
      // }]
    };
  }

  componentDidMount() {
    // console.log('username for this calendar: ', this.props.location.state.username);
    // from react router documentation:
    // state object can be accessed via this.props.location.state in the redirected-to component
    // this.getEvents(this.props.location.state.username);

    this.addEvent();

    // this.getEvents(this.props.username);

    // console.log(this.state.events); // getEvents is asynchronous, so this won't wait to reflect this.state.events after ajax call is finished

  }

  getEvents(username) {
    $.ajax({
      method: 'GET',
      url: '/events',
      data: {username: username},
      contentType: 'application/json',
      error: error => {
        console.log('Error retrieving events :', error);
      },
      success: data => {
        this.setState({
          events: data
        });
        console.log('data retrieved in client: ', data);
      }
    });
  }

  addEvent(/*should take in an event to add*/) {
    $.ajax({
      method: 'POST',
      url: '/events',
      data: JSON.stringify(events[0]),
      contentType: 'application/json',
      error: error => {
        console.log('Error adding event: ', error);
      },
      success: data => {
        console.log('Data saved: ', data);
        this.getEvents(this.props.username);
      }

    });
  }

  // // When you choose a particular slot on the calendar
  // onSlotChange(slotInfo) {
  //   var startDate = moment(slotInfo.start.toLocaleString()).format("YYYY-MM-DDm:ss");
  //   var endDate = moment(slotInfo.end.toLocaleString()).format("YYYY-MM-DDm:ss");
  //   console.log('startTimetartDate'); //shows the start time chosen
  //   console.log('endTimendDate'); //shows the end time chosen
  // }

  // // When you click on an already booked slot
  // onEventClick(event) {
  //   console.log(event) // Shows the event details provided while booking
  // }

  render() {
    return (
      <BigCalendar
        events={this.state.events}
        selectable
        defaultDate={new Date()}
        // views={allViews}
       //  onSelectEvent={event => this.onEventClick(event)}
       //  onSelectSlot={(slotInfo) => this.onSlotChange(slotInfo)}
       //  step={30}
       //  timeslots={2}
       //  defaultView='week'
       //  components={{
       //   event: Event,
       //   agenda: {
       //    event: EventAgenda
       //   }
       // }}
      />
    );
  }
}

  // /*Agenda Rendering*/
  // function Event({ event }) {
  //     return (
  //         <span>
  //       <strong>
  //       {event.title}
  //       </strong>
  //             { event.desc && (':  ' + event.desc)}
  //     </span>
  //     )
  // }

  // function EventAgenda({ event }) {
  //     return <span>
  //     <em style={{ color: 'magenta'}}>{event.title}</em>   <p>{ event.desc }</p>
  //   </span>
  // }

/*
let Calendar = () => (
  <BigCalendar
    events={events}
    selectable
    defaultDate={new Date()}
  />
);
*/

export default Calendar;