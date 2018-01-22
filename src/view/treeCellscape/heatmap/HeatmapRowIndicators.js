/**
* Indicator cell - Presentational Component
*/

import React from 'react'
import PropTypes from 'prop-types'
import { heatmapConfig as config } from 'config/treeCellscape.js'



const HeatmapRowIndicators = ({ cellID, y, isHighlighted }) => 
	(<rect key={cellID + "-indicator"}
		  width={config['indicatorWidth']}
		  height={config['rowHeight']}
		  x={0}
		  y={y}
		  fill={isHighlighted ? "#000000" : "#FFFFFF"}
	/>)

	
	/**
	* PropTypes
	*/
	HeatmapRowIndicators.propTypes = {

		/** cellID */
		cellID: PropTypes.string.isRequired,

		/** y - y-coordinate for row */
		y: PropTypes.number.isRequired,
		
		/** isHighlighted - whether current row is highlighted */
		isHighlighted: PropTypes.bool.isRequired
	}


export default HeatmapRowIndicators