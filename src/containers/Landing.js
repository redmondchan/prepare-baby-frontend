import React from 'react'
import Particles from 'react-particles-js'
import {Button} from 'semantic-ui-react'
import SignUpModal from './SignUpModal'
import LogInModal from './LogInModal'

class Landing extends React.Component{

  state={
    logIn:false,
    signUp: false
  }

  signUp = () => {
    this.setState({signUp: !this.state.signUp})
  }

  logIn = () => {
    this.setState({logIn: !this.state.logIn})
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
        <div className="particles-button">
        <Button onClick={this.logIn}>Log In</Button>
        {this.state.logIn ? <LogInModal open={this.state.logIn}/>: null}
        <Button onClick={this.signUp}>Sign Up</Button>
        {this.state.signUp ? <SignUpModal open={this.state.signUp}/>: null}
        </div>
      </div>
    )
  }
}
export default Landing
