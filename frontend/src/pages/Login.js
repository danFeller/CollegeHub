import NavBar from "../components/NavBar";

function Login() {
    return (
      <div class="container">
        <NavBar/>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form>
              <h3>Log In</h3>
              <div className="d-grid text-center">
                <button type="submit" className="btn btn-primary">
                  Sign in with Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

export default Login;