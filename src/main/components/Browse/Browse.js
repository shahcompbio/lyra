import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { slide as Menu } from "react-burger-menu";
import DashboardItem from "./Dashboard.js";

import { fetchAllAnalysis, selectAnalysis } from "./actions.js";
import { getAllAnalysis, getSelectedAnalysisID } from "./selectors.js";

class Browse extends Component {
  static propTypes = {
    analyses: PropTypes.arrayOf(PropTypes.array).isRequired,

    selectedAnalysisID: PropTypes.string,

    selectedAnalysisDashboard: PropTypes.string,

    fetchAllAnalysis: PropTypes.func.isRequired,

    selectAnalysis: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: true
    };
  }
  componentDidMount() {
    this.props.fetchAllAnalysis();
  }

  render() {
    const { selectedAnalysisDashboard, selectedAnalysisID, selectAnalysis } = this.props;
    const dashboardItems = this.props.analyses.map(dashboard => {
      const onClick = () => {
        this.setState({ isOpen: false });
      };
      return (
        <DashboardItem
          key={dashboard[0].dashboard}
          title={dashboard[0].dashboard}
          onClick={onClick}
          analyses={dashboard}
          selectedAnalysisDashboard={selectedAnalysisDashboard}
          selectedAnalysisID={selectedAnalysisID}
          selectAnalysis={selectAnalysis}
        />
      );
    });
    return this.props.analyses.length > 0 ? (
      <Menu isOpen={this.state.isOpen} styles={styles}>
        {dashboardItems}
      </Menu>
    ) : null;
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

const mapState = state => ({
  analyses: getAllAnalysis(state),
  selectedAnalysisID: getSelectedAnalysisID(state)
});
const mapDispatch = dispatch =>
  bindActionCreators({ fetchAllAnalysis, selectAnalysis }, dispatch);

export default connect(mapState, mapDispatch)(Browse);
