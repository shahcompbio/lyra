import React, { Component } from "react";
import PropTypes from "prop-types";

import { graphql } from "react-apollo";
import gql from "graphql-tag";

import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import { Menu } from "@material-ui/icons";

import Dashboard from "./Dashboard.js";
import Filters from "./Filters.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { selectAnalysis } from "./actions.js";
import { getSelectedDashboard } from "./selectors.js";

class Browse extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,

    analysis: PropTypes.string,

    selectedDashboard: PropTypes.string,

    selectAnalysis: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.clearFilters = this.clearFilters.bind(this);
    this.handleAnalysisClick = this.handleAnalysisClick.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleOptions = this.handleOptions.bind(this);
    this.state = {
      analyses: null,
      chosenFilters: {
        title: null,
        description: null,
        jiraId: null,
        libraryIds: null,
        sampleIds: null,
        project: null
      },
      isOpen: true
    };
  }

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

  handleFilterChange = (dashboardAnalyses, name) => value => {
    this.setState(
      {
        chosenFilters: {
          ...this.state.chosenFilters,
          [name]: value
        }
      },
      () => {
        const filters = this.state.chosenFilters;
        let analyses = dashboardAnalyses;
        analyses = analyses.filter(analysis =>
          this.isWithinFilter(analysis, filters)
        );
        this.setState({ analyses: analyses });
      }
    );
  };

  handleOptions = (currentAnalyses, filter) =>
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

  clearFilters = () => {
    this.setState({
      analyses: null,
      chosenFilters: {
        title: null,
        description: null,
        jiraId: null,
        libraryIds: null,
        sampleIds: null,
        project: null
      }
    });
  };

  handleAnalysisClick = () => this.setState({ isOpen: false, analyses: null });

  render() {
    if (this.props.data && this.props.data.loading) {
      return null;
    }

    if (this.props.data && this.props.data.error) {
      return null;
    }

    const { analysis, selectAnalysis } = this.props;
    const dashboard = this.props.data.dashboards[0];
    const { analyses, chosenFilters } = this.state;

    return (
      <div>
        <IconButton
          onClick={() => this.setState({ isOpen: true })}
          aria-label="open analysis list"
          style={{
            position: "absolute",
            left: "16px",
            top: "16px",
            outline: "none"
          }}
        >
          <Menu style={{ fontSize: 36 }} />
        </IconButton>
        <Drawer
          tabIndex={0}
          anchor="left"
          open={this.state.isOpen}
          onClose={() => this.setState({ isOpen: false, analyses: null })}
          onKeyDown={e => {
            if (e.keyCode === 27)
              this.setState({ isOpen: false, analyses: null });
          }}
        >
          <div style={{ display: "flex" }}>
            <Filters
              chosenFilters={chosenFilters}
              clearFilters={this.clearFilters}
              currentAnalyses={analyses ? analyses : dashboard.analyses}
              dashboardAnalyses={dashboard.analyses}
              filterNames={GRAPHQL_COLUMNS}
              handleFilterChange={this.handleFilterChange}
              handleOptions={this.handleOptions}
            />
            <div
              style={{
                width: "1060px",
                order: 1,
                marginLeft: "10px",
                marginRight: "10px"
              }}
            >
              <Dashboard
                analyses={analyses ? analyses : dashboard.analyses}
                columnNames={GRAPHQL_COLUMNS}
                key={dashboard.id}
                onAnalysisClick={this.handleAnalysisClick}
                selectAnalysis={selectAnalysis}
                selectedAnalysis={analysis}
                title={dashboard.id}
              />
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}

const DASHBOARD_QUERY = gql`
  query {
    dashboards {
      id
      analyses {
        id
        title
        description
        jiraId
        libraryIds
        sampleIds
        project
      }
    }
  }
`;

const GRAPHQL_COLUMNS = [
  { title: "Title" },
  { description: "Description" },
  { jiraId: "Jira ID" },
  { libraryIds: "Library ID(s)" },
  { sampleIds: "Sample ID(s)" },
  { project: "Project" }
];

const mapState = state => ({
  selectedDashboard: getSelectedDashboard(state)
});
const mapDispatch = dispatch =>
  bindActionCreators({ selectAnalysis }, dispatch);

export default graphql(DASHBOARD_QUERY)(
  connect(
    mapState,
    mapDispatch
  )(Browse)
);
