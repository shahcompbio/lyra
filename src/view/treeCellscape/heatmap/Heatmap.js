/**
* Heatmap -  React Component
*/


import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getAllHeatmapSegData, getMissingSegIndices, getChromRanges, getHeatmapYScale, getChromPixelMapping, getBPRatio } from 'state/selectors/treeCellscape.js'
import { fetchSegs, fetchChromRanges } from 'state/actions/treeCellscape.js'
import HeatmapRow from './HeatmapRow'


import { heatmapConfig as config } from 'config/treeCellscape.js'
const { width, height } = config



/**
* HeatmapSegFetcher
*/
class HeatmapSegFetcher extends Component {
	static propTypes = {
		/** segs - segment data for all cells*/
		segs: PropTypes.array.isRequired,

		/** missingIndices - all indices that are missing segment data*/
		missingIndices: PropTypes.array.isRequired,

		/** yScale */
		yScale: PropTypes.func,

		/** chromMap - chromosome to pixel start map */
		chromMap: PropTypes.object,

		/** bpRatio - base pair to pixel ratio */
		bpRatio: PropTypes.number,

		/** render */
		render: PropTypes.func.isRequired
	}


	componentDidMount() {
		this.fetchIfMissing(this.props)
	}

	/*shouldComponentUpdate(nextProps, nextState) {
		return nextProps.missingIndices.length !== this.props.missingIndices.length

	}*/
	

	componentWillUpdate(nextProps, nextState) {
		this.fetchIfMissing(nextProps)
	}


	fetchIfMissing(props) {
		const { dispatch, missingIndices } = props
		if (missingIndices.length > 0) {
			dispatch(fetchSegs(missingIndices))
		}
	}

	render() {
		const { render, missingIndices, segs, yScale, chromMap, bpRatio } = this.props
		return missingIndices.length > 0 ? null : render(segs, yScale, chromMap, bpRatio)
	}

}

const mapState = (state) => ({
	segs: getAllHeatmapSegData(state),
	missingIndices: getMissingSegIndices(state),
	yScale: getHeatmapYScale(state),
	chromMap: getChromPixelMapping(state),
	bpRatio: getBPRatio(state)
})

HeatmapSegFetcher = connect(mapState)(HeatmapSegFetcher)




/**
* HeatmapChromFetcher
*/
class HeatmapChromFetcher extends Component {
	static propTypes = {
		/** chromRanges */
		chromRanges: PropTypes.array,

		/** render */
		render: PropTypes.func.isRequired
	}


	componentDidMount() {
		this.fetchIfMissing(this.props)
	}


	fetchIfMissing(props) {
		const { dispatch, chromRanges } = props
		if (chromRanges.length === 0) {
			dispatch(fetchChromRanges())
		}
	}

	render() {
		const { render, chromRanges } = this.props

		return chromRanges.length === 0 ? (null) : render()
	}
}

const chromMapState = (state) => ({
	chromRanges: getChromRanges(state)
})

HeatmapChromFetcher = connect(chromMapState)(HeatmapChromFetcher)





/**
* Heatmap function - passes render prop to HeatmapChromFetcher (and then to HeatmapSegFetcher)
*/
const Heatmap = () => {

	const render = (segs, yScale, chromMap, bpRatio) => {
		return (
			<svg width={width} height={height} x={config.x}>
				{segs.map(rowData => 
					<HeatmapRow key={rowData['cellID']}
								rowData={rowData} 
								yScale={yScale} 
								chromMap={chromMap} 
								bpRatio={bpRatio}
					/>)}
			</svg>
		)
	}

	const chromRender = () => {
		return (<HeatmapSegFetcher render={render}/>)
	}

	return (
		<HeatmapChromFetcher render={chromRender}/>
	)

}


export default Heatmap