import React, { Component } from "react"
import axios from "axios"
require('dotenv').config()

class Search extends Component{

    state ={
        search:this.props.location.state.search,
        coffees : []
    }

    componentDidMount(){
            
        axios.get(`${process.env.REACT_APP_LOCAL_URL}/api/search-coffee/${this.state.search}`)
        .then(coffees =>{
            console.log(coffees)
            console.log(this.state)
            this.setState({
                coffees:coffees
            })
        })
    }
    
    
    render(){
        console.log(this.state)
        console.log(this.props.location.state.search)
        return(
           <div>
               {this.state.coffees}
            </div>
            )
    }
}

export default Search