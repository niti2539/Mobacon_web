import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  Label,
  Input,
  Row,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { user } from "../stores/actions";
import { apiRequest } from "../Configs";
import Modal from "react-responsive-modal";
import "../scss/operator.scss";
import _ from "lodash";
import Register from "./Register.js";
import ReactTooltip from "react-tooltip";
import OperatorCard from "../Components/OperatorCard";
import FormData from "form-data";
class Tabs extends Component {
  state = {
    activeTab: "1",
    modalSignupOpen: false,
    modalOperatorDetailShow: false,
    dropdownOpen: false,
    name: "",
    email: "",
    phoneNumber: "",
    selectedOption: null,
    selectedFile: "",
    value: "Please Select",
    imgName: "",
    data: null,
    verified: "",
    activated: "",
    operators: []
  };

  openModal = () => {
    this.setState({ modalSignupOpen: true });
  };
  closeModal = () => {
    this.setState({ modalSignupOpen: false });
  };
  openOperatorDetail = () => {
    this.setState({ modalOperatorDetailShow: true });
  };
  closeOperatorDetail = () => {
    this.setState({ modalOperatorDetailShow: false });
  };
  handleName = e => {
    this.setState({
      name: e.target.value
    });
  };

  handleEmail = e => {
    this.setState({
      email: e.target.value
    });
  };

  handlePassword = e => {
    this.setState({
      password: e.target.value
    });
  };
  phoneNumberHandleChange = e => {
    this.setState({
      phoneNumber: e.target.value
    });
  };
  fileChangedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
    let lengthImgName = event.target.files[0].name.length;
    let imageName = event.target.files[0].name;
    if (lengthImgName > 31) {
      imageName = imageName.substring(0, 32);
      imageName = imageName + "...";
      this.setState({
        imageName: imageName
      });
      // this.selectedFile.name = imageName;
    } else if (lengthImgName <= 32) {
      this.setState({
        imageName: imageName
      });
    }
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };
  nameChangeRoleId = event => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      value: event.target.innerText
    });
  };
  // signup = async () => {
  //       let roleId = this.state.value == 'ADMINISTRATOR' ? 1:2;
  //       const formData = new FormData();
  //       formData.append('roleId',`${roleId}`);
  //       formData.append('fullName', this.state.name);
  //       formData.append('email', this.state.email);
  //       // if(this.)
  //       formData.append('phoneNumber', this.state.phoneNumber);
  //       console.log(typeof(this.state.selectedFile));
  //       if(this.state.selectedFile !== ""){
  //         console.log("x");
  //         formData.append('image', this.state.selectedFile, this.state.selectedFile.name);
  //       }
  //       console.log(formData);
  //       for (let key of formData.values()) {
  //         console.log(key);
  //       }
  //       let result = await mobaconApi.signUp(formData);
  //       if ( result.message === "created" ) {
  //           this.props.history.push('/');
  //       } else {
  //         console.log(result);
  //       }
  //    }
  //     clickValidate = () => {
  //       let isError = false
  //       const errors = {
  //         fulNameError: "",
  //         emailError: "",
  //         passwordError: "",
  //         valueError: ""
  //       }
  //       var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //       if(this.state.value !== "Please Select" && emailRegex.test(this.state.email) && this.state.fullName !== ""){
  //         isError = true;
  //         this.signup();
  //       }else {
  //         isError = false;
  //       }
  //       this.setState({
  //         ...this.state,
  //         ...errors
  //       });
  //       return isError;
  //     };
  //   }
  async getOperators() {
    try {
      var result = await apiRequest("/operators");
    } catch (err) {
      return alert(err.response.data.message);
    }
    console.log("Operators", result);
    this.setState({
      operators: result.operators
    });
    // Where we're fetching data from
    // fetch('http://mobacon-api.pieros.site/mobacon/api/web/operator')
    //   // We get the API response and receive data in JSON format...
    //   .then(response => response.json())
    //   // ...then we update the users state
    //   .then(data =>
    //     this.setState({
    //       users: data,
    //       isLoading: false,
    //     })
    //   )
    //   // Catch any errors we hit and update the app
    //   .catch(error => this.setState({ error, isLoading: false }));
  }

  setActiate = id => {};

  onSendVerify = id => {};

  componentDidMount() {
    this.getOperators();
  }
  render() {
    const { isLoading, users, error, operators } = this.state;
    const { modalSignupOpen } = this.state;
    const { modalOperatorDetailShow } = this.state;
    const divStyle = {
      display: "none"
    };
    const cursor = {
      cursor: "pointer",
      position: "relative",
      top: "2px"
    };

    return (
      <React.Fragment>
        <div className="animated fadeIn">
          <Row>
            <Col xs="6" md="6">
              <p className="alignOperator">Operators</p>
            </Col>
            <Col xs="6" md="6" className="mb-4">
              <div style={{ float: "right" }}>
                <Button
                  type="submit"
                  className="adjustButtonUpdate onlyOperatorButton"
                  onClick={this.openModal}
                >
                  ADD NEW
                </Button>
              </div>
            </Col>
          </Row>
          <Row className="alignRow">
            {operators.map((data, i) => (
              <OperatorCard
                key={i}
                data={data}
                setActivate={this.setActiate}
                onSendVerify={this.onSendVerify}
              />
            ))}
          </Row>
        </div>

        <div
          className="modal fade"
          id="exampleModalLong"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLongTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <FontAwesomeIcon
                icon="times"
                className="timeCss close"
                data-dismiss="modal"
                aria-label="Close"
              />

              <div className="modal-body">
                <img
                  className="imageOperator"
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                />

                {/* <div className="detail head">
                FULL NAME:  CHUCK NORRIS
              </div>
              <div className="detail">
                EMAIL: chuck@norris.com
              </div>
              <div className="detail">
                PASSWORD:  chuck2529
              </div>
              <div className="detail">
                PHONE NUMBER:  +40 0744 222 11
              </div> */}
              </div>
            </div>
          </div>
        </div>
        <Modal
          open={modalSignupOpen}
          onClose={this.closeModal}
          center
          className="modalBox"
        >
          <Card className="mx-4 RegisterPage">
            <CardBody className="p-4">
              <h1 className="text-center color-main">Signup</h1>
              <p className="text-center color-main">Create your account</p>
              <FormGroup>
                <Label htmlFor="RoleId">RoleId</Label>
                <div>
                  <ButtonDropdown
                    isOpen={this.state.dropdownOpen}
                    toggle={this.toggle}
                  >
                    <DropdownToggle
                      caret
                      size="lg"
                      className="RoleId"
                      id="dropdown"
                    >
                      {this.state.value}{" "}
                      <FontAwesomeIcon
                        icon="angle-down"
                        className="angleDown"
                      />
                    </DropdownToggle>
                    <DropdownMenu className="roleIdChoice">
                      <DropdownItem onClick={this.nameChangeRoleId} value="1">
                        ADMINISTRATOR
                      </DropdownItem>
                      <DropdownItem onClick={this.nameChangeRoleId} value="2">
                        OPERATOR
                      </DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </div>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  type="text"
                  id="fullName"
                  onChange={this.handleName}
                  placeholder="Mihai Petrea"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  onChange={this.handleEmail}
                  placeholder="user@domain.com"
                  required
                  className="form-control"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  type="phoneNumber"
                  id="phoneNumber"
                  onChange={this.phoneNumberHandleChange}
                  placeholder="0832345476"
                />
              </FormGroup>

              {/* <FontAwesomeIcon icon="upload"></FontAwesomeIcon>
                <Input type="file" onChange={this.fileChangedHandler} id="image" /> */}
              <form className="md-form">
                <span className="alignImage">Image</span>
                <div className="file-field">
                  <div className="btn btn-sm fileInput">
                    <Input
                      type="file"
                      id="file"
                      style={divStyle}
                      onChange={this.fileChangedHandler}
                    />
                    <Label for="file" style={cursor}>
                      Choose a file
                    </Label>
                  </div>
                  <span className="imageName">{this.state.imageName}</span>
                </div>
              </form>

              <br />
              <Row className="justify-content-center">
                <Col md="auto">
                  <Button
                    color="primary"
                    onClick={this.clickValidate}
                    className="px-4"
                  >
                    SIGNUP
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Modal>
      </React.Fragment>
    );
  }

  signup = async () => {
    let roleId = this.state.value == "ADMINISTRATOR" ? 1 : 2;
    const formData = new FormData();
    formData.append("roleId", `${roleId}`);
    formData.append("fullName", this.state.name);
    formData.append("email", this.state.email);
    // if(this.)
    formData.append("phoneNumber", this.state.phoneNumber);
    console.log(typeof this.state.selectedFile);
    if (this.state.selectedFile !== "") {
      console.log("x");
      formData.append(
        "image",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
    }
    console.log(formData);
    for (let key of formData.values()) {
      console.log(key);
    }
    let result = await this.props.signUp(formData);
    if (result.message === "created") {
      this.props.history.push("/");
    } else {
      console.log(result);
    }
  };
  clickValidate = () => {
    let isError = false;
    const errors = {
      fulNameError: "",
      emailError: "",
      passwordError: "",
      valueError: ""
    };
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (
      this.state.value !== "Please Select" &&
      emailRegex.test(this.state.email) &&
      this.state.fullName !== ""
    ) {
      isError = true;
      this.signup();
    } else {
      isError = false;
    }
    this.setState({
      ...this.state,
      ...errors
    });
    return isError;
  };
}

const mapStateToProps = ({ user_detail }) => ({
  user_detail
});
const mapDispatchToProps = dispatch => {
  return {
    signUp: data => bindActionCreators(user.signUp)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tabs);
