import React, { Component } from 'react'
import { connect } from 'react-redux'
import { treeRootDataSelector } from '../../state/reducers/tree.js'
import { fetchRoot } from '../../state/actions/tree.js'
import TreeNode from './TreeNode' 
import { config, getIndexToYConverter, getCladeColorScale } from './utils.js'


const { width, height } = config

class TreeCellscape extends Component {

	componentDidMount() {
		const { dispatch } = this.props
		dispatch(fetchRoot())
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.treeRoot !== this.props.treeRoot
	}

	render() {
		const { treeRoot, numSuccessors, heatmapIndex, maxDepth } = this.props
		const yScale = getIndexToYConverter(numSuccessors, heatmapIndex)
		const cladeColorScale = getCladeColorScale(maxDepth)
		return treeRoot === '' 
			? ('') 
			: (<svg width={width} height={height}>
					<TreeNode nodeID={treeRoot} yScale={yScale} cladeColorScale={cladeColorScale} depth={0}/>
				</svg>)
	}

}


const mapState = (state) => (
	{ ...treeRootDataSelector(state) }
)



export default connect(mapState)(TreeCellscape)