/**
* TreeNodePoint -  React Component
*/


import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


import TreeNodeCircle from './TreeNodeCircle'
import ReactTooltip from 'react-tooltip'

import { makeIsIndexHighlighted } from 'state/selectors/treeCellscape.js'
import { highlightElement, unhighlightElement, setTreeRoot } from 'state/actions/treeCellscape.js'


class TreeNodePoint extends Component {
	static propTypes = {
		/** nodeID*/
		nodeID: PropTypes.string.isRequired,

		/** heatmapIndex */
		heatmapIndex: PropTypes.number.isRequired,

		/** maxDescendantIndex */
		maxDescendantIndex: PropTypes.number.isRequired,

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
		return this.props.isHighlighted !== nextProps.isHighlighted ||
			   this.props.heatmapIndex !== nextProps.heatmapIndex
	}


	render() {
		const { nodeID, heatmapIndex, maxDescendantIndex, depth, yScale, isHighlighted, offsetBy } = this.props

		const onMouseEnter = () => {
			const { dispatch } = this.props
			dispatch(highlightElement({ index: heatmapIndex, range: [heatmapIndex, maxDescendantIndex] }))
		}

		const onMouseLeave = () => {
			const { dispatch } = this.props
			dispatch(unhighlightElement())
		}

		const onMouseClick = () => {
			const { dispatch } = this.props
			dispatch(setTreeRoot(nodeID))
		}


		return (<TreeNodeCircle heatmapIndex={heatmapIndex - offsetBy} 
								depth={depth} 
								yScale={yScale} 
								onMouseEnter={onMouseEnter}
								onMouseLeave={onMouseLeave}
								onMouseClick={onMouseClick}
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