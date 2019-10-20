import React, { Component } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Container,
  Table
} from "reactstrap";
import moment from "moment";
import { apiRequest } from "../Configs";
import styled from "styled-components";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";
import { connect } from "react-redux";
import DashboardCard from "../Components/Dashboard/Card";
import ReactSelect from "react-select";
const brandPrimary = getStyle("--primary");
const brandSuccess = getStyle("--success");
const brandInfo = getStyle("--info");
const brandWarning = getStyle("--warning");
const brandDanger = getStyle("--danger");

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const options = [
  { value: "1", label: "This month" },
  { value: "3", label: "Last 3 months" },
  { value: "6", label: "Last 6 months" },
  { value: "12", label: "Last year" }
];

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      selectOption: options[0],
      radioSelected: 2,
      selectGraphLabel: "USERS",
      selectGraphValue: "user",
      data: {}
    };
  }

  componentDidMount = () => {
    const { selectGraphValue } = this.state;
    this.fetchGraph(selectGraphValue);
  };

  fetchGraph = async value => {
    const { selectOption } = this.state;
    try {
      const result = await apiRequest(
        `/dashboard/${value}?month=${selectOption.value}`
      );
      console.log("Select period value", selectOption.value);
      const data = this.reformatData(result);
      console.log("Result from api", result);
      console.log("Result graph", data);
      this.setState({ data });
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      }
      console.log(err);
    }
  };

  reformatData = data => {
    return {
      ...data,
      data: data.data.reduce((obj, cur) => {
        if (typeof cur.y === "object") {
          const gb = cur.y.good + cur.y.bad;
          let good, bad;
          if (gb < 1) {
            good = 0;
            bad = 0;
          } else {
            good = cur.y.good / gb;
            bad = cur.y.bad / gb;
          }
          obj.push(
            { x: moment(cur.x), y: good, good: true },
            { x: moment(cur.x), y: bad, good: false }
          );
          return obj;
        }
        obj.push({
          x: moment(cur.x),
          y: cur.y
        });
        return obj;
      }, [])
    };
  };

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected
    });
  }
  setGraph = async (value, label) => {
    await this.fetchGraph(value);
    this.setState({
      selectGraphLabel: String(label).toUpperCase(),
      selectGraphValue: value
    });
  };

  onMonthChange = async selectOption => {
    const { selectGraphValue } = this.state;
    await this.setState({ selectOption });
    console.log("Option selected", selectOption);
    this.fetchGraph(selectGraphValue);
  };

  render() {
    const {
      selectGraphLabel,
      selectOption,
      selectGraphValue,
      data: { data: rawData, total }
    } = this.state;
    const isGoodBad = selectGraphValue === "goodrate";
    const lineOptions = {
      scales: {
        xAxes: [
          {
            type: "time",
            time: {
              unit: selectOption.value == 1 ? "day" : "month"
              // unit: "day"
            }
          }
        ],
        yAxes: [
          {
            stacked: true
          }
        ]
      }
    };
    const barOptions = {
      scales: {
        xAxes: [
          {
            type: "time",
            time: {
              unit: selectOption.value == 1 ? "day" : "month"
              // unit: "day"
            }
          }
        ],
        yAxes: [
          {
            stacked: true
          }
        ]
      }
    };
    const lineData = {
      label: [],
      datasets: [
        {
          label: selectGraphLabel,
          pointBorderColor: "#79bfbb",
          backgroundColor: "#79bfbba7",
          data: rawData
        }
      ]
    };
    const barData = {
      datasets: [
        {
          label: "Good",
          borderColor: "#60ce99",
          backgroundColor: "#60ce99bb",
          hoverBackgroundColor: "#60ce99ee",
          stack: 1,
          data: rawData ? rawData.filter(o => o.good) : []
        },
        {
          label: "Bad",
          borderColor: "#ca5858",
          stack: 1,
          backgroundColor: "#ca5858bb",
          hoverBackgroundColor: "#ca5858ee",
          data: rawData ? rawData.filter(o => !o.good) : []
        }
      ]
    };

    return (
      <Container className="animated fadeIn">
        <Row>
          <Col>
            <p className="pageHeaderText">Dashboard</p>
          </Col>
        </Row>
        {total ? (
          <Row noGutters className="gutterCenter">
            <Col>
              <DashboardCard
                value="user"
                label="USERS"
                active={selectGraphValue === "user"}
                text={total.user}
                click={this.setGraph}
              />
            </Col>
            <Col>
              <DashboardCard
                value="request"
                label="ANALYZED REQUESTS"
                active={selectGraphValue === "request"}
                text={total.request}
                click={this.setGraph}
              />
            </Col>
            <Col>
              <DashboardCard
                value="chat"
                label="ACTIVE CHATS"
                active={selectGraphValue === "chat"}
                text={total.chat}
                click={this.setGraph}
              />
            </Col>
            <Col>
              <DashboardCard
                value="goodrate"
                label="GOOD / BAD RATIO"
                active={selectGraphValue === "goodrate"}
                text={`${total.goodness.good} / ${total.goodness.bad}`}
                click={this.setGraph}
              />
            </Col>
          </Row>
        ) : null}
        <Row style={{ marginTop: 20 }}>
          <Col>
            <Card style={styles.graphContainerStyle}>
              <CardBody>
                <Row>
                  <Col style={styles.graphHeader}>
                    <div>
                      <h6 style={{ color: "#74d2cb" }}>{selectGraphLabel}</h6>
                    </div>
                    <div style={{ width: 200 }}>
                      <ReactSelect
                        isSearchable={false}
                        placeholder=""
                        value={selectOption}
                        onChange={this.onMonthChange}
                        options={options}
                        theme={theme => ({
                          ...theme,
                          colors: {
                            ...theme.colors,
                            primary: "#74d2cb",
                            primary25: "#3b485911"
                          }
                        })}
                      />
                    </div>
                  </Col>
                </Row>
                <div className="chart-wrapper" style={{ paddingTop: 40 }}>
                  {rawData ? (
                    !isGoodBad ? (
                      <Line
                        data={lineData}
                        height={'95%'}
                        options={lineOptions}
                      />
                    ) : (
                      <Bar data={barData} height={'95%'} options={barOptions} />
                    )
                  ) : null}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const styles = {
  graphHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "10px auto"
  },
  graphContainerStyle: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: "10px 25px",
    boxShadow: "0 0 10px 1px rgba(100,100,100, 0.08)"
  }
};

const mapStateToProps = state => ({
  state,
  user_detail: state.user_detail
});
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
