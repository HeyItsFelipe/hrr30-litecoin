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
import Calendar from './components/Calendar.jsx';
import AddEvent from './components/AddEvent.jsx';
import DeleteEvent from './components/DeleteEvent.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: '',
      username: '',
      password: '',
      error: '' // Changes based on response from onSignInClick
    };
  }

  //Changes view based on event that calls function
  changeView(newView) {
    console.log(`view in index.jsx has been changed to ${newView}`);
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
        console.log('You got an error!');
        this.setState({
          error: 'Check username and/or password'
        });
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
      return <Calendar username={this.state.username} changeView={this.changeView.bind(this)}/>
    } else if (view === 'addEvent') {
      return <AddEvent username={this.state.username} changeView={this.changeView.bind(this)} getEvents={Calendar.prototype.getEvents.bind(this)}/>
    } else if(view === 'deleteEvent') {
      return <DeleteEvent username={this.state.username} />
    } else {
      //Default component - sign-in page
      return (
        <Form horizontal className="signin-form">
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} smOffset={3} sm={2}>
              Username
            </Col>
            <Col sm={3}>
              <FormControl
              type="text"
              value={this.state.username}
              onChange={this.handleUsernameChange.bind(this)}
              placeholder="Username" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} smOffset={3} sm={2}>
              Password
            </Col>
            <Col sm={3}>
              <FormControl
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange.bind(this)}
              placeholder="Password" />
            </Col>
          </FormGroup>

          <Col smOffset={5} sm={3}>
            <div className="text-center text-danger invalid-text">{this.state.error}</div>
          </Col>

          <FormGroup>
            <Col smOffset={5} sm={7}>
              <Checkbox>Remember me</Checkbox>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={5} sm={7}>
              <Button onClick={this.onSignInClick.bind(this)}>Sign in</Button>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={5} sm={7}>
              <Button bsStyle="link" className="signup-link" onClick={this.onSignUpClick.bind(this)}>Sign up</Button>
            </Col>
          </FormGroup>
        </Form>
      )
    }
  }

  //Renders view based on conditional in renderView
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