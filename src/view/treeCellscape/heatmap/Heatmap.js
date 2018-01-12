/**
* Heatmap -  React Component
*/


import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import DataFetcher from 'view/utils/DataFetcher'

import { getHeatmapSegData, getMissingSegIndices, getChromRanges, getHeatmapYScale, getChromPixelMapping, getBPRatio } from 'state/selectors/treeCellscape.js'
import { fetchSegs, fetchChromRanges } from 'state/actions/treeCellscape.js'
import HeatmapRow from './HeatmapRow'


import { heatmapConfig as config } from 'config/treeCellscape.js'
const { totalWidth, height } = config







/**
* Segment Data Fetcher
*/

const segIsDataMissing = (props) => {
	const { missingIndices } = props
	return missingIndices.length> 0
}


const segFetchData = (props) => {
	const { missingIndices } = props
	return fetchSegs(missingIndices)
}

const mapState = (state) => ({
	segs: getHeatmapSegData(state),
	missingIndices: getMissingSegIndices(state),
	yScale: getHeatmapYScale(state),
	chromMap: getChromPixelMapping(state),
	bpRatio: getBPRatio(state)
})

const HeatmapSegFetcher = connect(mapState)(DataFetcher)

	HeatmapSegFetcher.PropTypes = {
		/** segs - all segment records */
		segs: PropTypes.arrayOf(PropTypes.object).isRequired,

		/** missingIndices - all indices that are missing segment records*/
		missingIndices: PropTypes.arrayOf(PropTypes.number).isRequired,

		/** yScale */
		yScale: PropTypes.func.isRequired,

		/** chromMap - chromosome number to pixel start position mapping */
		chromMap: PropTypes.object.isRequired,

		/** bpRatio - base pair to pixel ratio */
		bpRatio: PropTypes.number.isRequired
	}





/**
* Chromosome Range Data Fetcher
*/

const chromIsDataMissing = (props) => {
	const { chromRanges } = props
	return chromRanges.length === 0
}

const chromFetchData = (props) => {
	return fetchChromRanges()
}


const chromMapState = (state) => ({
	chromRanges: getChromRanges(state)
})

const HeatmapChromFetcher = connect(chromMapState)(DataFetcher)

	HeatmapChromFetcher.PropTypes = {
		/** chromRanges - chromosome ranges in order of number */
		chromRanges: PropTypes.arrayOf(PropTypes.object)
	}





/**
* Heatmap function - passes render prop to HeatmapChromFetcher (and then to HeatmapSegFetcher)
*/
const Heatmap = () => {



	const segsRender = (props) => {
		const { segs, yScale, chromMap, bpRatio } = props

		return (
			<svg width={totalWidth} height={height} x={config['x']}>
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

	const chromRender = (props) => {
		return (<HeatmapSegFetcher render={segsRender} isDataMissing={segIsDataMissing} fetchData={segFetchData}/>)
	}

	return (
		<HeatmapChromFetcher render={chromRender} isDataMissing={chromIsDataMissing} fetchData={chromFetchData}/>
	)

}


export default Heatmap