import React, { Component } from "react"
import {Card,Button} from "react-bootstrap"
import { faCoffee, } from '@fortawesome/free-solid-svg-icons'
import Rating from "react-rating"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from "react-router-dom"

class CoffeeCard extends Component{
  state = {
    name:this.props.coffee.name,
    description:this.props.coffee.description,
    url:this.props.coffee.url,
    rating:this.props.coffee.rating,
    id:this.props.coffee._id
  }

  render(){
    return(
    <div>    
      <Card style={{ width: '16rem' }}>
        <Card.Img variant="top" src={this.state.url}/>
        <Card.Body>
          <Card.Title>{this.state.name}</Card.Title>
          <Card.Text>
          {this.state.description}
          </Card.Text>
          <Link variant="top" to ={`/coffee-detail/${this.state.id}`}>Details</Link>
        </Card.Body>
        <Rating
                        initialRating = {this.state.rating}
                        readonly={true}
                        emptySymbol={<FontAwesomeIcon icon={faCoffee} color="gray"/>}
                        fullSymbol={<FontAwesomeIcon  color="brown" icon={faCoffee} />}
                        fractions={2}
                    />
      </Card>
    </div>)

  }
}
export default CoffeeCard