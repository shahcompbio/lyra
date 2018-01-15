/**
* Tooltip - React Component
*/

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getHighlightedCellID } from 'state/selectors/treeCellscape.js'
import ReactTooltip from 'react-tooltip'


const Tooltip = ({ cellID }) => (
	<ReactTooltip getContent={() => (<span>{cellID}</span>)}/>
)


const mapState = (state) => ({
	cellID: getHighlightedCellID(state)
})

export default connect(mapState)(Tooltip)