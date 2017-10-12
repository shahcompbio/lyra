import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import QCView from './qcDashboard/QCView.js'
import { getViews } from '../state/reducers/views.js'


// React Component for the content side of Montage


// !!! Generalize to be any view
let Content = ({ views }) => {
	return (<div>
			{views.map(view => <QCView key={view.viewID} view={view}/>)}
			</div>)
}


const mapState = (state) => ({
	views: getViews(state)
})


Content.propTypes = {
	views: PropTypes.array.isRequired
}


export default connect(mapState)(Content)