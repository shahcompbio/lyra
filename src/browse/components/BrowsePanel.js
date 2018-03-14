import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { slide as Menu } from "react-burger-menu";
import BrowsePanelItem from "./BrowsePanelItem.js";

import { fetchAllAnalysis } from "../analysis/actions.js";
import { getAnalysis } from "main/stateSelectors.js";

class BrowsePanel extends Component {
  componentDidMount() {
    this.props.fetchAllAnalysis();
  }

  render() {
    const analysisItems = this.props.analysis.map(analysis => (
      <BrowsePanelItem
        key={analysis.title}
        title={analysis.title}
        description={analysis.description}
      />
    ));
    return this.props.analysis.length > 0 ? (
      <Menu isOpen styles={styles}>
        {analysisItems}
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
  analysis: getAnalysis(state)
});
const mapDispatch = dispatch =>
  bindActionCreators({ fetchAllAnalysis }, dispatch);

export default connect(mapState, mapDispatch)(BrowsePanel);
