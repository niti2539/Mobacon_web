import React, { Component } from "react";
import styled from "styled-components";
import ChatInput from "../Components/Chat/ChatInput";
import ChatList from "../Components/Chat/ChatList";
import ChatMessage from "../Components/Chat/ChatMessage";
import NoChat from "../Components/Chat/NoChat";
import { connect } from "react-redux";
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
  flex-direction: column;
  background-color: #efefef;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      me: {
        fullName: "",
        imagePath: null
      },
      chatMessage: []
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
        }
      });
    }
  };

  componentDidMount() {
    const {
      user: { user_detail: user }
    } = this.props;
    this.setUser(user);
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

  render() {
    const { chatMessage, me } = this.state;
    console.log("User", me);
    return (
      <ChatWrapper>
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
      </ChatWrapper>
    );
  }
}

const mapPropsToState = ({ user }) => ({ user });

export default connect(mapPropsToState)(Chat);
