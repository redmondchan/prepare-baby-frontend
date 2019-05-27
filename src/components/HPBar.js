import React from 'react'
import { Icon, Progress } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getStreak } from '../actions/actions'

class HPBar extends React.Component {

  render() {
    this.props.getStreak(this.props.baby.birthdate)
    return (
      <div className="hp-div">
        <div className="hp-text">
          <h1>Happiness Points: {this.props.baby.hp}<span className="streak"><Icon name="heartbeat"/> {this.props.getStreak(this.props.baby.birthdate)}               </span></h1>
        </div>
        <Progress percent={this.props.baby.hp} indicating progress className="hp-bar"/>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    baby: state.baby
  }
}

const mapDispatchToProps = (dispatch) => ({
  getStreak: (birthdate) => dispatch(getStreak(birthdate))
})

export default connect(mapStateToProps, mapDispatchToProps)(HPBar)
