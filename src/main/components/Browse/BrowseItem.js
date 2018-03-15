import React from "react";
import { css } from "emotion";

const BrowseItem = ({ title, description, onClick }) => (
  <div className={divStyle} onClick={onClick}>
    <span className={titleStyle}>{title}</span>
    <br />
    <span className={descriptionStyle}>{description}</span>
  </div>
);

const divStyle = css({
  width: "90%",
  height: "50px",
  background: "#dee3e1",
  borderRadius: "5px",
  marginTop: "10px",
  marginBottom: "10px",
  padding: "5px",
  textAlign: "left",
  color: "#000000",
  fontSize: "12px",
  "&:hover": {
    color: "#184dc1",
    background: "#b0b4b2"
  }
});

const titleStyle = css({
  fontSize: "16px"
});
const descriptionStyle = css({
  color: "#000000"
});

export default BrowseItem;
