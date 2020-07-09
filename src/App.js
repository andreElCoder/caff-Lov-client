
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup'
import Profile from './components/user/Profile'
import AuthService from './components/auth/auth-service';
import Navbar from './components/Navbar'
import CoffeeDetail from './components/coffee/CoffeeDetail'
import EditCoffee from './components/coffee/EditCoffee'


class App extends Component {
  state = {
    loggedInUser: null 
  }
  service = new AuthService();

  setCurrentUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }


  // 1. save the user into the browser localstorage
  // OR
  // 2. check if the user is still loggedin by calling the backend
  fetchUser = () => {
    if(this.state.loggedInUser === null) {
      this.service.loggedin() 
        .then(response => {
          if (response._id) {
            this.setState({
              loggedInUser: response
            })
          }
        })
    }
  }


  render() {
    this.fetchUser();
    console.log(this.state.loggedInUser)
    return (
      <div className="App">
        <Navbar setCurrentUser={this.setCurrentUser} loggedInUser={this.state.loggedInUser} />
        <Switch>
          <Route path='/login' render={(props) => <Login setCurrentUser={this.setCurrentUser} {...props} /> } />
          <Route path='/signup' render={(props) => <Signup setCurrentUser={this.setCurrentUser} {...props} /> } />
          <Route path='/profile' render={(props) => this.state.loggedInUser ? <Profile username={this.state.loggedInUser}{...props} /> :<h1>...</h1>}/>
          <Route path='/coffee-detail/:id' render={(props) => this.state.loggedInUser ? <CoffeeDetail username={this.state.loggedInUser}{...props} />:<h1>...</h1>}/>
          <Route path='/edit-coffee/:id' render={(props) => this.state.loggedInUser ? <EditCoffee username={this.state.loggedInUser}{...props} />:<h1>...</h1>}/>
        </Switch>
      </div>
    );
  }
}

export default App;