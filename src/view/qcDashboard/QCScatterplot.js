// Container Component to create Scatterplot for QC Dashboard



import { connect } from 'react-redux'
import Scatterplot from '../views/Scatterplot.js'
import { getAxisData } from '../../state/reducers/fields.js'
import { getViewCells } from '../../state/reducers/cells.js'






const mapState = (state, ownProps) => ({
	cells: getViewCells(state, ownProps.scatterplot),
	x: getAxisData(ownProps.scatterplot, state, "x"),
	y: getAxisData(ownProps.scatterplot, state, "y")
})




export default connect(mapState)(Scatterplot)