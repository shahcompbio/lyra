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

    this.resetFiltering = this.resetFiltering.bind(this);
    this.handleAnalysisClick = this.handleAnalysisClick.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
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

  isFilterWithinAnalysis = (analysis, filter, filters) =>
    this.isFilterNull(filters[filter]) ||
    (this.isFilterLibraryOrSample(analysis[filter])
      ? this.isFilterInArray(analysis[filter], filters[filter])
      : this.doFiltersMatch(analysis[filter], filters[filter]));

  isWithinFilter = (analysis, filters) =>
    Object.keys(filters).reduce(
      (result, filter) =>
        result && this.isFilterWithinAnalysis(analysis, filter, filters),
      true
    );

  handleFilterChange = (analyses, name) => value => {
    const filters = {
      ...this.state.chosenFilters,
      [name]: value
    };
    const newAnalyses = analyses.filter(analysis =>
      this.isWithinFilter(analysis, filters)
    );
    this.setState({ analyses: newAnalyses, chosenFilters: filters });
  };

  resetFiltering = (closeDrawer = false) => {
    let newState = {
      analyses: null,
      chosenFilters: {
        title: null,
        description: null,
        jiraId: null,
        libraryIds: null,
        sampleIds: null,
        project: null
      }
    };
    if (closeDrawer) {
      newState = {
        ...newState,
        isOpen: false
      };
    }
    this.setState(newState);
  };

  handleAnalysisClick = () => this.resetFiltering(true);

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
          onClose={() => this.resetFiltering(true)}
          onKeyDown={e => {
            if (e.keyCode === 27) this.resetFiltering(true);
          }}
        >
          <div style={{ display: "flex" }}>
            <Filters
              chosenFilters={chosenFilters}
              clearFilters={this.resetFiltering}
              currentAnalyses={analyses ? analyses : dashboard.analyses}
              dashboardAnalyses={dashboard.analyses}
              filterNames={GRAPHQL_COLUMNS}
              handleFilterChange={this.handleFilterChange}
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
                handleAnalysisClick={this.handleAnalysisClick}
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
  { id: "title", name: "Title" },
  { id: "description", name: "Description" },
  { id: "jiraId", name: "Jira ID" },
  { id: "libraryIds", name: "Library ID(s)" },
  { id: "sampleIds", name: "Sample ID(s)" },
  { id: "project", name: "Project" }
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
