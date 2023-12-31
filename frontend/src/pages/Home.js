import axios from 'axios';
import React, {useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import Events from "../components/Events";
import MyEvents from "../components/MyEvents";
import styled from 'styled-components';


const Welcome = styled.div`
    // border: 1px solid red;
    padding-top: 20px;

`;
const EventGrid = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
`


function Home() {
    const [firstName, setFirstName] = useState(null);
    const [picture, setPicture] = useState(null);

    const getUser = async () => {
        try {
            const baseUrl = process.env.NODE_ENV === "production"
                ? "https://maverick-e24b493159d8.herokuapp.com"
                : "http://localhost:3000";
            const url = `${baseUrl}/login/success`;
            const {data: {user}} = await axios.get(url, { withCredentials: true })

            return user
        } catch (err) {
            console.log(err);
        }
    };

    useEffect( () => {
        getUser().then((r)=> {
            setFirstName(r.firstName)
            setPicture(r.picture)
        });
    }, []);

    return (
        <>
            <NavBar name={firstName} image={picture}/>
            <Welcome>
                <MyEvents/>
                <EventGrid>
                    <Events/>
                </EventGrid>
            </Welcome>

        </>
    );
}

export default Home;