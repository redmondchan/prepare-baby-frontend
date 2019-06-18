import React from 'react'
import { connect } from 'react-redux'
import CanvasJSReact from '../canvasjs.react.js'
const CanvasJSChart = CanvasJSReact.CanvasJSChart
const CanvasJS = CanvasJSReact.CanvasJS

class PieStatsScenario extends React.Component {
	render() {
		const options = {
			animationEnabled: true,
			theme: "light1", // "light1", "dark1", "dark2"
			title:{
				text: "Scenario"
			},
			data: [{
				type: "pie",
				indexLabel: "{label}: {y}",
				startAngle: -90,
				dataPoints: [
					{ y: this.props.user.selffish, label: "Left" },
					{ y: this.props.user.selfless, label: "Stayed" }
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
		user: state.user
	}
}

export default connect(mapStateToProps)(PieStatsScenario)
