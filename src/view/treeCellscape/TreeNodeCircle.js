import React from 'react'
import { config, getXPosition } from './utils.js'

const { treeNodeRadius, treeNodeColor } = config

const TreeNodeCircle = ({ heatmapIndex, yScale, depth }) => 
	(<circle cx={getXPosition(depth)} 
			 cy={yScale(heatmapIndex)} 
			 r={treeNodeRadius} 
			 fill={treeNodeColor}
	/>)

export default TreeNodeCircle