import React, { Component } from "react";
import styled from "styled-components";
import ChatInput from "../Components/Chat/ChatInput";
import ChatMessagesWrapper from "../Components/Chat/ChatList";
import ChatMessage from "../Components/Chat/ChatMessage";
import NoChat from "../Components/Chat/NoChat";
import ChatHistory from "../Components/Chat/ChatHistory";
import { connect } from "react-redux";
import moment from "moment";
import { imageRequest } from "../Configs";
import _ from "lodash";

const ChatWrapper = styled.div`
  position: absolute;
  * {
    font-family: "Rubik-Medium", Arial, Helvetica, sans-serif !important;
    color: #3b4859;
  }
  overflow: hidden;
  display: flex;
  flex-direction: row;
  background-color: #3bc;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

export const ChatBody = styled.div`
  overflow: hidden;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  background-color: #efefef;
`;

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      me: { fullName: "", imagePath: null },
      currentChat: null,
      chatMessage: [],
      chatHistory: [],
      previousSelfChat: null,
      nothingMore: false
    };
  }

  setUser = async data => {
    const { imagePath, fullName, id } = data;
    if (imagePath.trim() === "") return;
    const image = await imageRequest(imagePath);
    console.log("Image path", image);
    if (image) {
      this.setState({
        me: {
          id,
          imagePath: image,
          fullName
        }
      });
    }
  };

  componentDidMount() {
    const {
      user: { user_detail: user }
    } = this.props;
    this.setUser(user);
    this.getChatHistory();
    this.onSelfChat();
    // window.socket.emit("chat", "hello backend");
  }

  onSelfChat = () => {
    window.socket.on("web-self-chat", payload => {
      if (payload.ok) {
        const { currentChat } = this.state;
        if (payload.data.request.id == currentChat) {
          let { data } = payload;
          this.onSelfPushChat(data.message, false);
        } else {
        }
      } else {
        this.restartChat();
        alert("Connot get new message");
      }
    });
  };

  onSelfPushChat = async (message, canFailed = true) => {
    const data = await this.reformatChatMessage([
      {
        message,
        sender: { role: { id: 2 } },
        failed: canFailed ? null : false,
        createdAt: moment()
      }
    ]);
    console.log("Data", data);
    await this.setState({
      previousSelfChat: this.state.chatMessage.length
    });
    this.onPushChat(data);
  };

  onEnterChat = async message => {
    const { currentChat } = this.state;
    this.onSelfPushChat(message);
    try {
      window.socket.emit(
        "web-chat",
        { text: message, requestId: currentChat },
        payload => {
          // console.log("payload", payload);
          let chatMessage = this.state.chatMessage;
          let previousIndex = this.state.previousSelfChat;
          if (!previousIndex) return;
          chatMessage[previousIndex].failed = !payload.ok;
          this.setState({ chatMessage });
          // console.log("payload web send", payload);
          // this.onPushChat({ sender: null, message: payload.message });
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  restartChat = () => {
    this.setState({ currentChat: null, chatMessage: [] });
  };

  getChatHistory = () => {
    // console.log("Get chat list");
    const { chatMessage } = this.state;
    window.socket.emit(
      "web-chat-list",
      { existChatList: chatMessage.length },
      payload => {
        if (payload.ok) {
          const { data } = payload;
          this.setState({ chatHistory: data }, () => {
            console.log("Chat history has set", data);
          });
        }
      }
    );
  };

  reformatChatMessage = async inputData => {
    const { me } = this.state;
    let rawData = inputData.reverse();
    const userData = rawData.find(data => data.sender.role.id == 3);
    let userImagePath = "";
    if (userData) {
      userImagePath = await imageRequest(userData.user.imagePath);
    }
    const data = _.reduce(
      rawData,
      (obj, cur) => {
        const isSelf = cur.sender.role.id !== 3;
        obj.push({
          ...cur,
          sender: _.assign(cur.sender, {
            info: isSelf ? me : { ...cur.user, imagePath: userImagePath }
          })
        });
        return obj;
      },
      []
    );
    return data;
  };

  getOldChat = (id, existChat = 0) => {
    // const { chatMessage } = this.state;
    window.socket.emit(
      "web-old-chat",
      {
        existChat,
        requestId: id
      },
      async payload => {
        if (payload.ok) {
          const { chatMessage } = this.state;
          if (payload.data.length < 1) {
            return this.setState({ nothingMore: true });
          }
          const data = await this.reformatChatMessage(payload.data);
          console.log("payload chat message", data);
          await this.setState({
            chatMessage:
              existChat > 0 ? chatMessage.concat(payload.data) : payload.data
          });
        } else {
          // await this.setState({ chatMessage: [] });
          alert("Cannot get this chat");
        }
      }
    );
  };

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.setUser(this.props.user.user_detail);
    }
  }

  onPushChat = data => {
    const chat = this.state.chatMessage;
    chat.push(data);
    this.setState({ chat });
  };

  onChangeChat = id => {
    if (id === this.state.currentChat) return;
    this.getOldChat(id);
    this.setState({
      currentChat: id
    });
  };

  onLoadMoreChat = () => {
    const { currentChat, chatMessage } = this.state;
    console.log(
      "Current chat",
      currentChat,
      "Exist chat message",
      chatMessage.length
    );
    this.getOldChat(currentChat, chatMessage.length);
  };

  render() {
    const { chatMessage, chatHistory, currentChat, nothingMore } = this.state;
    // const message = ChatMessage.find((m) => m.) << -- tobe continue
    return (
      <ChatWrapper>
        <ChatHistory
          history={chatHistory}
          currentChat={currentChat}
          onChatSelect={this.onChangeChat}
        />
        <ChatBody>
          {chatMessage.length < 1 ? (
            <NoChat />
          ) : (
            <ChatMessagesWrapper
              onSeeMore={this.onLoadMoreChat}
              nothingMore={nothingMore}
              data={chatMessage}
              // loadMore={<LoadMoreChat onClick={this.onLoadMoreChat} />}
              render={props => <ChatMessage {...props} />}
            />
          )}
          <ChatInput
            onPushChat={this.onEnterChat}
            visible={currentChat !== null}
          />
        </ChatBody>
      </ChatWrapper>
    );
  }
}

const mapPropsToState = ({ user }) => ({ user });

export default connect(mapPropsToState)(Chat);
