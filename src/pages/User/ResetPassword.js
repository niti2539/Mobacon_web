import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ChangePassword from "../../Components/ChangePassword";
import { Container, Card, CardBody } from "reactstrap";
import { userResetPassword } from "../../stores/actions/email";

import "../../scss/resetPassword.scss";

class UserResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null
    };
  }
  onSubmit = async password => {
    const { token } = this.state;
    await userResetPassword(password, token);
    window.location.replace("/");
  };
  componentDidMount = () => {
    const {
      location: { search }
    } = this.props;
    const params = new URLSearchParams(search);
    const token = params.get("token");
    if (!token) {
      alert("Invalid token");
      return window.location.replace("/");
    }
    this.setState({ token });
  };
  render() {
    return (
      <Container
        style={{
          height: "100vh",
          alignItems: "center",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Card className="white-card">
          <CardBody>
            <ChangePassword
              onSubmit={this.onSubmit}
              buttonMessage="RESET PASSWORD"
            />
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default withRouter(UserResetPassword);
