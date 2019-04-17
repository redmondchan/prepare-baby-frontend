import React from 'react'
import Particles from 'react-particles-js'
import SignUpModal from './SignUpModal'
import LogInModal from './LogInModal'
import { connect } from 'react-redux'
import { fetchNames } from '../actions/actions'
import { createUser } from '../actions/actions'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { Button, Modal } from 'semantic-ui-react'
import { findUser } from '../actions/actions'



class LandingTest extends React.Component{

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
  handleSignUp = (e) => {
    e.preventDefault()
    let today = new Date()
    let name = this.props.names[Math.floor(Math.random() * this.props.names.length)]
    this.props.createUser({user: {username: this.state.username, password: this.state.password, javascript_time: `${today}`, baby_name: name} })
    this.props.history.push('/baby')
  }

  handleLogIn = (e) => {
    e.preventDefault()
    this.props.findUser({user: this.state})
    this.props.history.push('/baby')
  }



  render(){

    return(
      <div className="particles-container">
      <Particles className="particles-js"
          params={{
      	    "particles": {
      	        "number": {
      	            "value": 200,
      	            "density": {
      	                "enable": true,
      	                "value_area": 1500
      	            }
      	        },
                "color": {
                  "value": "#DDA0DD"
                },
      	        "line_linked": {
      	            "enable": false,
      	            "opacity": 0.02
      	        },
      	        "move": {
      	            "direction": "top",
      	            "speed": 0.05
      	        },
      	        "size": {
      	            "value": 4
      	        },
      	        "opacity": {
      	            "anim": {
      	                "enable": true,
      	                "speed": 0.5,
      	                "opacity_min": 0.05
      	            }
      	        }
      	    },
      	    "interactivity": {
      	        "events": {
      	            "onclick": {
      	                "enable": true,
      	                "mode": "push"
      	            }
      	        },
      	        "modes": {
      	            "push": {
      	                "particles_nb": 1
      	            }
      	        }
      	    },
      	    "retina_detect": true
      	}} />
        <div className="button-container">
        <div className="button-header"></div>
        <div className="particles-button">
          <Modal trigger={<Button>Sign Up</Button>} closeIcon>
            <Modal.Header>Sign Up</Modal.Header>
              <Modal.Content>
              <Modal.Description>
        				<form onSubmit={(event) => this.handleSignUp(event)}>
        						<input type="text" name= "username" className="form-control" placeholder="username" onChange={(event) => this.handleChange(event)} />
        						<input type="password" name="password" className="form-control" placeholder="password" onChange={(event) => this.handleChange(event)} />
        						<input type="submit" value="Sign Up" className="btn float-right login_btn"/>
        				</form>
                </Modal.Description>
              </Modal.Content>
          </Modal>
          <Modal trigger={<Button>Log In</Button>} closeIcon>
            <Modal.Header>Log In</Modal.Header>
            <Modal.Content>
                <form onSubmit={(event) => this.handleLogIn(event)}>
                      <input type="text" name= "username" className="form-control" placeholder="username" onChange={(event) => this.handleChange(event)} />
                      <input type="password" name="password" className="form-control" placeholder="password" onChange={(event) => this.handleChange(event)} />
                      <input type="submit" value="Log In" className="btn float-right login_btn"/>
                </form>
            </Modal.Content>
          </Modal>
        </div>
        <div className="button-footer"></div>
        </div>
    </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchNames: () => dispatch(fetchNames()),
  createUser: (user) => dispatch(createUser(user)),
  findUser: (user) => dispatch(findUser(user))
})

const mapStateToProps = (state) =>{
  return{
    names: state.names
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LandingTest))
