
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup'
import Profile from './components/user/Profile'
import AuthService from './components/auth/auth-service';
import NavbarCoffee from './components/NavbarCoffee'
import CoffeeDetail from './components/coffee/CoffeeDetail'
import EditCoffee from './components/coffee/EditCoffee'
import Footer from './components/Footer';
import InitialPage from './components/coffee/InitialPage';
import Search from './components/coffee/Search'
import About from './components/About'
import API from './components/API'

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
        <NavbarCoffee setCurrentUser={this.setCurrentUser} loggedInUser={this.state.loggedInUser} />
        <Switch>
          <Route exact path='/' render={(props) => <InitialPage setCurrentUser={this.setCurrentUser} {...props} /> } />
          <Route path='/login' render={(props) => <Login setCurrentUser={this.setCurrentUser} {...props} /> } />
          <Route path='/signup' render={(props) => <Signup setCurrentUser={this.setCurrentUser} {...props} /> } />
          <Route path='/about'  render={(props) => <About setCurrentUser={this.setCurrentUser} {...props} /> } />
          <Route path='/API'  render={(props) => <API setCurrentUser={this.setCurrentUser} {...props} /> } />
          <Route path='/profile' render={(props) => this.state.loggedInUser ? <Profile username={this.state.loggedInUser}{...props} /> :<Redirect to="/login" />}/>
          <Route path='/coffee-detail/:id' render={(props) => this.state.loggedInUser ? <CoffeeDetail username={this.state.loggedInUser}{...props} />:<Redirect to="/login" />}/>
          <Route path='/edit-coffee/:id' render={(props) => this.state.loggedInUser ? <EditCoffee username={this.state.loggedInUser}{...props} />:<Redirect to="/login" />}/>
          <Route path='/search'  render={(props) => this.state.loggedInUser ? <Search username={this.state.loggedInUser}{...props} />:<Redirect to="/login" />}/>
          
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default App;