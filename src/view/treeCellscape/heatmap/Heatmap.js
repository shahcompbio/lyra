/**
* Heatmap -  React Component
*/


import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getAllHeatmapSegData, getMissingSegIndices } from 'state/selectors/treeCellscape.js'
import { fetchSegs } from 'state/actions/treeCellscape.js'



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
		const { render, segs, missingIndices } = this.props
		return render(segs, missingIndices)
	}

}

const mapState = (state) => ({
	segs: getAllHeatmapSegData(state),
	missingIndices: getMissingSegIndices(state) 
})

HeatmapSegFetcher = connect(mapState)(HeatmapSegFetcher)







const Heatmap = () => {
	const render = (segs, missingIndices) => {
		console.log(segs)
		return null
	}

	return (
		<HeatmapSegFetcher render={render}/>
	)
}


export default Heatmap