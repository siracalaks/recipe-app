import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

const Cuisine = () => {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();
  const getCuisine = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`
    );
    const recipes = await data.json();
    setCuisine(recipes.results);
  };
  useEffect(() => {
    getCuisine(params.type);
    // console.log(params.type);
  }, [params.type]);

  return (
    <Grid>
      {cuisine.map((cuisin) => {
        return (
          <Card key={cuisin.id}>
            <Link to={'/recipe/' + cuisin.id}>
              <img src={cuisin.image} alt={cuisin.title} />
              <h4>{cuisin.title}</h4>            
            </Link>

          </Card>
        );
      })}
    </Grid>
  );
};

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
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);

  }
`;


export default Cuisine;
