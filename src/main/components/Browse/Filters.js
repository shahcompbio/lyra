import React, { Component } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import makeAnimated from "react-select/lib/animated";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  clearButton: {
    color: "#000000",
    padding: "5px 10px",
    marginTop: "20px",
    borderRadius: "3px",
    "&:focus": {
      outline: "none"
    },
    "&:hover": {
      backgroundColor: "#FFBD7C"
    }
  },
  filterContainer: {
    marginLeft: "10px",
    marginTop: theme.spacing.unit * 3,
    order: 1,
    fontSize: 12
  },
  filterDiv: {
    marginTop: "5px"
  },
  filterGroup: {
    width: "200px"
  },
  span: {
    color: "#000000"
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
      libraryIds: { label: "Library ID" },
      sampleIds: { label: "Sample ID" },
      project: { label: "Project" }
    };
  }

  handleAnalysesChange = analyses => this.props.onAnalysesChange(analyses);

  /* 
  Is the filter null? (ie. not present in the current selection)   
    If so, then return true to the chain of ands, having no effect on the overall expression
    If not, is the information being filtered an array in the analysis (ie. libraryIds or sampleIds)?
      If so, does that array contain the chosen libraryId or sampleId?
        If so, return true
        If not, return false  
      If not, then check if the filter in the selection matches the data in the analysis in question
        If so, return true
        If not, return false
  */
  isFilterWithinAnalysis = (analysis, filter, filters) =>
    filters[filter]
      ? Array.isArray(analysis[filter])
        ? [].concat(...analysis[filter]).includes(filters[filter].label)
          ? true
          : false
        : JSON.stringify(analysis[filter]) ===
          JSON.stringify(filters[filter].label)
        ? true
        : false
      : true;

  isWithinFilter = (analysis, filters) =>
    /*
    reduce() has an initialValue of true
    if a false is added, the bool return will evaluate to false
    otherwise, it will evaluate to true
    */
    Object.keys(filters).reduce(
      (result, filter) =>
        result && this.isFilterWithinAnalysis(analysis, filter, filters),
      true
    );

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

  handleOptions = (analyses, filter) => {
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
    // if filter type is libraryId or sampleId, expand arrays into individual choices
    if (Array.isArray(filterOptions[0]))
      filterOptions = [].concat(...filterOptions);
    // return options in a react-select friendly format
    return filterOptions.map(option => {
      return { label: option, value: option };
    });
  };

  renderFilters = (classes, filters, analyses) =>
    Object.keys(filters).map(filter => {
      return (
        <div className={classes.filterDiv} key={filters[filter].label}>
          <span className={classes.span}>{filters[filter].label}</span>
          <Select
            classes={classes}
            classNamePrefix="$penca$"
            components={makeAnimated}
            isClearable
            onChange={this.handleFilterChange(String(filter))}
            options={this.handleOptions(analyses, filter)}
            placeholder="Select..."
            styles={{
              clearIndicator: base => ({
                ...base,
                padding: "0 0 2px 0"
              }),
              control: (base, state) => ({
                ...base,
                borderColor: state.hasValue
                  ? "#FFBD7C"
                  : state.menuIsOpen
                  ? "#FFBD7C"
                  : "#DDDDDD",
                boxShadow: "none",
                height: "25px",
                minHeight: "25px",
                ":hover": {
                  borderColor: "#FFBD7C"
                }
              }),
              dropdownIndicator: base => ({
                ...base,
                padding: "0 2px 3px 2px"
              }),
              indicatorSeparator: base => ({
                ...base,
                display: "none"
              }),
              input: base => ({
                ...base,
                padding: 0
              }),
              menuList: base => ({ ...base, minHeight: "fit-content" }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected ? "#FFBD7C" : "#FFFFFF",
                ":hover": {
                  backgroundColor: "#DDDDDD"
                }
              }),
              placeholder: base => ({
                ...base,
                color: "#DDDDDD",
                paddingBottom: 3.25
              }),
              singleValue: base => ({
                ...base,
                color: "#686868",
                paddingBottom: 3.25
              }),
              valueContainer: base => ({
                ...base,
                height: "25px",
                minHeight: "25px",
                padding: "0 8px 4px 8px"
              })
            }}
            value={this.state.chosenFilters[filter]}
          />
        </div>
      );
    });

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

  renderClearFiltersButton = buttonStyle => (
    <button
      className={buttonStyle}
      onClick={() => this.clearFilters()}
      type="button"
    >
      Clear
    </button>
  );

  render() {
    const classes = this.props.classes;
    const filters = this.filters;
    const analyses = this.state.analyses;

    return (
      <div className={classes.filterContainer}>
        <div className={classes.filterGroup}>
          {this.renderFilters(classes, filters, analyses)}
        </div>
        <div>{this.renderClearFiltersButton(classes.clearButton)}</div>
      </div>
    );
  }
}

Filters.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Filters);
