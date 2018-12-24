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
import { connect } from "react-redux";
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

  handlePropsChange = prevProps => {
    if (prevProps.user.user_detail !== this.props.user.user_detail) {
      this.setState({ user: this.props.user.user_detail });
    }
    // console.log("update user", currentState);
  };

  componentDidMount() {
    this.setState({ user: this.props.user.user_detail });
  }

  componentDidUpdate = prevProps => {
    console.log("prev user", prevProps.user.user_detail);
    console.log("new user", this.props.user.user_detail);
    console.log(
      "isEqual data",
      prevProps.user.user_detail === this.props.user.user_detail
    );
    this.handlePropsChange(prevProps);
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

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(DefaultHeader);
