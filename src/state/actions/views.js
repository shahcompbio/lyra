/*
	Actions for Views
	TODO: Will want to refactor and generalize more (one function for addView, and then mini-ones to build specific plots)
*/

export const types = {
	addScatterplot: "ADD_SCATTERPLOT"
}





// Add scatterplot
// TODO: should be able to specify x and y axes
let viewID = 1;

export const addScatterplot = () => ({
	type: types.addScatterplot,
	view: {
		id: viewID++,
		plot: "scatterplot",
		x: "mad_neutral_state",
		y: "MSRSI_non_integerness"
	}
})