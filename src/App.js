import React from 'react';
import Category from "./components/Category";
import Pages from "./pages/Pages";
import { BrowserRouter, Link } from 'react-router-dom'
import Search from './components/Search';
import styled from 'styled-components';
import { GiKnifeFork } from 'react-icons/gi';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav>
          <GiKnifeFork />
          <Logo to={'/'}>Lezzet Diyarı</Logo>
          <Logo to={'/'}>Home</Logo>
        </Nav>
        <Search />
        <Category />
        <Pages />      
      </BrowserRouter>
    </div>
  );
}

const Logo = styled(Link)`
  margin-right: 30px;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: "Lobster Two", cursive;
`;

const Nav = styled.div`
  padding: 4rem 0rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  svg{
    font-size: 2rem;
  margin-left: 16%;

  }
`;

export default App;
