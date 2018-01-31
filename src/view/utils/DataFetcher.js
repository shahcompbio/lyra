/**
* Data Fetcher - ABSTRACT React Component
*/

import { Component } from 'react'
import PropTypes from 'prop-types'




class DataFetcher extends Component {

	static propTypes = {
		/** render - function after data is fetched */
		render: PropTypes.func.isRequired,

		/** isDataMissing - function to check whether data has been fetched */
		isDataMissing: PropTypes.func.isRequired,

		/** fetchData - function to dispatch to fetch appropriate data */
		fetchData: PropTypes.func.isRequired
	}



	componentDidMount() {
		this.fetchIfMissingData(this.props)
	}


	shouldComponentUpdate(nextProps) {
		const { shouldComponentUpdate } = this.props
		return shouldComponentUpdate 
					? shouldComponentUpdate(this.props, nextProps)
					: true 
	}

	componentWillUpdate(nextProps) {
		this.fetchIfMissingData(nextProps)

	}


	fetchIfMissingData(props) {
		const { dispatch, isDataMissing, fetchData } = props

		if (isDataMissing(props)) {
			dispatch(fetchData(props))
		}
	}


	render() {
		const { isDataMissing, render } = this.props

		return isDataMissing(this.props) ? null : render(this.props)
	}
}

export default DataFetcher