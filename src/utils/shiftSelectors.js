/**
 * Abstract function to shift selector state by slicer
 * @param {func} slicer - (any) => (any)
 * @param {object} selectors
 */
const shiftSelectors = (slicer, selectors) =>
	Object.keys(selectors).reduce((shiftedSelectors, currKey) => {
		const currSelector = selectors[currKey];

		return {
			...shiftedSelectors,
			[currKey]: state => currSelector(slicer(state))
		};
	}, {});

export default shiftSelectors;
