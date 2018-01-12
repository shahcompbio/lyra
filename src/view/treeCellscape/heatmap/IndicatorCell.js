/**
* Indicator cell - Presentational Component
*/

import React from 'react'
import PropTypes from 'prop-types'
import { heatmapConfig as config } from 'config/treeCellscape.js'



const IndicatorCell = ({ cellID, height, y }) => 
	(<rect key={cellID + "-indicator"}
		  width={config['indicatorWidth']}
		  height={height}
		  x={0}
		  y={y}
		  fill="#000000"
	/>)


export default IndicatorCell