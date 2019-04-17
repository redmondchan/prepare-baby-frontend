import React from 'react'
import { connect } from 'react-redux'
import { fetchNames } from '../actions/actions'
import { createUser } from '../actions/actions'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { Modal } from 'semantic-ui-react'
import LogInModal from './LogInModal'

class SignUpModal extends React.Component{

  state={
      username: "",
      password: ""
  }

  componentDidMount(){
    this.props.fetchNames()
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

// handles submission of sign up form
  handleSubmit = (e) => {
    e.preventDefault()
    let today = new Date()
    let name = this.props.names[Math.floor(Math.random() * this.props.names.length)]
    this.props.createUser({user: {username: this.state.username, password: this.state.password, javascript_time: `${today}`, baby_name: name} })
    this.props.history.push('/baby')
  }


  render(){
    return(
      <Modal open={this.props.open} closeIcon>
        <Modal.Header>Sign Up</Modal.Header>
          <Modal.Content>
          <Modal.Description>
    				<form onSubmit={(event) => this.handleSubmit(event)}>
    						<input type="text" name= "username" className="form-control" placeholder="username" onChange={(event) => this.handleChange(event)} />
    						<input type="password" name="password" className="form-control" placeholder="password" onChange={(event) => this.handleChange(event)} />
    						<input type="submit" value="Sign Up" className="btn float-right login_btn"/>
    				</form>
            </Modal.Description>
          </Modal.Content>
        </Modal>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchNames: () => dispatch(fetchNames()),
  createUser: (user) => dispatch(createUser(user))
})

const mapStateToProps = (state) => {
  return {
    names: state.names
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUpModal))
