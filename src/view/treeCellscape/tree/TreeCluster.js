/**
* TreeCluster presentational component
*/

import React from 'react'
import PropTypes from 'prop-types'

import { treeConfig as config, getTreeXPosition as getXPosition } from 'config/treeCellscape.js'
const { treeClusterWidth, treeVerticalBranchWidth, treeClusterVerticalOffset } = config



const TreeCluster = ({ minIndex, maxIndex, depth, maxHeight, yScale, clusterColorScale }) => {
	const x = getXPosition(depth - 1) + (treeVerticalBranchWidth / 2)
	const yMin = yScale(minIndex)
	const yMax = yScale(maxIndex)
	const height = yMax - yMin

	return (
		<rect width={treeClusterWidth} height={height} x={x} y={yMin} fill={clusterColorScale(maxHeight)}/> 
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



