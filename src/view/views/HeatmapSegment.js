import React from 'react'

const HeatmapSegment = ({ x, y, width, height, color }) => (
	<rect width={width} height={height} x={x} y={y} fill={color}/>
)

export default HeatmapSegment