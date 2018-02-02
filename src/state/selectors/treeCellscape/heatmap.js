/**
* Selectors for heatmap drawing
*/

import { createSelector } from 'reselect'
import { heatmapConfig } from 'config/treeCellscape.js'
import { scalePoint } from 'd3'

import { getIndicesPerRow, getTotalIndexNum, getIndicesPerPixel, getTreeRootRecord } from './utils.js'

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
	[ getIndicesPerRow, getTotalIndexNum, getTreeRootRecord ],
	// (int, int) => array
	(indPerRow, totalIndices, treeRoot) => {
		const numRows = Math.floor( totalIndices / indPerRow )

		console.log(numRows, totalIndices, indPerRow)

		const ids = Array.from(Array(numRows), (_, x) => ((x * indPerRow) + treeRoot['heatmapIndex']))

		return ids
	}
)



/**
* Gets all segment records for heatmap indices that are displayed and currently have data
*/
export const getHeatmapSegData = createSelector(
	[ getHeatmapIDs, getSegsData ],
	// (array, object) => array
	(indices, segs) => (
		indices.filter(index => segs.hasOwnProperty(index))
		       .map(index => createSegment(segs[index], index))
	)
)


/**
* Creates record given segment data and heatmap index
* @param {array} seg
* @param {int} index
* @return {object}
*/
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
	// (array, object) => array
	(indices, segs) => (
		indices.filter((index) => (!segs.hasOwnProperty(index)))
	)

)



/******************************************
* INDEX -> ID MAPPING SELECTORS
*******************************************/



/**
* Returns list of cellIDs given list of heatmap indices
*/
export const getIDsByIndex = createSelector(
	[ getIndexToIDMapping, (state, indices) => (indices) ],
	// (array, array) => array
	(indexToIDs, indices) => (
		indices.map((index) => (indexToIDs[index]))
	)
)

/**
* Filters for indices that do not have a cellID mapping yet
*/
export const getMissingIDMappings = createSelector(
	[ getIndexToIDMapping, (state, indices) => (indices) ],
	// (array, array) => array
	(indexToIDs, indices) => (
		indices.filter((index) => !indexToIDs.hasOwnProperty(index))
	)
)






/******************************************
* DRAWING SELECTORS
*******************************************/



/**
* Gets chromosome range data in order
*/
export const getChromRanges = createSelector(
	[ getChromOrder, getChromData ],
	// (array, object) => array
	(order, data) => (
		order.map((chrom) => data[chrom])
	)
)



/**
* Gets the heatmap (index) to pixel y scale
*/
export const getYScale = createSelector(
	[ getHeatmapIDs ],
	// array => func
	(ids) => (scalePoint().domain(ids)
						  .range([0, ids.length * heatmapConfig['rowHeight']]))
)




/**
* Gets the total number of base pairs in chromosome ranges
*/
const getTotalBP = createSelector(
	[ getChromRanges ],
	// array => int
	(chromosomes) => (
		chromosomes.reduce((sum, chrom) => (sum + chrom.end - chrom.start + 1), 0)
	)
)

/**
* Gets base pair to pixel ratio
*/
export const getBPRatio = createSelector(
	[ getTotalBP ],
	// int => int
	(totalBP) => (
		Math.ceil(totalBP / heatmapConfig['contentWidth'])
	)
)








/**
* Gets the chromosome to start pixel mapping
*/
export const getChromPixelMapping = createSelector(
	[ getChromRanges, getBPRatio ],
	// (array, int) => object
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
* @param {object} chrom - data
* @param {int} bpRatio
* @return {int}
*/
const getChromWidth = (chrom, bpRatio) => (Math.floor((chrom.end - chrom.start + 1) / bpRatio))


