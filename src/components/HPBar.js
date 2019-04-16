import React from 'react'
import { Button, Progress } from 'semantic-ui-react'
import { connect } from 'react-redux'

class HPBar extends React.Component {

  render() {
    return (
      <div className="hp-div">
        <div className="hp-text">
          <h1>Happiness Points: {this.props.baby.hp}</h1>
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

export default connect(mapStateToProps)(HPBar)
