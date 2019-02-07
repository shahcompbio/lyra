import React from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import styled, { css } from "react-emotion";

import { withRouter } from "react-router-dom";

const AnalysisBase = ({
  history,
  className,
  id,
  title,
  description,
  jiraId,
  libraryIds,
  sampleIds,
  project,
  onClick
}) => (
  <TableRow
    key={id}
    onClick={() => {
      history.push("/" + id);
      onClick();
    }}
  >
    <TableCell component="th" scope="row">
      {title}
    </TableCell>
    <TableCell align="right">{description}</TableCell>
    <TableCell align="right">{jiraId}</TableCell>
    <TableCell align="right">{libraryIds}</TableCell>
    <TableCell align="right">{sampleIds}</TableCell>
    <TableCell align="right">{project}</TableCell>
  </TableRow>
);

AnalysisBase.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  jiraId: PropTypes.string.isRequired,
  libraryIds: PropTypes.string.isRequired,
  sampleIds: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
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

export default withRouter(Analysis);
