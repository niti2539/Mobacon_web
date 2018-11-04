import React, { Component } from 'react';

import { Row, ThemeProvider, ChatList, ChatListItem, Avatar, Column, Title, Subtitle, MessageList, Message, MessageGroup, MessageText, TextInput, TextComposer, SendButton } from '@livechat/ui-kit'

import _ from 'lodash';
import styled from 'styled-components'

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
      borderColor:    'var(--avatar-border-color)',
    }
  },
}

class Messages extends Component {

  render() {
    return (
      <ThemeProvider theme={theme}>
           <div>
                {this.props.message}
            </div>
      </ThemeProvider>
    );
  }
}

export default Messages;
