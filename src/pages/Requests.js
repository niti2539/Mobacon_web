import React, { Component } from "react";
import ReactTable from "react-table";
import { getRequest } from "../stores/actions/request";
import { connect } from "react-redux";
import { store } from "../stores";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row, Button } from "reactstrap";
import _ from "lodash";
import moment from "moment";

const Header = (value, align) => {
  return (
    <div
      style={{
        textAlign:
          align === "left" ? "left" : align === "right" ? "right" : "center",
        fontWeight: "bold",
        whiteSpace: "unset"
      }}
    >
      {value}
    </div>
  );
};

const columns = [
  {
    Header: Header("CUSTOMER NAME", "left"),
    accessor: "user.fullName"
  },
  {
    Header: Header("CARRIER", "left"),
    accessor: "carrier.name"
  },
  {
    Header: Header("ACTIVE PLAN", "left"),
    accessor: "user.plan.name"
  },
  {
    Header: Header("CLIENT SINCE", "left"),
    accessor: "user.createdAt",
    Cell: data => moment(data.value).format("DD.MM.YYYY")
  },

  {
    Header: Header("DATE REQUESTED", "left"),
    accessor: "createdAt",
    Cell: data => moment(data.value).format("DD.MM.YYYY")
  },
  {
    Header: Header("OPERATOR", "left"),
    accessor: "operator.fullName"
  },
  {
    Header: Header("ACTIONS"),
    accessor: "operator",
    Cell: actionFormatter // Custom cell components!
  }
];

function pendingFormatter(cell) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].status == "Pending" && cell == "Pending") {
      return (
        <div class="divColumn">
          <span class="spanColumn">{cell}</span>
        </div>
      );
    } else if (data[i].status == "Reviewed" && cell == "Reviewed") {
      return (
        <div class="reviewColumn">
          <span class="reviewedColumn">{cell}</span>
        </div>
      );
    } else if (data[i].status == "Accepted" && cell == "Accepted") {
      return (
        <div class="acceptColumn">
          <span class="acceptedColumn">{cell}</span>
        </div>
      );
    }
  }
}

function actionFormatter(data) {
  const acceptOp = data.value;
  // console.log("data", data);
  let { user_detail: user } = store.getState().user,
    operatorId = null;
  if (user) {
    operatorId = user.id;
  }
  // console.log("accept op", acceptOp, "operatorId", operatorId);
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {!acceptOp || typeof acceptOp != "object" ? (
        <Button className="acceptRequestButton">Accept</Button>
      ) : acceptOp.id === operatorId ? (
        <Link to={`request/${1}`} style={{width: '100%'}}>
          <Button className="openRequestButton">Open</Button>
        </Link>
      ) : (
        <Button disabled className="acceptedRequestButton">
          Accepted
        </Button>
      )}
    </div>
  );
}

class Requests extends Component {
  constructor(props) {
    super(props);
    this.options = {
      defaultSortName: "name", // default sort column name
      defaultSortOrder: "desc" // default sort order
    };
    // console.log("props", props);
    this.state = {
      defaultPageSize: 10,
      data: props.request.data,
      pages: null
    };
  }

  setDataTable = (data, page, pageSize, sorted) => {
    console.log("data", data);
    console.log("Sorted", sorted);
    const sortedData = _.orderBy(
      data.data,
      sorted.map(sort => {
        return row => {
          const id = _.get(row, sort.id);
          if (id === null || id === undefined) {
            return -Infinity;
          }
          return typeof id === "string" ? id.toLowerCase() : id;
        };
      }),
      sorted.map(d => (d.desc ? "desc" : "asc"))
    );
    this.setState(
      {
        page,
        loading: false,
        data: sortedData,
        pages: Math.ceil(data.recordsTotal / pageSize)
      },
      () => console.log("Total page", this.state.pages)
    );
  };

  fetchData = state => {
    this.setState({ loading: true }, () => {
      const { pageSize, page, sorted } = state;
      console.log("Page", page);
      this.props.getRequest(page + 1, pageSize /* limit */).then(res => {
        this.setDataTable(res.data, page, res.pageSize, sorted);
      });
    });
  };

  render() {
    const { defaultPageSize, data, pages, page, loading } = this.state;
    return (
      <div className="animated fadeIn">
        <Row className="textHeader">
          <Col md="12" xs="12">
            <p className="alignRequest">Requests</p>
          </Col>
        </Row>
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardBody>
                <ReactTable // filterable
                  onFetchData={this.fetchData}
                  defaultPageSize={defaultPageSize}
                  pages={pages}
                  // NextComponent={() => (
                  //   <Button color="primary" block>
                  //     {"Next >"}
                  //   </Button>
                  // )}
                  // PreviousComponent={(props) => (
                  //   <Button
                  //     color={page < 1 ? "secondary" : "primary"}
                  //     disabled={page < 1}
                  //     block
                  //   >
                  //     {"< Previous"}
                  //   </Button>
                  // )}
                  manual
                  data={data}
                  loading={loading}
                  columns={columns}
                  getPaginationProps={() => ({
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }
                  })}
                  getProps={() => ({ style: { border: "none" } })}
                  getTheadProps={() => ({
                    style: { boxShadow: "none", marginBottom: 10 }
                  })}
                  getTheadThProps={() => ({
                    style: {
                      border: "none",
                      whiteSpace: "unset",
                      wordBreak: "break-word"
                    }
                  })}
                  getTdProps={() => ({
                    style: {
                      border: "none",
                      padding: "0 10px",
                      display: "flex",
                      alignItems: "center",
                      whiteSpace: "unset"
                    }
                  })}
                  getTrGroupProps={() => ({ style: tableStyles.trGroup })}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const tableStyles = {
  trGroup: {
    border: "none",
    backgroundColor: "#fff",
    marginBottom: 15,
    minHeight: 60,
    boxShadow: "0 1px 5px 1px rgba(0,0,0, .05)"
  }
};

const mapDispatchToProps = dispatch => ({
  getRequest: getRequest(dispatch) // this will return function
});

const mapStateToProps = ({ request, user }) => ({ request, user });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Requests);
