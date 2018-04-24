import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Calendar from './Calendar.jsx';
import Datetime from 'react-datetime';

class DeleteEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  //Retrieve events on load
  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: '/events',
      data: {username: this.props.username},
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

  //Delete's an event based on its index(eventID)
  deleteEvent(eventID) {
    $.ajax({
      method: 'DELETE',
      url: '/deleteEvent',
      data: JSON.stringify({eventID: eventID}),
      contentType: 'application/json',
      error: error => {
        console.log('Error deleting event: ', error);
      },
      success: data => {
        console.log('success in deleteEvent...');
      }
    });
  }

  render () {
    //Renders list of events in component's state
    const listItems = this.state.events.map((event) =>
    <li key={event._id}>{event.title} <button onClick={() => this.deleteEvent(event._id)}>Delete</button></li>
    );
    return(
      <ul>{listItems}
      </ul>
    )
  }
}

export default DeleteEvent;