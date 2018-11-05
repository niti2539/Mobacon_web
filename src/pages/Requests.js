import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  ButtonDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';
import _ from 'lodash';

const actionStyle = {background: 'none', border: 'none', boxShadow: 'none', lineHeight: 0, marginTop: -10}

class Tables extends Component {
  
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(99).fill(false),
    };
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => { return (index === i ? !element : false); });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>CUSTOMER NAME</th>
                    <th>CLIENT SINCE</th>
                    <th>ACTIVE PLAN</th>
                    <th>AVERAGE BILL</th>
                    <th>DATE REQUESTED</th>
                    <th>STATUS</th>
                    <th>OPERATOR</th>
                    <th>ACTIONS</th>
                  </tr>
                  </thead>
                  <tbody>
                  {_.range(10).map(i => 
                    <tr>
                      <td><Link to='/request/1'>Samppa Nori</Link></td>
                      <td>2012/01/01</td>
                      <td>Basic Plan</td>
                      <td>200$</td>
                      <td>17.06.2018</td>
                      <td><Badge color="danger">Banned</Badge></td>
                      <td>Chuck Norris</td>
                      <td>
                        <ButtonDropdown isOpen={this.state.dropdownOpen[i]} toggle={() => { this.toggle(i); }}>
                          <DropdownToggle style={actionStyle}>
                            . . .
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem>Action</DropdownItem>
                            <DropdownItem>Another Action</DropdownItem>
                          </DropdownMenu>
                        </ButtonDropdown>
                      </td>
                    </tr>
                  )}
                  </tbody>
                </Table>
                
                <Pagination>
                  <PaginationItem>
                    <PaginationLink previous tag="button"></PaginationLink>
                  </PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">4</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink next tag="button"></PaginationLink>
                  </PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default Tables;
