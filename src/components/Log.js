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

  intervalId = 0

  componentDidMount(){
    let updatingHp = () => {
        let baby = this.props.baby
        let currentDate = Math.floor(new Date().getTime()/60000)
        let hungryOldDate = Math.floor((new Date(this.props.baby.hungry_time).getTime())/60000)
        let dirtyOldDate = Math.floor(new Date(this.props.baby.dirty_time).getTime()/60000)
        // converting milliseconds to minutes
        let hungryDifference = (currentDate - hungryOldDate)
        let dirtyDifference = (currentDate - dirtyOldDate)
        if(hungryDifference >= 180 && dirtyDifference >= 150){
          let num1 = Math.floor(hungryDifference/180)
          let num2 = Math.floor(dirtyDifference/150)
          this.props.updateHp(baby, "hungry", num1).then( () => this.props.updateHp(baby, "dirty", num2))
          this.props.createLog(this.props.baby, "hungry").then( () => this.props.createLog(this.props.baby, "dirty"))
        }else if (hungryDifference >= 180){
          let num = Math.floor(hungryDifference/180)
          this.props.updateHp(baby, "hungry", num)
          this.props.createLog(this.props.baby, "hungry")
        }else if(dirtyDifference >= 150){
          let num = Math.floor(dirtyDifference/150)
          this.props.updateHp(baby, "dirty", num)
          this.props.createLog(this.props.baby, "dirty")
        }
      };

    this.intervalId = setInterval(updatingHp, 5000)
  }

  componentWillUnmount(){
    clearInterval(this.intervalId)
  }


  render(){
    let filteredLogs = Array.from(new Set(this.props.log)).reverse()
    let actions = filteredLogs.map(action => {
      if(action.includes("Changed")){
        return <List.Item className="list-item"><List.Content><span role="img" aria-label="poop">💩</span> {action}</List.Content></List.Item>
      }else if (action.includes("Fed")){
        return <List.Item className="list-item"><List.Content><span role="img" aria-label="baby bottle">🍼</span> {action}</List.Content></List.Item>
      }else if (action.includes("Hungry")){
        return <List.Item className="list-item"><List.Content><span role="img" aria-label="poop">🤤</span> {action}</List.Content></List.Item>
      }else if (action.includes("pooped")){
        return <List.Item className="list-item"><List.Content><span role="img" aria-label="green nauseous face">🤢</span> {action}</List.Content></List.Item>
      }else if (action.includes("Wasted")){
        return <List.Item className="list-item"><List.Content><span role="img" aria-label="money flying away">💸</span> {action}</List.Content></List.Item>
      }else if (action.includes("Forced")){
        return <List.Item className="list-item"><List.Content><span role="img" aria-label="hand covering mouth">🤭</span> {action}</List.Content></List.Item>
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
            <Button className="action-button" onClick={() => {this.props.createLog(this.props.baby, "feed"); this.props.updateHp(this.props.baby, "feed")}}>Feed Me</Button>
          </Grid.Row>
          <Grid.Row>
            <Button className="action-button" onClick={() => {this.props.createLog(this.props.baby, "diaper"); this.props.updateHp(this.props.baby, "diaper")}}>Change Diaper</Button>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  createLog: (baby, task) => dispatch(createLog(baby, task)),
  getLogs: (user) => dispatch(getLogs(user)),
  updateHp: (baby, task, num) => dispatch(updateHp(baby, task, num))
})

const mapStateToProps = (state) => {
  return{
    log: state.log,
    baby: state.baby,
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Log)
