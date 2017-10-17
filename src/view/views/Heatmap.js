import React from 'react'
import HeatmapRow from './HeatmapRow.js'

const Heatmap = ({ data, chromMapping, bpRatio, width, rowHeight, colorScale}) => {
	const drawData = getDrawData(data, chromMapping, bpRatio, rowHeight, colorScale)

	return (drawData.map(datum => <HeatmapRow key={datum.id} data={datum}/>))
}



const getDrawData = (data, chromMapping, bpRatio, rowHeight, colorScale) => {
	let yShift = 0

	return data.map(datum => {
		const drawDatum = {
			id: datum.id,
			y: yShift,
			height: rowHeight,
			segs: getDrawSegs(datum.segs, chromMapping, bpRatio, colorScale)
		}
		yShift += rowHeight

		return drawDatum
	})
}



const getDrawSegs = (segs, chromMapping, bpRatio, colorScale) => {
	return segs.map(seg => ({
					x: getSegX(seg.chrom_number, seg.start, chromMapping, bpRatio),
					width: getSegWidth(seg.start, seg.end, bpRatio),
					color: colorScale(seg.state)
				})	
			).filter(seg => (seg.width > 0))
}

// Should refactor this a bit (not dependent on knowing chromosome structure).... LE SIGH
const getSegX = (chrom, start, chromMapping, bpRatio) => (
	Math.floor(start / bpRatio) + chromMapping[chrom].x
)


// Refactor please

const getChromWidth = (start, end, bpRatio) => (
	Math.floor((end - start + 1) / bpRatio)
)


const getSegWidth = (start, end, bpRatio) => (
	getChromWidth(start, end, bpRatio)
)

export default Heatmap