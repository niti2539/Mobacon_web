import React, { Component } from 'react';
import { Row,
  ThemeProvider,
  ChatList,
  ChatListItem,
  Avatar,
  Column,
  Title,
  Subtitle,
  MessageList,
  MessageGroup,
  MessageText,
  TextInput,
  TextComposer,
  SendButton
} from '@livechat/ui-kit'
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

class AppChatList extends Component {

  render() {
    return (
      <ThemeProvider theme={theme}>
        <ChatList style={{ 'overflow-y': 'scroll' }}>
          <ChatListItem active>
            <Avatar letter="J" style={{minWidth: 30}}/>
            <Column>
              <Row justify>
                <Title ellipsis>{'Michael'}</Title>
                <Subtitle nowrap>{'14:31 PM'}</Subtitle>
              </Row>
              <Subtitle ellipsis>
                {"Ok, thanks for the details."}
              </Subtitle>
            </Column>
          </ChatListItem>
          <ChatListItem>
            <Avatar imgUrl="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" style={{minWidth: 30}}/>
            <Column fill>
              <Row justify>
                <Title ellipsis>{'Michael'}</Title>
                <Subtitle nowrap>{'14:31 PM'}</Subtitle>
              </Row>
              <Subtitle ellipsis>
                {"Ok, thanks for the details, I'll get back to you tomorrow."}
              </Subtitle>
            </Column>
          </ChatListItem>
          {_.range(7).map(i =>
            <ChatListItem>
              <Avatar letter="K" style={{minWidth: 30}}/>
              <Column fill>
                <Row justify>
                  <Title ellipsis>{'Konrad'}</Title>
                  <Subtitle nowrap>{'14:31 PM'}</Subtitle>
                </Row>
                <Subtitle ellipsis>
                  {'Hello, how can I help you? We have a lot to talk about'}
                </Subtitle>
              </Column>
            </ChatListItem>
          )}
        </ChatList>
      </ThemeProvider>
    );
  }
}

export default AppChatList;
