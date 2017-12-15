/**
* HeatmapRow presentational component
*/

import React from 'react'
import { treeConfig as config, heatmapConfig } from 'config/treeCellscape.js'




const HeatmapRow = ({ rowData, yScale, chromMap, bpRatio }) => {
	const { heatmapIndex, segs } = rowData

	return (<g>{segs.map(seg => <rect key={rowData['cellID'] + "-" + seg['chromosome'] + "-" + seg['start']} 
								  width={getSegWidth(seg, bpRatio)} 
								  height={config.heatmapRowHeight}
								  x={getSegX(seg, chromMap, bpRatio)}
								  y={yScale(heatmapIndex)}
								  fill={heatmapConfig.colorScale(seg.state)}/>)}
		</g>)
}

const getSegX = (seg, chromMap, bpRatio) => (
	Math.floor(seg.start / bpRatio) + chromMap[seg.chromosome].x
)


const getSegWidth = (seg, bpRatio) => (
	Math.floor((seg.end - seg.start + 1) / bpRatio)
)

export default HeatmapRow