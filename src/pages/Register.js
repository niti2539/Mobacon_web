import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, Col, Container, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Register extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1 className='text-center color-main'>Signup</h1>
                  <p className="text-center color-main">Create your account</p>
                  <FormGroup>
                    <Label htmlFor="full name">Full Name</Label>
                    <Input type="text" id="full name" placeholder="full name" required />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="carrier">Carrier</Label>
                    <Input type="text" id="carrier" placeholder="carrier" required />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" placeholder="email" required />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="password">password</Label>
                    <Input type="password" id="password" placeholder="" required />
                  </FormGroup>
                  <br/>
                  <Row className="justify-content-center">
                    <Col md='auto'>
                      <Link to='/dashboard'>
                        <Button color="primary" className="px-4">SIGNUP</Button>
                      </Link>
                    </Col>
                  </Row>
                  <br/>
                  <Row className="justify-content-center">
                    <Col md='auto'>
                      Already have an account? 
                      <Link to='/login'> Login!</Link>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
