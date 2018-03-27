import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "react-emotion";

const BrowseItemBase = ({
  className,
  title,
  description,
  onClick,
  isSelected
}) => (
  <div className={className} onClick={onClick}>
    <Title>{title}</Title>
    <p>
      <Description>{description}</Description>
    </p>
  </div>
);

BrowseItemBase.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired
};

const types = {
  normal: css`
    background: #dee3e1;
    color: #000000;
    text-align: left;
  `,

  selected: css`
    background: #184dc1;
    color: #dee3e1;
    text-align: right;
  `
};

const Title = styled("span")`
  font-size: 16px;
`;

const Description = styled("span")`
  color: #000000;
`;

const BrowseItem = styled(BrowseItemBase)`
  ${props => (props.isSelected ? types["selected"] : types["normal"])};

  width: 90%;
  height: 50px;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 5px;
  font-size: 12px;

  &:hover {
    color: #184dc1;
    background: #b0b4b2;
  }
`;

export default BrowseItem;
