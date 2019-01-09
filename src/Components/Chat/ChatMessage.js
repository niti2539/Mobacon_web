import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { imageRequest } from "../../Configs";
import _ from "lodash";
import moment from 'moment'
const messageSpawn = keyframes`
  from {
    opacity: 0;
    filter: blur(10px);
    transform: scale(2);
  }
  to {
    opacity: 1;
    filter: blur(0px);
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
  box-shadow: ${props =>
    !props.failed
      ? `0 5px 10px 2px rgba(150, 150, 150, 0.2),
    0 3px 10px 1px rgba(150, 150, 150, 0.4)`
      : `0 5px 10px 2px #da506644, 0 3px 10px 1px #da506655`};
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
  width: 30px;
  height: 30px;
  margin: 0 10px;
  img {
    box-shadow: 0 5px 10px 3px rgba(150, 150, 150, 0.05),
      0 2px 10px 1.5px rgba(150, 150, 150, 0.2);
    width: 30px;
    height: 30px;
    object-fit: cover;
    border-radius: 100%;
  }
`;

const SendTime = styled.span`
  margin: 0 10px;
`;
const FailedMessage = styled.span`
  margin-right: 10px;
  color: #da5066 !important;
`;

class ChatMessage extends Component {
  static defaultProps = { timeout: 10000 };
  constructor(props) {
    super(props);
    this.state = {
      imagePath: null,
      failed: props.failed || false
      /*read: false*/
    };
  }

  componentDidMount = async () => {
    const {
      sender: {
        info: { imagePath = "" }
      }
    } = this.props;
    this.setState({ imagePath });
    this.messageTimeout();
  };

  messageTimeout = () => {
    setTimeout(() => {
      if (this.state.failed === null) {
        this.setState({ failed: true });
      }
    }, this.props.timeout);
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ failed: this.props.failed });
    }
  }

  render() {
    const { message, sender = null, createdAt } = this.props;
    // const name = fullName.trim().split(/\s/)[0];
    const { imagePath, failed } = this.state;
    const isMyMessage = sender ? sender.role.id !== 3 : null;
    return isMyMessage !== null ? (
      imagePath && (
        <MessageWrapper isMyMessage={isMyMessage}>
          {!failed && <SendTime>{moment(createdAt).format("HH:mm")}</SendTime>}
          {failed && <FailedMessage>Can't send message</FailedMessage>}
          <Message failed={failed}>{message}</Message>
          <Sender>
            <img src={imagePath} width="30" height="30" />
          </Sender>
        </MessageWrapper>
      )
    ) : (
      // ) : (
      //   <MessageWrapper isMyMessage={isMyMessage}>
      //     <Message>
      //       <Loading />
      //     </Message>
      //     <Sender>
      //       <div style={{ width: 30, height: 30 }} />
      //     </Sender>
      //   </MessageWrapper>
      // )
      <div>
        <hr />
        <div>
          <center>Error message </center>
        </div>
        <hr />
      </div>
    );
  }
}

export default ChatMessage;
