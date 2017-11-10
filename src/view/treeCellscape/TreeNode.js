import React, { Component } from 'react'
import { connect } from 'react-redux'
import { treeNodeSelector } from '../../state/reducers/tree.js'
import { fetchTreeNode } from '../../state/actions/tree.js'
import TreeNodeCircle from './TreeNodeCircle'
import TreeNodeVerticalBranch from './TreeNodeVerticalBranch'
import TreeChildren from './TreeChildren'





class TreeNodeFetcher extends Component {

	componentDidMount() {
		this.fetchIfMissing(this.props)
	}

	componentWillReceiveProps(nextProps) {
		this.fetchIfMissing(nextProps)
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.props.treeNode !== nextProps.treeNode
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
		const { render, treeNode } = this.props
		console.log(treeNode)
		return this.isDataMissing(treeNode) ? ('Loading') : render(treeNode)
	}
}

const mapState = (state, ownProps) => ({
	treeNode: treeNodeSelector(state, ownProps.nodeID)
})

TreeNodeFetcher = connect(mapState)(TreeNodeFetcher)
















const TreeNode = ({nodeID, yScale, depth, cladeColorScale}) => {
	const render = (nodeData) => {
		const { heatmapIndex, children } = nodeData
		const minChildIndex = getMinChildIndex(children, heatmapIndex)
		const maxChildIndex = getMaxChildIndex(children, heatmapIndex)

		return (<g>
					
					<TreeNodeCircle heatmapIndex={heatmapIndex} yScale={yScale} depth={depth}/>
					<TreeChildren children={children} depth={depth+1} yScale={yScale} parentIndex={heatmapIndex} cladeColorScale={cladeColorScale}/>
				</g>)
	} 
	return (<TreeNodeFetcher render={render} nodeID={nodeID}/>)
}


const getMaxChildIndex = (children, heatmapIndex) => (
	children.reduce((curMax, child) => (Math.max(child['heatmapIndex'], curMax)), heatmapIndex)
)

const getMinChildIndex = (children, heatmapIndex) => (
	children.reduce((curMax, child) => (Math.min(child['heatmapIndex'], curMax)), heatmapIndex)
)


export default TreeNode