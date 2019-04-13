import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import questions from './Questions'
import { connect } from 'react-redux'
import { postAnswers } from '../actions/actions'

class ScenarioModal extends React.Component {

  state={
    open: false,
    question: ""
  }

  componentDidMount(){
    let randomNumber = Math.random() >= 0.5
    var question = questions[Math.floor(Math.random()*questions.length)]
    this.setState({open: randomNumber, question: question})

  }

  handleClose = (value) => {
    this.props.postAnswers(this.props.user, value)
    this.setState({ open: false })
  }

  render(){
    console.log(this.state.open, questions)
    return(
      <Modal open={this.state.open} size={'tiny'}>
        <Modal.Header>Scenario:</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>{this.state.question}</Header>
            <p>We've found the following gravatar image associated with your e-mail address.</p>
            <p>Is it okay to use this photo?</p>
          </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' value="selffish" onClick={(e) => this.handleClose(e.target.value)}>Leave your baby with someone.</Button>
        <Button color='green' value="selfless" onClick={(e) => this.handleClose(e.target.value)}>Stay with your baby.</Button>
        <Button color='yellow' onClick={this.handleClose}></Button>
      </Modal.Actions>
    </Modal>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  postAnswers: (user, value) => dispatch(postAnswers(user, value))
})

const mapStateToProps = (state) => {
  return{
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScenarioModal)
