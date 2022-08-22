import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';


const App = () => {

    const APP_ID = '2b42fe09';
    const APP_KEY = '7e5499ad5fab50cd20734741056baf8a';


    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');

    // TO DO
    const APP_SEARCH = 'aple'
    const [query, setQuery] = useState(APP_SEARCH)


    useEffect(() => {
        getRecipes();
    }, [query]);

    const expReq = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`

    const [counter, setCounter] = useState(0);

    const getRecipes = async () => {
        const response = await fetch(expReq)
        const data = await response.json();

        setRecipes(data.hits);
        console.log(data.hits);
    };

    const updateSearch = e => {
        setSearch(e.target.value)
    }

    const getSearch = e => {
        e.preventDefault();
        setQuery(search);
        setSearch('')
    }

    return (
        <div className="App">
            <form onSubmit={getSearch} className='search-form'>
                <input className='search-bar' type='text' value={search} onChange={updateSearch}/>
                <button className='search-button' type="submit">
                    Search
                </button>
            </form>
            <div className='recipes'>
                {recipes.map(recipe => (
                    <Recipe
                        key={recipe.recipe.label}
                        title={recipe.recipe.label}
                        calories={recipe.recipe.calories}
                        image={recipe.recipe.image}
                        ingredients={recipe.recipe.ingredients}

                    />
                ))}
            </div>
        </div>
    );
}

export default App;
