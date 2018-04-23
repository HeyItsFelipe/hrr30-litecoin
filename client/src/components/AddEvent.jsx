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

class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      startDate: '',
      endDate: '',
      allDay: false // Set true for all-day event
    };
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleStartDateChange(e) {
    this.setState({ startDate: e._d});
  }

  handleEndDateChange(e) {
    this.setState({ endDate: e._d });
  }

  //Creates an event with the state inputs
  onCreateClick(e) {
    var event = {
      title: this.state.title,
      start: this.state.startDate,
      end: this.state.endDate,
      allDay: this.state.allDay,
      username: this.props.username
    };

    this.addEvent(event);
  }

  //Sends event details to database, fetches new events, and changes view to calendar component.
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
        this.props.getEvents(this.props.username);
        this.props.changeView('calendar');
      }

    });
  }

  render () {
    //Reference React-Bootstrap for help in understanding the code
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
            onChange={this.handleEndDateChange.bind(this)} />
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

export default AddEvent;