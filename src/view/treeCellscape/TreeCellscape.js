/**
* Tree Cellscape Dashboard
* - Tree
* - Heatmap
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Tree from './tree/Tree' 

import { config } from 'config/treeCellscape.js'
const { width, height } = config



const TreeCellscape = () => (
	<svg width={width} height={height}>
		<Tree/>
	</svg>
)



export default TreeCellscape