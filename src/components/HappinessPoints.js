import React from 'react'
import {Container} from 'semantic-ui-react'

import { connect } from 'react-redux'


class HappinessPoints extends React.Component {
  render (){
    console.log(this.props)
    return(
      <Container className="hp-component">
        <h1>HP: {this.props.hp}</h1>
        <div className="health-bar">
          <div className="filler" style={{width: `${this.props.hp}%`}} />
        </div>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    hp: state.baby.hp,
    user: state.user,
    baby: state.baby,
  }
}

export default connect(mapStateToProps)(HappinessPoints)
