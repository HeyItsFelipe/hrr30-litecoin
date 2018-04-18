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
      view: ''
    };
  }

  changeView(newView) {
    this.setState({
      view: newView
    });
  }

  renderView() {
    const {view} = this.state;

    if (view === 'signup') {
      return <Signup changeView={this.changeView.bind(this)} />
    } else if(view === 'calendar') {
      return <Calendar />
    } else {
      return <Signin changeView={this.changeView.bind(this)} />
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