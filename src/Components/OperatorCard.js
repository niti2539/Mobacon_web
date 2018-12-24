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
    const result = await imageRequest(data.imagePath);
    this.setState({ operatorImage: result });
  };

  render() {
    const { data, setActivate, onSendVerify } = this.props;
    const { isDropdown, operatorImage } = this.state;
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
      <Col xs="12" md="4" lg="4" className="mb-4">
        <Card className="borderCard">
          <CardBody>
            <div class="actionButton">
              <Dropdown isOpen={isDropdown} toggle={this.toggle}>
                <DropdownToggle>
                  <Icon icon="bars" />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => setActivate(data.id)}>
                    {data.activated ? "Deactivate" : "Activate"}
                  </DropdownItem>
                  {!data.verified && (
                    <DropdownItem onClick={() => onSendVerify(data.id)}>
                      Send verify
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            </div>
            <div row className="imageSection">
              <Avartar>
                {/* <img  data-toggle="modal" data-target="#exampleModalLong" className="imgAvatar" src={`${config.apiHost}${operator.imagePath}`}/> */}

                {operatorImage && (
                  <img
                    className="imgAvatar"
                    src={operatorImage}
                    alt={`${data.fullName}`}
                  />
                )}
                <p className="nameAvatar">{data.fullName}</p>
              </Avartar>
            </div>

            <FormGroup row>
              <Col md="12" className="emailForm">
                <p className="emailText">EMAIL</p>
                <p className="emailSubText">{data.email}</p>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="12" className="phoneForm">
                <p className="phoneText">PHONE</p>
                <p className="phoneSubText">{data.phoneNumber}</p>
              </Col>
            </FormGroup>
            <hr />
            <Row className="alignAfterHr">
              <Col>
                <span className="goodThumb">
                  <Icon icon="thumbs-up" />
                  {`${data.like} GOOD REVIEWS`}
                </span>
              </Col>
              <Col>
                <span className="badThumb">
                  {`${data.dislike} BAD REVIEWS`}
                  <Icon icon="thumbs-down" />
                </span>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default OperatorCard;
