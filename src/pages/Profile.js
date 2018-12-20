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
  Button
} from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import { api } from "../Configs"
import { connect } from "react-redux";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../scss/profile.scss";
class Forms extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.setUser = this.setUser.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      firstUpdate: true,
      timeout: 300,
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      imagePath: "",
    };
  }

  componentDidUpdate() {
    this.setUser(this.props.user_detail);
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
    if (this.state.firstUpdate) {
      this.setState({
        name: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        imagePath: api.baseUrl + user.imagePath,
        firstUpdate: false
      })
    }
  }

  handleName = event => {
    this.setState({
      name: event.target.value
    });
  };

  handleEmail = event => {
    this.setState({
      email: event.target.value
    });
  };

  handlePhoneNumber = event => {
    this.setState({
      phoneNumber: event.target.value
    });
  };

  handlePassword = event => {
    this.setState({
      password: event.target.value
    });
  };

  render() {
    // console.log(this.state.imagePath)
    return (
      <div className="animated fadeIn">
        <Row>
          <p className="alignProfile">Your Profile</p>
        </Row>
        <Row>
          {/* <Col xs="6" md="12" className="mb-4 ml-3"> */}
          {/* <Col xs="6" md="5" className="mb-4 ml-3"> */}
          <Col className="mb-4 ml-3">
            <TabContent className="adjustBorderColor adjustTabWidth">
              <TabPane>
                <Media>
                    <Media object src={this.state.imagePath} />
                </Media>
                <Form action="" method="post">
                  <FormGroup>
                    <Label htmlFor="full name">Full Name</Label>
                    <Input
                      className="changeSize"
                      type="text"
                      id="full name"
                      onChange={this.handleName}
                      placeholder="full name"
                      value={this.state.name}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      className="changeSize"
                      type="text"
                      id="phoneNumber"
                      onChange={this.handlePhoneNumber}
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
                      className="changeSize"
                      type="email"
                      id="email"
                      onChange={this.handleEmail}
                      placeholder="email"
                      value={this.state.email}
                      disabled
                      required
                    />
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

          <Col xs="6" md="5.5" className="mb-4 ml-3" >
            {/* <Col sm={{ size: 'auto', offset: 1 }} > */}
            <TabContent className="adjustBorderColor adjustTabWidth">
              <TabPane>
                <Form action="" method="post">
                  <FormGroup>
                    <Label htmlFor="password" className="alignForPassword">
                      password
                    </Label>
                    <Input
                      className="changeSize"
                      type="password"
                      id="password"
                      onChange={this.handlePassword}
                      placeholder="●●●●●●●"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="password" className="alignForPassword">
                      confirm password
                    </Label>
                    <Input
                      className="changeSize"
                      type="password"
                      id="password"
                      onChange={this.handlePassword}
                      placeholder="●●●●●●●"
                      required
                    />
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
