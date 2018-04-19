import React from 'react';
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import $ from 'jquery';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordError: '',
      emailError: ''
    };
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(username, email, password) {
    $.ajax({
      url: "/signup",
      method: "POST",
      contentType: "application/JSON",
      data: JSON.stringify({username: username, email: email, password: password}),
      success: (data) => {
        this.props.changeView('calendar');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  handleClick() {
    this.setState({
      passwordError: '',
      emailError: ''
    });

    if(this.passwordIsValid() && this.emailIsValid()) {
      console.log('I have been clicked!!!');
      this.handleSubmit(this.state.username, this.state.email, this.state.password);
    }

    if(!this.passwordIsValid()){
      this.setState({
        passwordError: 'Invalid Password!'
      });
    }

    if(!this.emailIsValid()) {
      this.setState({
        emailError: 'Invalid Email!'
      });
    }
  }

  passwordIsValid() {
    return this.state.password.length > 4;
  }

  emailIsValid() {
    return this.state.email.includes('@');
  }

  passwordValidationState() {
    const passwordLength = this.state.password.length;
    if (passwordLength > 4) {
      return 'success';
    } else if (passwordLength > 2) {
      return 'warning';
    } else if (passwordLength > 0) {
      return 'error';
    }
    return null;
  }

  emailValidationState() {
    const emailString = this.state.email;
    if(emailString.length === 0) {
      return null;
    } else if(emailString.includes('@')) {
      return 'success';
    } else if(!emailString.includes('@')){
      return 'error';
    }
  }

  render () {
    return (
      <Form horizontal className="signup-form">
        <FormGroup controlId="formHorizontalUsername">
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

        <FormGroup controlId="formHorizontalEmail" validationState={this.emailValidationState()}>
          <Col componentClass={ControlLabel} smOffset={3} sm={2}>
            Email
          </Col>
          <Col sm={3}>
            <FormControl
            type="email"
            value={this.state.email}
            onChange={this.handleEmailChange.bind(this)}
            placeholder="Email" />
          </Col>
        </FormGroup>
        <Col smOffset={5} sm={3}>
          <div className="text-center text-danger invalid-text">{this.state.emailError}</div>
        </Col>

        <FormGroup controlId="formHorizontalPassword" validationState={this.passwordValidationState()}>
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
          <div className="text-center text-danger invalid-text">{this.state.passwordError}</div>
        </Col>

        <FormGroup>
          <Col smOffset={5} sm={7}>
            <Button type="button" onClick={this.handleClick.bind(this)}>Sign up</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default Signup;
