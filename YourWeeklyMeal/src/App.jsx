import Searchbar from './Components/SearchBar/Searchbar'
import '../src/main.css'
import Cards from './Components/Cards/Cards'
import RandomMeal from './Components/Randommeal/RandomMeal'

function App(){
    return(
        <>
            <Searchbar/>
            <RandomMeal></RandomMeal>
            <Cards></Cards>
        </>
    )
}

export default App