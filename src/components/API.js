import React from "react"

function API(){
    return(
        <div>
                <h1>API</h1>
            <section>
                <p>This backend was implemented on HEROKU. All credits given to the creators of this platform <a href="https://www.heroku.com">HEROKU</a> </p>
              
            </section>
            <section>
                <h3>Routes</h3>
                <h4>https://guarded-brushlands-19635.herokuapp.com/coffees</h4>
                <p>Gather coffees information and places (latitude and longitude) where they serve it! </p>
                <h4>https://guarded-brushlands-19635.herokuapp.com/coffee-detail/:id</h4>
                <p>Gather a specific coffee information</p>
                <h4>https://guarded-brushlands-19635.herokuapp.com/search-coffee/:search</h4>
                <p>Gather a specific coffee information according  based on search field </p>
            </section>


        </div>
    )
}
export default API