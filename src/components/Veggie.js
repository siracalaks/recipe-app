import React from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';

const Veggie = () => {

  const [veggie, setVeggie] = useState([]);

    useEffect(() => {
        getVeggie();
    }, []);

    const getVeggie = async () => {
        // Eğer localstorage da böyle popular yemekleri içeren bir liste var ise onu değişkene atıyorum.
        const check = localStorage.getItem("veggie");

        if (check) {
          setVeggie(JSON.parse(check));
        } else {
            const api = await fetch(
                `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`
            );
            const data = await api.json();   
            // Eğer popüler yemekler yok ise var olan yemeklerin verilerini çekiyoruz...
            localStorage.setItem("veggie", JSON.stringify(data.recipes));
            setVeggie(data.recipes);
            // console.log(data.recipes);
        }
    };

  return (
        <Wrapper>
            <h3>Our Vegetarian Picks</h3>
            <Splide
                options={{
                    perPage: 3,
                    arrows: false,
                    pagination: false,
                    drag: "free",
                    gap: "5rem"
                }}
            >
                {veggie.map((recipe) => {
                    return(
                        <SplideSlide key={recipe.id}>
                            <Card>
                                <Link to={"/recipe/" + recipe.id}>
                                        <p>{recipe.title}</p>
                                        <img src={recipe.image} alt={recipe.title} />
                                        <Gradient />
                                </Link>
                            </Card>
                        </SplideSlide>
                    );
                })}
            </Splide>
        </Wrapper>
  )
}

const Wrapper = styled.div`
    margin: 4rem 8rem ;
    
`;

const Card = styled.div`
    min-height: 25rem;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;
    backdrop-filter: blur(25px) saturate(200%);
    -webkit-backdrop-filter: blur(25px) saturate(200%);
    border: 1px solid rgba(209, 213, 219, 0.3);

    img {
        border-radius: 2rem;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    p{
        position: absolute;
        z-index: 10;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%, 0%);
        color: white;
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 1rem;
        height: 22%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px 10px 15px 15px;
        backdrop-filter: blur(4px);
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
    }
`;

const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0) );
`;


export default Veggie;