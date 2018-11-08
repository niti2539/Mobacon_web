import React, { Component } from 'react';
import { Badge,
  Col, 
  Nav, 
  NavItem, 
  NavLink, 
  Row, 
  TabContent, 
  TabPane,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Button,
} from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Tabs extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
    if(tab === '2'){
      document.getElementById(tab).style.height = "175px";
    }else if(tab === '1'){
      document.getElementById(tab).style.height = "289px";
    }
  }
  state = {
    check : false,
    startDate : moment(),
    endDate : moment()
  };
  handleChangeStart = (date) =>{
    this.setState({startDate: date})
  }
  handleChangeEnd = (date) => {
    this.setState({endDate: date})
  }
  
  render() {
    return(
      <div className="animated fadeIn">
      <Row>
        <p className="alignPlan">Plans</p>
      </Row>
        <Row>
          <Col xs="12" md="12" className="mb-4 ml-3">
            <Nav tabs className="adjustWidth">
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  BASIC
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2');}}
                >
                  PREMIUM
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab} className="adjustBorderColor ">
              <TabPane tabId="1" id="1">
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="6">
                     <input id="tmp1" type="checkbox" />
                      <label for="tmp1" className="enableChat">
                             <FontAwesomeIcon icon="check" class="facheck-1"></FontAwesomeIcon>
                        Enable Chat    
                      </label>
                    </Col>
                    <Col md="6">
                    <input id="tmp2" type="checkbox" />
                      <label for="tmp2" className="enableHis">
                             <FontAwesomeIcon icon="check" class="facheck-2"></FontAwesomeIcon>
                        Enable History   
                      </label>
                    </Col>
                    <Col md="3">
                      <FormGroup row>
                        <Col xs="12 alignForm">
                          <FormText color="muted">From</FormText>
                          <DatePicker
                            placeholderText='Select Date'
                            selected={this.state.startDate}
                            dateFormat="DD/MM/YYYY" 
                            onChange={this.handleChangeStart}
                            className="fromChange"
                          />
                          
                        </Col>
                      </FormGroup>
                     
                    </Col>
                    <Col md="1" className="alignBetweenFromtoTo">
                    <span className="FromtoTo">-</span>
                    </Col>
                    <Col md="8">
                      <FormGroup row>
                        <Col xs="12">
                        
                          <FormText color="muted" className="adjustPositionOfToElement">To</FormText>
                          <DatePicker
                            placeholderText='Select Date'
                            selected={this.state.endDate}
                            dateFormat="DD/MM/YYYY" 
                            onChange={this.handleChangeEnd}
                            className="fromChange adjustPositionOfToElement"
                          />
                        </Col>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <div className="form-actions adjustFormAction">
                    <Button type="submit" className="adjustButtonUpdate">UPDATE</Button>
                  </div>
                </Form>
              </TabPane>
              <TabPane tabId="2" className="tabpane-2" id="2">
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="6">
                    <input id="tmp3" type="checkbox" />
                      <label for="tmp3" className="enableChat">
                             <FontAwesomeIcon icon="check" class="facheck-1"></FontAwesomeIcon>
                        Enable Chat    
                      </label>
                    </Col>
                    <Col md="6">
                      <input id="tmp4" type="checkbox" />
                        <label for="tmp4" className="enableHis">
                              <FontAwesomeIcon icon="check" class="facheck-2"></FontAwesomeIcon>
                          Enable History   
                        </label>
                      </Col>
                  </FormGroup>
                  <div className="form-actions adjustFormAction">
                    <Button type="submit" className="adjustButtonUpdate" >UPDATE</Button>
                  </div>
                </Form>
              </TabPane>
            </TabContent>
          </Col>          
        </Row>
      </div>
    );
  }
}

export default Tabs;
