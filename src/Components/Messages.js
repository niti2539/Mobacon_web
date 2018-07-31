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
      borderColor: 'var(--avatar-border-color)',
    }
  },
}

class Forms extends Component {

  render() {
    return (
      <ThemeProvider theme={theme}>
        <MessageList active>
          <MessageGroup
            avatar="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
            onlyFirstWithMeta
          >
            <Message authorName="Jon Smith" date="21:37" showMetaOnClick>
              <MessageText>Hi! I would like to buy those shoes</MessageText>
            </Message>
            <Message date="21:38" authorName="Jon Smith">
              <MessageText>Hi! I would like to buy those shoes</MessageText>
            </Message>
          </MessageGroup>
          <MessageGroup onlyFirstWithMeta>
            <Message date="21:38" isOwn={true} authorName="Visitor">
              <MessageText>
                I love them
                sooooooooo
                much!
              </MessageText>
            </Message>
            <Message date="21:38" isOwn={true} authorName="Visitor">
              <MessageText>This helps me a lot</MessageText>
            </Message>
          </MessageGroup>
          <MessageGroup
            avatar="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
            onlyFirstWithMeta
          >
            <Message authorName="Jon Smith" date="21:37">
              <MessageText>No problem!</MessageText>
            </Message>
            <Message
              authorName="Jon Smith"
              imageUrl="https://static.staging.livechatinc.com/1520/P10B78E30V/dfd1830ebb68b4eefe6432d7ac2be2be/Cat-BusinessSidekick_Wallpapers.png"
              date="21:39"
            >
              <MessageText>
                The fastest way to help your customers - start chatting with visitors
                who need your help using a free 30-day trial.
              </MessageText>
            </Message>
            <Message
              authorName="Jon Smith"
              imageUrl="https://static.staging.livechatinc.com/1520/P10B78E30V/dfd1830ebb68b4eefe6432d7ac2be2be/Cat-BusinessSidekick_Wallpapers.png"
              date="21:39"
            >
              <MessageText>
                The fastest way to help your customers - start chatting with visitors
                who need your help using a free 30-day trial.
              </MessageText>
            </Message>
          </MessageGroup>
        </MessageList>
      </ThemeProvider>
    );
  }
}

export default Forms;
