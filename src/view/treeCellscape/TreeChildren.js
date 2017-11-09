import React from 'react'
import { connect } from 'react-redux'
import TreeNode from './TreeNode'
import TreeClade from './TreeClade'
import TreeNodeHorizontalBranch from './TreeNodeHorizontalBranch'
import { numNodesSelector } from '../../state/reducers/tree.js'
import { getThresholdIndex } from './utils.js'




const TreeChildren = ({ children, depth, yScale, numNodes }) => {
	if (children.length === 0) {
		return null
	}
	else if (children.length === 1) {
		const child = children[0]
		return (
			drawTreeNode(child, depth, yScale)
		)
	}
	else {
		return processChildrenToJSX(children, depth, yScale, numNodes)

	}
}





const processChildrenToJSX = (children, depth, yScale, numNodes) => {
	const thresholdIndex = getThresholdIndex(numNodes)
	let boxDimensions = initializeBox()

	let resultJSX = []

// clean up this loop
	let i = 0
	while (i < children.length) {
		const currNode = children[i]

		if (isLastNode(i, children) || isNodeDistanceExceedThreshold(i, children, thresholdIndex)) {
			
			if (isBoxDrawingNow(boxDimensions)) {
				boxDimensions = mergeNodeToBox(boxDimensions, currNode)
				console.log(boxDimensions)
				resultJSX = [...resultJSX, drawTreeClade(boxDimensions, depth, yScale)]
				//resultJSX = [...resultJSX, drawTreeNode(currNode, depth, yScale)]
				boxDimensions = initializeBox()
			}


			else {
				resultJSX = [...resultJSX, drawTreeNode(currNode, depth, yScale)]
			}

		}
		else { // nodes are too close
			if (isBoxDrawingNow(boxDimensions)) {
				boxDimensions = mergeNodeToBox(boxDimensions, currNode)
			}
			else {
				boxDimensions = startBoxDrawing(currNode)
			}
		}

		i++
	}

	return resultJSX

}

const isLastNode = (i, children) => (
	i + 1 >= children.length
)


const isNodeDistanceExceedThreshold = (i, children, threshold) => (
	children[i+1]['heatmapIndex'] - children[i]['heatmapIndex'] > threshold
)






const drawTreeClade = (boxDimensions, depth, yScale) => (
	<TreeClade key={boxDimensions.startIndex} startIndex={boxDimensions.startIndex} endIndex={boxDimensions.endIndex} depth={depth} yScale={yScale}/>
)


const drawTreeNode = (currNode, depth, yScale) => (
	<g key={currNode['heatmapIndex']}>
		<TreeNodeHorizontalBranch heatmapIndex={currNode['heatmapIndex']} depth={depth} yScale={yScale}/>
		<TreeNode nodeID={currNode['cellID']} yScale={yScale} depth={depth}/>
	</g>
)





const initializeBox = () => ({
	isDrawing: false
})

const isBoxDrawingNow = (boxDimensions) => (
	boxDimensions.isDrawing
)

const startBoxDrawing = (currNode) => ({
	isDrawing: true,
	startIndex: currNode['heatmapIndex'],
	endIndex: currNode['heatmapIndex']
})

const mergeNodeToBox = (boxDimensions, currNode) => ({
	...boxDimensions,
	endIndex: currNode['heatmapIndex']
})




const mapState = (state) => ({
	numNodes: numNodesSelector(state)
})

export default connect(mapState)(TreeChildren)