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
const index = [0,1,2,3,4,5,6,7,8,9,10];
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
         <Col md="12" xs="12">
          <p className="alignRequest">Requests</p>
         </Col>
       </Row>
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardBody>
                <Table responsive className="requestMain" >
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
                  <tbody className="requestMainTbody">
                  {_.range(0,2).map(i => 
                    <tr key={i.id}>
                      <td ><Link to='/request/1' className="LinkName">Mihai Petrea</Link></td>
                      <td>2012/01/01</td>
                      <td>Basic Plan</td>
                      <td>200$</td>
                      <td>17.06.2018</td>
                      <td ><Link to='/request/1'><div className="alignPending"><span className="pending">Pending</span></div></Link></td>
                      <td>Chuck Norris</td>
                      
                      <td>
                        
                        <Link to='/request/1' className="threeDot">
                          . . .
                        </Link>
                       
                    </td>
                      
                    </tr>
                  )}
                  {_.range(3,4).map(i => 
                    <tr key={i.id}>
                      <td><Link to='/request/1' className="LinkName">Mihai Petrea</Link></td>
                      <td>2012/01/01</td>
                      <td>Basic Plan</td>
                      <td >200$</td>
                      <td>17.06.2018</td>
                      <td ><div className="alignRejected"><span className="rejected">Rejected</span></div></td>
                      <td >Chuck Norris</td>
                      <td>
                        
                          <Link to='/request/1' className="threeDot">
                            . . .
                          </Link>
                         
                      </td>
                    </tr>
                  )}
                   {_.range(4,5).map(i => 
                    <tr key={i.id}>
                      <td><Link to='/request/1' className="LinkName">Mihai Petrea</Link></td>
                      <td>2012/01/01</td>
                      <td>Basic Plan</td>
                      <td>200$</td>
                      <td>17.06.2018</td>
                      <td><div className="alignAccepted"><span className="accepted">Accepted</span></div></td>
                      <td>Chuck Norris</td>
                      
                      <td>
                        <Link to='/request/1' className="threeDot">
                          . . .
                        </Link>
                    </td>
                      
                    </tr>
                  )}
                  {_.range(5,11).map(i => 
                    <tr key={i.id}>
                      <td ><Link to='/request/1' className="LinkName">Mihai Petrea</Link></td>
                      <td>2012/01/01</td>
                      <td>Basic Plan</td>
                      <td>200$</td>
                      <td>17.06.2018</td>
                      <td><Link to='/request/1'><div className="alignPending"><span className="pending">Pending</span></div></Link></td>
                      <td>Chuck Norris</td>
                      
                      <td>
                        <Link to='/request/1' className="threeDot">
                          . . .
                        </Link>
                    </td>
                      
                    </tr>
                  )}
                  </tbody>
                </Table>
                
              
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );

  }
}

export default Tables;
