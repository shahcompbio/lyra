/**
* HeatmapRow presentational component
*/

import React from 'react'
import PropTypes from 'prop-types'

import { heatmapConfig as config } from 'config/treeCellscape.js'
import IndicatorCell from './IndicatorCell'



const HeatmapRow = ({ rowData, yScale, chromMap, bpRatio }) => {
	const { heatmapIndex, segs } = rowData
	const height = config['rowHeight']
	const y = yScale(heatmapIndex)
	return (<g className={heatmapIndex} onMouseEnter={ () => console.log(heatmapIndex)} data-tip>
				<IndicatorCell cellID={rowData['cellID']} height={height} y={y}/>
				{segs.map(seg => <rect key={rowData['cellID'] + "-" + seg['chromosome'] + "-" + seg['start']} 
								  width={getSegWidth(seg, bpRatio)} 
								  height={height}
								  x={getSegX(seg, chromMap, bpRatio)}
								  y={y}
								  fill={config['colorScale'](seg.state)}
								  />
				)}
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

export default HeatmapRow