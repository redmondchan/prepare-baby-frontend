import React from 'react'
import { feedBaby } from '../actions/actions'
import { updateHp } from '../actions/actions'
import { changeDiaper} from '../actions/actions'

import { connect } from 'react-redux'

class Log extends React.Component {
  render(){
    return(
      <div>
        <h1>Log</h1>
        <ul>
          {this.props.log.map(action => <li>{action}</li>)}
        </ul>
        <button onClick={() => this.props.updateHp(this.props.baby)}>Feed Me</button>
        <button onClick={() => this.props.updateHp(this.props.baby)}>Change Diaper</button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateHp: (baby) => dispatch(updateHp(baby)),
  feedBaby: (baby) => dispatch(feedBaby(baby)),
  changeDiaper: () => dispatch(changeDiaper())
})

const mapStateToProps = (state) => {
  return{
    log: state.log,
    baby: state.baby
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Log)
