import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';

class Signup extends Component {
    state = { username: '', password: '',error:null };
    service = new AuthService();

    handleFormSubmit = (event) => {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        this.service.signup(username, password)
            .then(response => {
                console.log(response)
                this.setState({
                    username: '', 
                    password: ''
                });
                this.props.setCurrentUser(response)
                this.props.history.push("/profile")
            })
            .catch(error => {
                console.log(error)
                console.log(error.response.data)
                this.setState({error:error.response.data.message})
                setTimeout(()=>this.setState({error:null}),5000)
            })
    }
    
    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
    }
    resetError = () =>{
        setTimeout(this.setState({error:null}),5000)
    }
  render(){
    return(
        <div>
            <form onSubmit={this.handleFormSubmit}>
                <label>Username:</label>
                <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                <label>Password:</label>
                <input name="password" value={this.state.password} onChange={this.handleChange} />
                <input type="submit" value="Signup" />
            </form>
            {this.state.error && <h6>{this.state.error}</h6>}
            <p>Already have account? 
                <Link to={"/login"}> Login</Link>
            </p>
      </div>
    )
  }
}
export default Signup;