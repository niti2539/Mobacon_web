import styled from "styled-components";
import React from "react";
import moment from "moment";

const ReviewItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
  overflow-x: hidden;
  flex-shrink: 0;
  flex-grow: 1;
  div:nth-last-child() {
    border: none;
  }
`;

const ReviewItem = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: column;
  justify-content: flex-start;
  border-bottom: 1px solid rgba(40, 40, 40, 0.4);
  transition: all 0.2s ease-in-out;
  &:hover {
    border-bottom-width: 2px;
    border-bottom-color: #7cbfbb;
  }
`;

const Name = styled.span`
  font-size: 0.65em;
  margin-bottom: 5px;
  padding: 0;
`;

const Review = styled.p`
  font-size: 0.6em;
  opacity: 0.6;
  max-width: 250px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const ReviewHeader = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Since = styled.span`
  opacity: 0.8;
  font-size: 0.6em;
`;

class ReviewItemComponent extends React.Component {
  static defaultProps = {
    data: {}
  };
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    };
  }

  componentDidUpdate = prevProps => {
    if (prevProps.data !== this.props.data) {
      this.setState({ data: this.props.data });
    }
  };

  render() {
    const { data } = this.state;
    return (
      <ReviewItemWrapper>
        {data.request && data.fullName ? (
          data.request.map((review, key) => {
            return (
              <ReviewItem
                key={key}
                onClick={() => this.props.onSelect(review)}
              >
                <ReviewHeader>
                  <Name>{data.fullName}</Name>
                  <Since>
                    {moment(review.offer.createdAt).format("DD/MM/YY HH:mm")}
                  </Since>
                </ReviewHeader>
                <Review>{review.offer.review}</Review>
              </ReviewItem>
            );
          })
        ) : (
          <span>No review</span>
        )}
      </ReviewItemWrapper>
    );
  }
}

export default ReviewItemComponent;
