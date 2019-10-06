import React, { Component } from "react";
import ReactTable from "react-table";
import { getRequest, acceptanceById } from "../stores/actions/request";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Card, CardBody, Col, Row, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Container} from "reactstrap";
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

class Requests extends Component {
  constructor(props) {
    super(props);
    this.options = {
      defaultSortName: "name", // default sort column name
      defaultSortOrder: "desc" // default sort order
    };
    // console.log("props", props);
    this.state = {
      dropdownOpen: {},
      defaultPageSize: 10,
      data: [], //raw data
      pages: null, // max page
      pageSize: null // limit data show in page
    };

    this.columns = [
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
        // accessor: obj => obj.operator.fullName
      },
      {
        Header: Header("STATUS"),
        id: "status",
        accessor: obj => obj,
        Cell: this.statusButton
      },
      {
        Header: Header("ACTIONS"),
        id: "action",
        accessor: obj => obj,
        Cell: this.actionFormatter // Custom cell components!
      }
    ];
  }

  toggle = (id) => {
    const {dropdownOpen} = this.state;
    let copyDropDownOpen = {...dropdownOpen};
    copyDropDownOpen[id] = dropdownOpen[id] ? !dropdownOpen[id] : true;
    this.setState({
      dropdownOpen: copyDropDownOpen
    });
  }

  statusButton = (data) => {
    const {status,  operator, id: requestId} = data.value
    if (status === 'Rejected') {
      return (
        <Link to={`request/${requestId}`} className="linkButton">
          <Button className="btn-declined">{status}</Button>
        </Link>
      )
    }  else if (status === 'Accepted') {
      return (
        <Link to={`request/${requestId}`} className="linkButton">
          <Button color="primary" className="btn-radius">Reviewing</Button>
        </Link>
      )
    } else if (status === 'Completed') {
      return (
        <Button color="success" className="btn-radius">{status}</Button>
      )
    } else if (status === 'Reviewed') {
      return (
        <Button disabled color="secondary" className="btn-radius">{status}</Button>
      )
    } else if (status === 'Pending') {
      return (
        <Link to={`request/${requestId}`} className="linkButton">
          <Button className="btn-outline-status linkButton">{status}</Button>
        </Link>
      )
    }

    return (
      <Button className="btn-outline-status linkButton">{status}</Button>
    )
  }

  declineRequest = (id, user) => {
    if (!window.confirm("Are you sure to deline this request?")) return;
    const data = this.state.data;
    const findIndex = data.findIndex(d => d.id == id);
    let selectData = data.find(d => d.id == id);
    console.log("Select data", selectData);
    let newData = {
      ...selectData,
      status: "Rejected",
      operator: {
        id: user.id,
        fullName: user.fullName
      }
    };
    if (findIndex < 0) return window.location.reload();
    let newState = [...data];
    newState[findIndex] = newData;
    this.setState({ data: newState });
  }

  editReview = (id) => {
    this.props.history.push(`/request/${id}`);
  }

  acceptRequest = async (id /*request id*/, user /*operator*/) => {
    if (!window.confirm("Are you sure to accept this request?")) return;
    const data = this.state.data;
    console.log("accept id", id, "user data", user);
    const findIndex = data.findIndex(d => d.id == id);
    await acceptanceById(id);
    console.log("Old state", data[findIndex]);
    let selectData = data.find(d => d.id == id);
    console.log("Select data", selectData);
    let newData = {
      ...selectData,
      status: "Accepted",
      operator: {
        id: user.id,
        fullName: user.fullName
      }
    };
    console.log("new Data", newData);
    console.log("Find index", data[findIndex]);
    if (findIndex < 0) return window.location.reload();
    let newState = [...data];
    newState[findIndex] = newData;
    console.log("new State", newState);
    await this.setState({ data: newState });
    this.props.history.push(`/request/${id}`);
  };

  actionFormatter = data => {
    console.log("Action formatter has called");
    console.log("Data row", data.value);
    const { operator, id: requestId } = data.value;
    var accepterId = operator ? operator.id : null;
    var accepterName = accepterId ? operator.fullName : null;
    // console.log("data", data);
    let { user_detail: user } = this.props.user,
      operatorId = null;
    if (user) {
      operatorId = user.id;
    }
    const isMy = accepterId === operatorId;
    // console.log("Rowid", data.value);
    console.log(
      "accept op",
      accepterId,
      "Accpeter name",
      accepterName,
      "operatorId",
      operatorId
    );
    const {id} = data.value;

    //if (data.value.status === 'Pending') {
      const { value : { status }} = data
      return (
       
        <ButtonDropdown  isOpen={this.state.dropdownOpen[id]} toggle={() => this.toggle(id)}>
          <DropdownToggle className="action-btn">
            ...
          </DropdownToggle>
          <DropdownMenu>
          { (status === 'Rejected' || status === 'Pending') && <DropdownItem onClick={() => this.acceptRequest(id, user)}>Start Review</DropdownItem> }
          {(status === 'Completed' || status === 'Accepted') && <DropdownItem onClick={() => this.editReview(id)}>Edit Review</DropdownItem> }
          {(status !== 'Rejected' && status !== 'Completed') && <DropdownItem onClick={() => this.declineRequest(id, user)}>Decline</DropdownItem> }
          </DropdownMenu>
        </ButtonDropdown>

      )
    //}
    // else {
    //   return (
    //     <div
    //       style={{
    //         display: "flex",
    //         width: "100%",
    //         justifyContent: "center",
    //         alignItems: "center"
    //       }}
    //     >
    //       {!operator || typeof operator !== "object" ? (
    //         <Button
    //           className="acceptRequestButton"
    //           onClick={this.acceptRequest(requestId, user)}
    //         >
    //           Accept
    //         </Button>
    //       ) : isMy ? (
    //         <Link to={`request/${requestId}`} className="linkButton">
    //           <Button className="openRequestButton">
    //             {data.value.status === "Accepted" ? "Open" : data.value.status}
    //           </Button>
    //         </Link>
    //       ) : (
    //         <Button disabled className="acceptedRequestButton">
    //           {data.value.status}
    //         </Button>
    //       )}
    //     </div>
    //   );
    // }
    
  };

  setDataTable = async (data, page, pageSize, sorted = null) => {
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
    await this.setState({
      page,
      loading: false,
      data: sortedData,
      pages: Math.ceil(data.recordsTotal / pageSize),
      pageSize: pageSize
    });
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
    const { defaultPageSize, pages, data, loading } = this.state;
    return (
      <Container className="animated fadeIn">
        <Row>
          <Col>
            <p className="pageHeaderText">Requests</p>
          </Col>
        </Row>
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardBody>
                {/* <Button
                  onClick={() => {
                    this.setState({
                      data: data.slice(0, data.length - 1)
                    });
                  }}
                >
                  Delete Row at {data.length - 1}
                </Button> */}
                <ReactTable
                  ref={r => (this.table = r)}
                  onFetchData={this.fetchData}
                  defaultPageSize={defaultPageSize}
                  pages={pages}
                  manual
                  data={data}
                  loading={loading}
                  columns={this.columns}
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
      </Container>
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

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Requests);
