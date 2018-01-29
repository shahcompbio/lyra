/**
* TreeNodePoint -  React Component
*/


import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


import TreeNodeCircle from './TreeNodeCircle'
import ReactTooltip from 'react-tooltip'

import { makeIsIndexHighlighted } from 'state/selectors/treeCellscape.js'
import { highlightIndex, unhighlightIndex } from 'state/actions/treeCellscape.js'


class TreeNodePoint extends Component {
	static propTypes = {
		/** heatmapIndex */
		heatmapIndex: PropTypes.number.isRequired,

		/** depth */
		depth: PropTypes.number.isRequired,

		/** yScale */
		yScale: PropTypes.func.isRequired,

		/** offsetBy - number of indices to offset drawing by */
		offsetBy: PropTypes.number.isRequired,
		
		/** isHighlighted - whether current node is highlighted */
		isHighlighted: PropTypes.bool.isRequired
	}

	componentDidMount() {
		ReactTooltip.rebuild()
	} 


	shouldComponentUpdate(nextProps, nextState) {
		return this.props.isHighlighted !== nextProps.isHighlighted
	}


	render() {
		const { heatmapIndex, depth, yScale, isHighlighted, offsetBy } = this.props

		const onMouseEnter = () => {
			const { dispatch } = this.props
			dispatch(highlightIndex(heatmapIndex))
		}

		const onMouseLeave = () => {
			const { dispatch } = this.props
			dispatch(unhighlightIndex())
		}


		return (<TreeNodeCircle heatmapIndex={heatmapIndex - offsetBy} 
								depth={depth} 
								yScale={yScale} 
								onMouseEnter={onMouseEnter}
								onMouseLeave={onMouseLeave}
								isHighlighted={isHighlighted}
				/>)
	}

}	


/**
* MapState
*/

const makeMapState = () => {
	const isIndexHighlighted = makeIsIndexHighlighted()
	const mapState = (state, ownProps) => ({
		isHighlighted: isIndexHighlighted(state, ownProps.heatmapIndex)
	})

	return mapState
}


export default connect(makeMapState())(TreeNodePoint)