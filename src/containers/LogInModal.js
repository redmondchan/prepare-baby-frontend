import React from 'react'
import { connect } from 'react-redux'
import { findUser } from '../actions/actions'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { Modal } from 'semantic-ui-react'

class LogInModal extends React.Component{

  state={
      username: "",
      password: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

// handles submission of sign in form
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.findUser({user: this.state})
    this.props.history.push('/baby')
  }


  render(){
    return(
      <Modal open={this.props.open}>
        <Modal.Header>Log In</Modal.Header>
        <Modal.Content>
            <form onSubmit={(event) => this.handleSubmit(event)}>
                  <input type="text" name= "username" className="form-control" placeholder="username" onChange={(event) => this.handleChange(event)} />
                  <input type="password" name="password" className="form-control" placeholder="password" onChange={(event) => this.handleChange(event)} />
                  <input type="submit" value="Log In" className="btn float-right login_btn"/>
            </form>
        </Modal.Content>
        <Modal.Actions>
          Don't have an account? <Link to='/'>Sign Up</Link>
        </Modal.Actions>
      </Modal>
    )
  }
}


const mapDispatchToProps = dispatch => ({
  findUser: (user) => dispatch(findUser(user))
})

export default connect(null, mapDispatchToProps)(withRouter(LogInModal))
