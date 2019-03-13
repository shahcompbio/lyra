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
      title,
      analyses,
      selectedAnalysis,
      selectAnalysis,
      classes
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
      return (
        <AnalysisItem
          id={analysis.id}
          key={analysis.title}
          title={analysis.title}
          description={analysis.description}
          jiraId={analysis.jiraId}
          libraryIds={formatIdList(analysis.libraryIds)}
          sampleIds={formatIdList(analysis.sampleIds)}
          project={analysis.project}
          onClick={onAnalysisClick}
          isSelected={isSelected}
        />
      );
    });

    return (
      <Paper className={classes.root}>
        <Table padding="dense">
          <TableHead>
            <TableRow>
              <CustomTableCell>Title</CustomTableCell>
              <CustomTableCell align="right">Description</CustomTableCell>
              <CustomTableCell align="right">Jira ID</CustomTableCell>
              <CustomTableCell align="right">Library ID(s)</CustomTableCell>
              <CustomTableCell align="right">Sample ID(s)</CustomTableCell>
              <CustomTableCell align="right">Project</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{analysisItems}</TableBody>
        </Table>
      </Paper>
    );
  }
}

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  }
});

const CustomTableCell = withStyles(theme => ({
  head: {
    fontSize: 15
  }
}))(TableCell);

export default withStyles(styles)(Dashboard);
