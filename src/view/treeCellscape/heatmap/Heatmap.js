/**
* Heatmap -  React Component
*/


import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getHeatmapIDs, getMissingSegIndices } from 'state/selectors/treeCellscape.js'



class HeatmapSegFetcher extends Component {


	render() {
		const { render, allIDs, missingIndices } = this.props

		return render(allIDs, missingIndices)
	}

}

const mapState = (state) => ({
	allIDs: getHeatmapIDs(state),
	missingIndices: getMissingSegIndices(state) 
})

HeatmapSegFetcher = connect(mapState)(HeatmapSegFetcher)











const Heatmap = () => {
	const render = (ids, missingIndices) => {
		console.log(ids)
		console.log(missingIndices)
		return null
	}

	return (
		<HeatmapSegFetcher render={render}/>
	)
}


export default Heatmap