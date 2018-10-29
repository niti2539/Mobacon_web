import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Row, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mobaconApi from '../Action';
import ReactTooltip from 'react-tooltip';
class Register extends Component {
  
  state = {
    dropdownOpen: false,
    carrier: "Please Select",
    email: '',
    fullName: '',
    password: '',
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
                  <p className="NotValid">Email or Password is invalid. Please try again.</p>                  
                  <FormGroup>
                    <Label htmlFor="full name">Full Name</Label>
                    <Input type="text" id="full name" onChange={ this.handleName} placeholder="Mihai Petrea" required />
                    <a data-tip="Name can't be null"><FontAwesomeIcon icon="info-circle" className="circle" tool-tip-toggle="tooltip-demo" /></a>
                    <ReactTooltip />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="carrier">Carrier</Label>
                    <div>
                      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} >
                      <DropdownToggle caret size="lg" className="Carrier" id="dropdown">
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
                    <a data-tip="Carrier can't be null"><FontAwesomeIcon icon="info-circle" className="circle CarrierTooltip" tool-tip-toggle="tooltip-demo"/></a>
                    <ReactTooltip />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" onChange={ this.handleEmail } placeholder="user@domain.com" required />
                    <a data-tip="Required valid email" ><FontAwesomeIcon icon="info-circle" className="circle EmailTooltip" tool-tip-toggle="tooltip-demo"/></a>
                    <ReactTooltip />                
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="password">password</Label>
                    <Input type="password" id="password" onChange={ this.handlePassword } placeholder="●●●●●●●" required />
                    <a data-tip="Password can't be null"><FontAwesomeIcon icon="info-circle" className="circle" tool-tip-toggle="tooltip-demo"/></a>
                    <ReactTooltip />
                  </FormGroup>
                  <br/>
                  <Row className="justify-content-center">
                    <Col md='auto'>
                        <Button onClick={this.onSubmit} className="px-4 SignupButton">SIGNUP</Button>
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
         
        </Container>
      </div>
    );
  }
  clickValidate = () => {
    let isError = false
    const errors = {
      fulNameError: "",
      emailError: "",
      passwordError: "",
      carrierError: ""
    }
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(emailRegex.test(this.state.email)){
      if(this.state.password !== ""){
        if(this.state.name !== undefined){
          isError = true;
          this.signup();
        }
      }
    }else {
      isError = false;
    }
    this.setState({
      ...this.state,
      ...errors
    });
    return isError;
  };
  onSubmit = (e) => {
    e.preventDefault();
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const err = this.clickValidate();
    if(err){
      this.setState({
        email: this.state.email,
        emailError: "",
        password: this.state.password,
        passwordError: "",
        name: this.state.name,
        fullNameError: "",
        carrier: this.state.carrier,
        carrierError: "",
      });
    }else{
      var alertValid = document.getElementsByClassName("NotValid");
      alertValid[0].style.display = "block";
      var expandBox = document.getElementsByClassName("Register");
      expandBox[0].style.height = "44.875rem";
      var expandCard = document.getElementsByClassName("RegisterPage");
      expandCard[0].style.height = "44.875rem";
      var elem = document.getElementsByTagName("input")
        var dropDown = document.getElementById("dropdown");
        // dropDown.setAttribute('style', 'border: 1px solid red !important');
        var icon = document.getElementsByClassName("circle");
      if(this.state.email === "" && this.state.carrier === "Please Select" && this.state.password === "" && this.state.name === undefined){
       elem[0].style.borderColor = "red";
       elem[1].style.borderColor = "red";
       elem[2].style.borderColor = "red";
       dropDown.setAttribute('style', 'border: 1px solid red !important');
       icon[0].style.color = "red"; 
       icon[1].style.color = "red"; 
       icon[2].style.color = "red"; 
       icon[3].style.color = "red"; 
      }else if(this.state.email === "" && this.state.carrier === "Please Select" && this.state.name === undefined){
        elem[0].style.borderColor = "red";
        elem[1].style.borderColor = "red";
        dropDown.setAttribute('style', 'border: 1px solid red !important');
        icon[0].style.color = "red"; 
        icon[1].style.color = "red"; 
        icon[2].style.color = "red"; 
      }else if(this.state.email === ""  && this.state.password === "" && this.state.name === undefined){
        elem[0].style.borderColor = "red";
        elem[1].style.borderColor = "red";
        elem[2].style.borderColor = "red";
        icon[0].style.color = "red"; 
        icon[2].style.color = "red"; 
        icon[3].style.color = "red"; 
      }else if(this.state.email === "" && this.state.carrier === "Please Select" && this.state.password === ""){
        elem[1].style.borderColor = "red";
        elem[2].style.borderColor = "red";
        dropDown.setAttribute('style', 'border: 1px solid red !important');
        icon[1].style.color = "red"; 
        icon[2].style.color = "red"; 
        icon[3].style.color = "red"; 
      }else if(this.state.password === "" && this.state.email === ""){
        elem[1].style.borderColor = "red";
        elem[2].style.borderColor = "red";
        icon[2].style.color = "red";
        icon[3].style.color = "red";
      }else if(this.state.name === undefined && this.state.carrier === "Please Select"){
        elem[0].style.borderColor = "red";
        icon[0].style.color = "red";
        dropDown.setAttribute('style', 'border: 1px solid red !important');
        icon[1].style.color = "red";
        this.setState({
          name: this.state.name,
          carrier: this.state.carrier
        })
      }else if(this.state.email === "" && this.state.name === undefined){
        elem[1].style.borderColor = "red";
        icon[2].style.color = "red";
        elem[0].style.borderColor = "red";
        icon[0].style.color = "red";
      }else if(this.state.password === "" && this.state.name === undefined){
        elem[0].style.borderColor = "red";
        elem[2].style.borderColor = "red";
        icon[0].style.color = "red";
        icon[3].style.color = "red";
      }else if(this.state.carrier === "Please Select" && this.state.email === ""){
        dropDown.setAttribute('style', 'border: 1px solid red !important');
        icon[1].style.color = "red";
        elem[1].style.borderColor = "red";
        icon[2].style.color = "red";
      }else if(this.state.carrier === "Please Select" && this.state.password === ""){
        dropDown.setAttribute('style', 'border: 1px solid red !important');
        icon[1].style.color = "red";
        icon[3].style.color = "red";
        elem[2].style.borderColor = "red";
      }else if(this.state.name === undefined){
        elem[0].style.borderColor = "red";
        icon[0].style.color = "red";
      }else if(this.state.carrier === "Please Select"){
        dropDown.setAttribute('style', 'border: 1px solid red !important');
        icon[1].style.color = "red";
      }else if(this.state.email === ""){
        elem[1].style.borderColor = "red";
        icon[2].style.color = "red";
      }else if(this.state.password === ""){
        elem[2].style.borderColor = "red";
        icon[3].style.color = "red";
      }
    }
  }
}

export default Register;
