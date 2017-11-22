/**
* TreeClade presentational component
*/

import React from 'react'
import PropTypes from 'prop-types'

import { treeConfig as config, getXPosition } from 'config/treeCellscape.js'
const { treeCladeWidth } = config



const TreeClade = ({ minIndex, midIndex, maxIndex, depth, maxHeight, yScale, cladeColorScale }) => {

	const x1 = getXPosition(depth - 1)
	const x2 = x1 + treeCladeWidth
	const yMin = yScale(minIndex)
	const yMid = yScale(midIndex)
	const yMax = yScale(maxIndex)

	const point1 = "" + x1 + "," + yMid
	const point2 = "" + x2 + "," + yMin
	const point3 = "" + x2 + "," + yMax

	const points = point1 + " " + point2 + " " + point3
	return (
		<polygon points={points} fill={cladeColorScale(maxHeight)}/>
	)
}
	/**
	* PropTypes
	*/
	TreeClade.propTypes = {
		/** minIndex, midIndex, maxIndex - indices that indicate where points of clade should be */
		minIndex: PropTypes.number.isRequired,
		midIndex: PropTypes.number.isRequired,
		maxIndex: PropTypes.number.isRequired,

		/** depth */
		depth: PropTypes.number.isRequired,

		/** maxHeight - length of tallest branch of a node in this clade */
		maxHeight: PropTypes.number.isRequired,

		/** yScale, cladeColorScale */
		yScale: PropTypes.func.isRequired,
		cladeColorScale: PropTypes.func.isRequired
	}

export default TreeClade



