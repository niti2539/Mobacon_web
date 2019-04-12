import React, { Component } from "react";
import { Button, Card, CardBody, Col, FormGroup, Row } from "reactstrap";
import { api, imageRequest } from "../Configs";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const Avartar = styled.div`
  text-align: center;
  border-radius: 100%;
`;

const Thumbs = styled.div`
  text-align: center;
  p {
    font-size: 10px;
  }
`;

class OperatorCard extends Component {
  constructor(props) {
    super(props);
    this.state = { isDropdown: false, operatorImage: null };
    this.setUser = this.setUser.bind(this);
  }
  toggle = () => {
    this.setState({ isDropdown: !this.state.isDropdown });
  };

  static propTypes = {
    setActivate: PropTypes.func.isRequired,
    onSendVerify: PropTypes.func.isRequired
  };

  componentDidMount = async () => {
    const { data } = this.props;
    await this.setUser(data);
  };

  async componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      await this.setUser(this.props.data);
    }
  }

  async setUser(data) {
    if (!data.imagePath || data.imagePath.length < 1) return;
    const result = await imageRequest(data.imagePath);
    this.setState({ operatorImage: result });
  }

  render() {
    const { data, setActivate, onSendVerify } = this.props;
    const { isDropdown, operatorImage } = this.state;
    const id = localStorage.getItem("id");
    // activated: true
    // dislike: 4
    // email: "admin@mobacon.com"
    // fullName: "Mobacon Administrator"
    // id: 1
    // imagePath: "/mobacon/api/image/profile/default/default_profile.png"
    // like: 4
    // phoneNumber: null
    // role: {id: 1, name: "Administrator"}
    // verified: true
    return (
      <Col xs="12" sm="6" md="4" lg="4" xl="3" className="mb-4">
        <Card className="borderCard">
          <CardBody>
            {id == data.id && (
              <div
                style={{
                  fontFamily: "Rubik-Medium",
                  position: "absolute",
                  left: 10,
                  top: 10,
                  opacity: 0.4
                }}
              >
                <strong style={{ color: "#fff" }}>Your self</strong>
              </div>
            )}
            <div className="actionButton">
              <Dropdown isOpen={isDropdown} toggle={this.toggle}>
                <DropdownToggle>
                  <Icon icon="pen" />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => setActivate(data.id)}
                    disabled={id == data.id}
                  >
                    {data.activated ? "Deactivate" : "Activate"}
                  </DropdownItem>
                  {!data.verified && (
                    <DropdownItem onClick={() => onSendVerify(data.id)}>
                      {!data.sendVerify ? "Send verify" : "Verify has sent"}
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            </div>
            {operatorImage && (
              <div row className="imageSection">
                <Avartar>
                  {/* <img  data-toggle="modal" data-target="#exampleModalLong" className="imgAvatar" src={`${config.apiHost}${operator.imagePath}`}/> */}

                  <img
                    className="imgAvatar"
                    src={operatorImage || ""}
                    alt={`${data.fullName}`}
                  />
                  <p className="nameAvatar">{data.fullName}</p>
                </Avartar>
              </div>
            )}
            <div className="emailForm">
              <span className="emailText">ROLE</span>
              <span className="emailSubText">{data.role.name}</span>
            </div>
            <div className="emailForm">
              <span className="emailText">EMAIL</span>
              <span className="emailSubText">{data.email}</span>
            </div>
            <div className="phoneForm lastForm">
              <span className="phoneText">PHONE</span>
              <span className="phoneSubText">{data.phoneNumber}</span>
            </div>
            <hr />
            <Row className="alignAfterHr">
              <Col className="goodThumb">
                <Icon icon="thumbs-up" />
                <span className="thumbCount">{data.like}</span>
                <span className="thumbLabel">GOOD REVIEWS</span>
              </Col>
              <Col className="badThumb">
                <Icon icon="thumbs-down" />
                <span className="thumbCount">{data.dislike}</span>
                <span className="thumbLabel">BAD REVIEWS</span>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default OperatorCard;
