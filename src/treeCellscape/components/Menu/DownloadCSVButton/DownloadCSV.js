import React, { Component } from "react";
import { CSVDownload } from "react-csv";

class DownloadCSV extends Component {
  render() {
    const { cellIDs } = this.props;

    const data = cellIDs.map(cell => [cell]);
    const dataWithHeader = [["cell_id"], ...data];
    console.log(dataWithHeader);
    return <CSVDownload data={dataWithHeader} target="_blank" />;
  }
}

export default DownloadCSV;
