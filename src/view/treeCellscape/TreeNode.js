import React, { Component } from 'react'
import { connect } from 'react-redux'

import { makeGetTreeNodeRecord, getYScale } from 'state/selectors/treeCellscape.js'
import { fetchTreeNode } from 'state/actions/tree.js'
import TreeNodeCircle from './TreeNodeCircle'
import TreeNodeVerticalBranch from './TreeNodeVerticalBranch'
import TreeChildren from './TreeChildren'




// Later, abstract this so you can input:
// 	Data missing boolean
//  mapstate??
class TreeNodeFetcher extends Component {

	componentDidMount() {
		this.fetchIfMissing(this.props)
	}

	componentWillUpdate(nextProps) {
		this.fetchIfMissing(nextProps)
	}

	shouldComponentUpdate(nextProps, nextState) {
		const currNode = this.props.treeNode
		const nextNode = nextProps.treeNode

		return nextNode === null && currNode === null ? false
		: currNode === null || nextNode === null ? true
		: currNode.cellID !== nextNode.cellID
	}


	fetchIfMissing(props) {
		const { dispatch, treeNode, nodeID } = props
		if (this.isDataMissing(treeNode)) {
			dispatch(fetchTreeNode(nodeID))
		}
	}

	isDataMissing(treeNode) {
		return treeNode === null
	}

	render() {
		const { render, treeNode, yScale } = this.props
		return this.isDataMissing(treeNode) ? ('Loading') : render(treeNode, yScale)
	}
}
/*
const mapState = (state, ownProps) => ({
	treeNode: getTreeNodeRecord(state, ownProps.nodeID),
	yScale: getYScale(state)
})
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















const TreeNode = ({nodeID, depth}) => {
	const render = (nodeData, yScale) => {
		const { heatmapIndex, children } = nodeData
		return (<g>
					
					<TreeNodeCircle heatmapIndex={heatmapIndex} depth={depth} yScale={yScale}/>
					<TreeChildren children={children} depth={depth+1} parentIndex={heatmapIndex}/>
				</g>)
	} 
	return (<TreeNodeFetcher render={render} nodeID={nodeID}/>)
}


export default TreeNode