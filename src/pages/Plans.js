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
          <Col xs="12" md="12" className="mb-4">
            <Nav tabs>
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
                  onClick={() => { this.toggle('2'); }}
                >
                  PREMIUM
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="2">
                      <FormGroup check className="checkbox">
                        <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="option1" />
                        <Label check className="form-check-label" htmlFor="checkbox1">Enable Chat</Label>
                      </FormGroup>
                      <FormGroup check className="checkbox">
                        <Input className="form-check-input" type="checkbox" id="checkbox2" name="checkbox2" value="option2" />
                        <Label check className="form-check-label" htmlFor="checkbox2">Enable History</Label>
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup row>
                        <Col xs="12">
                          <FormText color="muted">From</FormText>
                          <DatePicker
                            placeholderText='Select Date'
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                          />
                        </Col>
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup row>
                        <Col xs="12">
                          <FormText color="muted">To</FormText>
                          <DatePicker
                            placeholderText='Select Date'
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                          />
                        </Col>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <div className="form-actions">
                    <Button type="submit" color="primary">UPDATE</Button>
                  </div>
                </Form>
              </TabPane>
              <TabPane tabId="2">
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="2">
                      <FormGroup check className="checkbox">
                        <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="option1" />
                        <Label check className="form-check-label" htmlFor="checkbox1">Chat</Label>
                      </FormGroup>
                      <FormGroup check className="checkbox">
                        <Input className="form-check-input" type="checkbox" id="checkbox2" name="checkbox2" value="option2" />
                        <Label check className="form-check-label" htmlFor="checkbox2">History</Label>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <div className="form-actions">
                    <Button type="submit" color="primary">UPDATE</Button>
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
