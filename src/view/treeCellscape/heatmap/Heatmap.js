/**
* Heatmap -  React Component
*/


import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getHeatmapIDs, getMissingHeatmapSegIDs } from 'state/selectors/treeCellscape.js'



class HeatmapSegFetcher extends Component {


	render() {
		const { render, allIDs } = this.props

		return render(allIDs)
	}

}

const mapState = (state) => ({
	allIDs: getHeatmapIDs(state)
	//missingIDs: getMissingHeatmapSegIDs(state) 
})

HeatmapSegFetcher = connect(mapState)(HeatmapSegFetcher)











const Heatmap = () => {
	const render = (ids) => {
		console.log(ids)
		return null
	}

	return (
		<HeatmapSegFetcher render={render}/>
	)
}


export default Heatmap