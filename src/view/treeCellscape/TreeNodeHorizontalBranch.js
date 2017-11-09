import React from 'react'
import { config, getXPosition } from './utils.js'

const { treeBranchColor, treeBranchWidth } = config

const TreeNodeHorizontalBranch = ({ heatmapIndex, depth, yScale }) => {
	const x1 = getXPosition(depth - 1)
	const x2 = getXPosition(depth)
	const y = yScale(heatmapIndex)
	return (<line x1={x1} y1={y} x2={x2} y2={y} stroke={treeBranchColor} strokeWidth={treeBranchWidth}/>)
}




export default TreeNodeHorizontalBranch