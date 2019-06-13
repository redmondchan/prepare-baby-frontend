import React from 'react'
import Particles from 'react-particles-js'
import { connect } from 'react-redux'
import { fetchNames, controlInterval } from '../actions/actions'
import { createUser } from '../actions/actions'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { Button, Modal, Form } from 'semantic-ui-react'
import { findUser } from '../actions/actions'



class Landing extends React.Component{

  state={
    username: "",
    password: "",
    email: ""
  }

  componentDidMount(){
    this.props.fetchNames()
    this.props.controlInterval(this.props.baby)
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
    this.props.createUser({user: {username: this.state.username, password: this.state.password, javascript_time: `${today}`, baby_name: name} }).then(()=>this.props.history.push("/baby"))
  }

  handleLogIn = (e) => {
    e.preventDefault()
    this.props.findUser({user: this.state}).then(() => this.props.history.push('/baby'))
    // setTimeout(()=>this.props.history.push('/baby'), 1000)
  }



  render(){
    console.log("props", this.props.baby)
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
          <Modal size={'mini'} trigger={<Button>Sign Up</Button>} closeIcon>
            <Modal.Header className="center-form">Sign Up</Modal.Header>
              <Modal.Content className="center-form">
              <Modal.Description>
        				<Form onSubmit={(event) => this.handleSignUp(event)}>
                  <Form.Field>
                    <label>Username</label>
                    <input type="text" name= "username" placeholder="username" onChange={(event) => this.handleChange(event)} />
                  </Form.Field>
                  <Form.Field>
                    <label>Email</label>
                    <input type="text" name= "email" placeholder="email" onChange={(event) => this.handleChange(event)} />
                  </Form.Field>
                  <Form.Field>
                    <label>Password</label>
                    <input type="password" name="password" placeholder="password" onChange={(event) => this.handleChange(event)} />
                  </Form.Field>
                    <Button type='submit'>Sign Up</Button>
        				</Form>
                </Modal.Description>
              </Modal.Content>
          </Modal>
          <Modal className="landing-form" size={'mini'} trigger={<Button>Log In</Button>} closeIcon>
            <Modal.Header className="center-form">Log In</Modal.Header>
            <Modal.Content className="center-form">
                <Form onSubmit={(event) => this.handleLogIn(event)}>
                  <Form.Field>
                    <label>Username</label>
                    <input type="text" name= "username" placeholder="username" onChange={(event) => this.handleChange(event)} />
                  </Form.Field>
                  <Form.Field>
                    <label>Password</label>
                    <input type="password" name="password" placeholder="password" onChange={(event) => this.handleChange(event)} />
                  </Form.Field>
                  <Button type='submit'>Log In</Button>
                </Form>
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
  findUser: (user) => dispatch(findUser(user)),
  controlInterval: (baby) => dispatch(controlInterval(baby))
})

const mapStateToProps = (state) =>{
  return{
    names: state.names,
    baby: state.baby
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Landing))
