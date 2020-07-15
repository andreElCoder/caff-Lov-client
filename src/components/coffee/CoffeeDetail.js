import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import { faCoffee, } from '@fortawesome/free-solid-svg-icons'
import Rating from "react-rating"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Map from "../location/Map"

class CoffeeDetails extends Component {
    //1. Option one
    /*state = {
        title: '',
        description: ''
    }*/

    //2. Option two
    state = {
        
    }


    getSinglecoffee = () => {
        //id of the coffee is on the url /coffee-detail/<id>
        const { params } = this.props.match;
        axios.get(`http://guarded-brushlands-19635.herokuapp.com/api/coffee-detail/${params.id}`)
            .then(responseFromAPI => {
                const coffee = responseFromAPI.data;
                console.log('coffee found', coffee);
                console.log(this.props)
                //1. Option one
                /* this.setState({
                    title: coffee.title,
                    description: coffee.description
                })*/

                //2. Option two
                this.setState(coffee);
                this.setState({username:this.props.username})
            })
    }

    // 2. Happens second
    componentDidMount() {
      this.getSinglecoffee();
      console.log(this.props)
    }

    deleteCoffee = () => {
        const { params } = this.props.match;
        axios.delete(`http://guarded-brushlands-19635.herokuapp.com/api/delete-coffee/${params.id}`)
            .then(() => {
                //return <Redirect to='/coffees' />
                this.props.history.push('/profile');
                
            })
    }

    // 1. Happens first
    render() {
        console.log(this.state)
        const { params } = this.props.match;
        return(
            <div>
                <h1>{this.state.name}</h1>
                <p>{this.state.description}</p>
                <img style={{ width: '20rem' }} src={this.state.url}/>
                <Rating
                        initialRating = {this.state.rating}
                        readonly={true}
                        emptySymbol={<FontAwesomeIcon icon={faCoffee} color="gray"/>}
                        fullSymbol={<FontAwesomeIcon  color="brown" icon={faCoffee} />}
                        fractions={2}
                />
                {this.props.username &&   
                    <div>
                        <button onClick={() => this.deleteCoffee()}>Delete coffee</button>
                    </div>
                }

                <div>
                <Link to={{
                    pathname: `/edit-coffee/${params.id}`,
                    state: {
                        name: this.state.name,
                        description: this.state.description,
                        url:this.state.url,
                        rating:this.state.rating
                    }
                    }}>Edit coffee</Link>  
                </div>
                <div>
                    <Map editable={false} markers={this.state.markers}/> 
                </div>
                <hr />

                
            </div>
        )
    }
}

export default CoffeeDetails