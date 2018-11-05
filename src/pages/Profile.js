import React, { Component } from 'react';
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';

class Forms extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="4">
            <Card>
              <CardHeader>
                Example Form
              </CardHeader>
              <CardBody>
                <Form action="" method="post">
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="username1" name="username1" placeholder="Username" autoComplete="name"/>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-envelope"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="email" id="email1" name="email1" placeholder="Email" autoComplete="username"/>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" id="password1" name="password1" placeholder="Password" autoComplete="current-password"/>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup className="form-actions">
                    <Button type="submit" size="sm" color="success">Submit</Button>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Forms;
