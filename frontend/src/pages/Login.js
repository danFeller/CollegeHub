import React from 'react';
import NavBar from "../components/NavBar";
import styled from 'styled-components';

const Center = styled.div`
  min-height: 100vh;
  display: flex;
  font-weight: 400;
  font-family: "Fira Sans", sans-serif;
`;

const Login = () => {

    const handleGoogleSignIn = async () => {
        try {
            window.open( 'http://event-management-backend-ffed50068636.herokuapp.com/auth/google')
        } catch (error) {
            console.error('Error initiating Google Sign-In:', error);
        }
    };

    return (
      <>
        <NavBar/>
        <Center>
          <div className="container">
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
        </Center>
      </>
    );
};

export default Login;