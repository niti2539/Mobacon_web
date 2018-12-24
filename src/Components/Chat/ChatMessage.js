import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

const messageSpawn = keyframes`
  from {
    opacity: 0;
    transform: scale(2);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const Message = styled.div`
  padding: 8px 12px;
  border: none;
  border-radius: 19.5px;
  max-width: 300px;
  word-wrap: break-word;
  background-color: #3b4859;
  color: #fff !important;
  box-shadow: 0 5px 10px 2px rgba(150, 150, 150, 0.2),
    0 3px 10px 1px rgba(150, 150, 150, 0.4);
`;

const MessageWrapper = styled.div`
  align-self: ${props => (props.isMyMessage ? "flex-end" : "flex-start")};
  flex-shrink: 0;
  margin: 10px 0;
  display: flex;
  align-items: flex-end;
  justify-content: ${props => (props.isMyMessage ? "flex-end" : "flex-start")};
  transform: scale(2);
  animation: ${messageSpawn} 0.5s cubic-bezier(0.05, 0.77, 0, 1) forwards;
  flex-direction: ${props => (props.isMyMessage ? "row" : "row-reverse")};
`;

const Sender = styled.div`
  width: fit-content;
  margin: 0 10px;
  img {
    box-shadow: 0 5px 10px 3px rgba(150, 150, 150, 0.05),
      0 2px 10px 1.5px rgba(150, 150, 150, 0.2);

    border-radius: 100%;
  }
`;

class ChatMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      message,
      sender,
      type,
      user: { fullName, imagePath, id }
    } = this.props;
    const name = fullName.trim().split(/\s/)[0];
    return (
      <MessageWrapper isMyMessage={id == localStorage.getItem("id")}>
        <Message>{message}</Message>
        {imagePath && (
          <Sender>
            <img src={imagePath} width="25" />
          </Sender>
        )}
      </MessageWrapper>
    );
  }
}

export default ChatMessage;
