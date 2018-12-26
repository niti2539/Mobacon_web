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

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notExpand: false,
      user: {}
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  toggleHandler = () => {
    let doesshow = this.state.notExpand;
    this.setState({ notExpand: !doesshow });
  };

  handlePropsChange = prevProps => {
    if (prevProps.user.user_detail !== this.props.user.user_detail) {
      this.setUser();
    }
  };

  componentDidMount() {
    this.setUser();
  }

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
          <div className="navbarIcon">
            <NavItem className="d-md-down-none">
              <NavLink href="/chat">
                <Icon icon="comments" />
              </NavLink>
            </NavItem>
            {/* <NavItem className="d-md-down-none">
              <NavLink href="#">
                <Icon icon="bell" />
              </NavLink>
            </NavItem> */}
          </div>
          <NavItem className="d-md-down-none adminName" style={{ width: 100 }}>
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

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(DefaultHeader);
