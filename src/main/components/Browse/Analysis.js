import React from "react";
import PropTypes from "prop-types";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import { withRouter } from "react-router-dom";

const theme = createMuiTheme({
  overrides: {
    MuiTableRow: {
      hover: {
        "&$hover:hover": {
          backgroundColor: "#DDDDDD"
        }
      },
      root: {
        "&$selected": {
          backgroundColor: "#FFBD7C"
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

const Analysis = ({ analysis, history, isSelected, onClick }) => (
  <MuiThemeProvider theme={theme}>
    <TableRow
      hover
      key={analysis.id}
      onClick={() => {
        history.push("/" + analysis.id);
        onClick();
      }}
      selected={isSelected}
    >
      <TableCell align="left" component="th" scope="row">
        {analysis.title}
      </TableCell>
      {Object.keys(analysis)
        .filter(
          columnName => ["id", "title", "__typename"].indexOf(columnName) === -1
        )
        .map(columnName => (
          <TableCell align="right" key={analysis[columnName]}>
            {analysis[columnName]}
          </TableCell>
        ))}
    </TableRow>
  </MuiThemeProvider>
);

Analysis.propTypes = {
  analysis: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default withRouter(Analysis);
