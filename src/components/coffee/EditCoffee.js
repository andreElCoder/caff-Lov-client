import React, { Component } from 'react';
import axios from 'axios';
import { faCoffee, } from '@fortawesome/free-solid-svg-icons'
import Rating from "react-rating"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Button} from "react-bootstrap"
import Map from "../location/Map"

require('dotenv').config()
class Editcoffee extends Component {

    state = {
        name:"",
        description:"",
        url:"",
        file:"",
        rating:0,
        coffeEddited:false,
        
    }

    componentDidMount() {
        const { params } = this.props.match;
        axios
        .get(`${process.env.REACT_APP_HEROKU_URL}/api/coffee-detail/${params.id}`)
        .then(responseFromAPI =>{
            console.log(responseFromAPI)
            const{name,description,url,rating,markers} = responseFromAPI.data
            this.setState({
                name,
                description,
                url,
                rating,
                markers
            })
            
        })
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleFormSubmit = (event) => {
        const { params } = this.props.match;
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
            axios.put(`${process.env.REACT_APP_HEROKU_URL}/api/edit-coffee/${params.id}`, {name,description,url,rating,markers})
            .then((responsefromEdit) => { 
                //1. Lift the state up and push new Coffee into the state that lives on Coffees
                //2. Call the api to get all projects again
                console.log(responsefromEdit)
                this.setState({name:responsefromEdit.data.name,description:responsefromEdit.data.description,url:responsefromEdit.data.url,rating:responsefromEdit.data.rating,coffeEddited:true})
                setTimeout(()=>{this.setState({coffeEddited:false})},2000)
            })      
        })
    }
    handleMarkers = (markersFromMap)=>{
        this.setState({
            markers: markersFromMap
        })
    }
    updateRating= (value) =>{
        this.setState({
           rating:value
        })
    }

    handleFileChange = (event) => {
        this.setState({ file: event.target.files[0]});
    }

    render() {
        console.log(this.state)
        console.log(this.props)
        return (
            <div>
                <form >
                    <label >Name</label>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange}></input>
                    <label >Description</label>
                    <input type="text" name="description" value={this.state.description} onChange={this.handleChange} ></input>
                    <Rating
                        initialRating = {this.state.rating}
                        onClick={this.updateRating}
                        emptySymbol={<FontAwesomeIcon icon={faCoffee} color="gray"/>}
                        fullSymbol={<FontAwesomeIcon  color="brown" icon={faCoffee} />}
                    />
                    <input id="upload-file" style={{display:"none"}} type="file" onChange={this.handleFileChange} /> 
                        <label style={{backgroundImage: `url(${this.state.url})`, height:"100px" , width:"100px", backgroundSize: "100px 100px"}}id="upload-file" for="upload-file"></label>
                        <Button size="lg" variant="light" onClick={this.handleFormSubmit}>Update it</Button>
                    
                    {this.state.markers && <Map liftUpMarkers = {this.handleMarkers} editable={true} markers={this.state.markers}/>} 
                    {this.state.coffeEddited && <h3><span role="img" aria-label="coffee">☕</span>Coffee Edited<span role="img" aria-label="coffee">☕</span></h3>}
                </form>
            </div>
        )
    }
}

export default Editcoffee;