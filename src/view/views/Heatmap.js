import React from 'react'
import HeatmapRow from './HeatmapRow.js'

const Heatmap = ({ data, chromRanges, width, rowHeight, colorScale}) => {
	const bpRatio = getBPRatio(chromRanges, width)
	const chromMapping = getChromPixelMapping(chromRanges, bpRatio)

	const drawData = getDrawData(data, chromMapping, bpRatio, rowHeight, colorScale)

	return (drawData.map(datum => <HeatmapRow key={datum.id} data={datum}/>))
}





const getBPRatio = (chromRanges, width) => {

	const totalBP = chromRanges.reduce((sum, chrom) => {
		return sum + chrom.end - chrom.start + 1
	}, 0)

	return Math.ceil(totalBP / width)
}

const getChromPixelMapping = (chromRanges, bpRatio) => {
	let xShift = 0
	return chromRanges.reduce((chromMap, chrom) => {
		const chromWidth = getChromWidth(chrom.start, chrom.end, bpRatio)
		const mapEntry = {
			x: xShift,
			width: chromWidth
		}
		xShift += chromWidth

		return { ...chromMap, [chrom.chrom]: mapEntry }
	}, {})
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
	)
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