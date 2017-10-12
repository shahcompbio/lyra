import React from 'react'
import QCScatterplot from './QCScatterplot'
import QCCellscape from './QCCellscape'



const QCView = ({ view }) => {
	const plotType = view.plot

	let plotJSX = null
	plotType === "scatterplot" ? plotJSX = <QCScatterplot scatterplot={view}/> : 
	plotType === "cellscape"   ? plotJSX = <QCCellscape cellscape={view}/> :
								plotJSX = null

	return plotJSX
}


export default QCView