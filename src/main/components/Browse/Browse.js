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
    this.handleAnalysesChange = this.handleAnalysesChange.bind(this);
    this.handleAnalysisClick = this.handleAnalysisClick.bind(this);
    this.state = {
      isOpen: true,
      analyses: null
    };
  }

  handleAnalysesChange = analyses => this.setState({ analyses: analyses });
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
    const analyses = this.state.analyses;

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
              analyses={dashboard.analyses}
              filterNames={GRAPHQL_COLUMNS}
              onAnalysesChange={this.handleAnalysesChange}
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
                key={dashboard.id}
                title={dashboard.id}
                analyses={analyses ? analyses : dashboard.analyses}
                selectedAnalysis={analysis}
                selectAnalysis={selectAnalysis}
                onAnalysisClick={this.handleAnalysisClick}
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
