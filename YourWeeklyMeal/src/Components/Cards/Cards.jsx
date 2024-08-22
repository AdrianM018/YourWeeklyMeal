import React from 'react'
import { Link } from 'react-router-dom'
import './Cards.css'


function Cards() {
    return (
        <div className="container mt-4 d-flex justify-content-center">
            <div className="row g-0">
                <Link to={'/YourWeeklyMeal/Pages/Categories.html'}>
                <div className="col-md-4 border-right">
                    <div className="cards">
                        <div className="first bg-white p-4 text-center">
                            <img src="https://img.icons8.com/clouds/100/000000/box.png" />
                            <h5>Categories</h5>
                            <p className="line1">No limitation - Its got everything that you 'll need as you grow</p>
                        </div>
                    </div>
                </div>
                </Link>
                <div className="col-md-4 border-right">
                    <div className="cards">
                        <div className=" second bg-white p-4 text-center">
                            <img src="https://img.icons8.com/clouds/100/000000/groups.png" />
                            <h5>Area</h5>
                            <p className="line2">$50/month gets you 10 users, and you can add more $10 pe user</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="cards">
                        <div className=" third bg-white p-4 text-center">
                            <img src="https://img.icons8.com/fluent/100/000000/trophy.png" />
                            <h5>Ingredients</h5>
                            <p className="line3">We'll help you get started and be there when you have questions</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Cards