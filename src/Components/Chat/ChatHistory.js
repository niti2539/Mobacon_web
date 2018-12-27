import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { Input as ChatInput } from "./ChatInput";
import moment from "moment";
const ChatHistoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 25%;
  overflow: hidden;
  min-width: 260px;
  background-color: #a0acbc;
`;

const ChatHistoryList = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  flex-grow: 1;
`;

const ChatHistoryItem = styled.div`
  padding: 10px;
  max-height: 120px;
  display: flex;
  border-bottom-color: #3b4859;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  flex-shrink: 0;
  flex-direction: row;
  * {
    color: ${props => (props.active ? "inherith" : "#fff")} !important;
  }
  background-color: ${props => (props.active ? "#efefef" : "transparent")};
  cursor: ${props => (props.active ? "default" : "pointer")};
  border-bottom-color: #999;
  border-bottom-width: 1px;
`;

const ChatSearchBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 0 10px 5px 10px;
`;

const Text = styled.h5`
  flex-shrink: 0;
  display: flex;
  text-align: left;
  padding: 10px;
  margin: 0;
  color: #fff !important;
`;

const Input = styled(ChatInput)`
  height: 35px;
  margin-bottom: 5px;
`;

const ChatPeopleContainer = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  flex-direction: row;
  .chatDetail {
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .chatHeader {
      margin-bottom: 10px;
      display: flex;
      flex-wrap: wrap;
    }
    .name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
      font-size: 14px;
      flex-grow: 1;
      font-weight: bold;
    }
    .chatSince {
      font-size: 13px;
      font-weight: lighter;
    }
    p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 12px;
      font-weight: lighter;
      margin-bottom: 4px;
    }
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-grow: 1;
  justify-content: center;
  margin-right: 10px;
  div {
    display: flex;
    background-color: #fff;
    height: 40px;
    width: 40px;
    overflow: hidden;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
  }
`;

class ChatHistoryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRequest: 0,
      ok: true,
      data: props.history
    }
  }

  setCurrentRequest = id => {
    this.setState({ currentRequest: id });
  };

  render() {
    const { ok, data, currentRequest } = this.state;
    return (
      <ChatHistoryWrapper>
        <Text>Recent chats</Text>
        <ChatSearchBoxWrapper>
          <Input placeholder="Search contact" />
        </ChatSearchBoxWrapper>
        <ChatHistoryList>
          {ok &&
            data.map(list => {
              return (
                <ChatHistoryItem
                  active={currentRequest === list.request.id}
                  onClick={() => this.setCurrentRequest(list.request.id)}
                >
                  <ChatPeople {...list} />
                </ChatHistoryItem>
              );
            })}
        </ChatHistoryList>
      </ChatHistoryWrapper>
    );
  }
}

const ChatPeople = ({
  chat: {
    message,
    createdAt,
    user: { fullName }
  }
}) => (
  <ChatPeopleContainer>
    <ImageContainer>
      <div>
        <img
          src={
            "https://vignette.wikia.nocookie.net/vsbattles/images/d/d0/Doraemon_render.png/revision/latest?cb=20171108000852"
          }
        />
      </div>
    </ImageContainer>
    <div className="chatDetail">
      <div className="chatHeader">
        <span className="name">{fullName}</span>
        <span className="chatSince">{`${moment().hours -
          moment(createdAt).hours} Hour ago`}</span>
      </div>
      <p>{message}</p>
    </div>
  </ChatPeopleContainer>
);

export default ChatHistoryComponent;