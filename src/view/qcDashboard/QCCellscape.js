import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getViewCells } from '../../state/reducers/cells.js'
import { getChromRanges } from '../../state/reducers/views.js'
import Minimap from './Minimap'
import { getCellSegments } from '../../state/reducers/cells.js'
import { scaleOrdinal, scaleLinear } from 'd3'


const settings = {
	width: 600,
	height: 400,
	minimapRowHeight: 1,
	heatmapRowHeight: 7,
	colorScale: scaleOrdinal().domain([1,2,3,4,5,6,7])
							.range(["#2e7aab", "#73a9d4", "#D6D5D5", "#fec28b", "#fd8b3a", "#ca632c", "#954c25"])

}

class QCCellscape extends Component {
	state = this.getState(this.props.cells)

	// Hey, you should refactor this action creator to an actual action creator
	componentDidMount() {
		const { dispatch, cellscape } = this.props
		const { minimapCells } = this.state
		dispatch({ type: "LOAD_INIT_CELLSCAPE", cells: minimapCells, viewID: cellscape.id })
	}

	// Apparently setState will (may?) have some lag time, so may need to reconsider
	componentWillReceiveProps(nextProps) {
		this.setState(this.getState(nextProps.cells))
	}

	getState(cells) {
		const minimapCells = getMinimapCells(cells, settings.height)
		const minimapToHeatmap = getMinimapToHeatmapScale(cells, minimapCells)
		return { minimapCells, minimapToHeatmap }
	}


	// Also will need a rewrite
	render() {
		const { minimapCells } = this.state 
		const { chromRanges } = this.props
		return minimapCells[0].hasOwnProperty("segs") && chromRanges ? 
						(<Minimap cells={minimapCells} 
								chromRanges={chromRanges} 
								width={100} 
								rowHeight={settings.minimapRowHeight}
								colorScale={settings.colorScale}
								onBrush={this.onMinimapBrush}
							/>) : 
						(<p>Loading</p>)
	}


	onMinimapBrush = (extent) => {
		console.log(extent)




		console.log(this.state.minimapToHeatmap(extent[0]), this.state.minimapToHeatmap(extent[1]))
	}

}


// Goes from minimap y pixels to cell index
const getMinimapToHeatmapScale = (cells, minimapCells) => {
	return scaleLinear().domain([0, (minimapCells.length - 1) * settings.minimapRowHeight])
				 .range([0, cells.length - 1])
}


const getMinimapCells = (allCells, height) => {
	const numRows = Math.floor(height / settings.minimapRowHeight)
	const everyNum = Math.ceil(allCells.length / numRows)

	return allCells.filter((cell, i) => (i % everyNum === 0))
}



// This definitely needs to be redone
const mapState = (state, ownProps) => ({
	cells: getCellSegments(state, getViewCells(state, ownProps.cellscape, "all_heatmap_order")),
	chromRanges: getChromRanges(state, ownProps.cellscape.id)
})

export default connect(mapState)(QCCellscape)