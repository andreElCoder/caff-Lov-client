import React, { Component } from "react"
import Rating from "react-rating"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, } from '@fortawesome/free-solid-svg-icons'
import axios from "axios"
import {Button} from 'react-bootstrap'
import Map from "../location/Map"
require('dotenv').config()

class AddCoffee extends Component{

    state = {
        name:"",
        description:"",
        file:"",
        rating:0,
        coffeAdded:false,
        markers:[]
    }

    updateRating= (value) =>{
        this.setState({
           rating:value
        })
    }
    handleMarkers = (markersFromMap)=>{
        this.setState({
            markers: markersFromMap
        })
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name] : value});
    }

    handleFormSubmit = (event) => {
        console.log(this.state)
        console.log(this.props)
        event.preventDefault();
        const uploadData = new FormData()
        uploadData.append("url", this.state.file);
        axios.post(`${process.env.REACT_APP_HEROKU_URL}/api/upload-coffee`, uploadData)
        .then((responsefromUpload)=>{
            const {name,description,rating,markers} = this.state
            const usernameId = this.props.usernameId
            console.log(usernameId)
            console.log(name)
            const url=responsefromUpload.data.url
            axios.post(`${process.env.REACT_APP_HEROKU_URL}/api/add-coffee`, {name,description,url,rating,markers,usernameId})
            .then((responsefromAdd) => { 
                //1. Lift the state up and push new Coffee into the state that lives on Coffees
                //2. Call the api to get all projects again
                this.props.lifUpCoffee(responsefromAdd.data)
                this.setState({name:"",description:"",url:"",rating:0,coffeAdded:true})
                setTimeout(()=>{this.setState({coffeAdded:false})},2000)
            })      
        })
        

  
    }

    handleFileChange = (event) => {
        this.setState({ file: event.target.files[0]});
    }

    render(){
        return(
            <div className="profile"> 
                <div>
                    <form >
                        <label >Name</label>
                        <input type="text" name="name" value={this.state.name} onChange={this.handleChange}></input>
                        <label >Description</label>
                        <input type="text" name="description" value={this.state.description} onChange={this.handleChange}></input>
                        <Rating
                            initialRating = {this.state.rating}
                            onClick={this.updateRating}
                            emptySymbol={<FontAwesomeIcon icon={faCoffee} color="gray"/>}
                            fullSymbol={<FontAwesomeIcon  color="brown" icon={faCoffee} />}
                            fractions={2}
                        />
                        
                        <input id="upload-file" style={{display:"none"}} type="file" onChange={this.handleFileChange} /> 
                        <label id="upload-file" for="upload-file">IMAGE</label>
                        <Button size="lg" variant="light" onClick={this.handleFormSubmit}>Add it</Button>
                    </form>
                </div>
                <div className = "added">
                    {this.state.coffeAdded && <h3><span role="img" aria-label="coffee">☕</span>Coffe Added <span role="img" aria-label="coffee">☕</span></h3>}
                    <Map coffeeName={this.state.name} liftUpMarkers = {this.handleMarkers} editable={true} markers={[]}/>
                </div>
            </div>
        )
    }

}
export default AddCoffee