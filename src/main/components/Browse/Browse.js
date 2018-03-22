import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { slide as Menu } from "react-burger-menu";
import BrowseItem from "./BrowseItem.js";

import { fetchAllAnalysis, selectAnalysis } from "./actions.js";
import { getAnalysisList, getSelectedID } from "./selectors.js";

class Browse extends Component {
  static propTypes = {
    analysis: PropTypes.array.isRequired
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
    const { selectedAnalysisID } = this.props;
    const analysisItems = this.props.analysis.map(analysis => {
      const isSelected = selectedAnalysisID === analysis.id;
      console.log(analysis);
      const onClick = () => {
        if (!isSelected) {
          this.props.selectAnalysis(analysis);
          this.setState({ isOpen: false });
        }
      };

      return (
        <BrowseItem
          key={analysis.title}
          title={analysis.title}
          description={analysis.description}
          onClick={onClick}
          isSelected={isSelected}
        />
      );
    });
    return this.props.analysis.length > 0 ? (
      <Menu isOpen={this.state.isOpen} styles={styles}>
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
  analysis: getAnalysisList(state),
  selectedAnalysisID: getSelectedID(state)
});
const mapDispatch = dispatch =>
  bindActionCreators({ fetchAllAnalysis, selectAnalysis }, dispatch);

export default connect(mapState, mapDispatch)(Browse);
