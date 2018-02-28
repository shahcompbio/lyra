/*
	Dummy container just to listen to changes in redux store
*/


import React, { Component } from 'react';
import { connect } from 'react-redux'


class Listener extends Component {


	render() {
		return (<div></div>)
	}
}


const mapStateToProps = (state) => {
	console.log(state)
	return state
}


export default connect(mapStateToProps)(Listener)