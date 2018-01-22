/**
* HeatmapRowContent - Presentational Component
*/

import React from 'react'
import PropTypes from 'prop-types'
import { heatmapConfig as config } from 'config/treeCellscape.js'


const HeatmapRowContent = ({ cellID, segs, y, bpRatio, chromMap }) => (
	segs.map(seg => <rect key={cellID + "-" + seg['chromosome'] + "-" + seg['start']} 
						  width={getSegWidth(seg, bpRatio)} 
						  height={config['rowHeight']}
						  x={getSegX(seg, chromMap, bpRatio)}
						  y={y}
						  fill={config['colorScale'](seg.state)}
					  />))



	/**
	* PropTypes
	*/
	HeatmapRowContent.propTypes = {
		/** cellID */
		cellID: PropTypes.string.isRequired,

		/** segs - all segment records for row */
		segs: PropTypes.arrayOf(PropTypes.object).isRequired,

		/** y - y-coordinate for row */
		y: PropTypes.number.isRequired,

		/** bpRatio - base pair to pixel ratio */
		bpRatio: PropTypes.number.isRequired,

		/** chromMap - chromosome to pixel mapping */
		chromMap: PropTypes.object.isRequired

	}



/**
* Returns segment starting x position
* @param {object} seg
* @param {object} chromMap
* @param {number} bpRatio
* @param {number}
*/
const getSegX = (seg, chromMap, bpRatio) => (
	Math.floor(seg.start / bpRatio) + chromMap[seg.chromosome].x + config['indicatorWidth']
)

/**
* Returns segment width in pixels
* @param {object} seg
* @param {number} bpRatio
*/
const getSegWidth = (seg, bpRatio) => (
	Math.floor((seg.end - seg.start + 1) / bpRatio)
)

export default HeatmapRowContent