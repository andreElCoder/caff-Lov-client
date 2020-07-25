import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';


class Login extends Component {
    state = {
        username: '',
        password: '',
        error:null
    }
    service = new AuthService();

    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { username, password } = this.state;
        this.service.login(username, password)
            .then(response => {
                //Set the whole application with the user that just logged in
                console.log(response)
                this.props.setCurrentUser(response);
                this.setState({ username: '', password: ''});
                this.props.history.push('/profile');
            })
            .catch(error => {
                console.log(error)
                console.log(error.response.data)
                this.setState({error:error.response.data.message})
                setTimeout(()=>this.setState({error:null}),5000)
            })
    }

    resetError = () =>{
        setTimeout(this.setState({error:null}),5000)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <label>Username:</label>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    <label>Password:</label>
                    <input  type = "password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <input type="submit" value="Login" />
                </form>
                {this.state.error && <h6>{this.state.error}</h6>}
                <p>Don't have account? 
                    <Link className="link-coffee" to={"/signup"}> Signup</Link>
                </p>
            </div>
        )
    }
}

export default Login