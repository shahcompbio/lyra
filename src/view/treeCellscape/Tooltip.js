/**
* Tooltip - React Component
*/

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getTooltipText } from 'state/selectors/treeCellscape.js'
import ReactTooltip from 'react-tooltip'


const Tooltip = ({ cellID }) => (
	<ReactTooltip getContent={() => (<span>{cellID}</span>)}/>
)

	/**
	* PropTypes
	*/
	Tooltip.propTypes = {
		/** cellID */
		cellID: PropTypes.string
	}


/**
* MapState function
*/
const mapState = (state) => ({
	cellID: getTooltipText(state)
})

export default connect(mapState)(Tooltip)