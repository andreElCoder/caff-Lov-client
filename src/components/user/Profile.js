import React, { Component } from "react"
import axios from "axios"

class Profile extends Component{

    state ={
        username:this.props.username.username,
        url:"",
        coffees:[],
        coffeeholics:[],
    }

    render(){
        return(
                <div>
                    <h1>Username = {this.state.username}</h1>
                 </div>
            )
    }
}

export default Profile