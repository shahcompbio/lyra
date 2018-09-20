import React from "react";
import PropTypes from "prop-types";

const Row = ({
  cellID,
  segs,
  y,
  bpRatio,
  height,
  chromMap,
  onMouseEnter,
  colorScale,
  stateOffset
}) =>
  segs.map(seg => (
    <rect
      key={`${cellID}-${seg["chromosome"]}-${seg["start"]}`}
      width={getSegWidth(seg, bpRatio)}
      height={height}
      x={getSegX(seg, chromMap, bpRatio)}
      y={y}
      fill={colorScale(seg["state"] / stateOffset)}
      onMouseEnter={() => (onMouseEnter ? onMouseEnter(seg) : null)}
    />
  ));

/**
 * PropTypes
 */
Row.propTypes = {
  /** cellID */
  cellID: PropTypes.string.isRequired,

  /** segs - all segment records for row */
  segs: PropTypes.arrayOf(PropTypes.object).isRequired,

  /** y - y-coordinate for row */
  y: PropTypes.number.isRequired,

  /** bpRatio - base pair to pixel ratio */
  bpRatio: PropTypes.number.isRequired,

  /** chromMap - chromosome to pixel mapping */
  chromMap: PropTypes.object.isRequired,

  /** height - pixel height of row */
  height: PropTypes.number.isRequired,

  onMouseEnter: PropTypes.func,

  colorScale: PropTypes.func.isRequired,

  stateOffset: PropTypes.number.isRequired
};

Row.defaultProps = {
  stateOffset: 1
};
/**
 * Returns segment starting x position
 * @param {object} seg
 * @param {object} chromMap
 * @param {number} bpRatio
 * @param {number}
 */
const getSegX = (seg, chromMap, bpRatio) =>
  Math.floor(seg.start / bpRatio) + chromMap[seg.chromosome].x;

/**
 * Returns segment width in pixels
 * @param {object} seg
 * @param {number} bpRatio
 */
const getSegWidth = (seg, bpRatio) =>
  Math.floor((seg.end - seg.start + 1) / bpRatio);

export default Row;
