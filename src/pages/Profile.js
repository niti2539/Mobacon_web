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
import { api, imageRequest, apiRequest } from "../Configs";
import { user } from "../stores/actions";
import { connect } from "react-redux";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../scss/profile.scss";
import { dispatch } from "rxjs/internal/observable/range";

const validationForm = {
  correctPass: "Password correct!",
  wrongPass: "Wrong password!",
  matchPass: "Password match",
  shortMatchPass: "Match password too short",
  notMatchPass: "Passwords do not match"
};

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
      validConfirmPassword: false,
      invalidConfirmPassword: false,
      timeout: 300,
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      imagePath: null,
      roleName: "",
      imageFile: null,
      isImageEdit: false,
      newPassword: "",
      confirmPassword: "",
      passFeedback: "",
      newPassFeedback: "",
      confirmPassFeedback: ""
    };
  }

  componentDidMount() {
    this.setUser(this.props.user_detail);
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

  setUser = async ({ fullName, email, phoneNumber, imagePath, role }) => {
    const photo = await imageRequest(imagePath);
    this.setState({
      fullName,
      email,
      phoneNumber,
      roleName: role.name || "None",
      imagePath: photo,
      firstUpdate: false
    });
  };

  onFileChange = async e => {
    const file = e.target.files[0];
    if (!file || !file.type.match(/.(jpe?g|png)$/))
      return alert("Support jpeg, jpg, png only");
    const reader = new FileReader();
    reader.onload = e => {
      this.setState({ imagePath: e.target.result, isImageEdit: true });
    };
    await this.setState({ imageFile: file });
    reader.readAsDataURL(file);
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handlePassword = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleNewPass = e => {
    if (e.target.value === this.state.confirmPassword) {
      this.setState({
        [e.target.name]: e.target.value,
        confirmPassFeedback: validationForm.matchPass,
        validConfirmPassword: true,
        invalidConfirmPassword: false
      });
    } else if (e.target.value.length > this.state.confirmPassword.length) {
      this.setState({
        [e.target.name]: e.target.value,
        confirmPassFeedback: validationForm.shortMatchPass,
        validConfirmPassword: false,
        invalidConfirmPassword: true
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
        confirmPassFeedback: validationForm.notMatchPass,
        validConfirmPassword: false,
        invalidConfirmPassword: true
      });
    }
  };

  handleConfirmPass = e => {
    if (e.target.value === this.state.newPassword) {
      this.setState({
        [e.target.name]: e.target.value,
        confirmPassFeedback: validationForm.matchPass,
        validConfirmPassword: true,
        invalidConfirmPassword: false
      });
    } else if (e.target.value.length < this.state.newPassword.length) {
      this.setState({
        [e.target.name]: e.target.value,
        confirmPassFeedback: validationForm.shortMatchPass,
        validConfirmPassword: false,
        invalidConfirmPassword: true
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
        confirmPassFeedback: validationForm.notMatchPass,
        validConfirmPassword: false,
        invalidConfirmPassword: true
      });
    }
  };

  onSubmitChangePassword = e => {
    e.preventDefault();
    const { password, newPassword, confirmPassword } = this.state;
    if (confirmPassword !== newPassword) {
      return alert("New password not match!!");
    }
    user
      .changePassword(password, newPassword)
      .then(msg => {
        this.setState({
          password: "",
          newPassword: "",
          confirmPassword: ""
        });
        alert(msg);
      })
      .catch(msg => {
        alert(msg);
      });
  };

  onUpdateProfile = e => {
    e.preventDefault();
    const { fullName, phoneNumber, imageFile, isImageEdit } = this.state;
    let formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("phoneNumber", phoneNumber);
    if (isImageEdit) {
      formData.append("image", imageFile, imageFile.name);
    }
    this.props
      .updateProfile(formData)
      .then(data => {
        console.log("Update profile", data.info);
        this.props.fetchProfile(); // update all user detail in web app
        alert(data.message);
      })
      .catch(err => {
        if (err.response) {
          alert(err.response.data.message);
        }
        console.log(err);
      });
  };

  render() {
    console.log(this.state.imagePath);
    const {
      imagePath,
      email,
      fullName,
      phoneNumber,
      roleName
    } = this.state;
    console.log(imagePath);
    return (
      <div className="animated fadeIn">
        <Row>
          <p className="alignProfile">Your Profile</p>
        </Row>
        <Row>
          <Col className="mb-4 ml-3">
            <TabContent className="adjustBorderColor adjustTabWidth">
              <TabPane>
                <p className="alignHeader divider">Update Profile</p>
                {imagePath && (
                  <Media href="" className="imageWrapper">
                    <Media className="imagePhoto" object src={imagePath} />
                    <Media
                      className="imagePhotoOpacity"
                      object
                      src={imagePath}
                    />
                  </Media>
                )}
                <Form onSubmit={this.onUpdateProfile}>
                  <FormGroup>
                    <Label for="exampleFile">
                      Image size 500x500 (1:1 ratio) recommanded
                    </Label>

                    <Label for="exampleFile">File</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      name="file"
                      id="exampleFile"
                      onChange={this.onFileChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="full name">Role Name</Label>
                    <Input
                      className="changeSize"
                      type="text"
                      value={roleName}
                      disabled
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="full name">Full Name</Label>
                    <Input
                      className="changeSize "
                      type="text"
                      id="full name"
                      name="fullName"
                      onChange={e => this.handleInput(e)}
                      placeholder="full name"
                      value={fullName}
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
                      onChange={e => this.handleInput(e)}
                      placeholder="phone number"
                      value={phoneNumber || ""}
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
                      onChange={e => this.handleInput(e)}
                      placeholder="email"
                      value={email}
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
                <p className="alignHeader divider">Change Password</p>
                <Form onSubmit={this.onSubmitChangePassword}>
                  <FormGroup>
                    <Label htmlFor="password" className="alignForPassword">
                      Current password
                    </Label>
                    <Input
                      className="changeSize inputGroup"
                      type="password"
                      id="password"
                      name="password"
                      onChange={e => this.handlePassword(e)}
                      value={this.state.password}
                      required
                    />
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
                      onChange={e => this.handleNewPass(e)}
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
                      onChange={e => this.handleConfirmPass(e)}
                      valid={this.state.validConfirmPassword}
                      invalid={this.state.invalidConfirmPassword}
                      required
                    />
                    {this.state.confirmPassword.length != 0 && (
                      <FormFeedback valid={this.state.validConfirmPassword}>
                        {this.state.confirmPassFeedback}
                      </FormFeedback>
                    )}
                  </FormGroup>
                  <div className="form-actions">
                    <Button type="submit" className="adjustButtonUpdate">
                      CHANGE PASSWORD
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

const mapStateToProps = state => {
  return {
    user_detail: state.user.user_detail
  };
};

const mapDispatchToProps = dispatch => ({
  fetchProfile: () => user.authorize(dispatch),
  updateProfile: user.updateProfile(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Forms);
