import React, { Component } from "react";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import PropTypes from "prop-types";
import logo from "../../assets/img/logo.png";
import svgnet from "../../assets/img/mobaconsvgnet.png";
import avatar from "../../assets/img/avatars/6.jpg";
import {
  AppAsideToggler,
  AppHeaderDropdown,
  AppNavbarBrand,
  AppSidebarToggler,
  AppSidebarMinimizer
} from "@coreui/react";
import { api } from "../../Configs";
import { Link } from "react-router-dom";
import { store } from "../../stores";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultHeader extends Component {
  state = {
    notExpand: false,
    user: {}
  };
  toggleHandler = () => {
    let doesshow = this.state.notExpand;
    this.setState({ notExpand: !doesshow });
  };

  componentDidMount() {
    const {
      user: { user_detail: user }
    } = store.getState();
    store.subscribe(this.handlePropsChange);
    this.setState({ user });
    // console.log("user", user);
  }

  handlePropsChange = () => {
    let prevState = this.state;
    let {
      user: { user_detail: currentState }
    } = store.getState();

    if (prevState.user !== currentState) {
      this.setState({ user: currentState });
    }
    console.log("update user", currentState);
  };

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    const { user } = this.state;
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        {/* <AppNavbarBrand
          full={{ src: svgnet, width: 150, height: 150, alt: 'CoreUI Logo' }}
          minimized={{ src: logo, width: 30, height: 30, alt: 'CoreUI Logo' }}
        /> */}
        <div className="backgroundLogo">
          <img src={svgnet} width="150" className="Logo" />
        </div>

        <Nav navbar>
          <NavItem className="d-md-down-none">
            <NavLink href="/chat">
              <i className="icon-bubble" />
            </NavLink>
          </NavItem>

          {/*
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-list"></i></NavLink>
          </NavItem>
          */}
          <NavItem className="d-md-down-none adminName" style={{ width: 100 }}>
            <p className="admin">{user.fullName}</p>
          </NavItem>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <i className="icon-arrow-down" />
              {user.imagePath && (
                <img
                  src={`${api.baseUrl + user.imagePath}`}
                  className="img-avatar"
                  alt={user.email}
                />
              )}
            </DropdownToggle>
            <DropdownMenu right style={{ right: "auto" }}>
              <Link to="/profile">
                <DropdownItem className="cursorProfile">
                  <i className="fa fa-user" /> YOUR PROFILES
                </DropdownItem>
              </Link>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
