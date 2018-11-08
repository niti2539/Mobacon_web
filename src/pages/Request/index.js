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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
          <Col xs="6" md="6" className="mb-4" className="alignHeader">
            <p className="alignRequestIndex">Mihai Petrea's Request</p>
            <div className="floatLeft"><span className="pending_index">Pending</span></div>
          </Col>
          <Col xs="6" md="6" className="mb-4" className="alignHeader">
            <div style={{float: 'right'}}>
              <Button type="submit" className="adjustButtonHistory" onClick={() => this.setState({aside: true})}>VIEW HISTORY</Button>
              <RequestAside visible={this.state.aside}/>
            </div>
          </Col>          
        </Row>
        <Row>
          <Col md='6'>
            <Card>
              <CardBody>
                <Form className="requestFormIndex">
                  <FormGroup className="alignFormGroup" >
                    <Label htmlFor="SMS" className="label">Your Review</Label>
                    <Input type="textarea" name="textarea-input" id="textarea-input" rows="6"
                      placeholder="Write your review" className="textArea" />
                  </FormGroup>
                  <FormGroup className="alignFormGroupStatus">
                    <Label htmlFor="request" className="label">Request Status</Label><br/>
                    <FormGroup check inline>
                      <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="option1" />
                      <label className="form-check-label" check htmlFor="inline-radio1" className="enableAccept">
                        <FontAwesomeIcon icon="circle" className="faCircle-1" ></FontAwesomeIcon>
                        Accept
                      </label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input className="form-check-input" type="radio" id="inline-radio2" name="inline-radios" value="option2" />
                      <Label className="form-check-label" check htmlFor="inline-radio2" className="enableDecline">
                      <FontAwesomeIcon icon="circle" className="faCircle-2" ></FontAwesomeIcon>
                        Decline
                      </Label>
                      
                    </FormGroup>
                  </FormGroup>
                  <Button type="submit" className="adjustSubmitButton">SUBMIT</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col md='6'>
            <Card className="asideIndex">
              <ListGroup className="increaseHeight">
                <ListGroupItem className="adjustListgroupHead">
                  <div style={{float: 'left'}} className="textLeft">CLIENT SINCE</div>
                  <div style={{float: 'right'}} className="textRight">CLIENT SINCE</div>
                </ListGroupItem>
                <ListGroupItem className="adjustListgroup">
                  <div style={{float: 'left'}} className="textLeft">ACTIVE PLAN</div>
                  <div style={{float: 'right'}} className="textRight">Basic Plan</div>
                </ListGroupItem>
                <ListGroupItem className="adjustListgroup">
                  <div style={{float: 'left'}} className="textLeft">FAMILY</div>
                  <div style={{float: 'right'}} className="textRight">Yes</div>
                </ListGroupItem>
                <ListGroupItem className="adjustListgroup">
                  <div style={{float: 'left'}} className="textLeft">DATE REQUESTED</div>
                  <div style={{float: 'right'}} className="textRight">17.06.2018</div>
                </ListGroupItem>
                <ListGroupItem className="adjustListgroup">
                  <div style={{float: 'left'}} className="textLeft">OPERATOR</div>
                  <div style={{float: 'right'}} className="textRight">Chuck Norris</div>
                </ListGroupItem>
                <ListGroupItem className="adjustListgroup">
                  <div style={{float: 'left'}} className="textLeft">AVERAGE BILL</div>
                  <div style={{float: 'right'}} className="textRight">200$</div>
                </ListGroupItem>
                <ListGroupItem className="adjustListgroupTail">
                  <div style={{float: 'left'}} className="textLeft">FEEDBACK</div>
                  <div style={{float: 'right'}} className="textRightOffer">Liked Offer</div>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md='12'>
            <Card>
              <CardHeader className="billText">
                Bill History
              </CardHeader>
              <CardBody className="cardBodyBill">
                <div className="alignTable">
                  <Table responsive className="tableRequest_1">
                    <thead className="thead">
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
                    <tbody className="tbody">
                      <tr>
                        <td>August</td>
                        <td>$230</td>
                        <td>2341/3000</td>
                        <td>1432/2000</td>
                        <td>2GB / 4GB</td>
                        <td>01.08.2018</td>
                        <td>07.08.2018</td>
                      </tr>
                      <tr>
                        <td>July</td>
                        <td>$230</td>
                        <td>2341/3000</td>
                        <td>1432/2000</td>
                        <td>2GB / 4GB</td>
                        <td>01.08.2018</td>
                        <td>07.08.2018</td>
                      </tr>
                      <tr>
                        <td>June</td>
                        <td>$230</td>
                        <td>2341/3000</td>
                        <td>1432/2000</td>
                        <td>2GB / 4GB</td>
                        <td>01.08.2018</td>
                        <td>07.08.2018</td>
                      </tr>
                    </tbody>
                  </Table>
                  <div className="fullHistory">SEE FULL HISTORY</div>
               </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Card>
          <CardBody>
            <Form className="memoFromIndex">
              <FormGroup className="alignFormGroup">
                <Label htmlFor="memos" className="label">Memos (for internal use only)</Label>
                <Input type="textarea" name="textarea-input" id="textarea-input" rows="8"
                  placeholder="Write your memo" className="textAreaMemo" />
              </FormGroup>
              <Button type="submit" className="adjustSaveButton">SAVE</Button>
            </Form>
          </CardBody>
        </Card>


      </div>
    );
  }
}

export default Tabs;
