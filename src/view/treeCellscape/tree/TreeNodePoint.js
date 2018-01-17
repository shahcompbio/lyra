/**
* TreeNodePoint -  React Component
*/


import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'



import TreeNodeCircle from './TreeNodeCircle'
import { getTreeYScale, makeIsIndexHighlighted } from 'state/selectors/treeCellscape.js'
import { highlightIndex, unhighlightIndex } from 'state/actions/treeCellscape.js'


class TreeNodePoint extends Component {

	shouldComponentUpdate(nextProps, nextState) {
		return this.props.isHighlighted !== nextProps.isHighlighted
	}


	render() {
		const { heatmapIndex, depth, yScale, isHighlighted} = this.props

		const onMouseEnter = () => {
			const { dispatch } = this.props
			dispatch(highlightIndex(heatmapIndex))
		}

		const onMouseLeave = () => {
			const { dispatch } = this.props
			dispatch(unhighlightIndex())
		}


		return (<TreeNodeCircle heatmapIndex={heatmapIndex} 
								depth={depth} 
								yScale={yScale} 
								onMouseEnter={onMouseEnter}
								onMouseLeave={onMouseLeave}
								isHighlighted={isHighlighted}
				/>)
	}

}

const makeMapState = () => {
	const isIndexHighlighted = makeIsIndexHighlighted()
	const mapState = (state, ownProps) => ({
		isHighlighted: isIndexHighlighted(state, ownProps.heatmapIndex)
	})

	return mapState
}


export default connect(makeMapState())(TreeNodePoint)