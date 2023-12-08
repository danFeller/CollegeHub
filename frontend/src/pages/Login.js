import React from 'react';
import NavBar from "../components/NavBar";

const Login = () => {

    const handleGoogleSignIn = async () => {
        try {
            console.log("Hello, World!")
            // Make a request to http://localhost:3000/auth/google
            window.open( 'http://localhost:3000/auth/google')
        } catch (error) {
            console.error('Error initiating Google Sign-In:', error);
        }
    };

    return (
        <div className="container">
            <NavBar/>
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
                        <h3>Log In</h3>
                        <div className="d-grid text-center">
                            <button type="submit" onClick = {handleGoogleSignIn} className="btn btn-primary">
                                Sign in with Google
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;