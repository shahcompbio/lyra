import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCellSegments } from '../../state/reducers/cells.js'
import Heatmap from '../views/Heatmap.js'


class QCHeatmap extends Component {
	componentDidMount() {
		this.fetchSegsIfNeeded(this.props)
	}

	componentWillReceiveProps(nextProps) {
		this.fetchSegsIfNeeded(nextProps)
	}


	shouldComponentUpdate(nextProps, nextState) {
		const nextMissingCells = getMissingSegCells(nextProps.cells)

		return nextMissingCells.length === 0
	}

	fetchSegsIfNeeded(props) {
		const { dispatch, cells } = props
		const missingCells = getMissingSegCells(cells)

		if (missingCells.length > 0){
			console.log("fetching heatmap cells:", missingCells.length)
			dispatch({
				type: "LOAD_MISSING_CELLS",
				cells: missingCells
			})
		}
	}


	render() {
		console.log("rendering heatmap")
		const { cells } = this.props
		const missingCells = getMissingSegCells(cells)

		if (missingCells.length > 0) {
			return (<svg></svg>)
		}

		const { chromRanges, maxWidth, rowHeight, colorScale, onBrush, windowHeight } = this.props

		const totalBP = getTotalBP(chromRanges)
		const bpRatio = getBPRatio(totalBP, maxWidth)
		const chromMapping = getChromPixelMapping(chromRanges, bpRatio)
		const width = getWidth(chromMapping)
		const height = cells.length * rowHeight


		return (<svg width={width} height={height}>
				<Heatmap data={cells} 
						chromMapping={chromMapping}
						bpRatio={bpRatio}
						width={width}
						rowHeight={rowHeight}
						colorScale={colorScale}
					/>
			</svg>)
	}
}




const getMissingSegCells = (cells) => (
	cells.filter(cell => (!cell.hasOwnProperty("segs")))
)


const getTotalBP = (chromRanges) => (chromRanges.reduce((sum, chrom) => (sum + chrom.end - chrom.start + 1), 0))
const getBPRatio = (totalBP, width) => (Math.ceil(totalBP / width))

const getChromPixelMapping = (chromRanges, bpRatio) => {
	let xShift = 0
	return chromRanges.reduce((chromMap, chrom) => {
		const chromWidth = getChromWidth(chrom.start, chrom.end, bpRatio)
		const mapEntry = {
			x: xShift,
			width: chromWidth
		}
		xShift += chromWidth

		return { ...chromMap, [chrom.chrom]: mapEntry }
	}, {})
}

const getWidth = (chromMapping) => {
	let width = 0
	for (const [key, value] of Object.entries(chromMapping)) {
		width += value.width
	}
	return width
}


const getChromWidth = (start, end, bpRatio) => (
	Math.floor((end - start + 1) / bpRatio)
)

const mapState = (state, ownProps) => ({
	cells: getCellSegments(state, ownProps.cells)
})


export default connect(mapState)(QCHeatmap)