import React, { Component } from 'react'
import { connect } from 'react-redux'
import CanvasJSReact from '../canvasjs.react.js'
const CanvasJSChart = CanvasJSReact.CanvasJSChart
const CanvasJS = CanvasJSReact.CanvasJS


class Stats extends React.Component {

  render() {
    function toggleDataSeries(e) {
    	if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
    		e.dataSeries.visible = false;
    	}
    	else {
    		e.dataSeries.visible = true;
    	}
    	this.render();
    }

    console.log(this.props.baby)
    let baby = this.props.baby
    const options = {
      animationEnabled: true,
      title: {
        text: "Stats"
      },
      axisY: {
    		title: "Number of Times",
    		titleFontColor: "#4F81BC",
    		lineColor: "#4F81BC",
    		labelFontColor: "#4F81BC",
    		tickColor: "#4F81BC"
    	},
    	toolTip: {
    		shared: true
    	},
    	legend: {
    		cursor:"pointer",
    		itemclick: toggleDataSeries
    	},
    	data: [{
    		type: "column",
    		name: "Completed",
    		legendText: "Completed",
    		showInLegend: true,
    		dataPoints:[
    			{ label: "Feeding", y: baby.feed },
    			{ label: "Pooping", y: baby.diaper },
    			{ label: "Scenarios", y: baby.selfless }
    		]
    	},
    	{
    		type: "column",
    		name: "Missed",
    		legendText: "Missed",
    		axisYType: "secondary",
    		showInLegend: true,
    		dataPoints:[
    			{ label: "Feeding", y: baby.feedMissed },
    			{ label: "Pooping", y: baby.diaperMissed },
    			{ label: "Scenarios", y: baby.selffish }
    		]
    	}]
   }

   return (
      <div>
        <CanvasJSChart options = {options}
            /* onRef = {ref => this.chart = ref} */
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    baby: state.baby
  }
}

export default connect(mapStateToProps)(Stats)
