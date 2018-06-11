import React, { Component } from "react";
import PropTypes from "prop-types";

import { graphql } from "react-apollo";
import gql from "graphql-tag";

import { slide as Menu } from "react-burger-menu";
import Dashboard from "./Dashboard.js";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { selectAnalysis } from "./actions.js";
import { getSelectedAnalysis, getSelectedDashboard } from "./selectors.js";

class Browse extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,

    selectedAnalysis: PropTypes.string,

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

    const onClick = () => {
      this.setState({ isOpen: false });
    };

    const { selectedDashboard, selectedAnalysis, selectAnalysis } = this.props;
    const dashboards = this.props.data.dashboards;

    const dashboardItems = dashboards.map(dashboard => (
      <Dashboard
        key={dashboard.id}
        title={dashboard.id}
        analyses={dashboard.analyses}
        selectedAnalysis={selectedAnalysis}
        selectedDashboard={selectedDashboard}
        onClick={onClick}
        selectAnalysis={selectAnalysis}
      />
    ));
    return (
      <Menu isOpen={this.state.isOpen} styles={styles}>
        {dashboardItems}
      </Menu>
    );
  }
}

const styles = {
  bmBurgerButton: {
    position: "fixed",
    width: "20px",
    height: "20px",
    left: "36px",
    top: "36px"
  },
  bmBurgerBars: {
    background: "#373a47"
  },
  bmCrossButton: {
    height: "24px",
    width: "24px"
  },
  bmCross: {
    background: "#bdc3c7"
  },
  bmMenu: {
    background: "#373a47",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em"
  },
  bmMorphShape: {
    fill: "#373a47"
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)"
  }
};

const DASHBOARD_QUERY = gql`
  query {
    dashboards {
      id
      analyses {
        id
        title
        description
      }
    }
  }
`;

const mapState = state => ({
  selectedAnalysis: getSelectedAnalysis(state),
  selectedDashboard: getSelectedDashboard(state)
});
const mapDispatch = dispatch =>
  bindActionCreators({ selectAnalysis }, dispatch);

export default graphql(DASHBOARD_QUERY)(connect(mapState, mapDispatch)(Browse));
