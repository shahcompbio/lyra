/**
* TreeNode -  React Component
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { makeGetTreeNodeRecordByID, getTreeYScale, getHighlightedCellID } from 'state/selectors/treeCellscape.js'
import { fetchTreeNode, highlightIndex, unhighlightIndex } from 'state/actions/treeCellscape.js'

import DataFetcher from 'view/utils/DataFetcher'

import TreeNodeCircle from './TreeNodeCircle'
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

const shouldComponentUpdate = (currProps, nextProps) => {
	const currNode = currProps.treeNode
	const nextNode = nextProps.treeNode

	return nextNode === null && currNode === null ? false
	: currNode === null || nextNode === null ? true
	: currNode.cellID !== nextNode.cellID
}


/**
* Factory function for mapstate to Tree Node
*/
const makeMapStateForTreeNode = () => {
	const getTreeNodeRecordByID = makeGetTreeNodeRecordByID()
	const mapState = (state, ownProps) => ({
		treeNode: getTreeNodeRecordByID(state, ownProps.nodeID)
	})
	return mapState
}

const TreeNodeFetcher = connect(makeMapStateForTreeNode())(DataFetcher)

	TreeNodeFetcher.PropTypes = {
		/** treeNode */
		treeNode: PropTypes.object,
	}







class TreeNode extends Component {
	static propTypes = {
		/** nodeID*/
		nodeID: PropTypes.string.isRequired,

		/** depth - current depth of node from root */
		depth: PropTypes.number.isRequired
	}


	shouldComponentUpdate(nextProps, nextState) {
		const cellID = this.props.nodeID
		// Current highlighted cell is row
		return nextProps.highlighted ===  cellID ||
		// Or current cell is unhighlighted
		(this.props.highlighted === cellID && nextProps.highlighted !== cellID)
	}

	render() {

		const { nodeID, depth, yScale, highlighted } = this.props
		
		/**
		* render prop
		* @param {object} nodeData
		* @param {func} yScale
		*/
		const render = (props) => {
			const { treeNode } = props
			const { heatmapIndex, children, parent } = treeNode
			const branch = parent === "root" ? '' : <TreeHorizontalBranch heatmapIndex={heatmapIndex} depth={depth} yScale={yScale}/>
			


			const onMouseEnter = () => {
				const { dispatch } = this.props
				dispatch(highlightIndex(heatmapIndex))
			}

			const onMouseLeave = () => {
				const { dispatch } = this.props
				dispatch(unhighlightIndex())
			}
			return (<g>
						{branch}
						<TreeNodeCircle heatmapIndex={heatmapIndex} 
										depth={depth} yScale={yScale} 
										onMouseEnter={onMouseEnter}
										onMouseLeave={onMouseLeave}
										isHighlighted={highlighted===nodeID}
						/>
						<TreeChildren children={children} depth={depth+1} parentIndex={heatmapIndex}/>
					</g>)
		} 
		return (<TreeNodeFetcher render={render} 
								nodeID={nodeID} fetchData={fetchData} isDataMissing={isDataMissing}/>)
	}
}
const mapState = (state) => ({
	highlighted: getHighlightedCellID(state),
	yScale: getTreeYScale(state)
})


export default connect(mapState)(TreeNode)