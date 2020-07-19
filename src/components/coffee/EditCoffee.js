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
        rating:0,
        coffeEddited:false,
        
    }

    componentDidMount() {
        const { params } = this.props.match;
        axios
        .get(`${process.env.REACT_APP_LOCAL_URL}/api/coffee-detail/${params.id}`)
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
        event.preventDefault();
        const { name, description,url,rating,markers } = this.state;
        const { params } = this.props.match;
        axios.put(`${process.env.REACT_APP_LOCAL_URL}/api/edit-coffee/${params.id}`, { name, description,url,rating,markers} )
            .then(() => {
                this.setState({coffeEddited:true})
                setTimeout(()=>{
                    this.props.history.push('/profile')
                    this.setState({
                        name:"",
                        description:"",
                        url:"",
                        rating:0,
                        coffeEddited:false,
                        markers
                    })
                },1000);
            });
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
                    <label >Url</label>
                    <input type="text" name="url" value={this.state.url} onChange={this.handleChange} ></input>
                    <Rating
                        initialRating = {this.state.rating}
                        onClick={this.updateRating}
                        emptySymbol={<FontAwesomeIcon icon={faCoffee} color="gray"/>}
                        fullSymbol={<FontAwesomeIcon  color="brown" icon={faCoffee} />}
                    />
                    <Button onClick={this.handleFormSubmit}>Update it</Button>
                    
                    {this.state.markers && <Map liftUpMarkers = {this.handleMarkers} editable={true} markers={this.state.markers}/>} 
                    {this.state.coffeEddited && <h3>☕ Coffee Edited ☕</h3>}
                </form>
            </div>
        )
    }
}

export default Editcoffee;