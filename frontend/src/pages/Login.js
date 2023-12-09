import NavBar from "../components/NavBar";
import axios from 'axios';
import backendURL from '../config.js'
import {useHistory} from 'react-router-dom';

function Login() {
    // const history = useHistory();

    // function googleAuth(){
    //   console.log("google")
    //   const response = axios.get(backendURL.uri + "/auth/google").then((response) => console.log(response));
    // }
    
    // const handleButtonClick = () => {
    //   // Redirect to http://localhost:3000/auth/google
    //   history.push('/auth/google');
    // };
    return (
      <div className="container">
        <NavBar/>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form>
              <h3>Log In</h3>
              <div className="d-grid text-center">
                <button type="submit" className="btn btn-primary">
                  <a className="auth no-underline text-white" href="http://localhost:3000/auth/google">
                    Sign in with Google
                  </a>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

export default Login;