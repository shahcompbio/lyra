/**
* Tree Cellscape Dashboard
* - Tree
* - Heatmap
*/

import React from 'react'

import TreeRootBackButton from './menu/TreeRootBackButton'

import Tree from './tree/Tree' 
import Heatmap from './heatmap/Heatmap'

import Tooltip from './Tooltip'

import { config } from 'config/treeCellscape.js'
const { width, height } = config


const TreeCellscape = () => (
	<div>
		<TreeRootBackButton/>
		<div>
			<svg width={width} height={height}>
				<Tree/>
				<Heatmap/>
			</svg>
			<Tooltip/>
		</div>
	</div>
)



export default TreeCellscape