import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
  withRouter
} from "react-router-dom";
import "./App.css";
// Styles
// CoreUI Icons Set
import "@coreui/icons/css/coreui-icons.min.css";
// Import Flag Icons Set
import "flag-icon-css/css/flag-icon.min.css";
// Import Font Awesome Icons Set
import "font-awesome/css/font-awesome.min.css";
// Import Simple Line Icons Set
import "simple-line-icons/css/simple-line-icons.css";

import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "react-chat-elements/dist/main.css";

//semantic ui
// import 'semantic-ui-css/semantic.min.css'

import { connect } from "react-redux";
import { user } from "./stores/actions";

// Import Main styles for this application
import "./scss/style.scss";

// Containers
import DefaultLayout from "./pages/Layouts";
// Pages
import Login from "./pages/LoginPage";
import Register from "./pages/Register";
import Page404 from "./pages/Page404";
import Page500 from "./pages/Page500";
//fontawesome 5.4.1 versions
import { library } from "@fortawesome/fontawesome-svg-core";
import { Provider } from "react-redux";
import { store } from "./stores";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faInfoCircle,
  faCheck,
  faCircle,
  faCaretDown,
  faUpload,
  faTimes,
  faThumbsUp,
  faThumbsDown,
  faBars
} from "@fortawesome/free-solid-svg-icons";

library.add(faAngleDown);
library.add(faInfoCircle);
library.add(faCheck);
library.add(faCircle);
library.add(faCaretDown);
library.add(faUpload);
library.add(faTimes);
library.add(faThumbsDown);
library.add(faThumbsUp);
library.add(faBars);

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" name="Login" component={Login} />
        <Route exact path="/login" name="Login" component={Login} />
        <MainRoute />
        <Route name="Page 404" component={Page404} />
        <Route name="Page 500" component={Page500} />
      </Switch>
    );
  }
}

const AppWrapper = props => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

class MainRoute extends React.Component {
  componentDidMount() {
    console.log("Authorization");
    user.authorize(store.dispatch);
  }

  render() {
    return (
      <React.Fragment>
        <CustomRoute exact path="/dashboard" component={DefaultLayout} />
        <CustomRoute exact path="/plans" component={DefaultLayout} />
        <CustomRoute exact path="/requests" component={DefaultLayout} />
        <CustomRoute exact path="/request/:id" component={DefaultLayout} />
        <CustomRoute exact path="/accepted" component={DefaultLayout} />
        <CustomRoute exact path="/operator" component={DefaultLayout} />
        <CustomRoute exact path="/chat" component={DefaultLayout} />
        <CustomRoute exact path="/profile" component={DefaultLayout} />
        <CustomRoute exact path="/logout" component={DefaultLayout} />
      </React.Fragment>
    );
  }
}

class CustomRoute extends React.Component {
  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          localStorage.getItem("accessToken") ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  }
}

export default AppWrapper;
