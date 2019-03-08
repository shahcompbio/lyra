import React from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

const CustomTableCell = withStyles(theme => ({
  body: {
    fontSize: 14
  }
}))(TableCell);

const Analysis = ({
  history,
  className,
  id,
  title,
  description,
  jiraId,
  libraryIds,
  sampleIds,
  project,
  onClick,
  isSelected,
  classes
}) => (
  <TableRow
    key={id}
    onClick={() => {
      history.push("/" + id);
      onClick();
    }}
    selected={isSelected}
  >
    <CustomTableCell component="th" scope="row">
      {title}
    </CustomTableCell>
    <CustomTableCell align="right">{description}</CustomTableCell>
    <CustomTableCell align="right">{jiraId}</CustomTableCell>
    <CustomTableCell align="right">{libraryIds}</CustomTableCell>
    <CustomTableCell align="right">{sampleIds}</CustomTableCell>
    <CustomTableCell align="right">{project}</CustomTableCell>
  </TableRow>
);

Analysis.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  jiraId: PropTypes.string.isRequired,
  libraryIds: PropTypes.string.isRequired,
  sampleIds: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired
};

export default withRouter(Analysis);
