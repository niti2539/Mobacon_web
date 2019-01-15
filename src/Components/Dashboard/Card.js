import React, { Component } from "react";
import { Card, CardBody as ReactCardBody, CardHeader } from "reactstrap";
import styled from "styled-components";

const CardWrapper = styled(Card)`
  border-bottom: ${props => props.active? '2px solid teal' : 'none'} !important;
  padding: 17px 15px;
  cursor: pointer;
  background-color: #fff;
  box-shadow: 0 0 10px 1px rgba(100, 100, 100, 0.08);
`;

const CardBody = styled(ReactCardBody)`
  span {
    display: block;
  }
  span:first-child {
    color: #74d2cb;
    font-size: 1em;
    margin-bottom: 8px;
  }
  span:nth-child(2) {
    font-size: 1.8em;
  }
`;

class DashboardCard extends Component {
  static defaultProps = {
    label: "",
    value: ""
  };
  constructor(props) {
    super(props);
    this.state = { label: props.label, text: props.text, value: props.value };
  }

  componentDidUpdate = prevProps => {
    if (prevProps !== this.props) {
      const { label, value, text } = this.props;
      this.setState({ label, value, text });
    }
  };

  setGraph = () => {
    const { click } = this.props;
    const { value, label } = this.state;

    click(String(value).toLowerCase(), label);
  };

  render() {
    const { label, text } = this.state;
    const {active} = this.props;
    return (
      <CardWrapper onClick={this.setGraph} active={active}>
        <CardBody>
          <span>{label}</span>
          <span>{text}</span>
        </CardBody>
      </CardWrapper>
    );
  }
}

export default DashboardCard;
