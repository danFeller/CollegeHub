import axios from "axios";
import React, {useEffect, useState} from 'react';
import { gql, useMutation} from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/NavBar";

const CREATE_EVENT = gql`
    mutation createEvent($input: CreateEventInput!) {
        createEvent(input: $input ) {
            id
            name
        }
    }
`

function Create () {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const [userId, setUserId] = useState('')

    const [createEvent] = useMutation(CREATE_EVENT);

    const getUser = async () => {
        try {
            const url = `http://event-management-backend-ffed50068636.herokuapp.com/login/success`;
            const { data: { user, isAuthenticated }} = await axios.get(url, { withCredentials: true });
            console.log(isAuthenticated)
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
        console.log(userId)
        event.preventDefault();
        try{
            await createEvent({
                variables: {
                    input: {
                        name: `${inputs.name}`,
                        organizer: userId,
                        location: {
                            address: `${inputs.address}`,
                            city: `${inputs.city}`,
                            state: `${inputs.state}`,
                            country: `${inputs.country}`,
                            zipcode: `${inputs.zip}`,
                        },
                        startTime: `${inputs.startTime}`,
                        endTime: `${inputs.endTime}`
                    }
                }
            })
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