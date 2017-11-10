import React from 'react'
import { connect } from 'react-redux'
import TreeNode from './TreeNode'
import TreeClade from './TreeClade'
import TreeNodeHorizontalBranch from './TreeNodeHorizontalBranch'
import TreeNodeVerticalBranch from './TreeNodeVerticalBranch'
import { numNodesSelector } from '../../state/reducers/tree.js'
import { getThresholdIndex } from './utils.js'




const TreeChildren = ({ children, depth, yScale, numNodes, parentIndex, cladeColorScale }) => {

	const thresholdIndex = getThresholdIndex(numNodes)
	let boxDimensions = initializeBox()

	let resultJSX = []

	let minAndMaxIndex = { minIndex: parentIndex, maxIndex: parentIndex }

	let i = 0
	while (i < children.length) {
		const currNode = children[i]

		if (isLastNode(i, children) || isNodeDistanceExceedThreshold(i, children, thresholdIndex)) {
			
			if (isBoxDrawingNow(boxDimensions)) {
				boxDimensions = mergeNodeToBox(boxDimensions, currNode)
				console.log(boxDimensions)

				const cladeIndex = getCladeIndex(boxDimensions, parentIndex)

				minAndMaxIndex = updateMinAndMaxIndex(minAndMaxIndex, cladeIndex)

				resultJSX = [...resultJSX, drawTreeClade(boxDimensions, depth, yScale, cladeIndex, cladeColorScale)]
				//resultJSX = [...resultJSX, drawTreeNode(currNode, depth, yScale)]
				boxDimensions = initializeBox()
			}


			else {
				minAndMaxIndex = updateMinAndMaxIndex(minAndMaxIndex, currNode['heatmapIndex'])

				resultJSX = [...resultJSX, drawTreeNode(currNode, depth, yScale, cladeColorScale)]
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

	const { minIndex, maxIndex } = minAndMaxIndex
	return [...resultJSX, drawTreeVerticalBranch(minIndex, maxIndex, depth, yScale)]

}


const isLastNode = (i, children) => (
	i + 1 >= children.length
)


const isNodeDistanceExceedThreshold = (i, children, threshold) => (
	children[i+1]['heatmapIndex'] - children[i]['heatmapIndex'] > threshold
)



const getCladeIndex = (boxDimensions, parentIndex) => (
	/*boxDimensions.startIndex > parentIndex ? boxDimensions.startIndex : 
	boxDimensions.endIndex < parentIndex ? boxDimensions.endIndex :*/
											((boxDimensions.startIndex + boxDimensions.endIndex) / 2)
)



const updateMinAndMaxIndex = (minAndMax, i) => ({
	minIndex: Math.min(minAndMax.minIndex, i),
	maxIndex: Math.max(minAndMax.maxIndex, i)
})



const drawTreeClade = (boxDimensions, depth, yScale, cladeIndex, cladeColorScale) => (
	<TreeClade key={boxDimensions.startIndex} minIndex={boxDimensions.startIndex} midIndex={cladeIndex} maxIndex={boxDimensions.endIndex} depth={depth} yScale={yScale} maxDepth={boxDimensions.maxDepth} cladeColorScale={cladeColorScale}/>
)


const drawTreeNode = (currNode, depth, yScale, cladeColorScale) => (
	<g key={currNode['heatmapIndex']}>
		<TreeNodeHorizontalBranch heatmapIndex={currNode['heatmapIndex']} depth={depth} yScale={yScale}/>
		<TreeNode nodeID={currNode['cellID']} yScale={yScale} depth={depth} cladeColorScale={cladeColorScale}/>
	</g>
)


const drawTreeVerticalBranch = (minIndex, maxIndex, depth, yScale) => (
	<TreeNodeVerticalBranch key={'branch-to-' + minIndex} minIndex={minIndex} maxIndex={maxIndex} depth={depth - 1} yScale={yScale}/>
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
	endIndex: currNode['heatmapIndex'],
	maxDepth: currNode['maxDepth']
})

const mergeNodeToBox = (boxDimensions, currNode) => ({
	...boxDimensions,
	endIndex: currNode['heatmapIndex'],
	maxDepth: Math.max(boxDimensions['maxDepth'], currNode['maxDepth'])
})




const mapState = (state) => ({
	numNodes: numNodesSelector(state)
})

export default connect(mapState)(TreeChildren)