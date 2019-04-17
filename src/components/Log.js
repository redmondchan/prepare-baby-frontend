import React from 'react'
import { updateHp } from '../actions/actions'
import { createLog } from '../actions/actions'
import { getLogs } from '../actions/actions'

import { connect } from 'react-redux'

import { Grid, List, Segment, Button} from 'semantic-ui-react'

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
    let filteredLogs = Array.from(new Set(this.props.log))
    let actions = filteredLogs.map(action => {
      if(action.includes("Changed")){
        return <List.Item className="list-item"><List.Content>💩 {action}</List.Content></List.Item>
      }else if (action.includes("Fed")){
        return <List.Item className="list-item"><List.Content>🍼 {action}</List.Content></List.Item>
      }else if (action.includes("Hungry")){
        return <List.Item className="list-item"><List.Content>🤤 {action}</List.Content></List.Item>
      }else if (action.includes("pooped")){
        return <List.Item className="list-item"><List.Content>🤢 {action}</List.Content></List.Item>
      }else if (action.includes("Wasted")){
        return <List.Item className="list-item"><List.Content>💸 {action}</List.Content></List.Item>
      }else if (action.includes("Forced")){
        return <List.Item className="list-item"><List.Content>🤭 {action}</List.Content></List.Item>
      }
    })

    return(
      <div>
        <div className="logs">
          <Segment size={"medium"} className="log-list">
            <List className="log-list" divided relaxed>
            {actions}
            </List>
          </Segment>
        </div>
        <Grid className="action-buttons">
          <Grid.Row>
            <Button className="action-button" onClick={() => {this.props.createLog(this.props.baby, "feed"); this.props.updateHp(this.props.baby, "feed", 10)}}>Feed Me</Button>
          </Grid.Row>
          <Grid.Row>
            <Button className="action-button" onClick={() => {this.props.createLog(this.props.baby, "diaper"); this.props.updateHp(this.props.baby, "diaper", 10)}}>Change Diaper</Button>
          </Grid.Row>
        </Grid>
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
