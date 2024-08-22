import React, { useEffect, useState, createContext } from 'react';
import { Link } from 'react-router-dom';
import Searchbar from '../SearchBar/Searchbar';
import SingleMealCategories from './SingleMealCategory';

export const UserContext = createContext();

function MealCategories() {
  const [mealCategories, setMealCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('da');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setMealCategories(result.categories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Searchbar />
        <div className="container-fluid mt-3 mx-1">
          <div className="row justify-content-center">
            {mealCategories.map((category) => (
              <div className="mb-4 text-center" key={category.idCategory}>
                <div className="card p-3">
                  <div className="column">
                    <div>
                      <img src={category.strCategoryThumb} alt={category.strCategory} className="img-fluid" />
                    </div>
                    <div className="py-3 px-4">
                      <h6 className="mb-3">{category.strCategory}</h6>
                      <p>{category.strCategoryDescription}</p>
                      <div className="d-flex mb-3">
                        <Link to={'/YourWeeklyMeal/Pages/SingleMealCategory.html'}>
                          <button
                            className="btn btn-primary mx-auto"
                            onClick={() => 
                              {setSelectedCategory(category.strCategory)
                                console.log(selectedCategory)
                            }}>
                            Explore {category.strCategory}
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <UserContext.Provider value={selectedCategory}> </UserContext.Provider>
    </>
  );
}

export default MealCategories;
