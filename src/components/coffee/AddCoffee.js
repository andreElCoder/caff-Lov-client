import React, { Component } from "react"
import Rating from "react-rating"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, } from '@fortawesome/free-solid-svg-icons'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import {Button} from 'react-bootstrap'

class AddCoffee extends Component{

    state = {
        name:"",
        description:"",
        url:"",
        rating:0
    }

    updateRating= (value) =>{
        this.setState({
           rating:value
        })
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name] : value});
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const {name,description,url,rating} = this.state

        axios.post('http://localhost:5000/api/add-coffee', {name,description,url,rating})
            .then(() => { 
                //1. Lift the state up and push new Coffee into the state that lives on Coffees
                //2. Call the api to get all projects again
                this.props.lifUpCoffee(this.state)
                this.setState({name:"",description:"",url:"",rating:0})
                toast('Coffee added !');
            })        
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleFormSubmit}>
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
                    <Button>Add it</Button>
                </form>
                <ToastContainer />
            </div>
        )
    }

}
export default AddCoffee