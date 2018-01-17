/**
* HeatmapRow container component
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { heatmapConfig as config } from 'config/treeCellscape.js'
import IndicatorCell from './IndicatorCell'
import HeatmapRowContent from './HeatmapRowContent'

import { getHeatmapYScale, getChromPixelMapping, getBPRatio, makeIsIndexHighlighted } from 'state/selectors/treeCellscape.js'
import { highlightIndex, unhighlightIndex } from 'state/actions/treeCellscape.js'

class HeatmapRow extends Component { 
	static propTypes = {
		/** rowData */
		rowData: PropTypes.object.isRequired,

		/** yScale */
		yScale: PropTypes.func.isRequired,

		/** chromMap */
		chromMap: PropTypes.object.isRequired,

		/** bpRatio */
		bpRatio: PropTypes.number.isRequired
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.props.isHighlighted !== nextProps.isHighlighted
	}


	render() {


		const { rowData, yScale, chromMap, bpRatio, isHighlighted } = this.props
		const { heatmapIndex, segs, cellID } = rowData
		const height = config['rowHeight']
		const y = yScale(heatmapIndex)


		const onMouseEnter = () => {
			const { dispatch } = this.props
			dispatch(highlightIndex(heatmapIndex))
		}

		const onMouseLeave = () => {
			const { dispatch } = this.props
			dispatch(unhighlightIndex())
		}


		return (<g className={heatmapIndex} 
					onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}
					data-tip
				>
					<IndicatorCell cellID={cellID} height={height} y={y} isHighlighted={isHighlighted}/>
					<HeatmapRowContent cellID={cellID} 
										segs={segs} 
										height={height} 
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