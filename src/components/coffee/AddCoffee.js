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
        file:"",
        rating:0,
        coffeAdded:false
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
        const uploadData = new FormData()
        uploadData.append("url", this.state.file);
        axios.post('http://localhost:5000/api/upload-coffee', uploadData)
        .then((responsefromUpload)=>{
            const {name,description,rating} = this.state
            const url=responsefromUpload.data.url
            axios.post('http://localhost:5000/api/add-coffee', {name,description,url,rating})
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
                    <input type="file" onChange={this.handleFileChange} /> 
                    <Button onClick={this.handleFormSubmit}>Add it</Button>
                    {this.state.coffeAdded && <h3>☕ Coffe Added ☕</h3>}
                </form>
            </div>
        )
    }

}
export default AddCoffee