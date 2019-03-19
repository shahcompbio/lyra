import React, { Component } from "react";
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

class Dashboard extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    analyses: PropTypes.array.isRequired,
    selectedAnalysis: PropTypes.string,
    selectAnalysis: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.handleAnalysisClick = this.handleAnalysisClick.bind(this);
  }

  handleAnalysisClick = () => this.props.onAnalysisClick();

  render() {
    const {
      analyses,
      classes,
      columnNames,
      selectAnalysis,
      selectedAnalysis,
      title
    } = this.props;

    const analysisItems = analyses.map(analysis => {
      const isSelected = selectedAnalysis === analysis.id;
      const onAnalysisClick = () => {
        if (!isSelected) {
          selectAnalysis(analysis.id, title);
        }
        this.handleAnalysisClick();
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
                {Object.values(columnNames[0])}
              </CustomTableCell>
              {columnNames
                .filter(columnName => Object.keys(columnName)[0] !== "title")
                .map(columnName => (
                  <CustomTableCell
                    align="right"
                    key={Object.values(columnName)}
                  >
                    {Object.values(columnName)}
                  </CustomTableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>{analysisItems}</TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(Dashboard);
