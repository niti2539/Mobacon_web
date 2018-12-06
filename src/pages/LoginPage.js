import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import {
  Nav,
  Navbar,
  NavDropdown,
  MenuItem,
  Tabs,
  ButtonToolbar,
  Table,
  ButtonGroup,
  Grid,
  Panel,
  FormControl,
  DropdownButton,
  OverlayTrigger
} from "react-bootstrap";
import mobaconApi from "../Action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";
import { setUser } from "../Action/user";
import { connect } from "react-redux";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };
  handleEmailChange = async event => {
    await this.setState({ email: event.target.value });
    await this.clickValidate();
  };
  handlePasswordChange = async event => {
    await this.setState({ password: event.target.value });
    //  await this.clickValidate();
  };

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6" className="LoginPage">
              <Card className="mx-4 Login">
                <CardBody className="p-4">
                  <h1 className="text-center color-main">Login</h1>
                  <p className="text-center color-main">
                    Sign In to your account
                  </p>
                  <p className="NotValid">
                    Email or Password is invalid. Please try again.
                  </p>
                  <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        value={this.state.email}
                        id="email"
                        placeholder="petreamihaic@gmail.com"
                        required
                        onChange={this.handleEmailChange}
                      />

                      <a data-tip="Required valid email ex: abc@gmail.com">
                        <FontAwesomeIcon
                          icon="info-circle"
                          className="circle"
                          tool-tip-toggle="tooltip-demo"
                          data-original-title="Required valid email"
                        />
                      </a>
                      <ReactTooltip />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        type="password"
                        id="password"
                        name="password"
                        value={this.state.password}
                        placeholder="●●●●●●●"
                        required
                        onChange={this.handlePasswordChange}
                      />

                      <a data-tip="Password can't be null">
                        <FontAwesomeIcon
                          icon="info-circle"
                          className="circle"
                          tool-tip-toggle="tooltip-demo"
                          data-original-title="Required valid email"
                        />
                      </a>
                      <ReactTooltip />
                    </FormGroup>

                    <Row style={{ marginTop: -20 }}>
                      <Col className="text-right">
                        <Button color="link" className="px-0">
                          Forgot password?
                        </Button>
                      </Col>
                    </Row>
                    <br />
                    <Row className="justify-content-center">
                      <Col md="auto">
                        <Button
                          type="submit"
                          className="px-4 Button-Login"
                          onClick={e => this.onSubmit(e)}
                        >
                          LOGIN
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
  clickValidate = () => {
    let isError = false;
    const errors = {
      emailError: "",
      passwordError: ""
    };
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailRegex.test(this.state.email)) {
      if (this.state.password !== "") {
        isError = true;
        this.signin();
      }
    } else {
      isError = false;
    }
    this.setState({
      ...this.state,
      ...errors
    });
    return isError;
  };

  onSubmit = e => {
    e.preventDefault();
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const err = this.clickValidate();
    // const err = false;
    if (err) {
      this.setState({
        email: this.state.email,
        emailError: "",
        password: this.state.password,
        passwordError: ""
      });
    } else {
      var alertValid = document.getElementsByClassName("NotValid");
      alertValid[0].style.display = "block";
      var expandBox = document.getElementsByClassName("col-md-6");
      expandBox[0].style.height = "34.375rem";
      var expandCard = document.getElementsByClassName("Login");
      expandCard[0].style.height = "34.375rem";
      if (this.state.password.length !== 0) {
        this.setState({
          email: "",
          emailError: "Requires valid email",
          password: this.state.password,
          passwordError: ""
        });
        var elem = document.getElementsByTagName("input");
        var icon = document.getElementsByClassName("circle");
        elem[0].style.borderColor = "red";
        icon[0].style.color = "red";
      } else if (
        emailRegex.test(this.state.email) &&
        this.state.password.length === 0
      ) {
        this.setState({
          email: this.state.email,
          emailError: "",
          password: "",
          passwordError: "Password can't be null"
        });
        elem = document.getElementsByTagName("input");
        icon = document.getElementsByClassName("circle");
        elem[1].style.borderColor = "red";
        icon[1].style.color = "red";
      } else {
        this.setState({
          email: "",
          emailError: "Requires valid email",
          password: "",
          passwordError: "Password can't be null"
        });
        elem = document.getElementsByTagName("input");
        icon = document.getElementsByClassName("circle");
        elem[0].style.borderColor = "red";
        icon[0].style.color = "red";
        elem[1].style.borderColor = "red";
        icon[1].style.color = "red";
      }
    }
  };
  signin = async () => {
    console.log(this);
    let data = {
      email: this.state.email,
      password: this.state.password
    };
    let result = await mobaconApi.signIn(data);
    console.log(data);
    if (result.token) {
      this.props.setUser(result);
      localStorage.setItem("accessToken", result.token);
      this.props.history.push("/dashboard");
    } else {
      this.props.history.push("/");
    }
  };
}
const mapStateToProps = state => ({
  user_detail: state.user_detail
});
const mapDispatchToProps = dispatch => {
  return {
    setUser: result => dispatch(setUser(result))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
