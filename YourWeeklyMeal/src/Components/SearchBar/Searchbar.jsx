import React, { useState, Link } from 'react';

const Logo = './src/assets/LogoWhite.png'

function Searchbar() {
    const [searchForMeal, setsearchForMeal] = useState(null);

    const searchformeal = async function () {
        const mealSearchInput = document.getElementById("mealSearchInput").value.trim().toLowerCase();

        if (!mealSearchInput) {
            console.warn("Meal search input is empty!");
            return;
        }

        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealSearchInput}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setsearchForMeal(result);
            console.log(result); 
            document.getElementById('rootSearch').innerHTML += `
            <h2>${searchForMeal.strArea}</h2>
            `
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <header>
            <div className="px-3 py-2 text-bg-dark border-bottom rounded-bottom-5">
                <div className="container">
                    <img
                        src={Logo}
                        className="img-fluid rounded-top m-2"
                        alt="Logo"
                    />
                    <form className="d-flex" role="search">
                        <input
                            type="text"
                            className="form-control input-text mx-3"
                            name='searched'
                            placeholder='Search for any Meal! Lamb Tagine, Sweet and Sour Pork and many more!'
                            aria-label="Search"
                            id="mealSearchInput"
                        />
                    </form>
                    <a href="/YourWeeklyMeal/Pages/Search.html">
                    <button
                        className='btn-warning rounded-4 border-0'
                        onClick={searchformeal}
                    >
                        Search
                    </button>
                    </a>
                </div>
            </div>
        </header>
    );
}

export default Searchbar;
