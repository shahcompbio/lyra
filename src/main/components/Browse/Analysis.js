import React from "react";
import PropTypes from "prop-types";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import { withRouter } from "react-router-dom";

const theme = createMuiTheme({
  overrides: {
    MuiTableRow: {
      root: {
        "&$selected": {
          backgroundColor: "#FFA954"
        }
      }
    },
    MuiTableCell: {
      body: {
        color: "#000000",
        fontSize: 13,
        whiteSpace: "pre-line"
      }
    }
  }
});

const Analysis = ({
  history,
  id,
  title,
  description,
  jiraId,
  libraryIds,
  sampleIds,
  project,
  onClick,
  isSelected
}) => (
  <MuiThemeProvider theme={theme}>
    <TableRow
      key={id}
      onClick={() => {
        history.push("/" + id);
        onClick();
      }}
      selected={isSelected}
    >
      <TableCell align="left" component="th" scope="row">
        {title}
      </TableCell>
      <TableCell align="right">{description}</TableCell>
      <TableCell align="right">{jiraId}</TableCell>
      <TableCell align="right">{libraryIds}</TableCell>
      <TableCell align="right">{sampleIds}</TableCell>
      <TableCell align="right">{project}</TableCell>
    </TableRow>
  </MuiThemeProvider>
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
