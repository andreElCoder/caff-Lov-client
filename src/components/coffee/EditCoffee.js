import React, { Component } from 'react';
import axios from 'axios';

class Editcoffee extends Component {

    state = {
        name:"",
        description:"",
        url:"",
        rating:0,
    }

    componentDidMount() {
        //Make call to the API
        //Set the state with the response
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { title, description,url,rating } = this.state;
        const { params } = this.props.match;
        axios.put(`http://localhost:5000/api/edit-coffee/${params.id}`, { title, description,url,rating} )
            .then(() => {
                this.props.history.push('/coffees');
            });
    }

    render() {
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
                    <Button onClick={this.handleFormSubmit}>Add it</Button>
                    {this.state.coffeAdded && <h3>☕ Coffe Edited ☕</h3>}
                </form>
            </div>
        )
    }
}

export default Editcoffee;