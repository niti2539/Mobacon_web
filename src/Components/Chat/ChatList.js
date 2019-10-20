import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
import posed from "react-pose";
import moment from 'moment';

const ChatListWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex: 1;
  position: relative;
  padding-bottom: 10px;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  justify-content: flex-start;
`;

// const LoadMoreAnimate = posed.div({
//   closed: {
//     top: "-100%",
//     transition: { type: "spring", stiffness: 100, damping: 10 }
//   },
//   opened: {
//     top: "0",
//     transition: { type: "spring", stiffness: 100, damping: 10 }
//   }
// });

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
  &:hover {
    background: linear-gradient(
      to bottom,
      rgba(3, 79, 79, 0.34) -20%,
      rgba(239, 239, 239, 0) 100%
    );
  }
`;

const DateText = styled.h4`
  text-align: center;
  width: 100%;
  margin: 10px;
`;

const Status = styled.div`
  align-self:  "flex-end";
  width: 90%;
  margin: 10px 0;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  flex-direction:  "row";
  opacity: 0.5;
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

  formatDate = (date) => {
    var check = moment(date, 'YYYY/MMMM/DD');
    
    var month = check.format('MMMM');
    var day   = check.format('D');
    var year  = check.format('YYYY');

    return `${day} ${month} ${year}`;

  }

  slowCreateChat = () => {
    setTimeout;
  };

  static propTypes = {
    render: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired
  };
  render() {
    const { onSeeMore, nothingMore, read } = this.props;
    const { user = false, operator = false } = read;
    const { render: RenderComponent, data } = this.state;
    // console.log("nothing more", nothingMore);
    return (
      <React.Fragment>
        {!nothingMore && <LoadMore onClick={onSeeMore}>See more</LoadMore>}
        <ChatListWrapper ref={r => (this.chatList = r)}>
          {
            Object.keys(data).map((key, index) => {
              const chatArray = data[key]
              return (
                <div>
                  <DateText>{this.formatDate(key)}</DateText>
                  {chatArray.map((chat, key) => {
                    return RenderComponent({
                      ...chat,
                      key: chat._id
                    });
                  })}
                </div>

              )
            })
          }
          {(user === true && operator === true) ? 
            <Status>Read</Status>
            :
            <Status>UnRead</Status>
          }
  
        </ChatListWrapper>
      
      </React.Fragment>
    );
  }
}

export default ChatList;
