import React, { Component } from "react";
import {
  Badge,
  Col,
  Card,
  CardImg,
  Media,
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
  CustomInput,
  FormFeedback
} from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import { api } from "../Configs"
import { connect } from "react-redux";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../scss/profile.scss";

const validationForm = {
  correctPass: "Password correct!",
  wrongPass: "Wrong password!",
  matchPass: "Password match",
  shortMatchPass: "Match password too short",
  notMatchPass: "Passwords do not match",
}

class Forms extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    // this.handleName = this.handleName.bind(this);
    // this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
    // this.handleEmail = this.handleEmail.bind(this);
    // this.handlePassword = this.handlePassword.bind(this);
    // this.handleImagePath = this.handleImagePath.bind(this);
    this.setUser = this.setUser.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      firstUpdate: true,
      validPassword: false,
      invalidPassword: false,
      validConfirmPassword: false,
      invalidConfirmPassword: false,
      timeout: 300,
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      imagePath: "",
      newPassword: "",
      confirmPassword: "",
      passFeedback: "",
      newPassFeedback: "",
      confirmPassFeedback: "",
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.user_detail !== prevProps.user_detail) {
      this.setUser(this.props.user_detail);
    }
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState(prevState => {
      return { fadeIn: !prevState };
    });
  }

  setUser = user => {
      this.setState({
        name: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        imagePath: api.baseUrl + user.imagePath,
        firstUpdate: false
      });
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handlePassword = (e) => {
    if (!this.state.validPassword) {
      this.setState({
        [e.target.name]: e.target.value,
        passFeedback: validationForm.correctPass,
        validPassword: true,
        invalidPassword: false,
      })
    } else {
      this.setState({
        [e.target.name]: e.target.value,
        passFeedback: validationForm.wrongPass,
        validPassword: false,
        invalidPassword: true,
      })
    }
  }

  handleConfirmPass = (e) => {
    if (e.target.value === this.state.newPassword) {
      this.setState({
        [e.target.name]: e.target.value,
        confirmPassFeedback: validationForm.matchPass,
        validConfirmPassword: true,
        invalidConfirmPassword: false,
      })
    } else if (e.target.value.length < this.state.newPassword.length) {
      this.setState({
        [e.target.name]: e.target.value,
        confirmPassFeedback: validationForm.shortMatchPass,
        validConfirmPassword: false,
        invalidConfirmPassword: true,
      })
    } else {
      this.setState({
        [e.target.name]: e.target.value,
        confirmPassFeedback: validationForm.notMatchPass,
        validConfirmPassword: false,
        invalidConfirmPassword: true,
      })
    }
  }

  render() {
    console.log(this.props.user_detail)
    return (
      <div className="animated fadeIn">
        <Row>
          <p className="alignProfile">Your Profile</p>
        </Row>
        <Row>
          <Col className="mb-4 ml-3">
            <TabContent className="adjustBorderColor adjustTabWidth">
              <TabPane>
                <p className="alignHeader">Update Profile</p>
                <Media href="">
                  <Media
                    className="inputGroup"
                    object src={this.state.imagePath}
                  />
                </Media>
                <Form action="" method="post">
                  <FormGroup>
                    <Label for="exampleFile">File</Label>
                    <Input type="file" name="file" id="exampleFile" />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="full name">Full Name</Label>
                    <Input
                      className="changeSize "
                      type="text"
                      id="full name"
                      name="name"
                      onChange={(e) => this.handleInput(e)}
                      placeholder="full name"
                      value={this.state.name}
                      required
                    />

                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      className="changeSize "
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      onChange={(e) => this.handleInput(e)}
                      placeholder="phone number"
                      value={this.state.phoneNumber}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="email" className="alignForEmail">
                      Email
                    </Label>
                    <Input
                      className="changeSize "
                      type="email"
                      id="email"
                      name="email"
                      onChange={(e) => this.handleInput(e)}
                      placeholder="email"
                      value={this.state.email}
                      disabled
                      required
                    />
                  </FormGroup>
                  <div className="form-actions">
                    <Button type="submit" className="adjustButtonUpdate ">
                      UPDATE
                    </Button>
                  </div>
                </Form>
              </TabPane>
            </TabContent>
          </Col>

          {/* <Col xs="6" md="5.5" className="mb-4 ml-3" > */}
          <Col>
            <TabContent className="adjustBorderColor adjustTabWidth">
              <TabPane>
                <p className="alignHeader">Change Password</p>
                <Form action="" method="post">
                  <FormGroup>
                    <Label htmlFor="password" className="alignForPassword">
                      Current password
                    </Label>
                    <Input
                      className="changeSize inputGroup"
                      type="password"
                      id="password"
                      name="password"
                      onChange={(e) => this.handlePassword(e)}
                      value={this.state.password}
                      valid={this.state.validPassword}
                      invalid={this.state.invalidPassword}
                      required
                    />
                    {this.state.password.length != 0 && (
                      <FormFeedback valid={this.state.validPassword}>{this.state.passFeedback}</FormFeedback>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="password" className="alignForPassword">
                      New password
                    </Label>
                    <Input
                      className="changeSize inputGroup"
                      type="password"
                      name="newPassword"
                      value={this.state.newPassword}
                      onChange={(e) => this.handleInput(e)}
                      invalid={this.state.validPassword}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="password" className="alignForPassword">
                      Confirm password
                    </Label>
                    <Input
                      className="changeSize inputGroup"
                      type="password"
                      name="confirmPassword"
                      value={this.state.confirmPassword}
                      onChange={(e) => this.handleConfirmPass(e)}
                      valid={this.state.validConfirmPassword}
                      invalid={this.state.invalidConfirmPassword}
                      required
                    />
                    {this.state.confirmPassword.length != 0 && (
                      <FormFeedback valid={this.state.validConfirmPassword}>{this.state.confirmPassFeedback}</FormFeedback>
                    )}
                  </FormGroup>
                  <div className="form-actions">
                    <Button type="submit" className="adjustButtonUpdate">
                      UPDATE
                    </Button>
                  </div>
                </Form>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </div>
    );
  }
}

// const mapStateToProps = state => state;

const mapStateToProps = (state) => {
  return {
    user_detail: state.user.user_detail
  }
};

const mapDispatchToProps = () => ({
  updateUserPhoto: () => { }, // ----------v
  updateUser: () => { } //-------->       ตรงนี้เดี๋ยวทำให้ครับ ใช้สำหรับอัพเดทข้อมูลของ user
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Forms);
