import React, { useContext } from 'react';
import { UserContext } from './MealCategories';
import Searchbar from '../SearchBar/Searchbar';
import MealCategories from './MealCategories';

function SingleMealCategories() {
  const category = useContext(UserContext);

  return (
    <>
      <Searchbar />

      <p>{category ? `Selected Category: ${category}` : "No category selected"}</p>
    </>
  );
}

export default SingleMealCategories;
