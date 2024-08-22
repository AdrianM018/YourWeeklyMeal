import React, { useState, useEffect } from 'react'

export default function RandomMeal() {
    const [randomMeal, setRandomMeal] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);

                const result = await response.json();
                setRandomMeal(result);
            } catch (error) {   
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="my-3 mx-auto"  style={{ maxWidth:'95vw'}}>
                <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
                    <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
                        <h1 className="display-4 fw-bold lh-1 text-body-emphasis">
                            {randomMeal ? randomMeal.meals[0].strMeal : 'Loading...'}
                        </h1>
                        <p className="lead">
                            {randomMeal ? randomMeal.meals[0].strInstructions : 'Fetching meal instructions...'}
                        </p>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                            <button type="button" className="btn btn-primary btn-lg px-4 me-md-2 fw-bold">See recipe</button>
                        </div>
                    </div>
                    <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
                        <img 
                            className="rounded-lg-3  img-fluid" 
                            src={randomMeal ? randomMeal.meals[0].strMealThumb : 'placeholder-image.png'} 
                            alt={randomMeal ? randomMeal.meals[0].strMeal : 'Loading image...'} 
                            width="720" 
                        />
                    </div>
                </div>
            </div>
        </>
    )
}