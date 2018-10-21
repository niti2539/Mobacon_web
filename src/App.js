import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link,Redirect } from 'react-router-dom';
import './App.css';
// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';

import "react-datepicker/dist/react-datepicker-cssmodules.css";
import 'react-chat-elements/dist/main.css';

// Import Main styles for this application
import './scss/style.css'

// Containers
import DefaultLayout from './pages/Layouts';
// Pages
import Login from './pages/LoginPage'
import Register from './pages/Register'
import Page404 from './pages/Page404'
import Page500 from './pages/Page500'
//fontawesome 5.4.1 versions
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
library.add(faAngleDown);
class App extends Component {

  render() {
    console.log(localStorage.getItem('accessToken'))
    return (
      <Router>
        <div>
          <Route exact path="/" name="Login" component={Login} />
          <Route exact path="/login" name="Login" component={Login} />
          <Route exact path="/register" name="Register" component={Register} />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <PrivateRoute exact path="/dashboard" component={DefaultLayout}/>
          <PrivateRoute exact path="/plans" component={DefaultLayout} />
          <PrivateRoute exact path="/offers" component={DefaultLayout} />
          <PrivateRoute exact path="/requests" component={DefaultLayout} />
          <PrivateRoute exact path="/request/:id" component={DefaultLayout} />
          <PrivateRoute exact path="/operator" component={DefaultLayout} />
          <PrivateRoute exact path="/chat" component={DefaultLayout} />
          <PrivateRoute exact path="/profile" component={DefaultLayout} />
          <PrivateRoute exact path="/logout" component={DefaultLayout} />
        </div>
      </Router>
    )
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={ (props) => (
    localStorage.getItem('accessToken') ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
 );
export default App;
