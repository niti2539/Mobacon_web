import React, { Component } from "react";
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
  Container
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RequestAside from "./Aside";
import _ from "lodash";
import Modal from "react-modal";
import {
  getRequestById,
  createOffer,
  updateMemo
} from "../../stores/actions/request";
import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav
} from "@coreui/react";
import moment from "moment";

class Tabs extends Component {
  state = {
    activeTab: "1",
    historyAside: false,
    loading: true,
    data: {},
    submitting: false
  };

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };
  componentDidMount = async () => {
    const { id } = this.props.match.params;
    var result = await getRequestById(id);
    if (!result.data) {
      alert(result.message || "Server error");
      this.props.history.push("/requests");
    }
    console.log("get by id", result);
    await this.setState({ data: result.data });
    await this.setState({ loading: false });
  };

  formatDate = date => {
    return moment(date).format("DD.MM.YYYY");
  };

  onMemoSave = async e => {
    e.preventDefault();
    const {
      data: { id, memo }
    } = this.state;
    try {
      const result = await updateMemo(id, memo);
      alert(result.message);
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      }
      console.log("Memo error", err);
    }
  };

  onMemoChange = e => {
    const memo = e.target.value;
    // console.log("memo", memo)
    this.setState({ data: { ...this.state.data, memo: { message: memo } } });
  };

  onOfferChange = e => {
    const {
      data,
      data: { offer }
    } = this.state;
    let newState = data;
    if (!offer) {
      newState = {
        data: {
          ...data,
          offer: {
            id: null,
            review: "",
            suggestion: "",
            liked: false,
            createdAt: "",
            updatedAt: ""
          }
        }
      };
    }
    newState = {
      data: {
        ...data,
        offer: {
          ...newState.offer,
          [e.target.name]: e.target.value
        }
      }
    };
    this.setState(newState);
  };

  onSubmitOffer = async e => {
    e.preventDefault();
    // alert("Form request");
    const {
      data: { id, offer }
    } = this.state;
    await this.setState({ submitting: true });
    if (!offer) alert("Review or Suggestion cannot empty!!");
    if (!offer.review || !offer.suggestion)
      alert("Review and suggestion cannot empty!!");
    if (offer.review && offer.suggestion) {
      try {
        const result = await createOffer(id, offer.review, offer.suggestion);
        alert(result.message);
      } catch (err) {
        if (err.response) {
          alert(err.response.data.message);
        }
        console.log("submit offer error", err);
      }
    }
    this.setState({ submitting: false });
  };

  render() {
    const {
      loading,
      data,
      data: { memo },
      submitting
    } = this.state;
    const canEdit = data.status === "Accepted";
    return loading ? (
      <></>
    ) : (
      <React.Fragment>
        <div className="animated fadeIn">
          <Container>
            <Row className="requestHeader">
              <Col xs="8" md="8" className="alignHeader">
                <React.Fragment>
                  <span className="alignRequestIndex">
                    {`${data.user.fullName} Request`}
                  </span>
                  <span className="statusLabel">{data.status}</span>
                </React.Fragment>
              </Col>
              <Col xs="4" md="4" className="alignHeader right">
                <div>
                  <Button
                    type="submit"
                    className="adjustButtonHistory"
                    onClick={() => this.setState({ historyAside: true })}
                  >
                    VIEW HISTORY
                  </Button>
                  <RequestAside
                    data={data}
                    visible={this.state.historyAside}
                    onClose={() => this.setState({ historyAside: false })}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="8">
                <Card>
                  <CardBody>
                    <Form
                      className="requestFormIndex"
                      onSubmit={this.onSubmitOffer}
                    >
                      <FormGroup className="alignFormGroup">
                        <Label htmlFor="SMS" className="label">
                          Review name
                        </Label>
                        <Input
                          readOnly={!canEdit}
                          type="textarea"
                          name="review"
                          id="textarea-input"
                          rows="1"
                          value={data.offer ? data.offer.review : ""}
                          onChange={this.onOfferChange}
                          placeholder="Write your review subject"
                          className="textArea"
                        />
                      </FormGroup>
                      <FormGroup className="alignFormGroup">
                        <Label htmlFor="SMS" className="label">
                          Your Suggestion
                        </Label>
                        <Input
                          readOnly={!canEdit}
                          type="textarea"
                          name="suggestion"
                          id="textarea-input"
                          value={data.offer ? data.offer.suggestion : ""}
                          onChange={this.onOfferChange}
                          rows="4"
                          placeholder="Write your review"
                          className="textArea"
                        />
                      </FormGroup>
                      {/* <FormGroup className="alignFormGroupStatus">
                          <Label htmlFor="request" className="label">
                            Request Status
                          </Label>
                          <br />
                          <label className="radioContainer">
                            <span>Accept</span>
                            <Input type="radio" name="request_status" />
                            <span className="checkmark" />
                          </label>
                          <label className="radioContainer">
                            <span>Decline</span>
                            <Input type="radio" name="request_status" />
                            <span className="checkmark" />
                          </label>
                        </FormGroup> */}
                      {canEdit && (
                        <Button
                          type="submit"
                          className="adjustSubmitButton"
                          // onClick={this.onSubmitOffer}
                        >
                          {submitting ? "SUBMITTING..." : "SUBMIT"}
                        </Button>
                      )}
                    </Form>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4">
                <Card className="asideIndex" name="asideIndex">
                  <ListGroup>
                    <ListGroupItem className="adjustListgroup">
                      <div style={{ float: "left" }} className="textLeft">
                        CARRIER
                      </div>
                      <div style={{ float: "right" }} className="textRight">
                        {data.carrier.name}
                      </div>
                    </ListGroupItem>
                    <ListGroupItem className="adjustListgroup">
                      <div style={{ float: "left" }} className="textLeft">
                        CLIENT SINCE
                      </div>
                      <div style={{ float: "right" }} className="textRight">
                        {this.formatDate(data.user.createdAt)}
                      </div>
                    </ListGroupItem>
                    <ListGroupItem className="adjustListgroup">
                      <div style={{ float: "left" }} className="textLeft">
                        ACTIVE PLAN
                      </div>
                      <div style={{ float: "right" }} className="textRight">
                        {data.user.plan.name}
                      </div>
                    </ListGroupItem>
                    <ListGroupItem className="adjustListgroup">
                      <div style={{ float: "left" }} className="textLeft">
                        FAMILY
                      </div>
                      <div style={{ float: "right" }} className="textRight">
                        {String(data.user.plan.name)
                          .toLowerCase()
                          .startsWith("premium")
                          ? "YES"
                          : "-"}
                      </div>
                    </ListGroupItem>
                    <ListGroupItem className="adjustListgroup">
                      <div style={{ float: "left" }} className="textLeft">
                        DATE REQUESTED
                      </div>
                      <div style={{ float: "right" }} className="textRight">
                        {this.formatDate(data.createdAt)}
                      </div>
                    </ListGroupItem>
                    <ListGroupItem className="adjustListgroup">
                      <div style={{ float: "left" }} className="textLeft">
                        OPERATOR
                      </div>
                      <div style={{ float: "right" }} className="textRight">
                        {data.operator.fullName}
                      </div>
                    </ListGroupItem>
                    {/* <ListGroupItem className="adjustListgroup">
                  <div style={{float: 'left'}} className="textLeft">AVERAGE BILL</div>
                  <div style={{float: 'right'}} className="textRight">200$</div>
                </ListGroupItem>
                <ListGroupItem className="adjustListgroup">
                  <div style={{float: 'left'}} className="textLeft">FEEDBACK</div>
                  <div style={{float: 'right'}} className="textRightOffer">Liked Offer</div>
                </ListGroupItem> */}
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader className="billText">Bill History</CardHeader>
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
            <Row>
              <Col md="12">
                <Card>
                  <CardBody>
                    <Form className="memoFormIndex" onSubmit={this.onMemoSave}>
                      <FormGroup className="alignFormGroup">
                        <Label htmlFor="memos" className="label">
                          Memos (for internal use only)
                        </Label>
                        <Input
                          type="textarea"
                          name="textarea-input"
                          id="textarea-input"
                          rows="8"
                          value={memo ? memo.message : ""}
                          onChange={this.onMemoChange}
                          placeholder="Write your memo"
                          className="textAreaMemo"
                        />
                      </FormGroup>
                      <Button type="submit" className="adjustSaveButton">
                        SAVE
                      </Button>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Tabs;
