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
import classnames from 'classnames';


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
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <div style={{float: 'right'}}>
              <Button type="submit" color="primary">New Offer</Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="12" className="mb-4">
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
                >
                  SUMMER DEAL
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <Row>  
                    <Col md='3'>
                      <FormGroup>
                        <Label htmlFor="Minutes">Minutes / Month</Label>
                        <Input type="text" id="minutes" placeholder="minutes" required />
                      </FormGroup>
                      
                      <FormGroup>
                        <Label htmlFor="SMS">SMS / Month</Label>
                        <Input type="text" id="sms" placeholder="sms" required />
                      </FormGroup>

                      <FormGroup>
                        <Label htmlFor="Internet traffic">Internet traffic / Month</Label>
                        <Input type="text" id="internetTraffic" placeholder="internet" required />
                      </FormGroup>
                      
                      <FormGroup>
                        <Label htmlFor="Cloud Storage">Cloud Storage / Month</Label>
                        <Input type="text" id="cloudStorage" placeholder="x GB" required />
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
