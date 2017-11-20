import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { getTreeRootID } from 'state/selectors/treeCellscape.js'
import { fetchTreeRoot } from 'state/actions/tree.js'

import TreeNode from './TreeNode' 
import { config, getIndexToYConverter, getCladeColorScale } from './utils.js'




const { width, height } = config


/**
* Tree Cellscape Dashboard - React Component
*/
class TreeCellscape extends Component {
	static propTypes = {
		/** ID of tree root - "" if not fetched yet  */
		treeNode: PropTypes.string
	}

	componentDidMount() {
		const { dispatch } = this.props
		dispatch(fetchTreeRoot())
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.treeRoot !== this.props.treeRoot
	}

	render() {
		const { treeRoot } = this.props
		console.log(treeRoot)
		return treeRoot === '' 
			? ('') 
			: (<svg width={width} height={height}>
					<TreeNode nodeID={treeRoot} depth={0}/>
				</svg>)
	}

}


const mapState = (state) => (
	{ treeRoot: getTreeRootID(state) }
)



export default connect(mapState)(TreeCellscape)