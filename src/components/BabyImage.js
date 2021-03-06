import React from 'react'
import { connect } from 'react-redux'
import happyBaby from '../images/happybabyBetter.svg'
import angryBaby from '../images/angrybabyBetter.svg'

class BabyImage extends React.Component {
  render(){
    let hp = this.props.baby.hp
    return(
      <div className="baby-container">
        <h1 className="baby-name">{this.props.baby.name}</h1>
        {hp === 0 ?
          <div>
            <p className="baby-p">Your baby ran away and found someone else</p>
            <img className="baby-run" src="https://media.giphy.com/media/tpFl2rLh1FETC/giphy.gif" alt="gif of baby running away" align="middle"></img>
          </div>
          :
          <div className="baby-image">
            <img src={hp > 70 ? happyBaby:angryBaby} alt="" width="500" height="50%"/>,
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
