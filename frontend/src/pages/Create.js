import axios from "axios";
import React, {useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import backendURL from "../config";

function Create () {
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

        console.log(inputs)
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
                            startTime: "${inputs.sTime}"
                            endTime: "${inputs.eTime}"
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

            const responseData = await response.json();
            console.log(responseData);
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
                        <label htmlFor="stime">Start Time:</label>
                        <input type="time" className="form-control" id="stime" name="stime" step="1" value={inputs.stime || ""} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="etime">End Time:</label>
                        <input type="time" className="form-control" id="etime" name="etime" step="1" value={inputs.etime || ""} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Create;