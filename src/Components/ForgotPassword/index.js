import React, { Component } from "react";
import {
  Container,
  Input,
  Form,
  Button,
  Row,
  Col,
  FormGroup
} from "reactstrap";
import ReactTooltip from "react-tooltip";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import "./style.scss";
var emailTimeOutValidate = setTimeout(() => {}, 1000);

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.email ? props.email : "",
      isEmailValid: false,
      isSent: Boolean(props.isSent)
    };
  }

  componentDidUpdate = prevProps => {
    if (this.props !== prevProps) {
      const { isSent, email } = this.props;
      this.setState({ email, isSent });
    }
  };

  onChange = e => {
    const value = e.target.value;
    this.setState({
      email: value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { email } = this.state;
    const { onSubmit } = this.props;
    onSubmit(email);
  };

  validate = email => {
    this.setState({
      isEmailValid: this.props.validate ? this.props.validate(email) : true
    });
  };

  componentDidMount = () => {
    this.validate(this.state.email);
  };

  render() {
    const { email, isEmailValid, isSent } = this.state;
    const { onCancel, message = null } = this.props;
    return (
      <React.Fragment>
        <div className="backBtnContainer" onClick={onCancel}>
          <Icon icon="chevron-circle-left" />
          <span>Back</span>
        </div>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <h2>Forgot password</h2>
            {!isSent ? (
              <React.Fragment>
                <Input
                  style={
                    email.length < 1
                      ? {}
                      : !isEmailValid
                      ? styles.fieldError
                      : styles.fieldSuccess
                  }
                  type="email"
                  name="forgotEmail"
                  value={email}
                  onKeyDown={() => {
                    clearTimeout(emailTimeOutValidate);
                  }}
                  onKeyUp={() => {
                    clearTimeout(emailTimeOutValidate);
                    emailTimeOutValidate = setTimeout(() => {
                      this.validate(email);
                    }, 500);
                  }}
                  placeholder="example@gmail.com"
                  required
                  onChange={this.onChange}
                />
                <a data-tip="Required valid email ex: abc@gmail.com">
                  <Icon
                    style={
                      email.length < 1
                        ? {}
                        : !isEmailValid
                        ? styles.fieldError
                        : styles.fieldSuccess
                    }
                    icon={"info-circle"}
                    className="circle"
                    tool-tip-toggle="tooltip-demo"
                    data-original-title="Required valid email"
                  />
                </a>
                <ReactTooltip />
              </React.Fragment>
            ) : (
              <p>{message}</p>
            )}
          </FormGroup>
          <Row
            className="justify-content-center"
            style={{ margin: "10px 0 0 0", width: "100%" }}
          >
            <Col md="auto">
              <Button type="submit" className="mobacon-btn">
                {isSent ? "RESENT EMAIL" : "SEND EMAIL"}
              </Button>
            </Col>
          </Row>
        </Form>
      </React.Fragment>
    );
  }
}
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

export default ForgotPassword;
