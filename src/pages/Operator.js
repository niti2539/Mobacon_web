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

  setActivate = async (id = null) => {
    if (!window.confirm("Are you sure to activate or deactivate this operator"))
      return;
    try {
      const result = await apiRequest(`/operator/activation/${id}`, "PATCH");
      alert(result.message);
      this.getOperators();
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  onSendVerify = async id => {
    try {
      const result = await apiRequest("/verification", "POST", {
        userId: id
      });
      if (result) {
        alert(result.message);
      }
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      }
      console.log(err);
    }
  };

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

    return <React.Fragment>
        <Modal open={modalSignupOpen} onClose={this.closeModal} center className="modalBox">
          <Register closeModal={this.closeModal} onComplete={this.getOperators} />
        </Modal>
        <div className="animated fadeIn">
          <Row>
            <Col xs="6" md="6">
              <p className="alignOperator">Operators</p>
            </Col>
            <Col xs="6" md="6" className="mb-4">
              <div style={{ float: "right" }}>
                <Button type="submit" className="adjustButtonUpdate onlyOperatorButton" onClick={this.openModal}>
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
                setActivate={this.setActivate}
                onSendVerify={this.onSendVerify}
              />
            ))}
          </Row>
        </div>

        <div className="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <FontAwesomeIcon icon="times" className="timeCss close" data-dismiss="modal" aria-label="Close" />

              <div className="modal-body">
                <img className="imageOperator" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" />

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
      </React.Fragment>;
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

console.log(mapStateToProps);
const mapDispatchToProps = dispatch => {
  return {
    signUp: data => bindActionCreators(user.signUp)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tabs);
