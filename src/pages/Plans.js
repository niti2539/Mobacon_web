import React, { Component } from "react";
import {
  Badge,
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
  Button
} from "reactstrap";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import classnames from "classnames";
import { apiRequest } from "../Configs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Tabs extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    const now = moment();
    this.state = {
      activeTab: "1",
      check: false,
      startDate: now,
      endDate: now.days(now.days + 3),
      plans: [],
      fromAtError: false,
      toAtError: false
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
    // if (tab === "2") {
    //   document.getElementById(tab).style.height = "175px";
    // } else if (tab === "1") {
    //   document.getElementById(tab).style.height = "289px";
    // }
  }
  handleChangeStart = date => {
    this.setState({ startDate: date, fromAtError: false });
  };
  handleChangeEnd = date => {
    this.setState({ endDate: date, toAtError: false });
  };

  componentDidMount = async () => {
    try {
      const { plans } = await apiRequest("/plans");
      this.setState({
        plans,
        startDate: moment(plans[0].startAt),
        endDate: moment(plans[0].endAt)
      });
    } catch (err) {
      alert("Error to get plans infomation");
    }
  };

  onFeatureChange = id => e => {
    if (id == 2) return;
    const { name, checked } = e.target;
    const { plans } = this.state;
    let state = plans;
    const newPlan = state.find(p => p.id == id);
    const findIndex = state.findIndex(p => p.id == id);
    newPlan[name] = checked;
    state[findIndex] = newPlan;
    this.setState({ plans: state });
  };

  onUpdatePlan = async () => {
    const { chatEnabled, historyEnabled } = this.state.plans[0]; //basic
    const { startDate, endDate } = this.state;
    if (chatEnabled || historyEnabled) {
      if (!startDate || !endDate) {
        return this.setState({
          toAtError: !endDate,
          fromAtError: !startDate
        });
      }
    }
    console.log("Start date", startDate.utc(), " endDate", endDate.utc());

    const startAt = startDate ? startDate.utc() : null;
    const endAt = endDate ? endDate.utc() : null;
    try {
      const result = await apiRequest("/plan/basic", "PATCH", {
        chatEnabled,
        historyEnabled,
        startAt,
        endAt
      });
      alert(result.message);
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      }
      console.log(err);
    }
  };

  render() {
    const { plans, startDate, endDate, fromAtError, toAtError } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <p className="alignPlan">Plans</p>
        </Row>
        <Row>
          <Col xs="12" md="12">
            <Nav tabs className="adjustWidth">
              {plans.map((plan, key) => {
                return (
                  <NavItem key={key}>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab == plan.id
                      })}
                      onClick={() => {
                        this.toggle(String(plan.id));
                      }}
                    >
                      {plan.name.toUpperCase()}
                    </NavLink>
                  </NavItem>
                );
              })}
            </Nav>
            <TabContent activeTab={this.state.activeTab} className="tabWrapper">
              {plans.map((plan, i) => {
                const isPremium = plan.id == 2;
                return (
                  <TabPane
                    tabId={String(plan.id)}
                    id={String(plan.id)}
                    key={i}
                    style={{ height: "auto !important" }}
                  >
                    <Form>
                      <FormGroup>
                        <Row>
                          <Col md="6">
                            <input
                              id="tmp1"
                              type="checkbox"
                              name="chatEnabled"
                              disabled={isPremium}
                              checked={plan.chatEnabled}
                              onChange={this.onFeatureChange(plan.id)}
                            />
                            <label for="tmp1" className="enableChat">
                              <FontAwesomeIcon
                                icon="check"
                                className="facheck-1"
                              />
                              Enable Chat
                            </label>
                          </Col>
                          <Col md="6">
                            <input
                              id="tmp2"
                              type="checkbox"
                              disabled={isPremium}
                              name="historyEnabled"
                              checked={plan.historyEnabled}
                              onChange={this.onFeatureChange(plan.id)}
                            />
                            <label for="tmp2" className="enableHis">
                              <FontAwesomeIcon
                                icon="check"
                                className="facheck-2"
                              />
                              Enable History
                            </label>
                          </Col>
                        </Row>

                        {!isPremium && (
                          <Row>
                            <Col md="12" className="selectDateRangeWrapper">
                              <FormGroup>
                                {" "}
                                <FormText color="muted">From</FormText>
                                <DatePicker
                                  placeholderText="Select Date"
                                  selected={startDate}
                                  dateFormat="DD/MM/YYYY"
                                  onChange={this.handleChangeStart}
                                  className={`fromChange ${
                                    fromAtError ? "error" : ""
                                  }`}
                                />
                              </FormGroup>
                              <FormGroup>
                                <FormText color="muted">To</FormText>
                                <DatePicker
                                  value={endDate}
                                  placeholderText="Select Date"
                                  selected={endDate}
                                  dateFormat="DD/MM/YYYY"
                                  onChange={this.handleChangeEnd}
                                  className={`fromChange ${
                                    toAtError ? "error" : ""
                                  }`}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        )}
                      </FormGroup>
                      <div className="form-actions">
                        <Button
                          disabled={plan.id == 2}
                          type="button"
                          onClick={this.onUpdatePlan}
                          className="adjustButtonUpdate"
                        >
                          UPDATE
                        </Button>
                      </div>
                    </Form>
                  </TabPane>
                );
              })}
            </TabContent>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Tabs;
