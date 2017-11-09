import React from 'react'
import { config, getXPosition } from './utils.js'

const { treeBranchColor, treeBranchWidth } = config

const TreeNodeVerticalBranch = ({ minIndex, maxIndex, depth, yScale }) => {
	const xPos = getXPosition(depth)
	return (<line x1={xPos} y1={yScale(minIndex)} x2={xPos} y2={yScale(maxIndex)} stroke={treeBranchColor} strokeWidth={treeBranchWidth}/>)
}



export default TreeNodeVerticalBranch