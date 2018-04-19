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
// import Calendar from './Calendar.jsx';

class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      allDay: false,
      start: {},
      end: {}
    };
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleStartChange(e) {
    this.setState({ start: e.target.value });
  }

  handleEndChange(e) {
    this.setState({ end: e.target.value });
  }

  onCreateClick(e) {
    e.preventDefault();
    var data = {
      title: this.state.title,
      allDay: this.state.allDay,
      start: this.state.start,
      end: this.state.end
    };

    // should use addEvent function from Calendar.jsx here
    $.ajax({
      method: 'POST',
      url: '/signin',
      contentType: 'application/json',
      data: JSON.stringify(data),
      dataType: 'json',
      success: (data) => {
        this.props.changeView('calendar');
      },
      error: (err) => {
        console.log('You got an error!')
      }
    });
  }

  render () {
    return (
      <Form horizontal>
        <FormGroup controlId="formHorizontalTitle">
          <Col componentClass={ControlLabel} sm={2}>
            Title
          </Col>
          <Col sm={8}>
            <FormControl
            type="title"
            value={this.state.title}
            onChange={this.handleTitleChange.bind(this)}
            placeholder="Title" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalStart">
          <Col componentClass={ControlLabel} sm={2}>
            Start
          </Col>
          <Col sm={10}>
            <FormControl
            type="start"
            value={this.state.start}
            onChange={this.handleStartChange.bind(this)}
            placeholder="Start" />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button onClick={this.onCreateClick.bind(this)}>Create</Button>
          </Col>
        </FormGroup>

      </Form>
    )
  }
}

export default AddEvent;