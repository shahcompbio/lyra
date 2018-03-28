/**
 * Heatmap -  React Component
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import DataFetcher from "utils/DataFetcher";

import {
  getHeatmapSegData,
  getMissingHeatmapSegIDs,
  getOrderedChromosomeData,
  getMissingHeatmapIDs,
  getHeatmapIDs
} from "./selectors.js";
import {
  fetchSegs,
  fetchChromRanges,
  fetchIndexToIDMappings
} from "./actions.js";
import HeatmapRow from "./HeatmapRow/HeatmapRow.js";
import ChromAxis from "./ChromAxis/ChromAxis.js";

import config from "./config.js";

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
  chromRanges: getOrderedChromosomeData(state)
});

const HeatmapChromFetcher = connect(chromMapState)(DataFetcher);

HeatmapChromFetcher.PropTypes = {
  /** chromRanges - chromosome ranges in order of number */
  chromRanges: PropTypes.arrayOf(PropTypes.object)
};

/**
 * Index to ID Data Fetcher
 */
const indexIsDataMissing = props => {
  const { missingIndices } = props;
  return missingIndices.length > 0;
};

const indexFetchData = props => {
  const { missingIndices } = props;
  return fetchIndexToIDMappings(missingIndices);
};

const indexMapState = state => ({
  missingIndices: getMissingHeatmapIDs(state),
  heatmapIDs: getHeatmapIDs(state)
});

const HeatmapIndexFetcher = connect(indexMapState)(DataFetcher);

HeatmapIndexFetcher.PropTypes = {
  /** missingIndices - all indices that are missing ID mappings */
  missingIndices: PropTypes.arrayOf(PropTypes.number).isRequired
};

/**
 * Segment Data Fetcher
 */

const segIsDataMissing = props => {
  const { missingIDs } = props;
  return missingIDs.length > 0;
};

const segFetchData = props => {
  const { missingIDs } = props;
  return fetchSegs(missingIDs);
};

const mapState = state => ({
  segs: getHeatmapSegData(state),
  missingIDs: getMissingHeatmapSegIDs(state)
});

const HeatmapSegFetcher = connect(mapState)(DataFetcher);

HeatmapSegFetcher.PropTypes = {
  /** segs - all segment records */
  segs: PropTypes.arrayOf(PropTypes.object).isRequired,

  /** missingIDs - all IDs that are missing segment records*/
  missingIDs: PropTypes.arrayOf(PropTypes.string).isRequired
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
        <ChromAxis y={(segs.length + 1) * config["rowHeight"]} />
      </svg>
    );
  };

  const indexRender = props => {
    return (
      <HeatmapSegFetcher
        render={segsRender}
        isDataMissing={segIsDataMissing}
        fetchData={segFetchData}
      />
    );
  };

  const chromRender = props => {
    return (
      <HeatmapIndexFetcher
        render={indexRender}
        isDataMissing={indexIsDataMissing}
        fetchData={indexFetchData}
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
