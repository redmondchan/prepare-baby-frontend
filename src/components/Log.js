import React from 'react'
import { feedBaby } from '../actions/actions'
import { updateHp } from '../actions/actions'
import { decreaseHp } from '../actions/actions'
import { createLog } from '../actions/actions'
import { getLogs } from '../actions/actions'
import { changeDiaper} from '../actions/actions'

import { connect } from 'react-redux'

class Log extends React.Component {

  componentDidUpdate(){
    if(this.props.baby.feed_time !== null){
    let baby = this.props.baby
    let fedTime = this.props.baby.feed_time.split(':')
    let fedMins = (fedTime[0] * 60) + fedTime[1]
    let today = new Date()
    let time = today.getHours() + ":" + today.getMinutes()
    let currentTime = time.split(":")
    let currentMins = (currentTime[0] * 60) + currentTime[1]
    let date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()
    let difference = currentMins - fedMins
    if(difference > 1){
      let x = difference/1
      this.props.updateHp(baby, "timer", x)
    }
  }; this.props.getLogs(this.props.user)
  }

  render(){

  let updatingHp = () => {
    if(this.props.baby.feed_time !== null){
    let baby = this.props.baby
    let fedTime = this.props.baby.feed_time.split(':')
    let fedMins = (fedTime[0] * 60) + fedTime[1]
    let today = new Date()
    let time = today.getHours() + ":" + today.getMinutes()
    let currentTime = time.split(":")
    let currentMins = (currentTime[0] * 60) + currentTime[1]
    let date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear()
    let difference = currentMins - fedMins
    if(difference > 1){
      let x = difference/1
      this.props.updateHp(baby, "timer", x)
    }
  }
  }

  setInterval(updatingHp, 10000)

  var lastTime = (new Date()).getTime();

  setInterval(function() {
    var currentTime = (new Date()).getTime();
    if (currentTime > (lastTime + 2000*2)) {  // ignore small delays
      // Probably just woke up!
      console.log("wakeup")
      updateHp()
    }
    lastTime = currentTime;
  }, 2000);

    return(
      <div>
        <h1>Log</h1>
        <ul>
          {this.props.log.map(action => <li>{action}</li>)}
        </ul>
        <button onClick={() => {this.props.createLog(this.props.baby, "feed"); this.props.updateHp(this.props.baby, "feed", 10)}}>Feed Me</button>
        <button onClick={() => this.props.updateHp(this.props.baby, "diaper", 10)}>Change Diaper</button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  createLog: (baby, task) => dispatch(createLog(baby, task)),
  getLogs: (user) => dispatch(getLogs(user)),
  updateHp: (baby, task, num) => dispatch(updateHp(baby, task, num)),
  decreaseHp: (baby, task) => dispatch(decreaseHp(baby, task)),
  feedBaby: (baby) => dispatch(feedBaby(baby)),
  changeDiaper: () => dispatch(changeDiaper()),
})

const mapStateToProps = (state) => {
  return{
    log: state.log,
    baby: state.baby,
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Log)
