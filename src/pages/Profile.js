import React, { Component } from 'react';
import { Badge,
  Col, 
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
} from 'reactstrap';
import 'react-datepicker/dist/react-datepicker.css';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../scss/profile.scss'
class Forms extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword =this.handlePassword.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      name: '',
      email: '',
      password: '',
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }
  handleName = (event) => {
    this.setState({
      name: event.target.value,
    })
  }
  handleEmail = (event) => {
    this.setState({
      email: event.target.value,
    })
  }
  handlePassword = (event) => {
    this.setState({
      password: event.target.value,
    })
  }
  render() {
    return (
      <div className="animated fadeIn">
      <Row>
        <p className="alignProfile">Your Profile</p>
      </Row>
        <Row>
          <Col xs="12" md="12" className="mb-4 ml-3">
          
            <TabContent className="adjustBorderColor adjustTabWidth" >
              <TabPane >
                <Form action="" method="post">
                  <FormGroup>
                    <Label htmlFor="full name">Full Name</Label>
                    <Input className="changeSize" type="text" id="full name" onChange={ this.handleName} placeholder="Mihai Petrea" required />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="email" className="alignForEmail">Email</Label>
                    <Input className="changeSize" type="email" id="email" onChange={ this.handleEmail } placeholder="mihai@gmail.com" required />              
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="password" className="alignForPassword">password</Label>
                    <Input className="changeSize" type="password" id="password" onChange={ this.handlePassword } placeholder="●●●●●●●" required />
                  </FormGroup>
                  <div className="form-actions">
                    <Button type="submit" className="adjustButtonUpdate">UPDATE</Button>
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

export default Forms;
