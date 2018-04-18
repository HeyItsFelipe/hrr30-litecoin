import React from 'react';
import ReactDOM from 'react-dom';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
//importing hardcoded events so calendar can render
import events from '../events';
import $ from 'jquery';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
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

  addEvent() {
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

  render() {
    return (
      <BigCalendar
        events={this.state.events}
        selectable
        defaultDate={new Date()}
      />
    );
  }
}

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