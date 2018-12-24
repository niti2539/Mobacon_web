import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ChatListWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex: 1;
  padding-bottom: 10px;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  justify-content: flex-start;
`;
class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({ ...this.props });
    }
    if (prevState !== this.state) {
      this.chatList.scrollTop =
        this.chatList.scrollHeight - this.chatList.clientHeight;
    }
  }

  static propTypes = {
    render: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired
  };
  render() {
    const { render: RenderComponent, data, user } = this.state;
    // console.log("chat Data", data);
    return (
      <ChatListWrapper ref={r => (this.chatList = r)}>
        {data.map((chat, key) => (
          <React.Fragment key={key}>
            {chat.message.startsWith("@")
            // Mockup
              ? RenderComponent({
                  ...chat,
                  message: chat.message.slice(1),
                  user: { ...user, id: 50000 }
                })
              : RenderComponent({ ...chat, user })}
          </React.Fragment>
        ))}
      </ChatListWrapper>
    );
  }
}

export default ChatList;
