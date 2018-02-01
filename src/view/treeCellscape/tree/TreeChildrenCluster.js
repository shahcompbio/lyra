/**
* TreeChildrenCluster container component
*/


import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ReactTooltip from 'react-tooltip'
import TreeCluster from './TreeCluster'


import { makeIsIndexRangeHighlighted, getClusterColorScale } from 'state/selectors/treeCellscape.js'
import { highlightElement, unhighlightElement } from 'state/actions/treeCellscape.js'


class TreeChildrenCluster extends Component {
	static propTypes = {
		/** minIndex, maxIndex - min and max indices for cluster (for highlighting) */
		minIndex: PropTypes.number.isRequired,
		maxIndex: PropTypes.number.isRequired,

		/** depth */
		depth: PropTypes.number.isRequired,

		/** clusterHeight - number of indices to be drawn */
		clusterHeight: PropTypes.number.isRequired,

		/** maxHeight - length of tallest branch of a node in this cluster */
		maxHeight: PropTypes.number.isRequired,

		/** yScale, clusterColorScale */
		yScale: PropTypes.func.isRequired,
		clusterColorScale: PropTypes.func.isRequired,

		/** offsetBy - number of indices to offset clusters by*/
		offsetBy: PropTypes.number.isRequired,

		
		/** isHighlighted - whether current cluster is highlighted */
		isHighlighted: PropTypes.bool.isRequired

	}

	componentDidMount() {
		ReactTooltip.rebuild()
	} 


	shouldComponentUpdate(nextProps, nextState) {
		return this.props.isHighlighted !== nextProps.isHighlighted
	}


	render() {
		const { minIndex, maxIndex, clusterHeight,  maxHeight, depth, yScale, clusterColorScale, isHighlighted, offsetBy, parentIndex } = this.props

		const onMouseEnter = () => {
			const { dispatch } = this.props
			dispatch(highlightElement({ range: [minIndex, maxIndex] }))
		}

		const onMouseLeave = () => {
			const { dispatch } = this.props
			dispatch(unhighlightElement())
		}

		const startingIndex = Math.max(minIndex - offsetBy, parentIndex)

		return (<TreeCluster minIndex={startingIndex} 
							 maxIndex={startingIndex + clusterHeight} 
							 depth={depth} 
							 yScale={yScale} 
							 maxHeight={maxHeight} 
							 clusterColorScale={clusterColorScale}
							 isHighlighted={isHighlighted}
							 onMouseEnter={onMouseEnter}
							 onMouseLeave={onMouseLeave}
				/>)
	}

}


/**
* MapState function
*/
const makeMapState = () => {
	const isHighlighted = makeIsIndexRangeHighlighted()
	const mapState = (state, ownProps) => ({
		clusterColorScale: getClusterColorScale(state),
		isHighlighted: isHighlighted(state, ownProps.minIndex, ownProps.maxIndex)

	})
	return mapState
}


export default connect(makeMapState())(TreeChildrenCluster)