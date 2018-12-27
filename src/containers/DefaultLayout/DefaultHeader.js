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

import {
  AppAsideToggler,
  AppHeaderDropdown,
  AppNavbarBrand,
  AppSidebarToggler,
  AppSidebarMinimizer
} from "@coreui/react";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultHeader extends Component {
  state = {
    name: "APP NAME HERE",
    notExpand: false
  };
  toggleHandler = () => {
    let doesshow = this.state.notExpand;
    this.setState({ notExpand: !doesshow });
    if (this.state.notExpand) {
      this.setState({ name: "N" });
    } else {
      this.setState({ name: "APP NAME HERE" });
    }
  };

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    var elem = document.getElementsByClassName("navbar-brand-minimized");
    console.log(elem.values);

    return <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />

        <AppSidebarMinimizer className="headerName navbar-brand-minimized navbar-brand">
          <span onClick={() => this.toggleHandler()} onChange={this.toggleHandler}>
            {this.state.name}
          </span>
        </AppSidebarMinimizer>
        {/*<AppSidebarToggler className="d-md-down-none" display="lg" />*/}

        {/*
        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink href="/">Dashboard</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#/users">Users</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#">Settings</NavLink>
          </NavItem>
        </Nav>
        */}

        <Nav navbar>
          <NavItem className="d-md-down-none">
            <NavLink href="/chat">
              <i className="icon-bubble" />
            </NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink href="#">
              <i className="icon-bell" />
              <Badge pill color="danger">
                5
              </Badge>
            </NavLink>
          </NavItem>
          {/*
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-list"></i></NavLink>
          </NavItem>
          */}
          <NavItem className="d-md-down-none adminName" style={{ width: 100 }}>
            <p className="admin">Admin name</p>
          </NavItem>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <i className="icon-arrow-down" />
              <img src={avatars6} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: "auto" }}>
              <DropdownItem header tag="div" className="text-center">
                <strong>Account</strong>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-bell-o" /> Updates
                <Badge color="info">42</Badge>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-envelope-o" /> Messages
                <Badge color="success">42</Badge>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-tasks" /> Tasks
                <Badge color="danger">42</Badge>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-comments" /> Comments
                <Badge color="warning">42</Badge>
              </DropdownItem>
              <DropdownItem header tag="div" className="text-center">
                <strong>Settings</strong>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-user" /> Profile
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-wrench" /> Settings
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-usd" /> Payments
                <Badge color="secondary">42</Badge>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-file" /> Projects
                <Badge color="primary">42</Badge>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <i className="fa fa-shield" /> Lock Account
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-lock" /> Logout
              </DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        {/*<AppAsideToggler className="d-md-down-none" />*/}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>;
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
