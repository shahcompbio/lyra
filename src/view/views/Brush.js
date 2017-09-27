import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { brush } from 'd3-brush'
import { select, event } from 'd3-selection'

class Brush extends Component {
	componentDidMount() { // svg node must be mounted before d3 can add brush, hence it needs to be a component
		this.createBrush()
	}

  static propTypes = {
	onBrush: PropTypes.func.isRequired
  }

  // Create brush after mounting
	createBrush() {
		const node = this.node
		const plotBrush = brush().on("brush", () => {this.props.onBrush(event.selection)})
								 .on("end", () => { brushEnd() })

		const selection = select(node).append("g").attr("class", "brush")


		selection.call(plotBrush)


		// !!! Buggy with multiple brushes... I suspect it is the select
		function brushEnd() {
			if(!event.selection) return; // prevents infinite loop when clearing
			console.log("Make facade")
			console.log(event.selection)
			select(".brush").call(plotBrush.move, null)
		}
	}
 


	render() {
		return <svg ref={node => (this.node = node)} width="400" height="400"/>
	}
}

export default Brush