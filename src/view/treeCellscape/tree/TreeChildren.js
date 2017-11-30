/**
* TreeChildren -  React Component
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


import { makeGetTreeChildrenSummary, getYScale, getClusterColorScale } from 'state/selectors/treeCellscape.js'
import { addChildrenSummary } from 'state/actions/treeCellscape.js'

import TreeNode from './TreeNode'
import TreeCluster from './TreeCluster'
import TreeVerticalBranch from './TreeVerticalBranch'


class TreeChildren extends Component {
	static propTypes = {
		/** childrenSummary - list of clusters and nodes*/
		childrenSummary: PropTypes.arrayOf(PropTypes.object).isRequired,

		/** depth - current depth of children*/
		depth: PropTypes.number.isRequired,

		/** parentIndex - heatmap index of parent of children*/
		parentIndex: PropTypes.number.isRequired,

	  	/** yScale*/
		yScale: PropTypes.func.isRequired,

		/** clusterColorScale*/
		clusterColorScale: PropTypes.func.isRequired
	}

	componentDidMount() {
		const { dispatch, childrenSummary } = this.props
		dispatch(addChildrenSummary(childrenSummary))
	}





	render() {
		const { childrenSummary, depth, parentIndex, yScale, clusterColorScale } = this.props

		let minAndMaxIndex = { minIndex: parentIndex, maxIndex: parentIndex }

		const childrenJSX = childrenSummary.map((childAgg) => {
			if (childAgg.hasOwnProperty('cellID')) {
				minAndMaxIndex = updateMinAndMaxIndex(minAndMaxIndex, childAgg['heatmapIndex'])
				return drawTreeNode(childAgg, depth)
			}
			else {
				const clusterIndex = getClusterIndex(childAgg, parentIndex)
				minAndMaxIndex = updateMinAndMaxIndex(minAndMaxIndex, clusterIndex)
				return drawTreeCluster(childAgg, depth, yScale, clusterColorScale)
			}

		})


		const { minIndex, maxIndex } = minAndMaxIndex
		const verticalBranch = drawTreeVerticalBranch(minIndex, maxIndex, depth, yScale)

		return (<g>
					{verticalBranch}
					{childrenJSX}
				</g>)
	}

}




/**
* Returns index where cluster touches branch
* @param {object} clusterDimensions
* @return {int}
*/
const getClusterIndex = (clusterDimensions) => (
	(clusterDimensions.startIndex + clusterDimensions.endIndex) / 2
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
* Returns JSX for a cluster
* @param {object} clusterDimensions
* @param {int} depth - current
* @param {func} yScale
* @param {int} clusterIndex - index where cluster point should touch branch
* @param {func} clusterColorScale
* @return {JSX}
*/
const drawTreeCluster = (clusterDimensions, depth, yScale, clusterColorScale) => (
	<TreeCluster key={clusterDimensions.startIndex} minIndex={clusterDimensions.startIndex} maxIndex={clusterDimensions.endIndex} depth={depth} yScale={yScale} maxHeight={clusterDimensions.maxHeight} clusterColorScale={clusterColorScale}/>
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
	const getTreeChildrenSummary = makeGetTreeChildrenSummary()
	const mapState = (state, ownProps) => ({
		childrenSummary: getTreeChildrenSummary(state, ownProps.children),
		yScale: getYScale(state),
		clusterColorScale: getClusterColorScale(state)
	})
	return mapState
}


export default connect(makeMapState)(TreeChildren)