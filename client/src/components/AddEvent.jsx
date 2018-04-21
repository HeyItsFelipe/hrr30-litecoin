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

class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      startDate: '',
      endDate: '',
      allDay: false, // can keep it false permanently for now?
    };
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleStartDateChange(e) {
    // console.log('startDate: ', e._d);
    this.setState({ startDate: e._d});
    console.log(this.state.startDate);
  }

  handleEndChange(e) {
    this.setState({ endDate: e._d });
  }

  onCreateClick(e) {
    // e.preventDefault();
    var event = {
      title: this.state.title,
      start: this.state.startDate,
      end: this.state.endDate,
      allDay: this.state.allDay,
      username: this.props.username
    };

    console.log(event);

    // should use addEvent function from Calendar.jsx here
    // should only re-render calendar page if the event is saved in database correctly

    // console.log('typeof this.props.addEvent: ', typeof this.props.addEvent);
    console.dir(this.props.addEvent);
    this.addEvent(event);

    // placed in Calendar.jsx's addEvent
    // this.props.changeView('calendar');


  }

  addEvent(event) {
    $.ajax({
      method: 'POST',
      url: '/events',
      data: JSON.stringify(event),
      contentType: 'application/json',
      error: error => {
        console.log('Error adding event: ', error);
      },
      success: data => {
        console.log('Data saved: ', data);
        // console.log(this.props);
        // console.log(this.username);
        console.log(this);
        this.props.getEvents(this.props.username);
        this.props.changeView('calendar');
      }

    });
  }

  // toggle() {
  //   this.setState({
  //     allDay: !this.state.allDay
  //   });
  //   // console.log(`allDay: ${this.state.allDay}`);
  // }

  render () {
    return (
      <Form horizontal className="addevent-form">
        <FormGroup controlId="formHorizontalTitle">
          <Col componentClass={ControlLabel} smOffset={3} sm={2}>
            Event Title
          </Col>
          <Col sm={3}>
            <FormControl
            type="text"
            value={this.state.title}
            onChange={this.handleTitleChange.bind(this)}
            placeholder="Eric's Party!!!" />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col componentClass={ControlLabel} smOffset={3} sm={2}>
            Start Date/Time
          </Col>
          <Col sm={3}>
            <Datetime
            id="start-dateTimePicker"
            onChange={this.handleStartDateChange.bind(this)} />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col componentClass={ControlLabel} smOffset={3} sm={2}>
            End Day/Time
          </Col>
          <Col sm={3}>
            <Datetime
            id="end-dateTimePicker"
            onChange={this.handleEndChange.bind(this)} />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={5} sm={7}>
            <Button onClick={this.onCreateClick.bind(this)}>Create</Button>
          </Col>
        </FormGroup>

      </Form>
    )
  }
}

/*
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Checkbox onClick={this.toggle.bind(this)}>All Day</Checkbox>
          </Col>
        </FormGroup>
*/

export default AddEvent;