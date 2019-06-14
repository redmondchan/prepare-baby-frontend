import React from 'react'
import { connect } from 'react-redux'
import CanvasJSReact from '../canvasjs.react.js'
const CanvasJSChart = CanvasJSReact.CanvasJSChart
const CanvasJS = CanvasJSReact.CanvasJS

class PieStatsCost extends React.Component {
	render() {
		const options = {
			animationEnabled: true,
			theme: "light1", // "light1", "dark1", "dark2"
			title:{
				text: "Expenses"
			},
			data: [{
				type: "pie",
				indexLabel: "{label}: ${y}",
				startAngle: -90,
				dataPoints: [
					{ y: this.props.baby.feedMoney * 1.5, label: "Food Cost" },
					{ y: this.props.baby.diaperMoney * 0.30, label: "Diaper Cost" }
				]
			}]
		}

		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

const mapStateToProps = (state) => {
	return{
		baby: state.baby
	}
}

export default connect(mapStateToProps)(PieStatsCost)
