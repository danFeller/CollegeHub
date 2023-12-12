import axios from "axios";
import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import backendURL from "../config";
import Button from './common.js'

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

const ProfileWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
`

const Title = styled.h1`
  font-weight: bold;
  color: white;
`

function NavBar(props){
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const {name, image} = props;

  const getUser = async () => {
    try {
      const url = `${backendURL.uri}/login/success`;
      const { data: { isAuthenticated } } = await axios.get(url, { withCredentials: true });
      return isAuthenticated
    } catch (err) {
      console.log(err);
    }
  };

  useEffect( () => {
    getUser().then((r)=> {
      setAuthenticated(r.isAuthenticated)
    });
  }, []);

  const handleLogOut = async (e) => {
    const url = `${backendURL.uri}/logout`
    setAuthenticated(false)
    await axios.get(url)
    navigate('/');
    window.location.reload();
  };
  return (
    <>
      <Nav>
          <Title>Event Management</Title>
        <ProfileWrap>
          <Profile>
            <ProfilePic src={image}/>
          </Profile>
          { authenticated ? (<Button onClick={() => handleLogOut()}> LogOut</Button>): (<></>)}
        </ProfileWrap>
      </Nav>
    </>
  )
}

export default NavBar;