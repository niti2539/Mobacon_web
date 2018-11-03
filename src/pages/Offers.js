import React, { Component } from 'react';
import '../scss/offer.scss';
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
import classnames from 'classnames';
import { fontFace } from 'polished';

class Tabs extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }
  
  render() {
   
    return (
      
      <div className="animated fadeIn">
        <Row>
          <Col md="6">
            <p className="alignOffer">Offers</p>
          </Col>
          <Col md="6">
            <div style={{float: 'right'}} className="adjustOfferButton">
              <Button type="submit" className="adjustButtonUpdate" >NEW OFFER</Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="12" className="mb-4 alignBox">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  JANUARY - NEW DEALS
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                  id = "2"
                >
                  SUMMER DEAL
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <Row>  
                    <Col md='6'>
                      <FormGroup>
                        <Label htmlFor="Minutes" className="Label">Minutes / Month</Label>
                        <Input className="inputChange" type="text" id="minutes" placeholder="1000" required />
                      </FormGroup>
                    </Col>
                    <Col md='6'>
                    <FormGroup>
                        <Label htmlFor="SMS" className="Label">SMS / Month</Label>
                        <Input className="inputChange" type="text" id="sms" placeholder="500" required />
                      </FormGroup>
                    
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label htmlFor="Internet traffic" className="Label">Internet traffic / Month</Label>
                        <Input className="inputChange" type="text" id="internetTraffic" placeholder="4 GB" required />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label className="Label" htmlFor="Cloud Storage">Cloud Storage / Month</Label>
                        <Input className="inputChange" type="text" id="cloudStorage" placeholder="10 GB" required />
                      </FormGroup>
                    </Col> 
                    
                  </Row>

                </Form>
              </TabPane>
              <TabPane tabId="2">
                
              </TabPane>
            </TabContent>
          </Col>          
        </Row>
      </div>
    );
  }
}

export default Tabs;
