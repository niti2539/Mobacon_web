import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import logo from '../../assets/img/logo.png';
import svgnet from '../../assets/img/mobaconsvgnet.png';
import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler, AppSidebarMinimizer } from '@coreui/react';
import { Link } from 'react-router-dom';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  state = {
    notExpand: false,
  }
  toggleHandler = () => {
    let doesshow = this.state.notExpand;
    this.setState({notExpand: !doesshow});
    
  }
  
 
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        {/* <AppNavbarBrand
          full={{ src: svgnet, width: 150, height: 150, alt: 'CoreUI Logo' }}
          minimized={{ src: logo, width: 30, height: 30, alt: 'CoreUI Logo' }}
        /> */}
        <div className="backgroundLogo"><img src={svgnet} width="150" className="Logo"></img></div>
        
        
        <Nav  navbar>
          <NavItem className="d-md-down-none">
            <NavLink href="/chat"><i className="icon-bubble"></i></NavLink>
          </NavItem>
          
          {/*
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-list"></i></NavLink>
          </NavItem>
          */}
           <NavItem className="d-md-down-none adminName" style={{ width: 100}}>
            <p className="admin">Admin name</p>
            </NavItem>
          <AppHeaderDropdown direction="down">

            <DropdownToggle nav>
              <i className="icon-arrow-down"></i>
              <img src={'../assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <Link to="/profile"><DropdownItem className="cursorProfile"><i className="fa fa-user"></i> YOUR PROFILES</DropdownItem></Link>
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
