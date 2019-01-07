import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
  withRouter
} from "react-router-dom";
import { hot } from "react-hot-loader";
import io from "socket.io-client";

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
import { api } from "../src/Configs";
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
  faBars,
  faComments,
  faChevronDown,
  faBell,
  faPaperPlane,
  faChartBar,
  faServer,
  faFileAlt,
  faEnvelope,
  faUser,
  faCog,
  faChevronCircleLeft
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
library.add(faComments);
library.add(faBell);
library.add(faChevronDown);
library.add(faPaperPlane);
library.add(faChevronCircleLeft);

library.add(faChartBar);
library.add(faServer);
library.add(faFileAlt);
library.add(faEnvelope);
library.add(faUser);
library.add(faCog);

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
    const token = localStorage.getItem("accessToken");
    window.socket = io(api.baseUrl, {
      query: { token }
    });

    //set new token after token expire
    window.socket.on("authorized", payload => {
      if (!payload.ok) {
        const newToken = payload.token;
        if (newToken) {
          localStorage.setItem("accessToken", newToken);
        }
      }
      console.log("Authorized ok", payload.ok);
    });
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

export default hot(module)(AppWrapper);
