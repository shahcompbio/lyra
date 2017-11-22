/**
* TreeNodeCircle presentational component
*/

import React from 'react'
import PropTypes from 'prop-types'

import { treeConfig as config, getXPosition } from 'config/treeCellscape.js'
const { treeNodeRadius, treeNodeColor } = config


const TreeNodeCircle = ({ heatmapIndex, depth, yScale}) => 
	(<circle cx={getXPosition(depth)} 
			 cy={yScale(heatmapIndex)} 
			 r={treeNodeRadius} 
			 fill={treeNodeColor}
	/>)

	
	/**
	* PropTypes
	*/
	TreeNodeCircle.propTypes = {
		/** heatmapIndex */
		heatmapIndex: PropTypes.number.isRequired,

		/** depth */
		depth: PropTypes.number.isRequired,

		/** yScale */
		yScale: PropTypes.func.isRequired
	}

export default TreeNodeCircle