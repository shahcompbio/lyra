import React, { Component } from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";

import {
  getCurrTreeIndices,
  getIDsByIndices,
  getMissingIDMappings
} from "./selectors.js";

import { fetchIndexToIDMappings } from "./actions.js";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/fontawesome-free-solid";

import DownloadCSV from "./DownloadCSV.js";

class DownloadCSVButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { missingCellIDs } = this.props;
    if (missingCellIDs.length > 0) {
      this.props.fetchIndexToIDMappings(missingCellIDs);
    }
    this.setState({ isClicked: true });
  }

  render() {
    const { Button, missingCellIDs, cellIDs } = this.props;

    const isDownloading = missingCellIDs.length === 0 && this.state.isClicked;

    return (
      <Button onClick={this.onClick} title="Download CSV of cell IDs">
        <FontAwesomeIcon icon={faDownload} size="2x" />
        {isDownloading ? <DownloadCSV cellIDs={cellIDs} /> : null}
      </Button>
    );
  }
}

const mapState = state => {
  const indices = getCurrTreeIndices(state);

  return {
    cellIDs: getIDsByIndices(state, indices),
    missingCellIDs: getMissingIDMappings(state, indices)
  };
};

const mapDispatch = dispatch =>
  bindActionCreators({ fetchIndexToIDMappings }, dispatch);

export default connect(mapState, mapDispatch)(DownloadCSVButton);
