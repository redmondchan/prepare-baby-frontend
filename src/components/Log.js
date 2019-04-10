import React from 'react'
import { updateHp } from '../actions/actions'
import { createLog } from '../actions/actions'
import { getLogs } from '../actions/actions'

import { connect } from 'react-redux'

class Log extends React.Component {

  state = {
    logs: false
  }

  componentDidMount(){
    let updatingHp = () => {
      let baby = this.props.baby
      let currentDate = Math.floor(new Date().getTime()/60000)
      let hungryOldDate = Math.floor((new Date(this.props.baby.hungry_time).getTime())/60000)
      let dirtyOldDate = Math.floor(new Date(this.props.baby.dirty_time).getTime()/60000)
      // converting milliseconds to minutes
      let hungryDifference = (currentDate - hungryOldDate)
      let dirtyDifference = (currentDate - dirtyOldDate)
      // console.log(`hungryDifference : ${hungryDifference}`, "current Date:", new Date(currentDate * 60000), "hungryOldDate:", new Date(hungryOldDate * 60000))
      // console.log(`hungryDifference : ${dirtyDifference}`, "current Date:", new Date(currentDate * 60000), "dirtyOldDate:", new Date(dirtyOldDate * 60000))
      if(hungryDifference > 2){
        let x = hungryDifference/1
        console.log(`hungryDifference : ${hungryDifference}`, "current Date:", new Date(currentDate * 60000), "hungryOldDate:", new Date(hungryOldDate * 60000))
        this.props.updateHp(baby, "hungry", x)
        this.props.createLog(this.props.baby, "hungry")
      }
      if(dirtyDifference > 1){
        let x = dirtyDifference/1
        console.log(`hungryDifference : ${dirtyDifference}`, "current Date:", new Date(currentDate * 60000), "dirtyOldDate:", new Date(dirtyOldDate * 60000))
        this.props.updateHp(baby, "dirty", x)
        this.props.createLog(this.props.baby, "dirty")
      }
    };

    setInterval(updatingHp, 10000)

    let lastTime = (new Date()).getTime();
    setInterval(function() {
      let currentTime = (new Date()).getTime();
      if (currentTime > (lastTime + 2000*2)) {  // ignore small delays
        // Probably just woke up!
        console.log("wakeup")
        updatingHp()
      }
      lastTime = currentTime;
    }, 2000);

  }


  render(){
    return(
      <div>
        <h1>Log</h1>
        <div className='baby-log'>
          <ul>
            {this.props.log.map(action => <li>{action}</li>)}
          </ul>
        </div>
        <button onClick={() => {this.props.createLog(this.props.baby, "feed"); this.props.updateHp(this.props.baby, "feed", 10)}}>Feed Me</button>
        <button onClick={() => {this.props.createLog(this.props.baby, "diaper"); this.props.updateHp(this.props.baby, "diaper", 10)}}>Change Diaper</button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  createLog: (baby, task) => dispatch(createLog(baby, task)),
  getLogs: (user) => dispatch(getLogs(user)),
  updateHp: (baby, task, num) => dispatch(updateHp(baby, task, num)),
})

const mapStateToProps = (state) => {
  return{
    log: state.log,
    baby: state.baby,
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Log)
