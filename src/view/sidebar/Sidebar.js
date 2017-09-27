import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addScatterplot } from '../../state/actions/views.js'





class Sidebar extends Component {
	static propTypes = {
		dispatch: PropTypes.func.isRequired
	}


	componentDidMount() { // Load config upon page load -  can only be done via Component 
		// !!! Move to app? Or separate React component?
		const { dispatch } = this.props
		dispatch({ type: "LOAD_PAGE" })
	}

	render() {
		return (
			<div className="sidebar">
			    <button onClick={() => this.props.dispatch(addScatterplot())}>Draw</button>
			</div>
		)
	}

}


Sidebar = connect()(Sidebar)

export default Sidebar