import React from 'react'
import { connect } from 'react-redux'
import happyBaby from '../images/happybabyBetter.svg'
import angryBaby from '../images/angrybabyBetter.svg'

class BabyImage extends React.Component {
  render(){
    let hp = this.props.baby.hp
    return(
      <div>
        <h1>{this.props.baby.name}</h1>
        {hp === 0 ?
          <p>Your baby ran away and found someone else</p>
          :
          <div>
            <img src={hp > 70 ? happyBaby:angryBaby} alt="" width="500" height="600"/>,
            <a href="https://www.freevector.com/free-baby-cartoon-icons-vectors-21842#">Vector image credit</a>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    baby: state.baby
  }
}

export default  connect(mapStateToProps)(BabyImage)
