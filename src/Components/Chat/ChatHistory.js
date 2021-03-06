import React, { Component } from "react";
import styled, { keyframes, css } from "styled-components";
import { Input as ChatInput } from "./ChatInput";
import { imageRequest } from "../../Configs";
import moment from "moment";
import posed, { PoseGroup } from "react-pose";

const peopleAnimation = keyframes`
  from{
    opacity: 0;
    filter: blur(3px);
    background-position: 100%;
  }
  to {
    opacity: 1;
    filter: blur(0px);
    background-position: 0%;
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
  overflow-y: auto !important;
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

const ChatHistoryItemPose = posed.div();

const ChatHistoryItem = styled(ChatHistoryItemPose)`
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
  animation: ${ChatHistoryItemAnimation};
  * {
    color: ${props => (props.active ? "inherith" : "#fff")} !important;
  }
  background: ${props =>
    props.active
      ? "linear-gradient(to right, rgba(220,224,229,1) 0%, rgba(223,226,231,1) 16%, rgba(239,239,239,1) 100%)"
      : "transparent"};
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
  justify-content: ${props => (props.justify ? props.justify : "flex-start")};
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
  flex-grow: 1;
  .chatDetail {
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-grow: 1;
    .chatHeader {
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
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

const SeeMoreText = styled.h4`
  text-align: center;
  width: 100%;
  height: 100%;
  margin: -10px;
`;

class ChatHistoryComponent extends Component {
  static defaultProps = {
    history: [],
    onChatSelect: () => {},
    currentChat: null
  };
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

  onSearchChange = e => {
    const text = e.target.value;
    this.setState({ search: text });
    clearTimeout(this.searchTimeout);
  };

  onSearchContact = () => {
    const { search } = this.state;
    this.props.onSearch(search);
  };

  searchTimeout = setTimeout(() => {}, 0);

  render() {
    const { showSearch = true } = this.props;
    const { ok, data, currentChat, search } = this.state;
    console.log("Data", data);
    return (
      <ChatHistoryWrapper>
        <Text>Recent chats</Text>
        {showSearch && (
          <ChatSearchBoxWrapper>
            <Input
              placeholder="Search contact"
              value={search}
              onChange={this.onSearchChange}
              onKeyUp={() => {
                clearTimeout(this.searchTimeout);
                this.searchTimeout = setTimeout(this.onSearchContact, 500);
              }}
            />
          </ChatSearchBoxWrapper>
        )}
        {data.length > 0 ? (
          <ChatHistoryList>
            <PoseGroup>
              {ok &&
                data.map(list => {
                  const id = list.request.id;
                  return (
                    <ChatHistoryItem
                      key={id}
                      active={currentChat === id}
                      newly={list.chat.read ? !list.chat.read.operator : false}
                      onClick={() => this.setCurrentRequest(id)}
                    >
                      <ChatPeople {...list} />
                    </ChatHistoryItem>
                  );
                })}
            </PoseGroup>
          </ChatHistoryList>
        ) : (
          <Text justify="center">No chatroom</Text>
        )}
        {/* <ChatHistoryItem>
          <SeeMoreText>See more</SeeMoreText>
        </ChatHistoryItem> */}
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
      data: { user }
    } = this.state;
    if (!user.imagePath) return;
    const imagePath = await imageRequest(user.imagePath);
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
        {imagePath && (
          <ImageContainer>
            <div>
              <img src={imagePath} />
            </div>
          </ImageContainer>
        )}
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
