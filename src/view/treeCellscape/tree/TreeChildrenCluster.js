/**
* TreeChildrenCluster container component
*/


import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ReactTooltip from 'react-tooltip'
import TreeCluster from './TreeCluster'


import { makeIsIndexRangeHighlighted, getClusterColorScale } from 'state/selectors/treeCellscape.js'
import { highlightIndex, unhighlightIndex } from 'state/actions/treeCellscape.js'


class TreeChildrenCluster extends Component {
	static propTypes = {
		/** minIndex, maxIndex - indices that indicate where points of cluster should be */
		minIndex: PropTypes.number.isRequired,
		maxIndex: PropTypes.number.isRequired,

		/** depth */
		depth: PropTypes.number.isRequired,

		/** maxHeight - length of tallest branch of a node in this cluster */
		maxHeight: PropTypes.number.isRequired,

		/** yScale, clusterColorScale */
		yScale: PropTypes.func.isRequired,
		clusterColorScale: PropTypes.func.isRequired,
		
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
		const { minIndex, maxIndex, maxIndexWithOffset, depth, yScale, maxHeight, clusterColorScale, isHighlighted } = this.props

		const onMouseEnter = () => {
			const { dispatch } = this.props
			dispatch(highlightIndex([minIndex, maxIndex]))
		}

		const onMouseLeave = () => {
			const { dispatch } = this.props
			dispatch(unhighlightIndex())
		}


		return (<TreeCluster minIndex={minIndex} 
							 maxIndex={maxIndexWithOffset} 
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