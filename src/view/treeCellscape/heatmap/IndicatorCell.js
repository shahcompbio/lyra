/**
* Indicator cell - Presentational Component
*/

import React from 'react'
import PropTypes from 'prop-types'
import { heatmapConfig as config } from 'config/treeCellscape.js'



const IndicatorCell = ({ cellID, height, y, isHighlighted }) => 
	(<rect key={cellID + "-indicator"}
		  width={config['indicatorWidth']}
		  height={height}
		  x={0}
		  y={y}
		  fill={isHighlighted ? "#000000" : "#FFFFFF"}
	/>)


export default IndicatorCell