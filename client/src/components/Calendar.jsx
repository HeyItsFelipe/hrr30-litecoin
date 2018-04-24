import React from 'react';
import ReactDOM from 'react-dom';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import events from '../events';
import $ from 'jquery';

//Sets calendar module to current local time zone
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  //Renders a different view based on triggered event
  changeView(view) {
    this.props.changeView(view);
  }

  componentDidMount() {
    this.getEvents(this.props.username);
  }

  //Fetches and returns event data for a given username
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
      }
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.changeView.bind(this, 'addEvent')}>Add Event</button>
        <button onClick={this.changeView.bind(this, 'deleteEvent')}>Delete Event</button>
        <BigCalendar
          events={this.state.events}
          selectable
          defaultDate={new Date()}
        />
      </div>
    );
  }
}

export default Calendar;