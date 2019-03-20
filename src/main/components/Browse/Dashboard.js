import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AnalysisItem from "./Analysis.js";

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: "100%",
    overflowX: "auto"
  }
});

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#686868",
    color: "#FFFFFF",
    fontSize: 15
  }
}))(TableCell);

const Dashboard = ({
  analyses,
  classes,
  columnNames,
  handleAnalysisClick,
  selectAnalysis,
  selectedAnalysis,
  title
}) => {
  const analysisItems = analyses.map(analysis => {
    const isSelected = selectedAnalysis === analysis.id;
    const onAnalysisClick = () => {
      if (!isSelected) {
        selectAnalysis(analysis.id, title);
      }
      handleAnalysisClick();
    };
    const formatIdList = idList => idList.join("\n");
    analysis = {
      ...analysis,
      libraryIds: formatIdList(analysis.libraryIds),
      sampleIds: formatIdList(analysis.sampleIds)
    };
    return (
      <AnalysisItem
        analysis={analysis}
        isSelected={isSelected}
        key={analysis.title}
        onClick={onAnalysisClick}
      />
    );
  });

  return (
    <Paper className={classes.root}>
      <Table padding="dense">
        <TableHead>
          <TableRow>
            <CustomTableCell align="left">
              {columnNames[0]["name"]}
            </CustomTableCell>
            {columnNames
              .filter(columnName => columnName["id"] !== "title")
              .map(columnName => (
                <CustomTableCell align="right" key={columnName["id"]}>
                  {columnName["name"]}
                </CustomTableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>{analysisItems}</TableBody>
      </Table>
    </Paper>
  );
};

Dashboard.propTypes = {
  analyses: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  columnNames: PropTypes.array.isRequired,
  selectAnalysis: PropTypes.func.isRequired,
  selectedAnalysis: PropTypes.string,
  title: PropTypes.string.isRequired
};

export default withStyles(styles)(Dashboard);
