import React, { Component } from 'react';
import {
  Col, 
  Row, 
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Table,
  Badge,

} from 'reactstrap';
import RequestAside from './Aside';
import _ from 'lodash';

class Tabs extends Component {

  state = {
    activeTab: '1',
    aside: false,
  };

  toggle = (tab) => {
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
            <div style={{float: 'right'}}>
              <Button type="submit" color="primary" onClick={() => this.setState({aside: true})}>VIEW HISTORY</Button>
              <RequestAside visible={this.state.aside}/>
            </div>
          </Col>          
        </Row>
        <Row>
          <Col md='6'>
            <Card>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label htmlFor="SMS">Your Review</Label>
                    <Input type="textarea" name="textarea-input" id="textarea-input" rows="6"
                      placeholder="Write your review..." />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="request">Request</Label><br/>
                    <FormGroup check inline>
                      <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="option1" />
                      <Label className="form-check-label" check htmlFor="inline-radio1">Accept</Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input className="form-check-input" type="radio" id="inline-radio2" name="inline-radios" value="option2" />
                      <Label className="form-check-label" check htmlFor="inline-radio2">Reject</Label>
                    </FormGroup>
                  </FormGroup>
                  <Button type="submit" color="primary">SUBMIT</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col md='6'>
            <Card>
              <ListGroup>
                <ListGroupItem>
                  <div style={{float: 'left'}}>CLIENT SINCE</div>
                  <div style={{float: 'right'}}>CLIENT SINCE</div>
                </ListGroupItem>
                <ListGroupItem>
                  <div style={{float: 'left'}}>ACTIVE PLAN</div>
                  <div style={{float: 'right'}}>Basic Plan</div>
                </ListGroupItem>
                <ListGroupItem>
                  <div style={{float: 'left'}}>FAMILY</div>
                  <div style={{float: 'right'}}>Yes</div>
                </ListGroupItem>
                <ListGroupItem>
                  <div style={{float: 'left'}}>DATE REQUESTED</div>
                  <div style={{float: 'right'}}>17.06.2018</div>
                </ListGroupItem>
                <ListGroupItem>
                  <div style={{float: 'left'}}>OPERATOR</div>
                  <div style={{float: 'right'}}>Chuck Norris</div>
                </ListGroupItem>
                <ListGroupItem>
                  <div style={{float: 'left'}}>AVERAGE BILL</div>
                  <div style={{float: 'right'}}>200$</div>
                </ListGroupItem>
                <ListGroupItem>
                  <div style={{float: 'left'}}>FEEDBACK</div>
                  <div style={{float: 'right'}}><i className='fa fa-thumbs-o-up'></i> Liked Offer</div>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md='12'>
            <Card>
              <CardHeader>
                Bill History
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>MONTH</th>
                    <th>AMOUNT</th>
                    <th>MINUTES USED</th>
                    <th>SMS USED</th>
                    <th>INTERNET USED</th>
                    <th>EMISSION DATE</th>
                    <th>PAID DATE</th>
                  </tr>
                  </thead>
                  <tbody>
                  {_.range(10).map(i => 
                    <tr>
                      <td>July</td>
                      <td>2200$</td>
                      <td>10 / 100</td>
                      <td>10 / 100</td>
                      <td>2GB / 4GB</td>
                      <td>01.07.2018</td>
                      <td>UNPAID</td>
                    </tr>
                  )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Card>
          <CardBody>
            <Form>
              <FormGroup>
                <Label htmlFor="memos">Memos (for internal use only)</Label>
                <Input type="textarea" name="textarea-input" id="textarea-input" rows="8"
                  placeholder="Write your memo" />
              </FormGroup>
              <Button type="submit" color="primary">SAVE</Button>
            </Form>
          </CardBody>
        </Card>


      </div>
    );
  }
}

export default Tabs;
