import React, { Component } from 'react';
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
import DatePicker from 'react-datepicker';
import classnames from 'classnames';
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
          <Col xs="12" md="12" className="mb-4">
            <div style={{float: 'right'}}>
              <Button type="submit" color="primary">ADD NEW</Button>
            </div>
          </Col>          
        </Row>
        <Row>
          {_.range(12).map(i =>
            <Col xs="12" md="4" lg="4" className="mb-4">
              <Card>
                <CardBody>
                  <div className="card-header-actions">
                    <div className="card-header-action btn btn-setting"><i className="fa fa-pencil"></i></div>
                  </div>
                  <Avartar>
                    <img src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'/>
                  </Avartar>
                  <FormGroup row>
                    <Col md="12">
                      <FormText color="muted">Name</FormText>
                      <Input type="text" id="text-input" name="name" placeholder="name" value="name" disabled/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="12">
                      <FormText color="muted">Email</FormText>
                      <Input type="text" id="text-input" name="email" placeholder="email" value="email" disabled/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="12">
                      <FormText color="muted">Phone</FormText>
                      <Input type="text" id="text-input" name="phone" placeholder="phone" value="phone" disabled/>
                    </Col>
                  </FormGroup>
                  <Thumbs style={{float: 'left'}}>
                    <Button style={thumbsStyle} className="icon"><i className="fa fa-thumbs-o-up fa-2x"></i></Button>
                    <p>400 GOOD REVIEWS</p>
                  </Thumbs>
                  <Thumbs style={{float: 'right'}}>
                    <Button style={thumbsStyle} className="icon"><i className="fa fa-thumbs-o-down fa-2x"></i></Button>
                    <p>400 BAD REVIEWS</p>
                  </Thumbs>
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

