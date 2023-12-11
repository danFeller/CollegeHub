import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #ea580c;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-color: black;
  text-decoration: none;
`
const Profile = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`
const ProfilePic = styled.img`
  height: 3rem;
  width: 3rem;
  border-radius: 25px;
`

function NavBar(props){
  const {name, image} = props;
  return (
    <>
      <Nav>
        <Link className="navbar-brand" to={'/sign-in'}>
          <h3>Event Management</h3>
        </Link>
        <Profile>
          <h3>{name}</h3>
          <ProfilePic src={image}/>
        </Profile>
      </Nav>
    </>
  )
}

export default NavBar;