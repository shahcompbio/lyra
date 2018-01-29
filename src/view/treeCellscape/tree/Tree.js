import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { getTreeRootID } from 'state/selectors/treeCellscape.js'
import { fetchTreeRoot } from 'state/actions/treeCellscape.js'

import TreeNode from './TreeNode'


import { treeConfig as config } from 'config/treeCellscape.js'
const { width, height } = config

/**
* Tree - React Component
*/
class Tree extends Component {
	static propTypes = {
		/** ID of tree root - "" if not fetched yet  */
		rootID: PropTypes.string
	}

	componentDidMount() {
		const { dispatch } = this.props
		dispatch(fetchTreeRoot())
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.rootID !== this.props.rootID
	}

	render() {
		const { rootID } = this.props
		return rootID === '' 
			? ('') 
			: (<svg width={width} height={height}>
					<TreeNode nodeID={rootID} depth={0} offsetBy={0}/>
				</svg>)
	}

}



const mapState = (state) => (
	{ rootID: getTreeRootID(state) }
)



export default connect(mapState)(Tree)