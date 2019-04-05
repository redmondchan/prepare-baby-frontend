import React from 'react'
import { connect } from 'react-redux'
import { findUser } from '../actions/actions'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

class LogIn extends React.Component{

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
  <div className="container">
  	<div className="d-flex justify-content-center">
  		<div className="card">
  			<div className="card-header">
  				<h3>Log In</h3>
  			</div>
  			<div className="card-body">
  				<form onSubmit={(event) => this.handleSubmit(event)}>
  					<div className="input-group form-group">
  						<div className="input-group-prepend">
  							<span className="input-group-text"><i className="fas fa-user"></i></span>
  						</div>
  						<input type="text" name= "username" className="form-control" placeholder="username" onChange={(event) => this.handleChange(event)} />
              </div>
  					<div className="input-group form-group">
  						<div className="input-group-prepend">
  							<span className="input-group-text"><i className="fas fa-key"></i></span>
  						</div>
  						<input type="password" name="password" className="form-control" placeholder="password" onChange={(event) => this.handleChange(event)} />
  					</div>
  					<div className="row align-items-center remember">
  						<input type="checkbox"/>Remember Me
  					</div>
  					<div className="form-group">
  						<input type="submit" value="Log In" className="btn float-right login_btn"/>
  					</div>
  				</form>
  			</div>
  			<div className="card-footer">
  				<div className="d-flex justify-content-center links">
  					Don't have an account? <Link to='/'>Sign Up</Link>
  				</div>
  			</div>
  		</div>
  	</div>
  </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  findUser: (user) => dispatch(findUser(user))
})

export default connect(null, mapDispatchToProps)(withRouter(LogIn))
