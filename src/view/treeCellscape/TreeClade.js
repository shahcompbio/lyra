import React from 'react'
import { config, getXPosition } from './utils.js'

const { treeCladeWidth, treeCladeColor } = config

const TreeClade = ({ minIndex, midIndex, maxIndex, depth, yScale }) => {
	/*const x = getXPosition(depth - 1)
	const y1 = yScale(startIndex)
	const y2 = yScale(endIndex)


	return (
		<rect width={treeCladeWidth} height={(y2 - y1)} x={x} y={y1} fill={treeCladeColor}/>
	)*/

	const x1 = getXPosition(depth - 1)
	const x2 = x1 + treeCladeWidth
	const yMin = yScale(minIndex)
	const yMid = yScale(midIndex)
	const yMax = yScale(maxIndex)

	const point1 = "" + x1 + "," + yMid
	const point2 = "" + x2 + "," + yMin
	const point3 = "" + x2 + "," + yMax

	const points = point1 + " " + point2 + " " + point3
	return (
		<polygon points={points} fill={treeCladeColor}/>
	)



}

export default TreeClade



