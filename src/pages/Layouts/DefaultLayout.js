import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import { connect } from "react-redux";

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav
} from "@coreui/react";
// sidebar nav config
import {admin,operator} from "../../_nav";
// routes config
import routes from "../../routes";
import DefaultAside from "./DefaultAside";
import DefaultFooter from "./DefaultFooter";
import DefaultHeader from "./DefaultHeader";

class DefaultLayout extends Component {
  state = {
    nav: null
  };
  
  componentDidMount() {
    if (!this.state.nav && this.props.user_detail && this.props.user_detail.role.id) {
      if(this.props.user_detail.role.id === 2) {
        this.setState({nav: operator})
      } else {
        this.setState({nav: admin})
      }
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (!this.state.nav && nextProps.user_detail && nextProps.user_detail.role.id) {
      if(nextProps.user_detail.role.id === 2) {
        this.setState({nav: operator})
      } else {
        this.setState({nav: admin})
      }

    }
    // if (nextState.open == true && this.state.open == false) {
    //   this.props.onWillOpen();
    // }
  }
  

  render() {
    const { nav } = this.state;
    return (
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader />
        </AppHeader>
        <div className="app-body">
          <div className="side-bar-wrapper">
            <AppSidebar fixed display="lg">
              <AppSidebarHeader />
              <AppSidebarForm />
              {nav &&  <AppSidebarNav navConfig={nav} {...this.props} /> }
              <AppSidebarFooter />
            </AppSidebar>
          </div>
          <div id="mainContainer">
            {/* <AppBreadcrumb appRoutes={routes}/> */}
            <Container fluid style={{ position: "relative" }}>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => <route.component {...props} />}
                    />
                  ) : null;
                })}
                {/* <Redirect from="/" to="/dashboard" /> */}
              </Switch>
            </Container>
          </div>
          <AppAside fixed hidden>
            <DefaultAside />
          </AppAside>
        </div>
        {/* <AppFooter>
          <DefaultFooter />
        </AppFooter> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user_detail: state.user.user_detail
  }
 
};

export default connect(
  mapStateToProps,
  null
)(DefaultLayout);

