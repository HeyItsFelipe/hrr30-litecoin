import React from 'react';
import ReactDOM from 'react-dom';
import Signup from './components/Signup.jsx'
import $ from 'jquery';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Calendar from './components/Calendar.jsx';
import Signin from './components/Signin.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: '',
      username: '',
      password: ''
    };
  }

  changeView(newView) {
    this.setState({
      view: newView
    });
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  onSignInClick(e) {
    e.preventDefault();
    var data = {username: this.state.username, password: this.state.password};
    $.ajax({
      method: 'POST',
      url: '/signin',
      contentType: 'application/json',
      data: JSON.stringify(data),
      dataType: 'json',
      success: (data) => {
        this.changeView('calendar');
      },
      error: (err) => {
        console.log('You got an error!')
      }
    });
  }

  onSignUpClick(e) {
    this.changeView('signup');
  }

  renderView() {
    const {view} = this.state;

    if (view === 'signup') {
      return <Signup changeView={this.changeView.bind(this)} />
    } else if(view === 'calendar') {
      return <Calendar username={this.state.username}/>
    } else {
      return (
        <Form horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Username
            </Col>
            <Col sm={8}>
              <FormControl
              type="username"
              value={this.state.username}
              onChange={this.handleUsernameChange.bind(this)}
              placeholder="Username" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={10}>
              <FormControl
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange.bind(this)}
              placeholder="Password" />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Checkbox>Remember me</Checkbox>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button onClick={this.onSignInClick.bind(this)}>Sign in</Button>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button bsStyle="link" onClick={this.onSignUpClick.bind(this)}>Sign up</Button>
            </Col>
          </FormGroup>
        </Form>
      )
    }
  }

  render() {
    return (
      <div>
        <div className="main">
          {this.renderView()}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));