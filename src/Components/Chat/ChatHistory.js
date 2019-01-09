import React, { Component } from "react";
import styled, { keyframes, css } from "styled-components";
import { Input as ChatInput } from "./ChatInput";
import { imageRequest } from "../../Configs";
import moment from "moment";

const peopleAnimation = keyframes`
  from{
    opacity: 0;
    filter: blur(20px);
    transform: translateY(100vh);
  }
  to {
    opacity: 1;
    filter: blur(0px);
    transform: translateY(0);
  }
`;

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

const ChatHistoryItemAnimation = props => {
  return props.newly
    ? css`
    ${peopleAnimation} 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards,
    ${newlyMessageAnimate} 1s ease-in-out infinite alternate-reverse;
  `
    : css`
        ${peopleAnimation} 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
      `;
};

const ChatHistoryItem = styled.div`
  padding: 10px;
  max-height: 120px;
  cursor: pointer;
  display: flex;
  border-bottom-color: #3b4859;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  flex-shrink: 0;
  flex-direction: row;
  opacity: 0;
  transform: translateY(100vh);
  animation: ${ChatHistoryItemAnimation};
  * {
    color: ${props => (props.active ? "inherith" : "#fff")} !important;
  }
  background-color: ${props => (props.active ? "#efefef" : "transparent")};

  cursor: ${props => (props.active ? "default" : "pointer")};
  border-bottom-color: #999;
  border-bottom-width: 1px;
`;

const newlyMessageAnimate = keyframes`
    from {
      background-color: rgba(124,191,187, .1);
    }
    to {
      background-color: rgba(124,191,187, .45);
    }
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
      margin-right: 15px;
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
    width: 40px;
    height: 40px;
    img {
      background-color: #fff;
      height: 40px;
      width: 40px;
      border-radius: 20px;
      object-fit: cover;
    }
  }
`;

class ChatHistoryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChat: props.currentChat,
      ok: true,
      data: props.history,
      search: ""
    };
  }

  componentDidUpdate = prevProps => {
    if (prevProps !== this.props) {
      this.setState({
        data: this.props.history,
        currentChat: this.props.currentChat
      });
    }
  };

  setCurrentRequest = id => {
    this.props.onChatSelect(id);
    this.setState({ currentChat: id });
  };

  onSearch = e => {
    const text = e.target.value;
    this.setState({ search: text });
  };

  _filter = (searchText, data = []) => {
    return data.filter(d =>
      String(d.chat.user.fullName)
        .toLowerCase()
        .trim()
        .startsWith(
          String(searchText)
            .trim()
            .toLowerCase()
        )
    );
  };

  render() {
    const { ok, data, currentChat, search } = this.state;
    return (
      <ChatHistoryWrapper>
        <Text>Recent chats</Text>
        <ChatSearchBoxWrapper>
          <Input
            placeholder="Search contact"
            value={search}
            onChange={this.onSearch}
          />
        </ChatSearchBoxWrapper>
        <ChatHistoryList>
          {ok &&
            this._filter(search, data).map((list, key) => {
              return (
                <ChatHistoryItem
                  key={key}
                  active={currentChat === list.request.id}
                  newly={true}
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

class ChatPeople extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.chat,
      imagePath: null
    };
  }

  componentDidMount = () => {
    this.requestImage();
  };

  requestImage = async () => {
    let {
      data: {
        user: { imagePath: imgPath }
      }
    } = this.state;
    const imagePath = await imageRequest(imgPath);
    this.setState({ imagePath });
  };

  componentDidUpdate = async prevProps => {
    if (prevProps !== this.props) {
      const { chat } = this.props;
      this.setState({ data: chat });
    }
  };

  getLatestTime = latestTime => {
    const lastForm = moment().from(moment(latestTime), true);
    return `${lastForm} ago`;
  };

  render() {
    const {
      data: {
        message,
        createdAt,
        user: { fullName }
      },
      imagePath
    } = this.state;
    return (
      <ChatPeopleContainer>
        <ImageContainer>
          {imagePath && (
            <div>
              <img src={imagePath} />
            </div>
          )}
        </ImageContainer>
        <div className="chatDetail">
          <div className="chatHeader">
            <span className="name">{fullName}</span>
            <span className="chatSince">{this.getLatestTime(createdAt)}</span>
          </div>
          <p>{message}</p>
        </div>
      </ChatPeopleContainer>
    );
  }
}

export default ChatHistoryComponent;
