import React, { Component } from "react"
import {Button} from 'react-bootstrap'
import axios from "axios"
import {Redirect,NavLink,Link} from "react-router-dom"

require('dotenv').config()

class SearchCoffee extends Component {

    state={
        search:""
    }
    
    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name] : value});
    }

    render(){
        return(<div id="search">
            <form >
                <label >Search</label>
                <input type="text" name="search" value={this.state.search} onChange={this.handleChange}></input>
                
            </form><Link to={{ pathname: '/search', state: { state: this.state.search } }}>Search</Link>
            </div>
        )
    }
}
export default SearchCoffee