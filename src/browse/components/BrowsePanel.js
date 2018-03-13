import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { fetchAllAnalysis } from "../analysis/actions.js";
import { getAnalysis } from "main/stateSelectors.js";

class BrowsePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: false
    };
  }

  componentDidMount() {
    this.props.fetchAllAnalysis();
  }

  render() {
    console.log(this.props.analysis);
    return null;
  }
}

const mapState = state => ({
  analysis: getAnalysis(state)
});
const mapDispatch = dispatch =>
  bindActionCreators({ fetchAllAnalysis }, dispatch);

export default connect(mapState, mapDispatch)(BrowsePanel);
