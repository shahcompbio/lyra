/**
* Selectors for heatmap drawing
*/

import { createSelector } from 'reselect'
import { treeConfig as config, heatmapConfig } from 'config/treeCellscape.js'
import { scalePoint } from 'd3'

import { getIndicesPerRow, getTotalIndexNum } from './utils.js'

import { stateSelectors } from 'state/reducers/index.js'

const {
	segsDataSelector,
	chromosomesOrderSelector,
	chromosomesDataSelector,
	indexToIDSelector
} = stateSelectors

/******************************************
* STATE TREE SELECTORS
*******************************************/

const getSegsData = segsDataSelector
const getChromOrder = chromosomesOrderSelector
const getChromData = chromosomesDataSelector
const getIndexToIDMapping = indexToIDSelector





/******************************************
* DATA SELECTORS
*******************************************/


/**
* Gets list of indices to display on heatmap
*/
const getHeatmapIDs = createSelector(
	[ getIndicesPerRow, getTotalIndexNum ],
	(indPerRow, totalIndices) => {
		const numRows = Math.floor( totalIndices / indPerRow )

		const ids = Array.from(Array(numRows), (_, x) => (x * indPerRow))

		return ids
	}
)



/**
* Gets heatmap segment if it exists
*/
export const getAllHeatmapSegData = createSelector(
	[ getHeatmapIDs, getSegsData ],
	(indices, segs) => (
		indices.filter(index => segs.hasOwnProperty(index))
		       .map(index => createSegment(segs[index], index))
	)
)

const createSegment = (seg, index) => ({
	cellID: seg[0]['cellID'],
	heatmapIndex: index,
	segs: seg
})




/**
* Gets list of indices that are to displayed on heatmap but do not have segment data in store
*/
export const getMissingSegIndices = createSelector(
	[ getHeatmapIDs, getSegsData ],
	(indices, segs) => (
		indices.filter((index) => (!segs.hasOwnProperty(index)))
	)

)



/**
* Returns list of cellIDs given list of heatmap indices
*/
export const getIDsByIndex = createSelector(
	[ getIndexToIDMapping, (state, indices) => (indices) ],
	(indexToIDs, indices) => (
		indices.map((index) => (indexToIDs[index]))
	)
)

/**
* Filters for indices that do not have a cellID mapping yet
*/
export const getMissingIDMappings = createSelector(
	[ getIndexToIDMapping, (state, indices) => (indices) ],
	(indexToIDs, indices) => (
		indices.filter((index) => !indexToIDs.hasOwnProperty(index))
	)
)



/**
* Gets chromosome range data in order
*/
export const getChromRanges = createSelector(
	[ getChromOrder, getChromData ],
	(order, data) => (
		order.map((chrom) => data[chrom])
	)
)


/******************************************
* DRAWING SELECTORS
*******************************************/

/**
* Gets the heatmap (index) to pixel y scale
*/
export const getHeatmapYScale = createSelector(
	[ getHeatmapIDs ],
	(ids) => (scalePoint().domain(ids)
						  .range([0, ids.length * config.heatmapRowHeight]))
)




/**
* Gets the total number of base pairs in chromosome ranges
*/
const getTotalBP = createSelector(
	[ getChromRanges ],
	(chromosomes) => (
		chromosomes.reduce((sum, chrom) => (sum + chrom.end - chrom.start + 1), 0)
	)
)

/**
* Gets the base pair to pixel ratio
*/
export const getBPRatio = createSelector(
	[ getTotalBP ],
	(totalBP) => (
		Math.ceil(totalBP / heatmapConfig.width)
	)
)




/******************************************
* CHROMOSOME RANGES SELECTORS
*******************************************/







/**
* Gets the chromosome to start pixel mapping
*/
export const getChromPixelMapping = createSelector(
	[ getChromRanges, getBPRatio ],
	(chromosomes, bpRatio) => {
		let xShift = 0
		return chromosomes.reduce((map, chrom) => {
			const chromWidth = getChromWidth(chrom, bpRatio)

			const mapEntry = {
				x: xShift,
				width: chromWidth
			}

			xShift += chromWidth

			return {
				...map,
				[chrom.chrom]: mapEntry
			}
		}, {})
	}
)


/**
* Returns the width (in pixels) for chromosome
*/
const getChromWidth = (chrom, bpRatio) => (Math.floor((chrom.end - chrom.start + 1) / bpRatio))


