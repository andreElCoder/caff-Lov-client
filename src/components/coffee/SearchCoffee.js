import React, { Component } from "react"
import {Button} from 'react-bootstrap'
import axios from "axios"
import {Redirect,NavLink,Link} from "react-router-dom"

require('dotenv').config()

class SearchCoffee extends Component {

    state={
        search:"",
        redirect:false
    }
    
    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name] : value});
    }
    preventFormSubmit= (event) =>{
        event.preventDefault()
        this.setState({redirect:true})
    }
    render(){
        console.log(this.state)
        if(this.state.redirect){
            this.setState({redirect:!this.state.redirect})
            return <Redirect push to=
            {{pathname:"/search",
            state: { state: this.state.search } }}/>
        }
        else{
        return(<div id="search">
            <form onSubmit={this.preventFormSubmit}>
                <label >Search</label>
                <input type="text" name="search" value={this.state.search} onChange={this.handleChange}></input>
                <Link to={{ pathname: '/search', state: { state: this.state.search } }}><Button>Search</Button></Link>
            </form>
            
            </div>
        )}
    }
}
export default SearchCoffee