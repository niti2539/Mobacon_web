import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge,
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
  Button,
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap';
import '../scss/operator.scss';
import styled from 'styled-components';
import _ from 'lodash';

class Tabs extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
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
        <Col xs="6" md="6">
            <p className="alignOperator">Operators</p>
          </Col>
          <Col xs="6" md="6" className="mb-4">
            <div style={{float: 'right'}}>
              <Link to="/register"><Button type="submit" className="adjustButtonUpdate onlyOperatorButton">ADD NEW</Button></Link>
            </div>
          </Col>          
        </Row>
        <Row className="alignRow">
          {_.range(12).map(i =>
            <Col xs="12" md="4" lg="4" className="mb-4">
              <Card className="borderCard">
                <CardBody>
                  <div row className="imageSection">
                    <Avartar>
                   
                      <img className="imgAvatar" src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'/>
                      <p className="nameAvatar">Chuck Norris</p>
                    </Avartar>

                  </div>
        
                  <FormGroup row>
                    <Col md="12" className="emailForm">
                      <p className="emailText">EMAIL</p>
                      <p className="emailSubText">chuck@norris.com</p>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="12" className="phoneForm">
                    <p className="phoneText">PHONE</p>
                      <p className="phoneSubText">+40 0744 222 111</p>
                    </Col>
                  </FormGroup>
                  <hr></hr>
                  <Row className="alignAfterHr">
                    
                      <Button style={thumbsStyle} className="icon thumbUp"><i className="fa fa-thumbs-o-up fa-2x"></i></Button>
                      <p className="goodThumb">45 GOOD REVIEWS</p>
                  
                      <p className="badThumb">12 BAD REVIEWS</p>
                      <Button style={thumbsStyle} className="icon thumbDown"><i className="fa fa-thumbs-o-down fa-2x fa-flip-horizontal "></i></Button>
                    
                  </Row>
                  
                </CardBody>
              </Card>
            </Col>
          )}
          
        </Row>
      </div>
    );
  }
}

export default Tabs;

const thumbsStyle = {background: 'none', boxShadow: 'none', border: 'none'};
const Thumbs = styled.div`
  text-align: center;
  p{
    font-size: 10px;
  }
`;
const Avartar = styled.div`
  text-align: center;
  margin: 0 auto;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  img{
    width: 100%;
    height: 100%;
    border-radius: 100%;
    object-fit: cover;
  }
`;

