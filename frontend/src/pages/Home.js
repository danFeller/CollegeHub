import axios from 'axios';
import React, {useEffect, useState} from 'react';
import backendURL from "../config";

function Home() {
    const [firstName, setFirstName] = useState(null);
    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);
    const [picture, setPicture] = useState(null);

    const getUser = async () => {
        try {
            const url = `${backendURL.uri}/login/success`;
            const { data: { user } } = await axios.get(url, { withCredentials: true });
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
        <div className="container">
            <p>Welcome {firstName}!</p>
            <img src={picture}/>
        </div>
    );
}

export default Home;