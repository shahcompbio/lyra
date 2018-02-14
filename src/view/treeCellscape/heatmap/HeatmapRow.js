/**
* HeatmapRow container component
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import HeatmapRowIndicators from './HeatmapRowIndicators'
import HeatmapRowContent from './HeatmapRowContent'
import ReactTooltip from 'react-tooltip'

import { getHeatmapYScale, getChromPixelMapping, getBPRatio, makeIsIndexHighlighted } from 'state/selectors/treeCellscape.js'
import { highlightElement, unhighlightElement } from 'state/actions/treeCellscape.js'

class HeatmapRow extends Component { 
	static propTypes = {
		/** rowData */
		rowData: PropTypes.object.isRequired,

		/** yScale */
		yScale: PropTypes.func.isRequired,

		/** chromMap */
		chromMap: PropTypes.object.isRequired,

		/** bpRatio */
		bpRatio: PropTypes.number.isRequired,
		
		/** isHighlighted - whether current row is highlighted */
		isHighlighted: PropTypes.bool.isRequired
	}

	componentDidMount() {
		ReactTooltip.rebuild()
	} 

	shouldComponentUpdate(nextProps, nextState) {
		return this.props.isHighlighted !== nextProps.isHighlighted
			|| this.props.rowData.heatmapIndex !== nextProps.rowData.heatmapIndex
			|| this.isYPositionsDifferent(this.props, nextProps)
	}

	isYPositionsDifferent(currProps, nextProps) {

		return currProps.yScale(currProps.rowData.heatmapIndex) !==
			   nextProps.yScale(nextProps.rowData.heatmapIndex)

	}


	render() {


		const { rowData, yScale, chromMap, bpRatio, isHighlighted } = this.props
		const { heatmapIndex, segs, cellID } = rowData
		const y = yScale(heatmapIndex)


		const onMouseEnter = () => {
			const { dispatch } = this.props
			dispatch(highlightElement({ index: heatmapIndex }))
		}

		const onMouseLeave = () => {
			const { dispatch } = this.props
			dispatch(unhighlightElement())
		}


		return (<g className={heatmapIndex} 
					onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}
					data-tip
				>
					<HeatmapRowIndicators cellID={cellID} 
										  y={y} 
										  isHighlighted={isHighlighted}
					/>
					<HeatmapRowContent cellID={cellID} 
										segs={segs} 
										y={y} 
										chromMap={chromMap}
										bpRatio={bpRatio}
					/>

			</g>)
	}




}



/**
* MapState function
*/
const makeMapState = () => {
	const isIndexHighlighted = makeIsIndexHighlighted()
	const mapState = (state, ownProps) => ({
		isHighlighted: isIndexHighlighted(state, ownProps.rowData['heatmapIndex']),
		yScale: getHeatmapYScale(state),
		chromMap: getChromPixelMapping(state),
		bpRatio: getBPRatio(state)	
	})

	return mapState
}




export default connect(makeMapState())(HeatmapRow)