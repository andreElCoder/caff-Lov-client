import React from "react"
import {Card,Button} from "react-bootstrap"

function CoffeeCard (){
return(
    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Coffee_time_%282410222127%29.jpg"/>
    <Card.Body>
      <Card.Title>Card Title</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk of
        the card's content.
      </Card.Text>
    </Card.Body>
</Card>
)
}
export default CoffeeCard