/**
* TreeVerticalBranch presentational component
*/

import React from 'react'
import PropTypes from 'prop-types'

import { config, getXPosition } from 'config/treeCellscape.js'
const { treeBranchColor, treeBranchWidth } = config

const TreeVerticalBranch = ({ minIndex, maxIndex, depth, yScale }) => {
	const xPos = getXPosition(depth)
	return (<line x1={xPos} y1={yScale(minIndex)} x2={xPos} y2={yScale(maxIndex)} stroke={treeBranchColor} strokeWidth={treeBranchWidth}/>)
}

	/**
	* PropTypes
	*/
	TreeVerticalBranch.propTypes = {
		/** minIndex, maxIndex - heatmap indices where line should start and end */
		minIndex: PropTypes.number.isRequired,
		maxIndex: PropTypes.number.isRequired,

		/** depth */
		depth: PropTypes.number.isRequired,

		/** yScale */
		yScale: PropTypes.func.isRequired
	}


export default TreeVerticalBranch