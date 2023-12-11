import axios from 'axios';
import React, {useEffect, useState} from 'react';
import backendURL from "../config";
import NavBar from "../components/NavBar";
import Events from "../components/Events";
import MyEvents from "../components/MyEvents";
import styled from 'styled-components';

const Welcome = styled.div`
    // border: 1px solid red;
    padding-top: 20px;

`;


function Home() {
    const [firstName, setFirstName] = useState(null);
    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);
    const [picture, setPicture] = useState(null);

    const getUser = async () => {
        try {
            const url = `${backendURL.uri}/login/success`;
            const { data: { user } } = await axios.get(url, { withCredentials: true });
            console.log(user)
            return user
        } catch (err) {
            console.log(err);
        }
    };

    useEffect( () => {
        getUser().then((r)=> {
            setFirstName(r.firstName)
            setEmail(r.email)
            setUsername(r.username)
            setPicture(r.picture)
        });
    }, []);

    return (
        <>
            <NavBar name={firstName} image={picture}/>
            <Welcome>
                <MyEvents/>
                <Events/>
            </Welcome>

        </>
    );
}

export default Home;