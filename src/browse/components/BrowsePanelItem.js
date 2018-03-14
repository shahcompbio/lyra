import React from "react";

const BrowsePanelItem = ({ title, description }) => (
  <div style={divStyle}>
    <span style={titleStyle}>{title}</span>
    <br />
    <span style={descriptionStyle}>{description}</span>
  </div>
);

const divStyle = {
  width: "90%",
  height: "50px",
  background: "#dee3e1",
  borderRadius: "5px",
  marginTop: "10px",
  marginBottom: "10px",
  padding: "5px",
  textAlign: "left"
};

const textStyle = {
  color: "#184dc1"
};

const titleStyle = {
  fontSize: "16px",
  ...textStyle
};
const descriptionStyle = {
  fontSize: "12px",
  ...textStyle
};

export default BrowsePanelItem;
