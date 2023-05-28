import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';


const Searched = () => {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const params = useParams();
  
  const getSearched = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
    );
    const recipes = await data.json();
    setSearchedRecipes(recipes.results);
  };

  useEffect(() =>{
    getSearched(params.search);
  }, [params.search])

  return (
    <Grid>
      {searchedRecipes.map((searched) => (
        <Card key={searched.id}>
          <Link to={'/recipe/' + searched.id}>
            <img src={searched.image} alt={searched.title} />
            <h4>{searched.title}</h4>
          </Link>
        </Card>
      ))}
    </Grid>
  )
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-gap: 3rem;
  margin: 5rem;
`;

const Card = styled.div`
    backdrop-filter: blur(25px) saturate(200%);
    -webkit-backdrop-filter: blur(25px) saturate(200%);
    border: 1px solid rgba(209, 213, 219, 0.3);

  img {
    width: 100%;
    border-radius: 2rem;
    border-radius: 10px 10px 15px 15px;
    backdrop-filter: blur(4px);
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);

  }

  a {
    text-decoration: none;
  }

  h4 {
    text-align: center;
    padding: 1rem;
    border-radius: 10px 10px 15px 15px;
    backdrop-filter: blur(4px);
    background: rgba(54, 54, 54, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);

  }
`;

export default Searched