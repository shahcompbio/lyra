import React, { Component } from "react";
import PropTypes from "prop-types";
import { CSVDownload } from "react-csv";

class DownloadCSV extends Component {
  static propTypes = {
    callback: PropTypes.func.isRequired,

    cellIDs: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  componentDidMount() {
    this.props.callback();
  }

  render() {
    const { cellIDs } = this.props;

    const data = cellIDs.reduce(
      (cell, csvString) => cell + "\n" + csvString,
      "cell_id"
    );
    return <CSVDownload data={data} target="_blank" />;
  }
}

export default DownloadCSV;
