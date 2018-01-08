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
	<p>
		<svg width={width} height={height}>
			<Tree/>
			<Heatmap/>
		</svg>
	</p>
)



export default TreeCellscape