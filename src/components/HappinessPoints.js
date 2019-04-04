import React from 'react'

import { connect } from 'react-redux'


class HappinessPoints extends React.Component {
  render (){
    console.log(this.props)
    return(
      <div className="hp-component">
        <h1>HP: {this.props.hp}</h1>
        <div className="health-bar">
          <div className="filler" style={{width: `${this.props.hp}%`}} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    hp: state.baby.hp,
    user: state.user,
    baby: state.baby,
    feed_time: state.feed_time,
    feed_date: state.feed_date
  }
}

export default connect(mapStateToProps)(HappinessPoints)
