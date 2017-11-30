/**
* Tree Cellscape Dashboard
* - Tree
* - Heatmap
*/

import React from 'react'

import Tree from './tree/Tree' 
import Heatmap from './heatmap/Heatmap'

import { config } from 'config/treeCellscape.js'
const { width, height } = config



const TreeCellscape = () => (
	<svg width={width} height={height}>
		<Tree/>
		<Heatmap/>
	</svg>
)



export default TreeCellscape