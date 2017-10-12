import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { brushY } from 'd3-brush'
import { select, selectAll, mouse, event } from 'd3-selection'

class MinimapBrush extends Component {
	componentDidMount() { // svg node must be mounted before d3 can add brush, hence it needs to be a component
		this.createBrush()
	}

  static propTypes = {
	onBrush: PropTypes.func.isRequired
  }

  // Create brush after mounting
	createBrush() {
		const node = this.node
		const plotBrush = brushY().extent([[0, 0], [100, this.props.height - 1]])
								.on("end", () => { this.props.onBrush(event.selection) })

		const selection = select(node).append("g").attr("class", "brush")

		selection.call(plotBrush)
				 .call(plotBrush.move, [0, 11])
				 .selectAll(".overlay")
    			.each(function(d) { d.type = "selection" })
    			.on("mousedown touchstart", () => { centerBrush(this.props.height - 1) })

		// Remove resizing ability
		selection.selectAll(".handle").remove()


		// Upon mouse click on minimap, recenter brush
		function centerBrush(maxY) {
			const mouseY = mouse(event.target)[1]

			const dy = 11 / 2

			const y0 = Math.floor(mouseY - dy)
			const y1 = Math.floor(mouseY + dy)
			selection.call(plotBrush.move, 
				y0 < 0 ? [0, 11] :
				y1 > maxY ? [maxY - 11, maxY] :
				[y0, y1]
			)
		}
	}
 



	render() {
		const { height } = this.props
		return <svg ref={node => (this.node = node)} width="100" height={height}/>
	}
}

export default MinimapBrush