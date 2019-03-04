import React, { Component } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import makeAnimated from "react-select/lib/animated";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
    minWidth: 700
  },
  input: {
    display: "flex",
    padding: 0
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

class Filters extends Component {
  constructor(props) {
    super(props);
    this.handleAnalysesChange = this.handleAnalysesChange.bind(this);
    this.state = {
      chosenFilters: {
        title: null,
        description: null,
        jiraId: null,
        libraryIds: null,
        sampleIds: null,
        project: null
      },
      analyses: this.props.analyses
    };
    this.filters = {
      title: { label: "Title" },
      description: { label: "Description" },
      jiraId: { label: "Jira ID" },
      libraryIds: { label: "Library ID(s)" },
      sampleIds: { label: "Sample ID(s)" },
      project: { label: "Project" }
    };
  }

  handleOptions(analyses, filter) {
    // get the options that pertain to the current filter type
    let filterOptions = analyses.map(analysis => analysis[filter]);
    // discard duplicates
    const seenOptions = new Set();
    filterOptions = filterOptions.filter(option => {
      let stringOption = JSON.stringify(option);
      return seenOptions.has(stringOption)
        ? false
        : seenOptions.add(stringOption);
    });
    // return options in a react-select friendly format
    return filterOptions.map(option => {
      return { label: option, value: option };
    });
  }

  isWithinFilter = (analysis, filters) =>
    Object.keys(filters).reduce(
      (result, filter) =>
        result && this.isFilterWithinAnalysis(analysis, filter, filters),
      true
    );

  isFilterWithinAnalysis = (analysis, filter, filters) =>
    /* 
    is the filter null? (ie. not present in the current selection)
    If so, then add a true to the chain of ands, having no effect on the overall expression
    If not, then check if the filter in the selection matches the data in the analysis in question
    */
    filters[filter]
      ? JSON.stringify(analysis[filter]) ===
        JSON.stringify(filters[filter].label)
        ? true
        : false
      : true;

  handleFilterChange = name => value => {
    this.setState(
      {
        chosenFilters: {
          ...this.state.chosenFilters,
          [name]: value
        }
      },
      () => {
        const filters = this.state.chosenFilters;
        let analyses = this.props.analyses;

        analyses = analyses.filter(analysis =>
          this.isWithinFilter(analysis, filters)
        );
        this.setState({ analyses: analyses }, () =>
          this.handleAnalysesChange(this.state.analyses)
        );
      }
    );
  };

  handleAnalysesChange = analyses => this.props.onAnalysesChange(analyses);

  clearFilters = () =>
    this.setState(
      {
        chosenFilters: {
          title: null,
          description: null,
          jiraId: null,
          libraryIds: null,
          sampleIds: null,
          project: null
        },
        analyses: this.props.analyses
      },
      () => this.handleAnalysesChange(this.state.analyses)
    );

  render() {
    const classes = this.props;

    return (
      <div className={classes.root}>
        <div>{this.renderFilters()}</div>
        <div>{this.renderClearFiltersButton()}</div>
      </div>
    );
  }

  renderFilters() {
    const { classes } = this.props;
    const filters = this.filters;
    const analyses = this.state.analyses;

    return Object.keys(filters).map(filter => {
      return (
        <div key={filters[filter].label}>
          <span>{filters[filter].label}</span>
          <Select
            classes={classes}
            options={this.handleOptions(analyses, filter)}
            components={makeAnimated}
            value={this.state.chosenFilters[filter]}
            onChange={this.handleFilterChange(String(filter))}
            placeholder="Select..."
            isClearable
          />
        </div>
      );
    });
  }

  renderClearFiltersButton() {
    return (
      <button
        type="button"
        className="clearButton"
        onClick={() => this.clearFilters()}
      >
        Clear
      </button>
    );
  }
}

Filters.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Filters);
