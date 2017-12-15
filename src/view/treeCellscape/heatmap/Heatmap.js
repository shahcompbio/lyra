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

class HeatmapSegFetcher extends Component {

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





class HeatmapChromFetcher extends Component {
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






const Heatmap = () => {

	const render = (segs, yScale, chromMap, bpRatio) => {
		console.log(segs)
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