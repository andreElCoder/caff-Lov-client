import React, { Component } from "react"
import axios from "axios"
import {Card,Button} from "react-bootstrap"
import {Link} from "react-router-dom"
import AddCoffee from "../coffee/AddCoffee"
import CoffeeCard from "../coffee/CoffeeCard"
import ExampleSearchBox from "../location/Map"
require('dotenv').config()
class Profile extends Component{

    state ={
        username:this.props.username.username,
        usernameId:this.props.username._id,
        url:"",
        coffees:[],
        coffeeholics:[],
        addButton:false
    }

    showAdd = (event) =>{
        event.preventDefault()
        this.setState({
            addButton:!this.state.addButton
        })
    }

    refreshCoffees = (newCoffee) =>{
        console.log(newCoffee)
        const newCoffees = this.state.coffees
        newCoffees.unshift(newCoffee)
        this.setState({
            coffees:newCoffees
        })
    }
    componentDidMount(){
        axios
        .get(`${process.env.REACT_APP_LOCAL_URL}/api/username/${this.state.usernameId}/coffees`)
        .then(response =>{
            console.log(response.data)
            this.setState({
                coffees:response.data
            })
        })
    }
    render(){
        return(
                <div>
                    <div>
                        <h1>Profile {this.state.username}</h1>  
                    </div>
                    <div>
                        <Button onClick={this.showAdd}>Upload coffee</Button>
                        {this.state.addButton && <AddCoffee lifUpCoffee={this.refreshCoffees} usernameId={this.state.usernameId} />}
                    </div>
                    <div>
                        {this.state.coffees!=[] && this.state.coffees.map((coffee) =>{console.log(coffee)
                            return(
                                
                            <CoffeeCard coffee={coffee} key={coffee._id}/>) 
                            })}
                    </div>
                    <div>
                     
                    </div>
                </div>
            )
    }
}

export default Profile