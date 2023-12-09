import React, { useState } from 'react';
import NavBar from "../components/NavBar";

function Create () {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = (event) => {
        console.log(inputs)
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
                        <label htmlFor="type">Type:</label>
                        <input type="text" className="form-control" id="type" name="type" value={inputs.type || ""} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Date:</label>
                        <input type="date" className="form-control" id="date" name="date" value={inputs.date || ""} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="time">Time:</label>
                        <input type="time" className="form-control" id="time" name="time" value={inputs.time || ""} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location:</label>
                        <input type="text" className="form-control" id="location" name="location" value={inputs.location || ""} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Create;