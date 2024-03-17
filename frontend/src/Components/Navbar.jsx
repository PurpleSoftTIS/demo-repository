import React from 'react';
import styled from 'styled-components';

export function Navbar() {
  var imagePath = process.env.PUBLIC_URL + '/blanco.png'
  return (
    <>
      <NavContainer>
      <div><Logo>
      <img src={process.env.PUBLIC_URL + '/logoPurple.png'} alt="Purple-Soft Logo" />
    </Logo>
    <h2>
      Purple<span>-Soft</span>
    </h2></div>  
      
        <div>
          <a href="/">Ambientes</a>
          <a href="/">Materias</a>
          <a href="/">Docentes</a>
        </div>
        <UserImage>
          <img src={imagePath} alt="Foto del usuario" />
          <a href="/">Administrador</a>
        </UserImage>
      </NavContainer>
    </>
  );
}

const NavContainer = styled.nav`
  h2 {
    color: white;
    font-weight: 400;
    span {
      font-weight: bold;
    }
  }
  div{ 
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  margin: 0;
  padding: 0;
  border: 0;
  background-color: #2a2040;
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    text-decoration: none;
    color: white;
    font-size: 1.4rem;
    margin: 0 10px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
    margin-right: 8px;
  }
`;

const UserImage = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 8px;
  }

  span {
    color: white;
    font-size: 1rem;
  }
`;
