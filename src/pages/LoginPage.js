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
  Row
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
import { apiRequest } from "../Configs";
import { user } from "../stores/actions";
import { bindActionCreators } from "redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";
import ForgotPassword from "../Components/ForgotPassword";

var emailTimeOutValidate = setTimeout(() => {}, 1000);

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "admin@mobacon.com",
      password: "1234",
      errorMsg: [],
      emailError: false,
      emailSuccess: false,
      passwordError: false,
      authorize: false,
      isForgotPassword: false,
      forgotPasswordMessage: "",
      isForgotSent: false
    };
  }

  handleEmailChange = async event => {
    const email = event.target.value;
    await this.setState({
      email
    });
  };
  handlePasswordChange = async event => {
    await this.setState({ password: event.target.value, passwordError: false });
  };

  onForgotPassword = () => {
    this.setState({ isForgotPassword: true });
  };

  onSubmitForgotPassword = async email => {
    try {
      const result = await apiRequest("/changePassword", "POST", {
        email: email
      });
      await this.setState({
        isForgotSent: true,
        forgotPasswordMessage: `${result.message} please check your mail inbox`
      });
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      }
      console.log("Change password error", err);
    }
  };

  componentDidMount() {
    this.props.authorize(auth => {
      if (!auth) {
        // console.log("No auth!!!");
        return this.setState(({ email }) => {
          const success = this.validateEmail(email);
          return {
            authorize: true,
            emailError: !success,
            emailSuccess: success
          };
        });
      }
      console.log("Authorization!!!");
      window.location.replace("/dashboard");
    });
  }

  render() {
    const {
      errorMsg,
      emailError,
      passwordError,
      email,
      password,
      emailSuccess,
      authorize,
      isForgotPassword,
      forgotPasswordMessage,
      isForgotSent
    } = this.state;
    return (
      authorize && (
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="6" className="LoginPage">
                <Card className="mx-4 Login">
                  <CardBody className="p-4">
                    {isForgotPassword ? (
                      <ForgotPassword
                        isSent={isForgotSent}
                        message={forgotPasswordMessage}
                        onCancel={() =>
                          this.setState({
                            isForgotPassword: false,
                            isForgotSent: false,
                            forgotPasswordMessage: "",
                            email: ""
                          })
                        }
                        email={email}
                        validate={this.validateEmail}
                        onSubmit={this.onSubmitForgotPassword}
                      />
                    ) : (
                      <React.Fragment>
                        <h1 className="text-center color-main">Login</h1>
                        <p className="text-center color-main">
                          Sign In to your account
                        </p>
                        {errorMsg.map((err, i) => (
                          <p key={i} className="NotValid">
                            {err}
                          </p>
                        ))}
                        <Form onSubmit={this.onSubmit}>
                          <FormGroup>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              style={
                                emailError
                                  ? styles.fieldError
                                  : emailSuccess
                                  ? styles.fieldSuccess
                                  : {}
                              }
                              type="email"
                              name="email"
                              value={email}
                              onKeyDown={() => {
                                clearTimeout(emailTimeOutValidate);
                              }}
                              onKeyUp={() => {
                                clearTimeout(emailTimeOutValidate);
                                emailTimeOutValidate = setTimeout(() => {
                                  this.setState({
                                    emailError: !this.validateEmail(email),
                                    emailSuccess:
                                      email.length > 0 &&
                                      this.validateEmail(email)
                                  });
                                }, 500);
                              }}
                              id="email"
                              placeholder="petreamihaic@gmail.com"
                              required
                              onChange={this.handleEmailChange}
                            />
                            <a data-tip="Required valid email ex: abc@gmail.com">
                              <FontAwesomeIcon
                                style={
                                  emailError
                                    ? styles.iconError
                                    : emailSuccess
                                    ? styles.fieldSuccess
                                    : {}
                                }
                                icon={"info-circle"}
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
                              style={passwordError ? styles.fieldError : {}}
                              type="password"
                              id="password"
                              name="password"
                              value={password}
                              placeholder="●●●●●●●"
                              required
                              onChange={this.handlePasswordChange}
                            />

                            <a data-tip="Password can't be null">
                              <FontAwesomeIcon
                                style={passwordError ? styles.iconError : {}}
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
                              <Button
                                type="button"
                                color="link"
                                onClick={this.onForgotPassword}
                              >
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
                                onClick={this.onSubmit}
                              >
                                LOGIN
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                      </React.Fragment>
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )
    );
  }

  validateEmail = email => {
    if (email.length < 1) return true;
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const isPassword = password.length > 0,
      isEmail = this.validateEmail(email);
    // const err = false;
    if (isPassword && isEmail) {
      return this.signin(email, password);
    }
    this.setState({
      emailError: !isEmail,
      errorMsg: [
        email.length < 1
          ? "Email required!"
          : !isEmail
          ? "Email is invalid!"
          : "",
        !isPassword ? "Password required!" : ""
      ],
      passwordError: !isPassword
    });
  };
  signin = async (email, password) => {
    const data = {
      email,
      password
    };
    let result = await this.props.signIn(data);
    if (result) {
      this.props.history.push("/dashboard");
    } else {
      this.setState({
        emailError: true,
        passwordError: true,
        errorMsg: ["Email or password invalid!!"]
      });
    }
  };
}
const mapStateToProps = state => ({
  user_detail: state.user_detail
});
const mapDispatchToProps = dispatch => {
  return {
    authorize: cb => user.authorize(dispatch, cb),
    signIn: user.signIn(dispatch)
  };
};
const styles = {
  fieldError: {
    borderColor: "red",
    color: "red"
  },
  fieldSuccess: {
    borderColor: "#2db84e",
    color: "#2db84e"
  },
  iconError: {
    color: "red"
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
