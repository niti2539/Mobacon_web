import React, { Component } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  TabContent,
  TabPane,
  FormGroup,
  Label,
  Row,
  Col,
  Input,
  Button
} from "reactstrap";
import PropTypes, { instanceOf } from "prop-types";
import classNames from "classnames";
import styled from "styled-components";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import posed from "react-pose";
import _ from "lodash";

import { ChatBody, ChatWrapper } from "../../pages/Chat";
import ReviewItem from "../../Components/Review";
import ChatHistory from "../../Components/Chat/ChatHistory";
import ChatMessagesWrapper from "../../Components/Chat/ChatList";
import ChatMessage from "../../Components/Chat/ChatMessage";
import { apiRequest, imageRequest } from "../../Configs";

const SlidingPaneAnimate = posed.div({
  opened: {
    x: "0",
    transition: {
      duration: 150,
      ease: "easeInOut"
    }
  },
  closed: {
    x: "100%",
    transition: {
      duration: 100,
      ease: "easeInOut"
    }
  }
});

const SlidingPane = styled(SlidingPaneAnimate)`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  z-index: 100;
  min-width: 400px;
  background-color: #fff;
  box-shadow: 5px 0 20px 2px rgba(40, 40, 40, 0.3);
  right: 0;
  top: 0;
  bottom: 0;
  margin-top: 65px;
`;

const SlidingPaneContainer = styled.div`
  padding: 0 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`;

const Header = styled.div`
  background-color: #3c4859;
  padding: 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  span,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #fff;
    font-size: 1em;
    font-weight: lighter;
  }
  div {
    color: #fff;
    font-size: 0.8em;
    background-color: transparent;
    margin: auto;
    outline: none;
    cursor: pointer;
    border: none;
    padding: 0;
    margin: 0;
  }
`;

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class RequestHistoryContainer extends Component {
  state = {
    activeTab: "1",
    visible: this.props.visible,
    chatHistory: [],
    chatModal: false,
    chatMessage: [],
    currentChat: null,
    reviewData: {},
    reviewModal: false,
    reviewSelect: {}
  };

  componentDidMount() {
    this.setState({
      visible: this.props.visible
    });
    if (this.state.activeTab == 1) {
      this.getReview();
    }
  }

  componentDidUpdate = prevProps => {
    if (prevProps !== this.props) {
      this.setState({ visible: this.props.visible });
    }
  };

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
      if (tab == 2) {
        this.getCantact();
      } else if (tab == 1) {
        this.getReview();
      }
    }
  };

  getReview = async () => {
    const { user } = this.props.data;
    try {
      // console.log("id", user.id);
      const result = await apiRequest(`/request/review/${user.id}`, "GET");
      // console.log("Result", result);
      // const data = result.data.reduce((obj, cur) => {
      //   obj.push({
      //     ...cur,
      //     chat: Object.assign(cur.chat, {
      //       user: _.pick(user, ["id", "fullName"])
      //     })
      //   });
      //   return obj;
      // }, []);
      this.setState({ reviewData: result.data });
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      }
      console.log("get review error", err);
    }
  };

  reformatChatMessage = async inputData => {
    let rawData = inputData.reverse();
    const userData = rawData[0];
    let userImagePath = "";
    let operatorImagePath = "";
    if (userData) {
      userImagePath = await imageRequest(userData.user.imagePath);
      operatorImagePath = await await imageRequest(userData.operator.imagePath);
    }
    const data = _.reduce(
      rawData,
      (obj, cur) => {
        const isOperator = cur.sender.role.id != 3;
        obj.push({
          ...cur,
          sender: _.assign(
            {
              info: {
                ...cur.user,
                imagePath: isOperator ? operatorImagePath : userImagePath
              }
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

  showChatModal = async (toggle = true) => {
    await this.setState({ chatModal: toggle });
    if (!toggle) {
      this.setState({ currentChat: null, chatMessage: [] });
    }
  };
  showReviewModal = async (toggle = true) => {
    await this.setState({ reviewModal: toggle });
    if (!toggle) {
      this.setState({ reviewSelect: {} });
    }
  };

  getCantact = async () => {
    const { user } = this.props.data;
    try {
      // console.log("id", user.id);
      const result = await apiRequest(`/request/chat/${user.id}`, "GET");
      // console.log("Result", result);
      const data = result.data.reduce((obj, cur) => {
        obj.push({
          ...cur,
          chat: Object.assign(cur.chat, {
            user: _.pick(user, ["id", "fullName"])
          })
        });
        return obj;
      }, []);
      this.setState({ chatHistory: data });
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      }
      console.log("get review error", err);
    }
  };

  onChangeChat = async id => {
    await this.setState({ currentChat: id });
    await this.getChatMessage();
  };

  getChatMessage = async () => {
    const { currentChat, chatMessage } = this.state;
    try {
      const result = await apiRequest(
        `/request/chat/detail/${currentChat}/${chatMessage.length}`,
        "GET"
      );
      // console.log("result chat message", result);
      await this.pushMoreChat(result.data.data); // data nested
      this.showChatModal(true);
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      }
      this.showChatModal(false);
      console.log("Get chat message error", err);
    }
  };

  toggleModal() {
    this.setState({
      chatModal: !this.state.chatModal
    });
  }

  pushMoreChat = async payload => {
    let chatMessage = this.state.chatMessage;
    let data = await this.reformatChatMessage(payload);
    console.log("Payload data", data);
    chatMessage.unshift(...data);
    return await this.setState({
      chatMessage
    });
  };

  onReviewSelect = async data => {
    await this.setState({ reviewSelect: data });
    this.showReviewModal();
  };

  onLoadMoreChat = () => {
    this.getChatMessage();
  };

  render() {
    // eslint-disable-next-line
    const { children, onClose, data, ...attributes } = this.props;
    const {
      visible = false,
      chatHistory,
      chatModal,
      currentChat,
      reviewData,
      chatMessage,
      reviewModal,
      reviewSelect
    } = this.state;
    return (
      <React.Fragment>
        {reviewSelect.offer ? (
          <Modal isOpen={reviewModal} size="lg">
            <ModalHeader style={{ flexShrink: 0 }}>
              <Icon
                icon="align-left"
                style={{ marginRight: 10 }}
                color="#7cbfbb"
              />
              Reviewer: {reviewSelect.operator.fullName}
            </ModalHeader>
            <ModalBody style={{ padding: 20, overflow: "auto" }}>
              <FormGroup>
                <Label htmlFor="SMS" className="label">
                  Review
                </Label>
                <Input
                  readOnly={true}
                  type="textarea"
                  name="review"
                  id="textarea-input"
                  rows="6"
                  value={reviewSelect.offer ? reviewSelect.offer.review : ""}
                  placeholder="Write your review"
                  className="textArea"
                />
              </FormGroup>
              <FormGroup className="alignFormGroup">
                <Label htmlFor="SMS" className="label">
                  Suggestion
                </Label>
                <Input
                  readOnly={true}
                  type="textarea"
                  name="suggestion"
                  id="textarea-input"
                  value={
                    reviewSelect.offer ? reviewSelect.offer.suggestion : ""
                  }
                  rows="6"
                  placeholder="Write your suggetion"
                  className="textArea"
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                color="secondary"
                onClick={() => this.showReviewModal(false)}
              >
                Close
              </Button>
            </ModalFooter>
          </Modal>
        ) : null}
        <Modal
          isOpen={chatModal}
          size="lg"
          toggle={this.toggleModal.bind(this)}
        >
          <ModalHeader style={{ flexShrink: 0 }}>
            <Icon icon="comments" style={{ marginRight: 10 }} color="#7cbfbb" />
            {data.user.fullName}
          </ModalHeader>
          <ModalBody style={{ padding: 0, overflow: "auto" }}>
            <ChatMessagesWrapper
              onSeeMore={this.onLoadMoreChat} // nothingMore={nothingMore}
              data={chatMessage}
              render={props => <ChatMessage {...props} />}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.showChatModal(false)}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
        <SlidingPane pose={visible ? "opened" : "closed"}>
          <Header>
            <span>History</span>
            <div onClick={onClose}>
              <Icon icon="times" />
            </div>
          </Header>
          <SlidingPaneContainer>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classNames({
                    active: this.state.activeTab === "1"
                  })}
                  onClick={() => {
                    this.toggle("1");
                  }}
                >
                  <Icon
                    icon="align-left"
                    style={{ marginRight: 10 }}
                    color="#7cbfbb"
                  />
                  Review
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classNames({
                    active: this.state.activeTab === "2"
                  })}
                  onClick={() => {
                    this.toggle("2");
                  }}
                >
                  <Icon
                    icon="comments"
                    style={{ marginRight: 10 }}
                    color="#7cbfbb"
                  />
                  Chat
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent
              activeTab={this.state.activeTab}
              style={{ border: "none" }}
              className="customTabContent"
            >
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <ReviewItem
                      data={reviewData}
                      onSelect={this.onReviewSelect}
                    />
                  </Col>
                </Row>
              </TabPane>
              <TabPane
                tabId="2"
                style={{
                  position: "relative",
                  height: "100%",
                  marginLeft: -15,
                  marginRight: -15
                }}
              >
                <ChatHistory
                  showSearch={false}
                  history={chatHistory}
                  currentChat={currentChat}
                  onChatSelect={this.onChangeChat}
                />
              </TabPane>
            </TabContent>
          </SlidingPaneContainer>
        </SlidingPane>
      </React.Fragment>
    );
  }
}

RequestHistoryContainer.propTypes = propTypes;
RequestHistoryContainer.defaultProps = defaultProps;

export default RequestHistoryContainer;
