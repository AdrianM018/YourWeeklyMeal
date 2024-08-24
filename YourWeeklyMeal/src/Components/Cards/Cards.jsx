import React from 'react'
import { Link } from 'react-router-dom'
import './Cards.css'


function Cards() {
    return (
        <div className="mt-4 d-flex">
            <div className="row g-lg-5 w-100">
                <div className="col-md-4 border-right">
                <Link to={'/YourWeeklyMeal/Pages/Categories.html'}>
                    <div className="cards">
                        <div className="first bg-white p-4 text-center">
                            <img src="https://img.icons8.com/clouds/100/000000/box.png" />
                            <h3>Categories</h3>
                            <p className="line1">No limitation - Its got everything that you 'll need as you grow</p>
                        </div>
                    </div>
                    </Link>
                </div>


                <div className="col-md-4 border-right">
                <Link>
                    <div className="cards">
                        <div className=" second bg-white p-4 text-center">
                            <img src="https://img.icons8.com/clouds/100/000000/groups.png" />
                            <h3>Area</h3>
                            <p className="line2">$50/month gets you 10 users, and you can add more $10 pe user</p>
                        </div>
                    </div>
                    </Link>
                </div>


                <div className="col-md-4">
                <Link>
                    <div className="cards">
                        <div className=" third bg-white p-4 text-center">
                            <img src="https://img.icons8.com/fluent/100/000000/trophy.png" />
                            <h3>Ingredients</h3>
                            <p className="line3">We'll help you get started and be there when you have questions</p>
                        </div>
                    </div>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Cards