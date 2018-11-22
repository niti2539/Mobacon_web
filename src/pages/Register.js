import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Row, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mobaconApi from '../Action';
import ReactTooltip from 'react-tooltip';
import {FormErrors} from './FormErrors';
import Select from 'react-select';

const options = [
  { value: '1', label: 'ADMINISTRATOR' },
  { value: '2', label: 'OPERATOR'},
];
class Register extends Component {
  
  state = {
    dropdownOpen: false,
    value: '0',
    email: '',
    fullName: '',
    phoneNumber: '',
    selectedOption: null,
    formErrors: { selectedOption: null , fullName: '', email: ''},
    emailValid: false,
    fullNameValid: false,
    selectedOptionValid: false,
    formValid: false,
    selectedFile: null,
  };
 
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }
  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value}, 
      () => { this.validateField(name, value) });
  }
  fileChangedHandler = (event) => {
    this.setState({selectedFile: event.target.files[0]})
  }
  signup = async () => {
     console.log(this);
     let data = {
         value: this.state.value,
         fullName: this.state.name,
         email: this.state.email,
         phoneNumber: this.state.phoneNumber,

     }
     let result = await mobaconApi.signUp(data);
     if ( result.message === "created" ) {
         this.props.history.push('/'); //คล้าย ๆ redirect
     } else {
       console.log(result);
     }
  }


  render() {
    const { selectedOption } = this.state;
    return (
      <React.Fragment>
        <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6" className="Register">
              <Card className="mx-4 RegisterPage">
                <CardBody className="p-4">
                  <h1 className='text-center color-main'>Signup</h1>
                  <p className="text-center color-main">Create your account</p>
                  <div>
                    <FormErrors formErrors={this.state.formErrors} />
                  </div>  
                  <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={options}
                    // className = {this.errorClass(this.state.formErrors.selectedOption)}
                  />
                  <FormGroup className = {this.errorClass(this.state.formErrors.fullName)}>
                    <Label htmlFor="full name">Full Name</Label>
                    <Input type="text" id="full name" onChange={(event) => this.handleUserInput(event)} placeholder="Mihai Petrea" required />
                    <a data-tip="Name can't be null"><FontAwesomeIcon icon="info-circle" className="circle" tool-tip-toggle="tooltip-demo" /></a>
                    <ReactTooltip />
                  </FormGroup>
                  <FormGroup className = {this.errorClass(this.state.formErrors.email)}>
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" onChange={(event) => this.handleUserInput(event)} placeholder="user@domain.com" required />
                    <a data-tip="Required valid email" ><FontAwesomeIcon icon="info-circle" className="circle EmailTooltip" tool-tip-toggle="tooltip-demo"/></a>
                    <ReactTooltip />                
                  </FormGroup>
                 
                  <FormGroup>
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input type="phoneNumber" id="phoneNumber" onChange={(event) => this.handleUserInput(event)} placeholder="0832345476" />
                    
                  </FormGroup>
                  <FormGroup>
                    <Input type="file" onChange={this.fileChangedHandler}  />
                   
                   
                    <ReactTooltip />
                  </FormGroup>
                  <br/>
                  <Row className="justify-content-center">
                    <Col md='auto'>
                        <Button onClick={this.onSubmit} className="px-4 SignupButton" disabled={!this.state.formValid}>SIGNUP</Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
         
        </Container>
      </div>
      </React.Fragment>
      
    );
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    // let selectedOptionValid = this.state.selectedOptionValid;
    let fullNameValid = this.state.fullNameValid;
    let emailValid = this.state.emailValid;
    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'fullName':
        fullNameValid = value.length > 0;
        fieldValidationErrors.fullName = fullNameValid ? '': 'fullName can not be null';
        break;
      // case 'selectedOption':
      //   fieldValidationErrors.selectedOption = null ? 'Role Id have to select': '';
      //   break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    fullNameValid: fullNameValid,
                    // selectedOptionValid: selectedOptionValid
                  }, this.validateForm);
  }
  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
 }
  validateForm() {
    console.log(this.state.fullNameValid);
    this.setState({formValid: this.state.fullNameValid && this.state.emailValid });
  }
  // clickValidate = () => {
  //   let isError = false
  //   const errors = {
  //     fulNameError: "",
  //     emailError: "",
  //     passwordError: "",
  //     carrierError: ""
  //   }
  //   var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //   if(emailRegex.test(this.state.email)){
  //     if(this.state.password !== ""){
  //       if(this.state.name !== undefined){
  //         isError = true;
  //         this.signup();
  //       }
  //     }
  //   }else {
  //     isError = false;
  //   }
  //   this.setState({
  //     ...this.state,
  //     ...errors
  //   });
  //   return isError;
  // };
 
  
}

export default Register;
