/**
* HeatmapRow container component
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { heatmapConfig as config } from 'config/treeCellscape.js'
import IndicatorCell from './IndicatorCell'
import HeatmapRowContent from './HeatmapRowContent'

import { getHeatmapYScale, getChromPixelMapping, getBPRatio, getHighlightedIndex } from 'state/selectors/treeCellscape.js'
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
		const cellID = this.props.rowData['heatmapIndex']
		// Current highlighted cell is row
		return nextProps.highlighted ===  cellID ||
		// Or current cell is unhighlighted
		(this.props.highlighted === cellID && nextProps.highlighted !== cellID)
	}


	render() {


		const { rowData, yScale, chromMap, bpRatio, highlighted } = this.props
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
					<IndicatorCell cellID={cellID} height={height} y={y} isHighlighted={highlighted===heatmapIndex}/>
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
const mapState = (state) => ({
	highlighted: getHighlightedIndex(state),
	yScale: getHeatmapYScale(state),
	chromMap: getChromPixelMapping(state),
	bpRatio: getBPRatio(state)
})




export default connect(mapState)(HeatmapRow)