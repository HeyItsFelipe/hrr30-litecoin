import React from 'react';
import ReactDOM from 'react-dom';
// import Signup from './Signup.jsx'
import $ from 'jquery';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
// import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Calendar from './Calendar.jsx';
// import DatePicker from "react-bootstrap-date-picker/lib/index.js";
import Datetime from 'react-datetime';

class DeleteEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  onDeleteClick(e) {

  }

  //retrieve event on load
  componentDidMount() {
    console.log('Entering componentDidMount....');
    $.ajax({
      method: 'GET',
      url: '/events',
      data: {username: this.props.username},
      contentType: 'application/json',
      error: error => {
        console.log('Error retrieving events :', error);
      },
      success: data => {
        console.dir(`this in DeleteEvent.jsx's getEvents: `);
        console.dir(this);
        this.setState({
          events: data
        });
      }
    });

  }

  //delete one event
  deleteEvent(e) {
    console.log('deleteEvent....');
    console.log(e);
    $.ajax({
      method: 'DELETE',
      url: '/deleteEvent',
      data: JSON.stringify({eventID: e}),
      contentType: 'application/json',
      error: error => {
        console.log('Error deleting event: ', error);
      },
      success: data => {
        console.log('success in deleteEvent...');
        // this.setState({
        //   events: data
        // });

        //console.log('Data saved: ', data);
        // console.log(this.props);
        // console.log(this.username);
        //console.log(this);
        //this.props.getEvents(this.props.username);
        //this.props.changeView('calendar');
      }

    });
  }

  render () {
    console.log('Entering rendering....');
    console.log(this.state.events);
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