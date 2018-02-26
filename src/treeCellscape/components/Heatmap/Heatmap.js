/**
 * Heatmap -  React Component
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import DataFetcher from "utils/DataFetcher";

import {
  getHeatmapSegData,
  getMissingSegIndices,
  getChromRanges
} from "./selectors.js";
import { fetchSegs, fetchChromRanges } from "./actions.js";
import HeatmapRow from "./HeatmapRow/HeatmapRow.js";

import config from "./config.js";

/**
 * Segment Data Fetcher
 */

const segIsDataMissing = props => {
  const { missingIndices } = props;
  return missingIndices.length > 0;
};

const segFetchData = props => {
  const { missingIndices } = props;
  return fetchSegs(missingIndices);
};

const mapState = state => ({
  segs: getHeatmapSegData(state),
  missingIndices: getMissingSegIndices(state)
});

const HeatmapSegFetcher = connect(mapState)(DataFetcher);

HeatmapSegFetcher.PropTypes = {
  /** segs - all segment records */
  segs: PropTypes.arrayOf(PropTypes.object).isRequired,

  /** missingIndices - all indices that are missing segment records*/
  missingIndices: PropTypes.arrayOf(PropTypes.number).isRequired
};

/**
 * Chromosome Range Data Fetcher
 */

const chromIsDataMissing = props => {
  const { chromRanges } = props;
  return chromRanges.length === 0;
};

const chromFetchData = props => {
  return fetchChromRanges();
};

const chromMapState = state => ({
  chromRanges: getChromRanges(state)
});

const HeatmapChromFetcher = connect(chromMapState)(DataFetcher);

HeatmapChromFetcher.PropTypes = {
  /** chromRanges - chromosome ranges in order of number */
  chromRanges: PropTypes.arrayOf(PropTypes.object)
};

/**
 * Heatmap function - passes render prop to HeatmapChromFetcher (and then to HeatmapSegFetcher)
 */
const Heatmap = () => {
  const segsRender = props => {
    const { segs } = props;
    return (
      <svg width={config["width"]} height={config["height"]} x={config["x"]}>
        {segs.map(rowData => (
          <HeatmapRow key={rowData["cellID"]} rowData={rowData} />
        ))}
      </svg>
    );
  };

  const chromRender = props => {
    return (
      <HeatmapSegFetcher
        render={segsRender}
        isDataMissing={segIsDataMissing}
        fetchData={segFetchData}
      />
    );
  };

  return (
    <HeatmapChromFetcher
      render={chromRender}
      isDataMissing={chromIsDataMissing}
      fetchData={chromFetchData}
    />
  );
};

export default Heatmap;
