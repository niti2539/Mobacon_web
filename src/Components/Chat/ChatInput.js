import React, { Component } from "react";
import { Button } from "react-bootstrap";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

const spawnInput = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%)
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  transform: translateY(100%);
  animation: ${spawnInput} 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
`;

const Send = styled(Button)`
  border: none;
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 25px;
  margin: 0 15px;
  color: #7abfbb;
  outline: none;
  transform: scale(1);
  box-shadow: 0 0 10px 1px 0 rgba(44, 44, 44, 0.3);
  transition: all 0.45s cubic-bezier(0.075, 0.82, 0.165, 1);
  &:hover {
    box-shadow: 0 0 10px 0px rgba(44, 44, 44, 0.08);
    transform: scale(1.09);
  }
`;

export const Input = styled.input`
  border: 0 solid transparent;
  font-size: 1em;
  height: 50px;
  border-radius: 25px;
  background-color: #fff;
  flex-grow: 1;
  resize: none;
  outline: none;
  padding: 10px 20px;
  box-shadow: 0 0 10px 1px 0 rgba(44, 44, 44, 0.3),
    0 3px 20px 1px rgba(44, 44, 44, 0.1);
  transition: all 0.45s cubic-bezier(0.65, -0.28, 0.41, 1.24);
  &:focus {
    border: 2px solid rgba(100, 100, 100, 1);
    box-shadow: 0 0 10px 0px rgba(44, 44, 44, 0.08);
  }
  &::placeholder {
    color: #aaa;
  }
`;

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = { message: "" };
  }

  onKeyDown = e => {
    if (e.key === "Enter") {
      this.onPushChat(this.state.message);
    }
  };

  onChange = e => {
    this.setState({ message: e.target.value });
  };

  onPushChat = message => {
    if (message.trim() === "") return;
    const { onPushChat } = this.props;
    this.setState({ message: "" });
    onPushChat(null, message);
  };

  render() {
    const { message } = this.state;
    return (
      <Wrapper>
        <Input
          placeholder="Say something..."
          type="text"
          ref={r => (this.chatBox = r)}
          onKeyDown={this.onKeyDown}
          value={message}
          onChange={this.onChange}
        />
        <Send onClick={() => this.onPushChat(message)}>
          <Icon icon="paper-plane" size="2x" />
        </Send>
      </Wrapper>
    );
  }
}

export default ChatInput;
