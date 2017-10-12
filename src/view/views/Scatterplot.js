import React, { Component } from 'react';
import PropTypes from 'prop-types'
import ScatterplotDot from './ScatterplotDot.js'
import {scaleLinear} from "d3-scale"
import Brush from './Brush.js'


// Presentational Component to draw Scatterplot
// !!! Make general (data instead of cells)

class Scatterplot extends Component {
  state = { extent: null } // Extent of brush: Array[ Array[x0, y0], Array[x1, y1] ]
  static propTypes = {
	cells: PropTypes.array.isRequired, // Data points Array[ {id: <String>, x: <Number>, y: <Number>} ]
	x: PropTypes.object.isRequired,    // x axis Object { id: <String>, min: <Number>, max: <Number> }
	y: PropTypes.object.isRequired     // y axis Object { id: <String>, min: <Number>, max: <Number> }
  }


  onBrush = (extent) => {
  	this.setState(prevState => ({ extent: extent }))
  }

  render() {
  	const { x, y, cells } = this.props
	let xScale = getScale(x.min, x.max, 0, 400)
	let yScale = getScale(y.min, y.max, 400, 0)

	let xAxis = x.id;
	let yAxis = y.id;

	return (
		<svg className="scatterplot" width="400" height="400">
			
			<Brush onBrush={this.onBrush}/>
			{cells.map(cell => 
				<ScatterplotDot
					key={cell.id}
					x={xScale(cell[xAxis])}
					y={yScale(cell[yAxis])}
					color="#0C7CA6"
					highlighted={isHighlighted(xScale(cell[xAxis]), yScale(cell[yAxis]), this.state.extent)}
				/>
			)}
		</svg>
	)

  }
}

// Determines whether cell (x, y position in pixels) is within extent
const isHighlighted = (x, y, extent) => {
	let highlighted = false
	if (extent) {
		highlighted = extent[0][0] <= x && x <= extent[1][0]
		&& extent[0][1] <= y &&  y <= extent[1][1]
	} 
	return highlighted
}

// Returns d3 linear scale, with some spacing on edges
const getScale = (dMin, dMax, rMin, rMax) => {
	let spacing = (dMax - dMin) * 0.1

	return scaleLinear().domain([dMin - spacing, dMax + spacing])
						 .range([rMin, rMax])
}

export default Scatterplot