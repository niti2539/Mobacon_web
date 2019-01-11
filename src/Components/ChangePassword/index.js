import React, { Component } from "react";
import { Input, Button, Form, FormGroup, Label } from "reactstrap";
class ChangePassword extends Component {
  constructor(props) {
    super(props);
    // console.log("Props", props);
    this.state = {
      errMsg: null,
      password: "",
      confirmPassword: "",
      passwordError: false
    };
  }

  onPasswordChange = e => {
    e.preventDefault();
    const { value, name } = e.target;
    this.setState({ [name]: value, passwordError: false, errMsg: null });
  };

  checkPasswordMatch(password, confirmPassword) {
    return password && confirmPassword && password === confirmPassword;
  }

  onSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props,
      { password, confirmPassword } = this.state;
    if (this.checkPasswordMatch(password, confirmPassword)) {
      this.setState({ passwordError: false, errMsg: null });
      return onSubmit(password);
    } else {
      return this.setState({
        passwordError: true,
        errMsg: "Password not match"
      });
    }
  };

  render() {
    const { buttonMessage = "SUBMIT" } = this.props;
    const { errMsg, confirmPassword, password, passwordError } = this.state;

    return (
      <React.Fragment>
        <h1>CHANGE YOUR NEW PASSWORD</h1>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={this.onPasswordChange}
              required
              invalid={passwordError}
            />
          </FormGroup>
          <FormGroup>
            <Label>Confirm password</Label>
            <Input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={this.onPasswordChange}
              required
              invalid={passwordError}
            />
          </FormGroup>
          {errMsg && <p style={{ color: "red" }}>{errMsg}</p>}
          <Button className="mobacon-btn" type="submit">
            {buttonMessage}
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default ChangePassword;
