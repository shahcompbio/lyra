import React from 'react'
import Heatmap from '../views/Heatmap.js'
import MinimapBrush from './MinimapBrush.js'


// Minimap for Cellscape heatmap
// Assues that all parameters have the right things... (ie )
// !!! Condense number of props to have settings (for things like width/height)
const Minimap = ({cells, chromRanges, width, rowHeight, colorScale, onBrush}) => {
	const height = cells.length * rowHeight
	return (<svg width={width} height={height}>
				<Heatmap data={cells} 
						chromRanges={chromRanges}
						width={width}
						rowHeight={rowHeight}
						colorScale={colorScale}
					/>
				<MinimapBrush onBrush={onBrush} height={height}/>
			</svg>)
}


export default Minimap