import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";

const ChatListWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex: 1;
  padding-bottom: 10px;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  justify-content: flex-start;
`;

const Collapse = keyframes`
  from{
    top: 0%;
    visibility: visible;
  }
  to{
    top: -50%;
    visibility: hidden;
  }
`;

const LoadMore = styled.div`
  padding: 20px;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    to bottom,
    rgba(3, 79, 79, 0.18) 0%,
    rgba(239, 239, 239, 0) 100%
  );
  animation-name: ${Collapse};
  animation-duration: 2s;
  animation-timing-function: cubic-bezier(1, -0.44, 0, 1.47);
  animation-play-state: running;
  animation-fill-mode: forwards;

  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover {
    background: linear-gradient(
      to bottom,
      rgba(3, 79, 79, 0.34) -20%,
      rgba(239, 239, 239, 0) 100%
    );
  }
`;

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({ ...this.props });
    }
    if (prevState !== this.state) {
      this.chatList.scrollTop =
        this.chatList.scrollHeight - this.chatList.clientHeight;
    }
  }

  componentDidMount() {
    this.slowCreateChat();
  }

  slowCreateChat = () => {
    setTimeout;
  };

  static propTypes = {
    render: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired
  };
  render() {
    const { onSeeMore, nothingMore } = this.props;
    const { render: RenderComponent, data } = this.state;
    // console.log("chat Data", data);
    return (
      <ChatListWrapper ref={r => (this.chatList = r)}>
        <LoadMore nothingMore={nothingMore} onClick={onSeeMore}>
          See more
        </LoadMore>
        {data.map((chat, key) => {
          return RenderComponent({
            ...chat,
            key
          });
        })}
      </ChatListWrapper>
    );
  }
}

export default ChatList;
