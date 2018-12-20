import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Nav, NavItem, NavLink, Progress, TabContent, TabPane, ListGroup, ListGroupItem } from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styled from 'styled-components';

const AsideStyle = styled.div`
  position: fixed;
  z-index: 1000000000;
  width: 300px;
  right: 0;
  top: 0;
  height: 100vh;
  margin-top: 55px;
  .tab-content{
    height: calc(100vh - 95px);
    overflow-x: hidden;
    overflow-y: auto;
  }
  display: ${props => props.opacity ? 'block' : 'none'};
`;

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class RequestAside extends Component {

  state = {
    activeTab: '1',
    visible: this.props.visible
  }

  componentDidMount(){
    this.setState({
      visible: this.props.visible
    })
  }

  componentWillReceiveProps(nextProps){
    console.log('visible',nextProps)
    this.setState({
      visible: this.props.visible
    })
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    return (
      <AsideStyle opacity={this.state.visible}>
        <Card>
          <CardHeader>
            HISTORY
            <div className="card-header-actions" onClick={() => this.setState({visible: false})}>
              <div className="card-header-action btn btn-setting"><i className="fa fa-times"></i></div>
            </div>
          </CardHeader>
          <Nav tabs>
            <NavItem>
              <NavLink 
                className={classNames({ active: this.state.activeTab === '1' })}
                onClick={() => {
                  this.toggle('1');
                }}>
                <i className="icon-list"></i> REVIEW
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classNames({ active: this.state.activeTab === '2' })}
                      onClick={() => {
                        this.toggle('2');
                      }}>
                <i className="icon-speech"></i> CHAT
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <ListGroup className="list-group-accent">
                <ListGroupItem className="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">Today</ListGroupItem>
                <ListGroupItem action tag="a" href="#" className="list-group-item-accent-warning list-group-item-divider">
                  <div className="avatar float-right">
                    {/* <img className="img-avatar" src="../../assets/img/avatars/7.jpg" alt="admin@bootstrapmaster.com"></img> */}
                  </div>
                  <div>Meeting with <strong>Lucas</strong> </div>
                  <small className="text-muted mr-3">
                    <i className="icon-calendar"></i>&nbsp; 1 - 3pm
                  </small>
                  <small className="text-muted">
                    <i className="icon-location-pin"></i> Palo Alto, CA
                  </small>
                </ListGroupItem>
                <ListGroupItem action tag="a" href="#" className="list-group-item-accent-info list-group-item-divider">
                  <div className="avatar float-right">
                    {/* <img className="img-avatar" src="../../assets/img/avatars/4.jpg" alt="admin@bootstrapmaster.com"></img> */}
                  </div>
                  <div>Skype with <strong>Megan</strong></div>
                  <small className="text-muted mr-3">
                    <i className="icon-calendar"></i>&nbsp; 4 - 5pm
                  </small>
                  <small className="text-muted">
                    <i className="icon-social-skype"></i> On-line
                  </small>
                </ListGroupItem>
                <ListGroupItem className="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">Tomorrow</ListGroupItem>
                <ListGroupItem action tag="a" href="#" className="list-group-item-accent-danger list-group-item-divider">
                  <div>New UI Project - <strong>deadline</strong></div>
                  <small className="text-muted mr-3"><i className="icon-calendar"></i>&nbsp; 10 - 11pm</small>
                  <small className="text-muted"><i className="icon-home"></i>&nbsp; creativeLabs HQ</small>
                  <div className="avatars-stack mt-2">
                    <div className="avatar avatar-xs">
                      {/* <img src={'../../assets/img/avatars/2.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" /> */}
                    </div>
                    <div className="avatar avatar-xs">
                      {/* <img src={'../../assets/img/avatars/3.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" /> */}
                    </div>
                    <div className="avatar avatar-xs">
                      {/* <img src={'../../assets/img/avatars/4.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" /> */}
                    </div>
                    <div className="avatar avatar-xs">
                      {/* <img src={'../../assets/img/avatars/5.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" /> */}
                    </div>
                    <div className="avatar avatar-xs">
                      {/* <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" /> */}
                    </div>
                  </div>
                </ListGroupItem>
                <ListGroupItem action tag="a" href="#" className="list-group-item-accent-success list-group-item-divider">
                  <div><strong>#10 Startups.Garden</strong> Meetup</div>
                  <small className="text-muted mr-3"><i className="icon-calendar"></i>&nbsp; 1 - 3pm</small>
                  <small className="text-muted"><i className="icon-location-pin"></i>&nbsp; Palo Alto, CA</small>
                </ListGroupItem>
                <ListGroupItem action tag="a" href="#" className="list-group-item-accent-primary list-group-item-divider">
                  <div><strong>Team meeting</strong></div>
                  <small className="text-muted mr-3"><i className="icon-calendar"></i>&nbsp; 4 - 6pm</small>
                  <small className="text-muted"><i className="icon-home"></i>&nbsp; creativeLabs HQ</small>
                  <div className="avatars-stack mt-2">
                    <div className="avatar avatar-xs">
                      {/* <img src={'../../assets/img/avatars/2.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" /> */}
                    </div>
                    <div className="avatar avatar-xs">
                      {/* <img src={'../../assets/img/avatars/3.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" /> */}
                    </div>
                    <div className="avatar avatar-xs">
                      {/* <img src={'../../assets/img/avatars/4.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" /> */}
                    </div>
                    <div className="avatar avatar-xs">
                      {/* <img src={'../../assets/img/avatars/5.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" /> */}
                    </div>
                    <div className="avatar avatar-xs">
                      {/* <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" /> */}
                    </div>
                    <div className="avatar avatar-xs">
                      {/* <img src={'../../assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" /> */}
                    </div>
                    <div className="avatar avatar-xs">
                      {/* <img src={'../../assets/img/avatars/8.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" /> */}
                    </div>
                  </div>
                </ListGroupItem>
              </ListGroup>
            </TabPane>
            <TabPane tabId="2" className="p-3">
              <div className="message">
                <div className="py-3 pb-5 mr-3 float-left">
                  <div className="avatar">
                    {/* <img src={'../../assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" /> */}
                    <span className="avatar-status badge-success"></span>
                  </div>
                </div>
                <div>
                  <small className="text-muted">Lukasz Holeczek</small>
                  <small className="text-muted float-right mt-1">1:52 PM</small>
                </div>
                <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
                <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt...
                </small>
              </div>
              <hr />
              <div className="message">
                <div className="py-3 pb-5 mr-3 float-left">
                  <div className="avatar">
                    {/* <img src={'../../assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" /> */}
                    <span className="avatar-status badge-success"></span>
                  </div>
                </div>
                <div>
                  <small className="text-muted">Lukasz Holeczek</small>
                  <small className="text-muted float-right mt-1">1:52 PM</small>
                </div>
                <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
                <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt...
                </small>
              </div>
              <hr />
              <div className="message">
                <div className="py-3 pb-5 mr-3 float-left">
                  <div className="avatar">
                    {/* <img src={'../../assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" /> */}
                    <span className="avatar-status badge-success"></span>
                  </div>
                </div>
                <div>
                  <small className="text-muted">Lukasz Holeczek</small>
                  <small className="text-muted float-right mt-1">1:52 PM</small>
                </div>
                <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
                <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt...
                </small>
              </div>
              <hr />
              <div className="message">
                <div className="py-3 pb-5 mr-3 float-left">
                  <div className="avatar">
                    {/* <img src={'../../assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" /> */}
                    <span className="avatar-status badge-success"></span>
                  </div>
                </div>
                <div>
                  <small className="text-muted">Lukasz Holeczek</small>
                  <small className="text-muted float-right mt-1">1:52 PM</small>
                </div>
                <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
                <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt...
                </small>
              </div>
              <hr />
              <div className="message">
                <div className="py-3 pb-5 mr-3 float-left">
                  <div className="avatar">
                    {/* <img src={'../../assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" /> */}
                    <span className="avatar-status badge-success"></span>
                  </div>
                </div>
                <div>
                  <small className="text-muted">Lukasz Holeczek</small>
                  <small className="text-muted float-right mt-1">1:52 PM</small>
                </div>
                <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
                <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt...
                </small>
              </div>
              <hr />
              <div className="message">
                <div className="py-3 pb-5 mr-3 float-left">
                  <div className="avatar">
                    {/* <img src={'../../assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" /> */}
                    <span className="avatar-status badge-success"></span>
                  </div>
                </div>
                <div>
                  <small className="text-muted">Lukasz Holeczek</small>
                  <small className="text-muted float-right mt-1">1:52 PM</small>
                </div>
                <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
                <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt...
                </small>
              </div>
              <hr />
              <div className="message">
                <div className="py-3 pb-5 mr-3 float-left">
                  <div className="avatar">
                    {/* <img src={'../../assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" /> */}
                    <span className="avatar-status badge-success"></span>
                  </div>
                </div>
                <div>
                  <small className="text-muted">Lukasz Holeczek</small>
                  <small className="text-muted float-right mt-1">1:52 PM</small>
                </div>
                <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
                <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt...
                </small>
              </div>
              <hr />
              <div className="message">
                <div className="py-3 pb-5 mr-3 float-left">
                  <div className="avatar">
                    {/* <img src={'../../assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" /> */}
                    <span className="avatar-status badge-success"></span>
                  </div>
                </div>
                <div>
                  <small className="text-muted">Lukasz Holeczek</small>
                  <small className="text-muted float-right mt-1">1:52 PM</small>
                </div>
                <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
                <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt...
                </small>
              </div>
            </TabPane>
          </TabContent>
        </Card>
      </AsideStyle>
    );
  }
}

RequestAside.propTypes = propTypes;
RequestAside.defaultProps = defaultProps;

export default RequestAside;
