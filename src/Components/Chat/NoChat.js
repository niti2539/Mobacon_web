import React, { Component } from "react";
import styled from "styled-components";

const NoChat = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  strong {
    font-size: 3rem;
    opacity: 0.5;
    text-align: center;
  }
  p {
    font-size: 1rem;
    opacity: 0.5;
    text-align: center;
  }
`;

class NoChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <NoChat>
        <strong>Start chat to someone now</strong>
        <h3>Mock up tip!!</h3>
        <p>
          Type @ before text to play a other chat side
          <br />
          Type a normal text to play your chat side
        </p>
      </NoChat>
    );
  }
}

export default NoChatComponent;
