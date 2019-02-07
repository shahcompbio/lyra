import React, { Component } from "react";
import PropTypes from "prop-types";

import { graphql } from "react-apollo";
import gql from "graphql-tag";

import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import { Menu } from "@material-ui/icons";

import Dashboard from "./Dashboard.js";

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
    this.state = {
      isOpen: true
    };
  }

  render() {
    if (this.props.data && this.props.data.loading) {
      return null;
    }

    if (this.props.data && this.props.data.error) {
      return null;
    }

    const { analysis, selectAnalysis, className } = this.props;
    const dashboards = this.props.data.dashboards;

    const dashboardItems = dashboards.map(dashboard => (
      <Dashboard
        key={dashboard.id}
        title={dashboard.id}
        analyses={dashboard.analyses}
        selectedAnalysis={analysis}
        selectAnalysis={selectAnalysis}
      />
    ));
    return (
      <div className={className}>
        <IconButton
          onClick={() => this.setState({ isOpen: true })}
          aria-label="open analysis list"
          style={{
            position: "absolute",
            left: "16px",
            top: "16px"
          }}
        >
          <Menu style={{ fontSize: 36 }} />
        </IconButton>
        <Drawer
          anchor="left"
          open={this.state.isOpen}
          onClose={() => this.setState({ isOpen: false })}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={() => this.setState({ isOpen: false })}
            onKeyDown={() => this.setState({ isOpen: false })}
          >
            {dashboardItems}
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

const mapState = state => ({
  selectedDashboard: getSelectedDashboard(state)
});
const mapDispatch = dispatch =>
  bindActionCreators({ selectAnalysis }, dispatch);

export default graphql(DASHBOARD_QUERY)(connect(mapState, mapDispatch)(Browse));
