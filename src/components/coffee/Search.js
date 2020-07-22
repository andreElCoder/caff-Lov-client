import React, { Component } from "react"
import axios from "axios"
import CoffeeCard from "./CoffeeCard"

require('dotenv').config()

class Search extends Component{

    state ={
        search:this.props.location.state.state,
        coffees:[],
        height:"100vh",
        i:1
    }

    componentDidMount(){
            
        axios.get(`${process.env.REACT_APP_LOCAL_URL}/api/search-coffee/${this.state.search}`)
        .then(coffees =>{
            console.log(coffees.data)
            console.log(this.state)
            this.setState({
                coffees:coffees.data
            })
        })
    }
    
    
    render(){
        console.log(this.state)
        console.log(this.props.location.state.state)
        return(
            <div className="coffee-cards" style ={{height:`${this.state.height}`}}>
            {this.state.coffees!=[] && this.state.coffees.map((coffee) =>{console.log(coffee)
                return(
                    
                <CoffeeCard coffee={coffee} key={coffee._id}/>) 
                })}
        </div>
            )
    }
}

export default Search