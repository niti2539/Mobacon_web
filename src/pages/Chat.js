import React, { Component } from "react";
import styled from "styled-components";
import ChatInput from "../Components/Chat/ChatInput";
import ChatList from "../Components/Chat/ChatList";
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

const ChatBody = styled.div`
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
      me: {
        fullName: "",
        imagePath: null
      },
      currentChat: null,
      chatMessage: [],
      chatHistory: [
        {
          request: {
            id: 0,
            carrier: {
              id: 0,
              name: "Test"
            }
          },
          chat: {
            _id: null,
            message:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            read: {
              user: false,
              operator: false
            },
            user: {
              id: 0,
              fullName: "User"
            },
            operator: {
              id: 1,
              fullName: "Worapol",
              imagePath: "Buraphan"
            },
            senderRoleId: 2, //1: admin, 2: operator, 3: user
            createdAt: moment().hours(moment().hours - 2)
          }
        },
        {
          request: {
            id: 1,
            carrier: {
              id: 0,
              name: "Test"
            }
          },
          chat: {
            _id: null,
            message:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            read: {
              user: false,
              operator: false
            },
            user: {
              id: 0,
              fullName: "User"
            },
            operator: {
              id: 1,
              fullName: "Worapol",
              imagePath: "Buraphan"
            },
            senderRoleId: 2, //1: admin, 2: operator, 3: user
            createdAt: moment().hours(moment().hours - 2)
          }
        },
        {
          request: {
            id: 2,
            carrier: {
              id: 0,
              name: "Test"
            }
          },
          chat: {
            _id: null,
            message:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            read: {
              user: false,
              operator: false
            },
            user: {
              id: 0,
              fullName: "User"
            },
            operator: {
              id: 1,
              fullName: "Worapol",
              imagePath: "Buraphan"
            },
            senderRoleId: 2, //1: admin, 2: operator, 3: user
            createdAt: moment().hours(moment().hours - 2)
          }
        }
      ]
    };
  }

  setUser = async data => {
    const { imagePath, fullName, id } = data;
    if (imagePath.trim() === "") return;
    const image = await imageRequest(imagePath);
    if (image) {
      this.setState({
        me: {
          id,
          imagePath: image,
          fullName
        },
        chatHistory: [
          {
            fullName: "someone",
            imagePath,
            id: 50000
          }
        ]
      });
    }
  };

  componentDidMount() {
    const {
      user: { user_detail: user }
    } = this.props;
    this.setUser(user);
    // window.socket.emit("chat", "hello backend");
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.setUser(this.props.user.user_detail);
    }
  }

  onPushChat = (sender, message) => {
    const chat = this.state.chatMessage;
    chat.push({ sender, message });
    this.setState({ chat });
  };

  onChangeChat = id => {
    this.setState({
      currentChat: id
    });
  };

  render() {
    const { chatMessage, me, chatHistory } = this.state;
    console.log("User", me);
    // const message = ChatMessage.find((m) => m.) << -- tobe continue
    return (
      <ChatWrapper>
        <ChatHistory history={chatHistory} onChange={this.onChangeChat} />
        <ChatBody>
          {chatMessage.length < 1 ? (
            <NoChat />
          ) : (
            <ChatList
              user={me}
              data={chatMessage}
              render={({ message, type, sender, user }) => (
                <ChatMessage
                  sender={sender}
                  user={user}
                  message={message}
                  type={type}
                />
              )}
            />
          )}
          <ChatInput onPushChat={this.onPushChat} />
        </ChatBody>
      </ChatWrapper>
    );
  }
}

const mapPropsToState = ({ user }) => ({ user });

export default connect(mapPropsToState)(Chat);
