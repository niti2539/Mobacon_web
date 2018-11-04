import React, { Component } from 'react';
import { Row,
  ThemeProvider,
  ChatList
} from '@livechat/ui-kit'
import styled from 'styled-components'
import Header from '../Components/Header'
import MessageList from '../Components/MessageList'
import MessageBox from '../Components/MessageBox'
import firebase from 'firebase'
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



class AppChatList extends Component {
  constructor(props){
    super(props);
    var config = {
        apiKey: "AIzaSyCqTGMI8TjLLaPwckALXZh1xdWew87NGcA",
        authDomain: "react-chat-b1e89.firebaseapp.com",
        databaseURL: "https://react-chat-b1e89.firebaseio.com",
        projectId: "react-chat-b1e89",
        storageBucket: "react-chat-b1e89.appspot.com",
        messagingSenderId: "347445845934"
      };
       firebase.initializeApp(config);
}
  render() {
    return (
      <ThemeProvider theme={theme}>
        <ChatList style={{ 'overflow-y': 'scroll' }}>
        <div className="container">
                <Header title="Chat Room" />
                <div className="columns">
                    <div className="column is-3"></div>
                    <div className="column is-6">
                        <MessageList db={firebase} />
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-3"></div>
                    <div className="column is-6">
                        <MessageBox db={firebase} />
                    </div>
                </div>
            </div> 
        </ChatList>
      </ThemeProvider>
    );
  }
}

export default AppChatList;
