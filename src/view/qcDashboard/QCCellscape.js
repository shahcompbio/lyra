import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getViewCells } from '../../state/reducers/cells.js'
import { getChromRanges } from '../../state/reducers/views.js'
import Minimap from './Minimap'
import QCHeatmap from './QCHeatmap'
import { scaleOrdinal, scaleLinear } from 'd3'


const settings = {
	maxHeight: 400,
	minimapRowHeight: 2,
	heatmapRowHeight: 7,

	minimapMaxWidth: 100,
	heatmapMaxWidth: 400,

	colorScale: scaleOrdinal()
					.domain([1,2,3,4,5,6,7]) // state
					.range(["#2e7aab", "#73a9d4", "#D6D5D5", "#fec28b", "#fd8b3a", "#ca632c", "#954c25"])


}


class QCCellscape extends Component {
	//state = this.getState(this.props.cells)
	constructor(props) {
		super(props);
		this.state = { heatmapStartIndex: 0 }
		// NOTE: Since constructor/mounting only occurs once, this will probably be a problem if you update props 
			// (i.e. once you add facades / resizing)
	}

	componentDidMount() {
		const { dispatch, cellscape } = this.props
		dispatch({ type: "LOAD_INIT_CELLSCAPE", viewID: cellscape.id })
	}

/*
	// Apparently setState will (may?) have some lag time, so may need to reconsider
	componentWillReceiveProps(nextProps) {
		this.setState(this.getState(nextProps.cells))
	}

	getState(cells) {
		const minimapCells = getMinimapCells(cells, settings.height)
		const minimapToHeatmap = getMinimapToHeatmapScale(cells, minimapCells)
		return { minimapCells, minimapToHeatmap }
	}
*/
	getOnBrush = (cells) => (minimapPixelToCellIndexScale) => (heatmapNumRows) => (extent) => {
		const maxIndex = cells.length - 1

		const i0 = Math.floor(minimapPixelToCellIndexScale(extent[0]))
		const setIndex = i0 > maxIndex - heatmapNumRows + 1 ? maxIndex - heatmapNumRows + 1 : i0
		console.log("state:", setIndex)
		this.setState({ heatmapStartIndex:  setIndex })
	}

	render() {
		const { cells, chromRanges } = this.props
		const { maxHeight, minimapRowHeight, heatmapRowHeight, minimapMaxWidth, heatmapMaxWidth } = settings

		if (!chromRanges) {
			return (<p>Loading</p>)
		}
		console.log("rendering cellscape with chrom ranges")
		const minimapMaxRows = getNumRows(maxHeight, minimapRowHeight)
		const minimapCells = getMinimapCells(cells, minimapMaxRows)
		const minimapHeight = getHeight(minimapCells, minimapRowHeight)

		const heatmapNumRows = getNumRows(maxHeight, heatmapRowHeight)
		const heatmapCells = getHeatmapCells(cells, this.state.heatmapStartIndex, heatmapNumRows)
		const heatmapHeight = getHeight(heatmapCells, heatmapRowHeight)

		const minimapPixelToCellIndexScale = getMinimapToCellScale(cells, minimapHeight - minimapRowHeight)

		const windowHeight = Math.floor(minimapPixelToCellIndexScale.invert(heatmapNumRows))
		const onBrush = this.getOnBrush(cells)(minimapPixelToCellIndexScale)(heatmapNumRows)

		return (
		<svg width={heatmapMaxWidth + minimapMaxWidth + 20} height={maxHeight}>
			<svg x={0} y={0} height={maxHeight} width={heatmapMaxWidth}>
				<QCHeatmap 
				
					cells={heatmapCells}
					chromRanges={chromRanges} 
					maxWidth={heatmapMaxWidth} 
					rowHeight={heatmapRowHeight}
					colorScale={settings.colorScale}
				/>
			</svg>

			<svg x={heatmapMaxWidth + 20} y={0} height={maxHeight} width={minimapMaxWidth}>
				<Minimap 
				
					cells={minimapCells} 
					chromRanges={chromRanges} 
					maxWidth={minimapMaxWidth} 
					rowHeight={minimapRowHeight}
					colorScale={settings.colorScale}
					onBrush={onBrush}
					windowHeight={windowHeight}
				/>
			</svg>
		</svg>
		)
						



	}





}

const getNumRows = (maxHeight, rowHeight) => (Math.floor(maxHeight / rowHeight))
const getHeight = (cells, rowHeight) => (cells.length * rowHeight)


const getMinimapCells = (cells, numRows) => {
	const everyNum = Math.ceil(cells.length / numRows)

	return cells.filter((cell, i) => (i % everyNum === 0))
}


const getHeatmapCells = (cells, startIndex, numRows) => {
	const endIndex = startIndex + numRows - 1

	return cells.filter((cell, i) => (startIndex <= i && i <= endIndex))
}


const getMinimapToCellScale = (cells, maxMinimapY) => (
	scaleLinear().domain([0, maxMinimapY])
				 .range([0, cells.length - 1])
)



// This definitely needs to be redone
const mapState = (state, ownProps) => ({
	cells: getViewCells(state, ownProps.cellscape, "all_heatmap_order"),
	chromRanges: getChromRanges(state, ownProps.cellscape.id)
})

export default connect(mapState)(QCCellscape)