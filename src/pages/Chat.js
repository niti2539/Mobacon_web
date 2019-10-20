import React, { Component } from "react";
import styled from "styled-components";
import ChatInput from "../Components/Chat/ChatInput";
import ChatMessagesWrapper from "../Components/Chat/ChatList";
import ChatMessage from "../Components/Chat/ChatMessage";
import NoChat from "../Components/Chat/NoChat";
import ChatHistory from "../Components/Chat/ChatHistory";
import { connect } from "react-redux";
import { notify } from "../stores/actions";
import moment from "moment";
import { imageRequest } from "../Configs";
import _ from "lodash";

export const ChatWrapper = styled.div`
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
      read: {},
      nothingMore: {}
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
    this.onMobileChat();
    // window.socket.emit("chat", "hello backend");
  }

  onMobileChat = () => {
    window.socket.on("mobile-chat", async payload => {
      if (payload.ok) {
        const { currentChat } = this.state;
        var { data } = payload;
        if (payload.data.request.id == currentChat) {
          this.onMobilePushChat(data);
          this.readChat(currentChat);
        } else {
          // console.log("request mobile chat id", data.request.id);
          await this.pushCurrentChatToTop(data.request.id);
          // this.setState({ currentChat: data.request.id });
        }
        this.updateChatHistory(data);
      } else {
        this.restartChat();
        alert("Connot get new message from user");
      }
    });
  };

  onSelfChat = () => {
    window.socket.on("web-self-chat", payload => {
      if (payload.ok) {
        const { currentChat } = this.state;
        var { data } = payload;
        if (payload.data.request.id == currentChat) {
          this.onSelfPushChat(data.message, false);
        } else {
        }
      } else {
        this.restartChat();
        alert("Connot get new message");
      }
    });
  };

  readChat = id => {
    window.socket.emit("web-read-chat", { requestId: id }, payload => {
      this.props.refreshNotify();
    });
  };

  updateChatHistory = data => {
    let chatHistory = this.state.chatHistory;
    const { currentChat } = this.state;
    console.log("Update latest chat", data);
    const {
      request: { id },
      message,
      createdAt
    } = data;
    const handleFind = d => d.request.id == id;
    let chat = chatHistory.find(handleFind);
    let findIndex = chatHistory.findIndex(handleFind);
    chat.chat.message = message;
    chat.chat.createdAt = createdAt;
    chat.chat.read.operator = currentChat == id;
    chatHistory[findIndex] = chat;
    this.setState({ chatHistory });
  };

  handleUpdateChatList = data => {};

  onSelfPushChat = async (message, canFailed = true) => {
    const { currentChat } = this.state;
    const data = await this.reformatChatMessage([
      {
        _id:
          Math.random()
            .toString(36)
            .substring(9) +
          Math.random() * 100,
        message,
        request: { id: currentChat },
        sender: { role: { id: 2 } },
        failed: canFailed ? null : false,
        createdAt: moment()
      }
    ]);
    // console.log("Data", data);
    await this.setState({
      previousSelfChat: this.state.chatMessage.length
    });
    this.onPushChat(data[0]);
    this.updateChatHistory(data[0]);
  };

  onMobilePushChat = async dataMessage => {
    const data = await this.reformatChatMessage([
      Object.assign(dataMessage, { sender: { role: { id: 3 } } })
    ]);
    // console.log("Data", data);
    // await this.setState({
    //   previousSelfChat: this.state.chatMessage.length
    // });
    this.onPushChat(data[0]);
    this.updateChatHistory(data[0]);
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

  getChatHistory = (searchText = "") => {
    // console.log("Get chat list");
    const { chatMessage } = this.state;
    window.socket.emit(
      "web-search-chatroom",
      { existChatList: 0, searchText: searchText.trim() },
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

  onSearchContact = text => {
    console.log("Search contact is",text);
    this.getChatHistory(text);
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
        const isSelf = cur.sender.role.id != 3;
        obj.push({
          ...cur,
          sender: _.assign(
            {
              info: isSelf ? me : { ...cur.user, imagePath: userImagePath }
            },
            cur.sender
          )
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
          this.pushMoreChat(payload.data);
          if (payload.data.length < 1) {
            return await this.setState({
              nothingMore: true
            });
          }
          this.setState({
            nothingMore: false
          });
        } else {
          // await this.setState({ chatMessage: [] });
          console.error("payload", payload);
          alert("Cannot get this chat");
        }
      }
    );
  };

  pushMoreChat = async payload => {
    let chatMessage = this.state.chatMessage;
    let data = await this.reformatChatMessage(payload);
    console.log("Payload data", data);
    chatMessage.unshift(...data);
    return await this.setState({
      chatMessage
    });
  };

  pushCurrentChatToTop = async id => {
    console.log("action id", id);
    console.log("history id", this.state.chatHistory[0].request.id);
    if (id == this.state.chatHistory[0].request.id) return;
    let chatHistory = this.state.chatHistory;
    const handleFind = d => d.request.id == id;
    let history = chatHistory.find(handleFind);
    const findIndex = chatHistory.findIndex(handleFind);
    chatHistory.splice(findIndex, 1);
    chatHistory.unshift(history);
    await this.setState({ chatHistory });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.setUser(this.props.user.user_detail);
    }
  }

  onPushChat = async data => {
    const chatMessage = this.state.chatMessage;
    // console.log("Push from request id", data.request.id);
    await this.pushCurrentChatToTop(data.request.id);
    chatMessage.push(data);
    this.setState({ chatMessage });
  };

  onChangeChat = async id => {
    if (id === this.state.currentChat) return;
    this.readChat(id);
    const chatHistory = this.state.chatHistory;
    const handleFind = d => d.request.id == id;
    const history = chatHistory.find(handleFind);
    const findIndex = chatHistory.findIndex(handleFind);
    if (!history.chat.read.operator) {
      history.chat.read.operator = true;
      chatHistory[findIndex] = history;
    }
    await this.setState({
      chatMessage: [],
      currentChat: id,
      chatHistory,
      read: history.chat.read,
    });
    this.getOldChat(id);
  };

  onLoadMoreChat = previouslyTopDom => {
    const { currentChat, chatMessage } = this.state;
    console.log(
      "Current chat",
      currentChat,
      "Exist chat message",
      chatMessage.length
    );
    this.getOldChat(currentChat, chatMessage.length);
  };

  groupByDate = (chatMessages) => {
    const groups =chatMessages.length && chatMessages.reduce((groups, message) => {
      const currentDate = new Date();
      const date = (message && message.createdAt && message.createdAt.split) ? message.createdAt.split('T')[0] : currentDate
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    }, {});
    return groups;
  }

  render() {
    const { chatMessage, chatHistory, currentChat, nothingMore, read } = this.state;
    let groupedMessages = [];
    if (chatMessage && chatMessage.length) {
      groupedMessages = this.groupByDate(chatMessage);
    }
    // const message = ChatMessage.find((m) => m.) << -- tobe continue
    return (
      <ChatWrapper>
        <ChatHistory
          onSearch={this.onSearchContact}
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
              data={groupedMessages}
              currentChat={currentChat}
              read={read}
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

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch => {
  return {
    refreshNotify: notify.refreshNotify(dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
