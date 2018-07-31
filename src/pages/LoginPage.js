import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Login extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1 className='text-center color-main'>Login</h1>
                  <p className="text-center color-main">Sign In to your account</p>
                  <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" placeholder="email" required />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password" placeholder="password" required />
                  </FormGroup>
                  
                  <Row style={{ marginTop: -20 }}>
                    <Col className="text-right">
                      <Button color="link" className="px-0">Forgot password?</Button>
                    </Col>
                  </Row>
                  <br/>
                  <Row className="justify-content-center">
                    <Col md='auto'>
                      <Link to='/dashboard'>
                        <Button color="primary" className="px-4">Login</Button>
                      </Link>
                    </Col>
                  </Row>
                  <br/>
                  <Row className="justify-content-center">
                    <Col md='auto'>
                      No account? 
                      <Link to='/register'> Signup Now!</Link>
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

export default Login;
