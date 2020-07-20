import React from "react"
import Carousel from 'react-bootstrap/Carousel'

function InitialPage(){


    return(<div className="carousel">
            <Carousel >
                <Carousel.Item className="carousel-item">
                    <img className="carousel-image"
                    src="https://images.unsplash.com/photo-1497515114629-f71d768fd07c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1362&q=80"
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3>Boost your energy levels</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="carousel-item">
                    <img className="carousel-image"
                    src="https://images.unsplash.com/photo-1575999918061-10774a495539?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    alt="Third slide"
                    />

                    <Carousel.Caption>
                    <h3>Coffee may reduce the risk of type 2 diabetes</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="carousel-item">
                    <img className="carousel-image"
                    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                    alt="Third slide"
                    />

                    <Carousel.Caption>
                    <h3>Coffee can aid in weight loss </h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            </div>
    )

}
export default InitialPage