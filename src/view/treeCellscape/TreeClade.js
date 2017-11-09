import React from 'react'
import { config, getXPosition } from './utils.js'

const { treeCladeWidth, treeCladeColor } = config

const TreeClade = ({ startIndex, endIndex, depth, yScale }) => {
	const x = getXPosition(depth - 1)
	const y1 = yScale(startIndex)
	const y2 = yScale(endIndex)


	return (
		<rect width={treeCladeWidth} height={(y2 - y1)} x={x} y={y1} fill={treeCladeColor}/>
	)

}

export default TreeClade