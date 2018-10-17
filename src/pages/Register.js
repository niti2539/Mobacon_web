import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Row, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Register extends Component {
  
  state = {
    dropdownOpen: false,
    value: "Please Select"
  };
  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  nameChangeCarrier = (event) => {
    this.setState({
      dropdownOpen : !this.state.dropdownOpen,
      value : event.target.innerText
    });
  }
  
  render() {
   
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6" className="Register">
              <Card className="mx-4 RegisterPage">
                <CardBody className="p-4">
                  <h1 className='text-center color-main'>Signup</h1>
                  <p className="text-center color-main">Create your account</p>
                  <FormGroup>
                    <Label htmlFor="full name">Full Name</Label>
                    <Input type="text" id="full name" placeholder="Mihai Petrea" required />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="carrier">Carrier</Label>
                    <div>
                      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                      <DropdownToggle caret size="lg" className="Carrier">
                     {this.state.value} <FontAwesomeIcon icon="angle-down" className="angleDown"/>
                      </DropdownToggle>
                      <DropdownMenu className="carrierChoice">
                        <DropdownItem onClick={this.nameChangeCarrier}>Softbank</DropdownItem>
                        <DropdownItem onClick={this.nameChangeCarrier}>KDDI</DropdownItem>
                        <DropdownItem onClick={this.nameChangeCarrier}>UQ</DropdownItem>
                        <DropdownItem onClick={this.nameChangeCarrier}>DOKOMO</DropdownItem>
                        <DropdownItem onClick={this.nameChangeCarrier}>R</DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown>
                    </div>
          
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" placeholder="user@domain.com" required />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="password">password</Label>
                    <Input type="password" id="password" placeholder="●●●●●●●" required />
                  </FormGroup>
                  <br/>
                  <Row className="justify-content-center">
                    <Col md='auto'>
                      <Link to='/dashboard'>
                        <Button color="primary" className="px-4">SIGNUP</Button>
                      </Link>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <Row className="justify-content-center Link-to-signin">
                <Col md='auto'>
                  Already have an account? 
                  <Link to='/login'> Login!</Link>
                </Col>
              </Row>
            </Col>
          </Row>
         
    {/* <DropdownButton
      bsSize="large"
      title="Large button"
      id="dropdown-size-large"
    >
      <MenuItem eventKey="1">Action</MenuItem>
      <MenuItem eventKey="2">Another action</MenuItem>
      <MenuItem eventKey="3">Something else here</MenuItem>
      <MenuItem divider />
      <MenuItem eventKey="4">Separated link</MenuItem>
    </DropdownButton>
   */}
        </Container>
      </div>
    );
  }
}

export default Register;
