

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getTreeRootID } from 'state/selectors/treeCellscape.js'
import { unsetTreeRoot } from 'state/actions/treeCellscape.js'


class TreeRootBackButton extends Component {

	render() {
		const { rootID } = this.props

		const onClick = () => {
			const { dispatch } = this.props
			dispatch(unsetTreeRoot())
		}

		return (<button onClick={onClick}>Back</button>)
	}
}


const mapState = (state) => ({
	rootID: getTreeRootID(state)
})

export default connect(mapState)(TreeRootBackButton)