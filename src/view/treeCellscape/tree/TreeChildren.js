/**
* TreeChildren -  React Component
* 	Determines which child nodes need to be aggregated
*/

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


import { makeGetTreeNodeRecords, getYScale, getThresholdIndex, getCladeColorScale } from 'state/selectors/treeCellscape.js'

import TreeNode from './TreeNode'
import TreeClade from './TreeClade'
import TreeVerticalBranch from './TreeVerticalBranch'


/**
* TreeChildren
*/
const TreeChildren = ({ children, depth, parentIndex, thresholdIndex, yScale, cladeColorScale }) => {

	let cladeDimensions = initializeClade()
	let resultJSX = []
	let minAndMaxIndex = { minIndex: parentIndex, maxIndex: parentIndex }

	let i = 0
	while (i < children.length) {

		const currNode = children[i]

		if (isLastNode(i, children) || isNodeDistanceExceedThreshold(i, children, thresholdIndex)) {
			// Already drawing a clade - merge current node to clade
			if (isCladeDrawingNow(cladeDimensions)) {
				cladeDimensions = mergeNodeToClade(cladeDimensions, currNode)
				const cladeIndex = getCladeIndex(cladeDimensions, parentIndex)

				minAndMaxIndex = updateMinAndMaxIndex(minAndMaxIndex, cladeIndex)
				resultJSX = [...resultJSX, drawTreeClade(cladeDimensions, depth, yScale, cladeIndex, cladeColorScale)]

				cladeDimensions = initializeClade()
			}

			// Else draw as normal node
			else {
				minAndMaxIndex = updateMinAndMaxIndex(minAndMaxIndex, currNode['heatmapIndex'])
				resultJSX = [...resultJSX, drawTreeNode(currNode, depth, yScale, cladeColorScale)]
			}

		}
		else { // nodes are too close
			if (isCladeDrawingNow(cladeDimensions)) {
				cladeDimensions = mergeNodeToClade(cladeDimensions, currNode)
			}
			else {
				cladeDimensions = startCladeDrawing(currNode)
			}
		}

		i++
	}

	const { minIndex, maxIndex } = minAndMaxIndex
	const verticalBranch = drawTreeVerticalBranch(minIndex, maxIndex, depth, yScale)

	return (<g>
				{verticalBranch}
				{resultJSX}
			</g>)

}

	/**
	* TreeChildren PropTypes
	*/
	TreeChildren.propTypes = {
		/** children - list of children and their heatmapIndex and maxHeight*/
		children: PropTypes.arrayOf(PropTypes.object).isRequired,

		/** depth - current depth of children*/
		depth: PropTypes.number.isRequired,

		/** parentIndex - heatmap index of parent of children*/
		parentIndex: PropTypes.number.isRequired,

		/** thresholdIndex - minimum index distance between two adjacent siblings*/
		thresholdIndex: PropTypes.number.isRequired,

	  	/** yScale*/
		yScale: PropTypes.func.isRequired,

		/** cladeColorScale*/
		cladeColorScale: PropTypes.func.isRequired
	}











/**
* Determines whether current index is at last node
* @param {int} i - current index
* @param {array} children
* @return {bool}
*/
const isLastNode = (i, children) => (
	i + 1 >= children.length
)

/**
* Determines whether index distance between i and i+1 child is above threshold
* @param {int} i - current i
* @param {array} children
* @param {int} threshold
* @return {bool}
*/
const isNodeDistanceExceedThreshold = (i, children, threshold) => (
	children[i+1]['heatmapIndex'] - children[i]['heatmapIndex'] > threshold
)


/**
* Returns index where clade touches branch
* @param {object} cladeDimensions
* @return {int}
*/
const getCladeIndex = (cladeDimensions) => (
	(cladeDimensions.startIndex + cladeDimensions.endIndex) / 2
)


/**
* Updates min and max indices with current index
* @param {object} minAndMax
* @param {int} i - current index
* @return {object} updated minAndMax
*/
const updateMinAndMaxIndex = (minAndMax, i) => ({
	minIndex: Math.min(minAndMax.minIndex, i),
	maxIndex: Math.max(minAndMax.maxIndex, i)
})
















/**
* Drawing modules
*/


/**
* Returns JSX for a clade
* @param {object} cladeDimensions
* @param {int} depth - current
* @param {func} yScale
* @param {int} cladeIndex - index where clade point should touch branch
* @param {func} cladeColorScale
* @return {JSX}
*/
const drawTreeClade = (cladeDimensions, depth, yScale, cladeIndex, cladeColorScale) => (
	<TreeClade key={cladeDimensions.startIndex} minIndex={cladeDimensions.startIndex} midIndex={cladeIndex} maxIndex={cladeDimensions.endIndex} depth={depth} yScale={yScale} maxHeight={cladeDimensions.maxHeight} cladeColorScale={cladeColorScale}/>
)


/**
* Return JSX for tree node
* @param {object} currNode
* @param {int} depth
* @return {JSX}
*/
const drawTreeNode = (currNode, depth, yScale) => (
	<TreeNode key={currNode['heatmapIndex']} nodeID={currNode['cellID']} depth={depth}/>
)


/**
* Return JSX for connecting vertical branch
* @param {int} minIndex
* @param {int} maxIndex
* @param {int} depth
* @param {func} yScale
* @return {JSX}
*/
const drawTreeVerticalBranch = (minIndex, maxIndex, depth, yScale) => (
	<TreeVerticalBranch minIndex={minIndex} maxIndex={maxIndex} depth={depth - 1} yScale={yScale}/>
)












/**
* cladeDimesions {object}
* 	cladeDimensions.isDrawing {bool} - whether clade is current aggregating
* 	cladeDimensions.startIndex {int}
*	cladeDimensions.endIndex {int}
* 	cladeDimensions.maxHeight {int} - tallest branch so far
*/
const initializeClade = () => ({
	isDrawing: false
})

const isCladeDrawingNow = (cladeDimensions) => (
	cladeDimensions.isDrawing
)

const startCladeDrawing = (currNode) => ({
	isDrawing: true,
	startIndex: currNode['heatmapIndex'],
	endIndex: currNode['heatmapIndex'],
	maxHeight: currNode['maxHeight']
})

const mergeNodeToClade = (cladeDimensions, currNode) => ({
	...cladeDimensions,
	endIndex: currNode['heatmapIndex'],
	maxHeight: Math.max(cladeDimensions['maxHeight'], currNode['maxHeight'])
})














/**
* MapState Factory function for Tree Children (use of Reselect)
* @return {func} mapState
*/
const makeMapState = () => {
	const getTreeNodeRecords = makeGetTreeNodeRecords()
	const mapState = (state, ownProps) => ({
		children: getTreeNodeRecords(state, ownProps.children),
		yScale: getYScale(state),
		thresholdIndex: getThresholdIndex(state),
		cladeColorScale: getCladeColorScale(state)
	})
	return mapState
}


export default connect(makeMapState)(TreeChildren)