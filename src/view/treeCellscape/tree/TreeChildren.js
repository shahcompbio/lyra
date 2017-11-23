/**
* TreeChildren -  React Component
* 	Determines which child nodes need to be aggregated
*/

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


import { makeGetTreeChildrenAggregations, getYScale, getThresholdIndex, getCladeColorScale } from 'state/selectors/treeCellscape.js'

import TreeNode from './TreeNode'
import TreeClade from './TreeClade'
import TreeVerticalBranch from './TreeVerticalBranch'


/**
* TreeChildren
*/
const TreeChildren = ({ childrenAggs, depth, parentIndex, yScale, cladeColorScale }) => {

	let minAndMaxIndex = { minIndex: parentIndex, maxIndex: parentIndex }
	const childrenJSX = childrenAggs.map((childAgg) => {
		if (childAgg.hasOwnProperty('cellID')) {
			minAndMaxIndex = updateMinAndMaxIndex(minAndMaxIndex, childAgg['heatmapIndex'])
			return drawTreeNode(childAgg, depth)
		}
		else {
			const cladeIndex = getCladeIndex(childAgg, parentIndex)
			minAndMaxIndex = updateMinAndMaxIndex(minAndMaxIndex, cladeIndex)
			return drawTreeClade(childAgg, depth, yScale, cladeIndex, cladeColorScale)
		}

	})


	const { minIndex, maxIndex } = minAndMaxIndex
	const verticalBranch = drawTreeVerticalBranch(minIndex, maxIndex, depth, yScale)

	return (<g>
				{verticalBranch}
				{childrenJSX}
			</g>)

}

	/**
	* TreeChildren PropTypes
	*/
	TreeChildren.propTypes = {
		/** children - list of aggregation children (combination of clades and nodes)*/
		childrenAggs: PropTypes.arrayOf(PropTypes.object).isRequired,

		/** depth - current depth of children*/
		depth: PropTypes.number.isRequired,

		/** parentIndex - heatmap index of parent of children*/
		parentIndex: PropTypes.number.isRequired,

	  	/** yScale*/
		yScale: PropTypes.func.isRequired,

		/** cladeColorScale*/
		cladeColorScale: PropTypes.func.isRequired
	}






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
const drawTreeNode = (currNode, depth) => (
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
* MapState Factory function for Tree Children (use of Reselect)
* @return {func} mapState
*/
const makeMapState = () => {
	const getTreeChildrenAggregations = makeGetTreeChildrenAggregations()
	const mapState = (state, ownProps) => ({
		childrenAggs: getTreeChildrenAggregations(state, ownProps.children),
		yScale: getYScale(state),
		cladeColorScale: getCladeColorScale(state)
	})
	return mapState
}


export default connect(makeMapState)(TreeChildren)