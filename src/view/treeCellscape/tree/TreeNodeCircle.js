/**
* TreeNodeCircle presentational component
*/

import React from 'react'
import PropTypes from 'prop-types'

import { treeConfig as config, getTreeXPosition as getXPosition } from 'config/treeCellscape.js'
const { treeNodeRadius, treeNodeColor } = config


const TreeNodeCircle = ({ heatmapIndex, depth, yScale, onMouseEnter, onMouseLeave, isHighlighted}) => 
	(<circle cx={getXPosition(depth)} 
			 cy={yScale(heatmapIndex)} 
			 r={isHighlighted ? treeNodeRadius + 1 : treeNodeRadius} 
			 fill={isHighlighted ? "#2e7aab" : treeNodeColor}
			 onMouseEnter={onMouseEnter}
			 onMouseLeave={onMouseLeave}
			 data-tip
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