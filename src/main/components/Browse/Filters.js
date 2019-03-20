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
  chosenFilters,
  classes,
  currentAnalyses,
  dashboardAnalyses,
  filter,
  handleFilterChange,
  displayOptions,
  name
}) => (
  <div className={classes.filterDiv}>
    <span className={classes.span}>{name}</span>
    <Select
      classes={classes}
      components={makeAnimated}
      isClearable
      onChange={handleFilterChange(dashboardAnalyses, filter)}
      options={displayOptions(currentAnalyses, filter)}
      placeholder="Select..."
      styles={filterStyles}
      value={chosenFilters[filter]}
    />
  </div>
);

class Filters extends Component {
  displayOptions = (currentAnalyses, filter) =>
    // get the options that pertain to the current filter type
    currentAnalyses
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

  render() {
    const {
      chosenFilters,
      classes,
      clearFilters,
      currentAnalyses,
      dashboardAnalyses,
      filterNames,
      handleFilterChange
    } = this.props;

    return (
      <div className={classes.filterContainer}>
        <div className={classes.filterGroup}>
          {filterNames.map(filter => (
            <Filter
              chosenFilters={chosenFilters}
              classes={classes}
              currentAnalyses={currentAnalyses}
              dashboardAnalyses={dashboardAnalyses}
              filter={Object.keys(filter)[0]}
              handleFilterChange={handleFilterChange}
              displayOptions={this.displayOptions}
              key={Object.values(filter)}
              name={Object.values(filter)}
            />
          ))}
        </div>
        <div>
          <ClearButton
            clearFilters={clearFilters}
            style={classes.clearButton}
          />
        </div>
      </div>
    );
  }
}

Filters.propTypes = {
  chosenFilters: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  clearFilters: PropTypes.func.isRequired,
  currentAnalyses: PropTypes.array.isRequired,
  dashboardAnalyses: PropTypes.array.isRequired,
  filterNames: PropTypes.array.isRequired,
  handleFilterChange: PropTypes.func.isRequired
};

export default withStyles(elementStyles)(Filters);
