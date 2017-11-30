/**
* TreeCluster presentational component
*/

import React from 'react'
import PropTypes from 'prop-types'

import { treeConfig as config, getXPosition } from 'config/treeCellscape.js'
const { treeClusterWidth } = config



const TreeCluster = ({ minIndex, maxIndex, depth, maxHeight, yScale, clusterColorScale }) => {
	const x1 = getXPosition(depth - 1)
	const x2 = x1 + treeClusterWidth
	const yMin = yScale(minIndex)
	const yMax = yScale(maxIndex)


	const yDist = yMax - yMin
	const spacing = yDist * 0.8

	const point1 = "" + x1 + "," + (yMin + spacing)
	const point4 = "" + x1 + "," + (yMax - spacing)
	const point2 = "" + x2 + "," + yMin
	const point3 = "" + x2 + "," + yMax

	const points = point1 + " " + point4 +  " " + point2 + " " + point3
	return (
		<polygon points={points} fill={clusterColorScale(maxHeight)}/>
	)
}
	/**
	* PropTypes
	*/
	TreeCluster.propTypes = {
		/** minIndex, midIndex, maxIndex - indices that indicate where points of cluster should be */
		minIndex: PropTypes.number.isRequired,
		maxIndex: PropTypes.number.isRequired,

		/** depth */
		depth: PropTypes.number.isRequired,

		/** maxHeight - length of tallest branch of a node in this cluster */
		maxHeight: PropTypes.number.isRequired,

		/** yScale, clusterColorScale */
		yScale: PropTypes.func.isRequired,
		clusterColorScale: PropTypes.func.isRequired
	}

export default TreeCluster



