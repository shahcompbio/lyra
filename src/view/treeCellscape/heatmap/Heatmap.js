/**
* Heatmap -  React Component
*/


import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getAllHeatmapSegData, getMissingSegIndices, getChromRanges } from 'state/selectors/treeCellscape.js'
import { fetchSegs, fetchChromRanges } from 'state/actions/treeCellscape.js'



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

	const render = (segs, missingIndices) => {
		console.log(segs)
		return null
	}

	const chromRender = () => {
		console.log("Hey I'm rendering a thing")
		return (<HeatmapSegFetcher render={render}/>)
	}

	return (
		<HeatmapChromFetcher render={chromRender}/>
	)

}


export default Heatmap