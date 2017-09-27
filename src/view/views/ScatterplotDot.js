import React from 'react'
import PropTypes from 'prop-types'

const ScatterplotDot = ({x, y, color, highlighted}) => (
	<circle 
		cx={x}
		cy={y}
		r={4}
		fill= { highlighted ? "#f3e910" : color }
	/>
)


ScatterplotDot.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	color: PropTypes.string.isRequired,
	highlighted: PropTypes.bool.isRequired
}

export default ScatterplotDot