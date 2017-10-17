import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { brushY } from 'd3-brush'
import { select, selectAll, mouse, event } from 'd3-selection'

class MinimapBrush extends Component {
	componentDidMount() { // svg node must be mounted before d3 can add brush, hence it needs to be a component
		this.createBrush()
	}

  static propTypes = {
	onBrush: PropTypes.func.isRequired,
	height: PropTypes.number.isRequired,
	windowHeight: PropTypes.number.isRequired
  }

  // Create brush after mounting
	createBrush() {
		const { onBrush, height, windowHeight } = this.props
		const node = this.node
		const plotBrush = brushY().extent([[0, 0], [100, height - 1]])
								.on("end", () => { if (event.sourceEvent && event.sourceEvent.type === "mouseup") {
									onBrush(event.selection)
								}
								  })
								

		const selection = select(node).append("g").attr("class", "brush")

		selection.call(plotBrush)
				 .call(plotBrush.move, [0, windowHeight])
				 .selectAll(".overlay")
    			.each(function(d) { d.type = "selection" })
    			.on("mousedown touchstart", () => { centerBrush(height - 1) })

		// Remove resizing ability
		selection.selectAll(".handle").remove()


		// Upon mouse click on minimap, recenter brush
		function centerBrush(maxY) {
			console.log("centerBrush")
			const mouseY = mouse(event.target)[1]

			const dy = windowHeight / 2

			const y0 = Math.floor(mouseY - dy)
			const y1 = Math.floor(mouseY + dy)
			selection.call(plotBrush.move, 
				y0 < 0 ? [0, windowHeight] :
				y1 > maxY ? [maxY - windowHeight, maxY] :
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