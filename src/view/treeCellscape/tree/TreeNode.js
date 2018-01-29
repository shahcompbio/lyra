/**
* TreeNode -  React Component
*/

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { makeGetTreeNodeRecordByID, getTreeYScale } from 'state/selectors/treeCellscape.js'
import { fetchTreeNode } from 'state/actions/treeCellscape.js'

import DataFetcher from 'view/utils/DataFetcher'

import TreeNodePoint from './TreeNodePoint'
import TreeChildren from './TreeChildren'
import TreeHorizontalBranch from './TreeHorizontalBranch'





/**
* Tree Node Data Fetcher
*/

const isDataMissing = (props) => {
	const { treeNode } = props
	return treeNode === null
}


const fetchData = (props) => {
	const { nodeID } = props
	return fetchTreeNode(nodeID)
}

/*
const shouldComponentUpdate = (currProps, nextProps) => {
	const currNode = currProps.treeNode
	const nextNode = nextProps.treeNode

	return nextNode === null && currNode === null ? false
	: currNode === null || nextNode === null ? true
	: currNode.cellID !== nextNode.cellID
}
*/

/**
* Factory function for mapstate to Tree Node
*/
const makeMapStateForTreeNode = () => {
	const getTreeNodeRecordByID = makeGetTreeNodeRecordByID()
	const mapState = (state, ownProps) => ({
		treeNode: getTreeNodeRecordByID(state, ownProps.nodeID),
		yScale: getTreeYScale(state)
	})
	return mapState
}

const TreeNodeFetcher = connect(makeMapStateForTreeNode())(DataFetcher)

	TreeNodeFetcher.PropTypes = {
		/** treeNode */
		treeNode: PropTypes.object,
	}







const TreeNode = ({ nodeID, depth, siblingIndex, offsetBy }) => {		
	/**
	* render prop
	* @param {object} nodeData
	* @param {func} yScale
	*/
	const render = (props) => {
		const { treeNode, yScale } = props
		const { heatmapIndex, children, parent } = treeNode
		const branch = parent === "root" 
				? '' 
				: <TreeHorizontalBranch heatmapIndex={heatmapIndex - offsetBy} depth={depth} yScale={yScale}/>
		
	
		return (<g>
					{branch}
					<TreeNodePoint  heatmapIndex={heatmapIndex}
									depth={depth}
									yScale={yScale}
									offsetBy={offsetBy}
					/>
					<TreeChildren children={children} 
								  depth={depth+1} 
								  parentIndex={heatmapIndex - offsetBy} 
								  auntIndex={siblingIndex} 
								  offsetBy={offsetBy}
					/>
				</g>)
	} 
	return (<TreeNodeFetcher render={render} 
							nodeID={nodeID} 
							fetchData={fetchData} 
							isDataMissing={isDataMissing}
			/>)

}

	/**
	* PropTypes
	*/
	TreeNode.propTypes = {
		/** nodeID*/
		nodeID: PropTypes.string.isRequired,

		/** depth - current depth of node from root */
		depth: PropTypes.number.isRequired,

		/** siblingIndex - offsetted heatmap index of adjacent sibling */
		siblingIndex: PropTypes.number,

		/** offsetBy - number of indices to offset drawing by */
		offsetBy: PropTypes.number.isRequired
	}



export default TreeNode