import axios from "axios";
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {redirect} from "react-router";
import NavBar from "../components/NavBar";
import backendURL from "../config";

function Create () {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const [userId, setUserId] = useState('')

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
            setUserId(r.id)
        });
    }, []);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value, organizerId: userId}));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestBody = {
            query: `
                mutation CreateEvent {
                    createEvent(
                        input: {
                            name: "${inputs.name}"
                            organizer: "${inputs.organizerId}"
                            location: {
                                address: "${inputs.address}"
                                city: "${inputs.city}"
                                state: "${inputs.state}"
                                country: "${inputs.country}"
                                zipcode: "${inputs.zip}"
                            }
                            startTime: "${inputs.startTime}"
                            endTime: "${inputs.endTime}"
                        }
                    ) {
                        id
                    }
                }
            `
        };
        
        try {
            const response = await fetch(`http://localhost:3000/graphql`, {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            await response.json();
            navigate('/events');
            window.location.reload();
        } catch (error) {
            console.error('Error during GraphQL request:', error);
        }
        //window.location.href = '/blog';
    }

    return (
        <div>
            <NavBar />
            <div className="container mt-4">
                <h2>Add Event</h2>
                <form onSubmit={handleSubmit} className="mt-3">
                    <div className="form-group">
                        <label htmlFor="name">Event Name:</label>
                        <input type="text" className="form-control" id="name" name="name" value={inputs.name || ""} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input type="text" className="form-control" id="address" name="address" value={inputs.address || ""} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City:</label>
                        <input type="text" className="form-control" id="city" name="city" value={inputs.city || ""} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="state">State:</label>
                        <input type="text" className="form-control" id="state" name="state" value={inputs.state || ""} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="country">Country:</label>
                        <input type="text" className="form-control" id="country" name="country" value={inputs.country || ""} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="zip">Zip code:</label>
                        <input type="text" className="form-control" id="zip" name="zip" value={inputs.zip || ""} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="startTime">Start Date:</label>
                        <input type="date" className="form-control" id="startTime" name="startTime" step="1" value={inputs.startTime || new Date().toString()} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="endTime">End Date:</label>
                        <input type="date" className="form-control" id="endTime" name="endTime" step="1" value={inputs.endTime || new Date().toString()} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Create;