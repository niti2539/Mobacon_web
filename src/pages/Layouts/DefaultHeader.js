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
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { api, imageRequest } from "../../Configs";
import { Link } from "react-router-dom";
import { notify } from "../../stores/actions";
const propTypes = {
  children: PropTypes.node
};
import styled from "styled-components";

const NotifyCicle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: #82e236;
  position: absolute;
  border: 1px solid #fff;
  right: -4px;
  top: -4px;
`;

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notExpand: false,
      user: {},
      notify: { count: 0 }
    };
  }

  toggleHandler = () => {
    let doesshow = this.state.notExpand;
    this.setState({ notExpand: !doesshow });
  };

  handlePropsChange = prevProps => {
    if (prevProps.user.user_detail !== this.props.user.user_detail) {
      this.setUser();
    }
    if (prevProps.notify.count !== this.props.notify.count) {
      this.setState({ notify: this.props.notify });
    }
  };

  componentDidMount = () => {
    this.setUser();
    this.getNotify();
    this.onNotify();
  };

  getNotify = () => {
    try {
      window.socket.emit("web-count-unread-chat", null, payload => {
        if (payload.ok) {
          this.props.setNotify(payload.data);
        }
      });
    } catch (err) {
      console.log("get notify again", err);
    }
  };

  onNotify = () => {
    try {
      window.socket.on("mobile-chat", () => {
        this.getNotify();
      });
    } catch (err) {
      console.log("get notify again", err);
    }
  };

  setUser = async () => {
    const {
      user: { user_detail: user }
    } = this.props;
    try {
      const result = await imageRequest(user.imagePath);
      this.setState({
        user: {
          ...user,
          imagePath: result
        }
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      }
      console.log(error);
    }
  };

  componentDidUpdate = prevProps => {
    // console.log("prev user", prevProps.user.user_detail);
    // console.log("new user", this.props.user.user_detail);
    // console.log(
    //   "isEqual data",
    //   prevProps.user.user_detail === this.props.user.user_detail
    // );
    this.handlePropsChange(prevProps);
  };

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    const { user, notify } = this.state;
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

        <Nav navbar >
          <div className="navbarIcon">
            <NavItem>
              <NavLink href="/chat">
                <Icon icon="comments" />
                {notify.count > 0 && <NotifyCicle />}
              </NavLink>
            </NavItem>
          </div>
          <NavItem className="adminName" style={{ width: 100 }}>
            <p className="admin">{user.fullName}</p>
          </NavItem>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <Icon icon="chevron-down" />
              {user.imagePath && (
                <img
                  src={user.imagePath}
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

const mapStateToProps = ({ user, notify }) => ({ user, notify });

const mapDispathToProps = dispatch => {
  return {
    setNotify: notify.setNotify(dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(DefaultHeader);
