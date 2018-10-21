import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Row, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mobaconApi from '../Action';

class Register extends Component {
  
  state = {
    dropdownOpen: false,
    carrier: "Please Select"
  };
  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  nameChangeCarrier = (event) => {
    this.setState({
      dropdownOpen : !this.state.dropdownOpen,
      carrier : event.target.innerText
    });
  }
 
  signup = async () => {
     console.log(this);
     let data = {
         fullName: this.state.name,
         email: this.state.email,
         carrier: this.state.carrier,
         password: this.state.password
     }
     let result = await mobaconApi.signUp(data);
     if ( result.message === "created" ) {
         this.props.history.push('/'); //คล้าย ๆ redirect
     } else {
       console.log(result);
     }
  }

  handleName = (e) => {
      this.setState({
          name: e.target.value
      });
  }

  handleEmail = (e) => {
      this.setState({
          email: e.target.value
      });
  }

  handlePassword = (e) => {
      this.setState({
          password: e.target.value
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
                    <Input type="text" id="full name" onChange={ this.handleName} placeholder="Mihai Petrea" required />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="carrier">Carrier</Label>
                    <div>
                      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                      <DropdownToggle caret size="lg" className="Carrier">
                     {this.state.carrier} <FontAwesomeIcon icon="angle-down" className="angleDown"/>
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
                    <Input type="email" id="email" onChange={ this.handleEmail } placeholder="user@domain.com" required />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="password">password</Label>
                    <Input type="password" id="password" onChange={ this.handlePassword } placeholder="●●●●●●●" required />
                  </FormGroup>
                  <br/>
                  <Row className="justify-content-center">
                    <Col md='auto'>
                        <Button onClick={this.signup} className="px-4 SignupButton">SIGNUP</Button>
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
