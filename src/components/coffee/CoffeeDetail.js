import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import Rating from "react-rating"
import {Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Map from "../location/Map"
require('dotenv').config()

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
        axios.get(`${process.env.REACT_APP_LOCAL_URL}/api/coffee-detail/${params.id}`)
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
        axios.delete(`${process.env.REACT_APP_LOCAL_URL}/api/username/${this.props.username._id}/delete-coffee/${params.id}`)
            .then(() => {
                //return <Redirect to='/coffees' />
                this.props.history.push('/profile');
                
            })
    }

    // 1. Happens first
    render() {
        console.log(this.state)
        console.log(this.props.username._id)
        const { params } = this.props.match;
        return(
            <div className="profile">
                <h1>{this.state.name}</h1>
                <p>{this.state.description}</p>
                <img style={{ width: '32vw' , height: '35vh' }} src={this.state.url} alt="coffee"/>
                <Rating
                        initialRating = {this.state.rating}
                        readonly={true}
                        emptySymbol={<FontAwesomeIcon icon={faCoffee} color="gray"/>}
                        fullSymbol={<FontAwesomeIcon  color="brown" icon={faCoffee} />}
                        fractions={2}
                />
                <div id="buttons-side-by-side">
                    {this.props.username &&   
                        <div>
                            <Button size="lg" variant="light" onClick={() => this.deleteCoffee()}>Delete coffee</Button>
                        </div>
                    }

                    <div>
                    <Link className="link-coffee" to={{
                        pathname: `/edit-coffee/${params.id}`,
                        state: {
                            name: this.state.name,
                            description: this.state.description,
                            url:this.state.url,
                            rating:this.state.rating,
                            markers:this.state.markers
                        }
                        }}> <Button size="lg" variant="light">Edit coffee</Button></Link>  
                    </div>
                </div>
                <div>
                {this.state.markers && <Map editable={false} markers={this.state.markers}/>} 
                </div>
                <hr />

                
            </div>
        )
    }
}

export default CoffeeDetails