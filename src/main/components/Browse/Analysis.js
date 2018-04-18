import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "react-emotion";

const AnalysisBase = ({ className, title, description, onClick }) => (
  <div className={className} onClick={onClick}>
    <Title>{title}</Title>
    <p>
      <Description>{description}</Description>
    </p>
  </div>
);

AnalysisBase.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired
};

const types = {
  normal: css`
    color: #382b56;
    text-align: left;
  `,

  selected: css`
    padding-right: 8px;
    text-align: right;
    background: #d0d0da;
  `
};

const Title = styled("span")`
  font-size: 13px;
  font-weight: bold;
`;

const Description = styled("span")`
  color: #000000;
`;

const Analysis = styled(AnalysisBase)`
  ${props => (props.isSelected ? types["selected"] : types["normal"])};

  cursor: pointer;
  border-bottom: 1px solid #ccc5c5b5;
  width: 100%;
  height: 100%;
  padding: 10px 5px 0px 10px;
  font-size: 12px;

  &:last-item {
    border-bottom-right-radius: 7px;
    border-bottom-left-radius: 7px;
  }
  &:hover {
    color: #184dc1;
    background: #c5c4c5;
  }
`;

export default Analysis;
