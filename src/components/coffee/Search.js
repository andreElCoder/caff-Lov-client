import React, { Component } from "react"
import axios from "axios"
import CoffeeCard from "./CoffeeCard"

require('dotenv').config()

class Search extends Component{

    state ={
        search:this.props.location.state.state,
        coffees:[],
        height:"160vh",
        i:1
    }
    searchIt = () =>{
        this.setState({search: this.props.location.state.state})
        console.log(this.state.search)
        console.log(this.props.location.state.state)
        axios.get(`${process.env.REACT_APP_LOCAL_URL}/api/search-coffee/${this.props.location.state.state}`)
        .then(coffees =>{
            console.log(coffees.data)
            console.log(this.state)
            
            this.setState({
                coffees:coffees.data
            })
            let index=this.state.i
            if(this.state.coffees.length>index*6){
                index=this.state.i+1
                document.body.style.height=`${index*80}vh`
                this.setState({height:`${index*80}vh`})
            }
        })
    }
    componentDidMount(){
     this.searchIt()
    }

    updateNedded = () =>{
        if(this.props.location.state.state!==this.state.search){
            this.searchIt()
    }

    }
    render(){
        
        console.log(this.state)
        console.log(this.props.location.state.state)
        this.state.search!==this.props.location.state.state && this.updateNedded()
        return(
            <div className="coffee-cards" style ={{height:`${this.state.height}`}}>
            {this.state.coffees!==[] && this.state.coffees.map((coffee) =>{
                return(
                    
                <CoffeeCard coffee={coffee} key={coffee._id}/>) 
                })}
        </div>
            )
    }
}

export default Search