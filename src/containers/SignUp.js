import React from 'react'
import { connect } from 'react-redux'
import { fetchNames } from '../actions/actions'
import { createUser } from '../actions/actions'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

class SignUp extends React.Component{

  state={
      username: "",
      password: "",
      email: ""
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
    console.log(this.state)
    return(
  <div className="container">
  	<div className="d-flex justify-content-center">
  		<div className="card">
  			<div className="card-header">
  				<h3>Sign Up</h3>
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
  						<input type="submit" value="Sign Up" className="btn float-right login_btn"/>
  					</div>
  				</form>
  			</div>
  			<div className="card-footer">
  				<div className="d-flex justify-content-center links">
  					Have an account? <Link to='/signin'>Sign In</Link>
  				</div>
  			</div>
  		</div>
  	</div>
  </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp))
