import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import MealCategories from './Components/MealCategories/MealCategories.jsx'
import SingleMealCategories from "./Components/MealCategories/SingleMealCategory.jsx"
import Searchresult from "./Components/SearchBar/Searchresult.jsx"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>
  },
  {
    path: '/YourWeeklyMeal/Pages/Categories.html',
    element: <MealCategories />
  },
  {
    path: `YourWeeklyMeal/Pages/SingleMealCategory.html/:selectedCategory`,
    element: <SingleMealCategories/>
  },
  {
    path: 'YourWeeklyMeal/Pages/Search.html',
    element: <Searchresult/>
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)