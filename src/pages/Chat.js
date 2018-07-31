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
  // Row,
} from 'reactstrap';
// import { ChatItem, Dropdown, MessageList, Avatar } from 'react-chat-elements'
import { Row, ThemeProvider, TextInput, TextComposer, SendButton } from '@livechat/ui-kit'
import Messages from '../Components/Messages';
import ChatList from '../Components/ChatList';
import styled from 'styled-components'
import _ from 'lodash';

const theme = {
  vars: {
    'primary-color': '#427fe1',
    'secondary-color': '#fbfbfb',
    'tertiary-color': '#fff',
    'avatar-border-color': 'blue',
  },
  AgentBar: {
    Avatar: {
      size: '42px',
    },
    css: {
      backgroundColor: 'var(--secondary-color)',
      borderColor: 'var(--avatar-border-color)',
    }
  },
}

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
          <Row className="row no-gutters">
            <Col xs="12" sm="3">
              <Card style={{'height': 'calc(100vh - 200px)'}}>
                <CardBody>
                  <Label>Recent Chats</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                    <InputGroupText><i className="fa fa-search"></i></InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" id="search" name="search" placeholder="search"/>
                  </InputGroup>
                </CardBody>

                <ChatList/>
                
              </Card>
            </Col>
            <Col xs="12" sm="9">
              <Card style={{'height': 'calc(100vh - 200px)'}}>
                <CardHeader>
                  Name Surname
                </CardHeader>
                <CardBody>
                  <div style={{ maxWidth: '100%', height: 'calc(100vh - 340px)' }}>

                    <Messages/>

                  </div>
                </CardBody>
                <CardFooter style={{padding: 0}}>
                  <ThemeProvider>
                    <TextComposer defaultValue="Hello, can you help me?">
                      <Row align="center">
                        <TextInput fill />
                        <SendButton fit />
                      </Row>
                    </TextComposer>
                  </ThemeProvider>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
    );
  }
}

export default Forms;
