import React from 'react'
import HeatmapSegment from './HeatmapSegment'

const HeatmapRow = ({ data }) => {
	const y = data.y
	const height = data.height
	const segs = data.segs

	return (segs.map(seg => 
		(<HeatmapSegment x={seg.x} 
						 y={y} 
						width={seg.width} 
						height={height} 
						color={seg.color}
		/>))
	)
}

export default HeatmapRow