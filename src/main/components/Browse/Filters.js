import React, { Component } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import makeAnimated from "react-select/lib/animated";
import { withStyles } from "@material-ui/core/styles";

const elementStyles = theme => ({
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

const filterStyles = {
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
};

const ClearButton = ({ clearFilters, style }) => (
  <button className={style} onClick={() => clearFilters()} type="button">
    Clear
  </button>
);

const Filter = ({
  analyses,
  chosenFilters,
  classes,
  filter,
  handleFilterChange,
  handleOptions,
  name
}) => (
  <div className={classes.filterDiv}>
    <span className={classes.span}>{name}</span>
    <Select
      classes={classes}
      components={makeAnimated}
      isClearable
      onChange={handleFilterChange(filter)}
      options={handleOptions(analyses, filter)}
      placeholder="Select..."
      styles={filterStyles}
      value={chosenFilters[filter]}
    />
  </div>
);

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
    this.filters = this.props.filterNames;
  }

  handleAnalysesChange = analyses => this.props.onAnalysesChange(analyses);

  isFilterNull = filter => !filter;

  isFilterLibraryOrSample = filter => Array.isArray(filter);

  isFilterInArray = (analysisFilter, chosenFilter) =>
    analysisFilter.includes(chosenFilter.label);

  doFiltersMatch = (analysisFilter, chosenFilter) =>
    JSON.stringify(analysisFilter) === JSON.stringify(chosenFilter.label);

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
    this.isFilterNull(filters[filter]) ||
    (this.isFilterLibraryOrSample(analysis[filter])
      ? this.isFilterInArray(analysis[filter], filters[filter])
      : this.doFiltersMatch(analysis[filter], filters[filter]));

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

  handleOptions = (analyses, filter) =>
    // get the options that pertain to the current filter type
    analyses
      .map(analysis => analysis[filter])
      // if filter type is libraryId or sampleId, expand arrays into individual choices
      .reduce(
        (options, filter) =>
          Array.isArray(filter)
            ? [...options, ...filter]
            : [...options, filter],
        []
      )
      // filter out duplicates
      .reduce(
        (options, filter) =>
          options.indexOf(filter) === -1 ? [...options, filter] : options,
        []
      )
      // return options in a react-select friendly format
      .map(option => {
        return { label: option, value: option };
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

  render() {
    const classes = this.props.classes;
    const filters = this.filters;
    const analyses = this.state.analyses;

    return (
      <div className={classes.filterContainer}>
        <div className={classes.filterGroup}>
          {filters.map(filter => (
            <Filter
              analyses={analyses}
              chosenFilters={this.state.chosenFilters}
              classes={classes}
              filter={Object.keys(filter)[0]}
              handleFilterChange={this.handleFilterChange}
              handleOptions={this.handleOptions}
              key={filter[Object.keys(filter)[0]]}
              name={filter[Object.keys(filter)[0]]}
            />
          ))}
        </div>
        <div>
          <ClearButton
            clearFilters={this.clearFilters}
            style={classes.clearButton}
          />
        </div>
      </div>
    );
  }
}

Filters.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(elementStyles)(Filters);
