/**
* HeatmapRow presentational component
*/

import React from 'react'
import PropTypes from 'prop-types'
import { treeConfig as config, heatmapConfig } from 'config/treeCellscape.js'




const HeatmapRow = ({ rowData, yScale, chromMap, bpRatio }) => {
	const { heatmapIndex, segs } = rowData

	return (<g>{segs.map(seg => <rect key={rowData['cellID'] + "-" + seg['chromosome'] + "-" + seg['start']} 
								  width={getSegWidth(seg, bpRatio)} 
								  height={config.heatmapRowHeight}
								  x={getSegX(seg, chromMap, bpRatio)}
								  y={yScale(heatmapIndex)}
								  fill={heatmapConfig.colorScale(seg.state)}/>)}
		</g>)
}

	/**
	* PropTypes
	*/
	HeatmapRow.propTypes = {
		/** rowData */
		rowData: PropTypes.object.isRequired,

		/** yScale */
		yScale: PropTypes.func.isRequired,

		/** chromMap */
		chromMap: PropTypes.object.isRequired,

		/** bpRatio */
		bpRatio: PropTypes.number.isRequired
	}



/**
* Returns segment starting x position
* @param {object} seg
* @param {object} chromMap
* @param {number} bpRatio
* @param {number}
*/
const getSegX = (seg, chromMap, bpRatio) => (
	Math.floor(seg.start / bpRatio) + chromMap[seg.chromosome].x
)

/**
* Returns segment width in pixels
* @param {object} seg
* @param {number} bpRatio
*/
const getSegWidth = (seg, bpRatio) => (
	Math.floor((seg.end - seg.start + 1) / bpRatio)
)

export default HeatmapRow