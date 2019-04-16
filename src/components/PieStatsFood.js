import React from 'react'
import { connect } from 'react-redux'
import CanvasJSReact from '../canvasjs.react.js'
const CanvasJSChart = CanvasJSReact.CanvasJSChart
const CanvasJS = CanvasJSReact.CanvasJS

class PieStatsFood extends React.Component {
	render() {
		const options = {
			animationEnabled: true,
			theme: "light1", // "light1", "dark1", "dark2"
			title:{
				text: "Feeding Baby"
			},
			data: [{
				type: "pie",
				indexLabel: "{label}",
				startAngle: -90,
				dataPoints: [
					{ y: this.props.baby.feed, label: "Remembered to feed baby" },
					{ y: this.props.baby.feedMissed, label: "Forgot to feed baby" }
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

export default connect(mapStateToProps)(PieStatsFood)
