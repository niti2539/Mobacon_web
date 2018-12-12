import React, { Component } from "react";
import ReactTable from "react-table";
import { getRequest } from "../stores/actions/request";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  ButtonDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Button
} from "reactstrap";
import _ from "lodash";
const actionStyle = {
  background: "none",
  border: "none",
  boxShadow: "none",
  lineHeight: 0,
  marginTop: -10
};
const index = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var clickcount = 0;
var datas = [
  {
    name: "Mihai Petrea",
    clientdate: "01.03.2014",
    plan: "Basic Plan",
    daterequest: "28.08.2018",
    status: "Pending",
    operator: " ",
    action: "Accept"
  },
  {
    name: "Mihai Petrea",
    clientdate: "01.03.2014",
    plan: "Basic Plan",
    daterequest: "28.08.2018",
    status: "Pending",
    operator: " ",
    action: "Accept"
  },
  {
    name: "Mihai Petrea",
    clientdate: "01.03.2014",
    plan: "Basic Plan",
    daterequest: "28.08.2018",
    status: "Reviewed",
    operator: "Chuck Norris",
    action: "Accepted"
  }
];
/*<TableHeaderColumn dataField='name' isKey={ true } >CUSTOMER NAME</TableHeaderColumn>
                <TableHeaderColumn dataField='clientdate' >CLIENT SINCE</TableHeaderColumn>
                <TableHeaderColumn dataField='plan' dataSort={ true }>ACTIVE PLAN</TableHeaderColumn>
                <TableHeaderColumn dataField='daterequest' dataSort={ true }>DATE REQUESTED</TableHeaderColumn>
                <TableHeaderColumn dataField='status'  dataFormat={pendingFormatter}>STATUS</TableHeaderColumn>
                <TableHeaderColumn dataField='operator'>OPERATOR</TableHeaderColumn>
                <TableHeaderColumn dataField='action' dataFormat={actionFormatter} >ACTIONS</TableHeaderColumn> */

const columns = [
  {
    Header: "CUSTOMER NAME",
    accessor: "user.fullName" // String-based value accessors!
  },
  {
    Header: "CLIENT SINCE",
    accessor: "user.createdAt" // String-based value accessors!
  },
  {
    Header: "ACTIVE PLAN",
    accessor: "user.plan.name" // String-based value accessors!
  },
  {
    Header: "DATE REQUESTED",
    accessor: "createdAt" // String-based value accessors!
  },
  {
    Header: "OPERATOR",
    accessor: "operator.fullName"
  },
  {
    Header: "ACTIONS",
    Cell: actionFormatter // Custom cell components!
  }
];

function pendingFormatter(cell) {
  for (var i = 0; i < datas.length; i++) {
    if (datas[i].status == "Pending" && cell == "Pending") {
      return (
        <div class="divColumn">
          <span class="spanColumn">{cell}</span>
        </div>
      );
    } else if (datas[i].status == "Reviewed" && cell == "Reviewed") {
      return (
        <div class="reviewColumn">
          <span class="reviewedColumn">{cell}</span>
        </div>
      );
    } else if (datas[i].status == "Accepted" && cell == "Accepted") {
      return (
        <div class="acceptColumn">
          <span class="acceptedColumn">{cell}</span>
        </div>
      );
    }
  }
}

function actionFormatter(data) {
  return <Button className="colorAcceptButton">Accept</Button>;
  //     if(data)
  //   for (var i = 0; i < datas.length; i++) {
  //     if (datas[i].action == "Accepted" && data == "Accepted") {
  //       return (
  //         '<a href="/request/1" class="clickOnce"> <Button class="colorAcceptedButton" disabled>' +
  //         data +
  //         "</Button> </a>"
  //       );
  //     }
  //   }
  //   return (
  //     '<a href="/request/1" class="clickOnce"> <Button class="colorAcceptButton">' +
  //     cell +
  //     "</Button> </a>"
  //   );
}

class Requests extends Component {
  constructor(props) {
    super(props);
    this.options = {
      defaultSortName: "name", // default sort column name
      defaultSortOrder: "desc" // default sort order
    };
  }
  componentWillUpdate = () => {};
  componentDidMount = () => {};

  render() {
    const options = {
      page: 1, // which page you want to show as default
      sizePerPageList: [
        {
          text: "5",
          value: 5
        },
        {
          text: "10",
          value: 10
        },
        {
          text: "All",
          value: datas.length
        }
      ],
      sizePerPage: 5, // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 3, // the pagination bar size.
      prePage: "Prev", // Previous page button text
      nextPage: "Next", // Next page button text
      firstPage: "First", // First page button text
      lastPage: "Last", // Last page button text
      paginationShowsTotal: this.renderShowsTotal, // Accept bool or function
      paginationPosition: "bottom" // default is bottom, top and both is all available
    };
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="12" xs="12">
            <p className="alignRequest">Requests</p>
          </Col>
        </Row>
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardBody>
                <ReactTable
                  data={datas}
                  columns={columns}
                  getProps={() => ({ style: { border: "none" } })}
                  getTheadProps={() => ({ style: { boxShadow: "none" } })}
                  getTheadThProps={() => ({ style: { border: "none" } })}
                  getTdProps={() => ({ style: { border: "none" } })}
                  getTrGroupProps={() => ({ style: { border: "none" } })}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getRequest: getRequest(dispatch) // this will return function
});

const mapStateToProps = ({ request }) => ({ request });

export default connect(
  mapDispatchToProps,
  mapStateToProps
)(Requests);
