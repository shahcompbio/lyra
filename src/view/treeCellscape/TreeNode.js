/**
* TreeNode -  React Component
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { makeGetTreeNodeRecord, getYScale } from 'state/selectors/treeCellscape.js'
import { fetchTreeNode } from 'state/actions/treeCellscape.js'

import TreeNodeCircle from './TreeNodeCircle'
import TreeChildren from './TreeChildren'
import TreeHorizontalBranch from './TreeHorizontalBranch'



/**
* TreeNodeFetcher
* TODO: abstract this so you can input:
// 	Data missing boolean
//  mapstate??
*/
class TreeNodeFetcher extends Component {
	static propTypes = {
		/** nodeID - cellID of node*/
		nodeID: PropTypes.string.isRequired,

		/** treeNode - data for nodeID */
		treeNode: PropTypes.object,

		/** yScale */
		yScale: PropTypes.func,

		/** render */
		render: PropTypes.func.isRequired
	}

	componentDidMount() {
		this.fetchIfMissing(this.props)
	}

	shouldComponentUpdate(nextProps, nextState) {
		const currNode = this.props.treeNode
		const nextNode = nextProps.treeNode

		return nextNode === null && currNode === null ? false
		: currNode === null || nextNode === null ? true
		: currNode.cellID !== nextNode.cellID
	}

	componentWillUpdate(nextProps) {
		this.fetchIfMissing(nextProps)
	}


	/** Dispatches fetch action if tree data doesn't exist*/
	fetchIfMissing(props) {
		const { dispatch, treeNode, nodeID } = props
		if (this.isDataMissing(treeNode)) {
			dispatch(fetchTreeNode(nodeID))
		}
	}

	/** Determines if tree data doesn't exist*/
	isDataMissing(treeNode) {
		return treeNode === null
	}

	render() {
		const { render, treeNode, yScale } = this.props
		return this.isDataMissing(treeNode) ? ('Loading') : render(treeNode, yScale)
	}
}

/**
* MapState Factory function for Tree Node (use of Reselect)
* @return {func} mapState
*/
const makeMapStateForTreeNode = () => {
	const getTreeNodeRecord = makeGetTreeNodeRecord()
	const mapState = (state, ownProps) => ({
		treeNode: getTreeNodeRecord(state, ownProps.nodeID),
		yScale: getYScale(state)
	})
	return mapState
}

TreeNodeFetcher = connect(makeMapStateForTreeNode())(TreeNodeFetcher)














/**
* TreeNode function - passes render prop to TreeNodeFetcher
* @param {string} nodeID
* @param {int} depth
*/
const TreeNode = ({nodeID, depth}) => {

	/**
	* render prop
	* @param {object} nodeData
	* @param {func} yScale
	*/
	const render = (nodeData, yScale) => {
		const { heatmapIndex, children, parent } = nodeData
		const branch = parent === "root" ? '' : <TreeHorizontalBranch heatmapIndex={heatmapIndex} depth={depth} yScale={yScale}/>
		return (<g>
					{branch}
					<TreeNodeCircle heatmapIndex={heatmapIndex} depth={depth} yScale={yScale}/>
					<TreeChildren children={children} depth={depth+1} parentIndex={heatmapIndex}/>
				</g>)
	} 
	return (<TreeNodeFetcher render={render} nodeID={nodeID}/>)
}

	/**
	* TreeNode propTypes
	*/
	TreeNode.PropTypes = {
		/** nodeID*/
		nodeID: PropTypes.string.isRequired,

		/** yScale*/
		yScale: PropTypes.func.isRequired,
	}


export default TreeNode