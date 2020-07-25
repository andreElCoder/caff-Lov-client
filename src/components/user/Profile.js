import React, { Component } from "react"
import axios from "axios"
import {Button} from "react-bootstrap"
import AddCoffee from "../coffee/AddCoffee"
import CoffeeCard from "../coffee/CoffeeCard"
require('dotenv').config()
 
class Profile extends Component{

    state ={
        username:this.props.username.username,
        usernameId:this.props.username._id,
        url:"",
        coffees:[],
        coffeeholics:[],
        addButton:false,
        height:"100vh",
        height2:"10vh",
        i:1,
        buttonText:"Upload coffee",
        buttonText2:"Back to Coffees"
    }

    showAdd = (event) =>{
        event.preventDefault()
        const auxHeight = this.state.height
        const auxButton = this.state.buttonText
        this.setState({
            addButton:!this.state.addButton,
            height:this.state.height2,
            height2:auxHeight,
            buttonText:this.state.buttonText2,
            buttonText2:auxButton
        })
        document.body.style.height=`100vh`
    }

    refreshCoffees = (newCoffee) =>{
        console.log(newCoffee)
        const newCoffees = this.state.coffees
        newCoffees.unshift(newCoffee)
        let index=this.state.i
        if(this.state.coffees.length>index*6){
            index=this.state.i+1
            document.body.style.height=`${index*80}vh`
            this.setState({height:`${index*80}vh`})
        }
        this.setState({
            coffees:newCoffees,
            i:index
        })
    }
    componentDidMount(){

        axios
        .get(`${process.env.REACT_APP_HEROKU_URL}/api/username/${this.state.usernameId}/coffees`)
        .then(response =>{
            console.log(response.data)
            let index=this.state.i
            if(response.data.length>index*6){
            index=this.state.i+1
            document.body.style.height=`${index*80}vh`
            this.setState({height:`${index*80}vh`})
            
        }
            this.setState({
                coffees:response.data,
                i:index
            })
        })
    }

    render(){

        return(
            <div className="profile"> 
                    <div>
                        <h1>{this.state.username}</h1>  
                    </div>
                    <div className="add">
        <Button size="lg" variant="light" onClick={this.showAdd}>{this.state.buttonText}</Button>
                    </div>
                        {this.state.addButton && <AddCoffee lifUpCoffee={this.refreshCoffees} usernameId={this.state.usernameId} />}
                    
                    <div className="coffee-cards" style ={{height:`${this.state.height}`}}>
                        {!this.state.addButton && this.state.coffees!==[] && this.state.coffees.map((coffee) =>{console.log(coffee)
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