import "./Login.css";
import { useState, useRef, useContext } from "react";
import { StoreContext } from "../../Context/StoreContextProvider";
import axios from "axios";

function Login({ setShowLogin }) {
  const { url, token, setToken } = useContext(StoreContext);

  const containerRef = useRef(null);

  const [currentState, setCurrentState] = useState("Log In");

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setShowLogin(false);
    }
  };

  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setdata((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    let newUrl = url;

    if (currentState === "Log In") {
      newUrl += "/api/v1/user/login";
    } else if (currentState === "Sign Up") {
      newUrl += "/api/v1/user/register";
    }

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token); // save token in local storage ->( key , value )
      setShowLogin(false);
    } else {
      alert(response.data.message); // implement later
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper" onClick={handleClickOutside}>
        <div className="loginContainer" ref={containerRef}>
          <form className="loginPopup" onSubmit={onLogin}>
            <div className="loginPopupTitle">
              <h2>{currentState}</h2>
            </div>
            <button
              className="closeLoginButton"
              onClick={() => setShowLogin(false)}
            >
              <i class="bx bx-x"></i>
            </button>
            <div className="loginInputs">
              {currentState === "Log In" ? (
                <></>
              ) : (
                <>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    onChange={onChangehandler}
                    value={data.name}
                  />
                </>
              )}

              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                onChange={onChangehandler}
                value={data.email}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                required
                onChange={onChangehandler}
                value={data.password}
              />
            </div>
            <button className="authButton" type="submit">
              {currentState === "Sign Up" ? "Sign Up" : "Log In"}
            </button>
            <div className="horizontalLine"></div>
            <div className="changeLoginSignUpSection">
              {currentState === "Sign Up" ? (
                <p>
                  Already have an account?{" "}
                  <span
                    className="authChange"
                    onClick={() => setCurrentState("Log In")}
                  >
                    Log in
                  </span>
                </p>
              ) : (
                <p>
                  Don't have an account?{" "}
                  <span
                    className="authChange"
                    onClick={() => setCurrentState("Sign Up")}
                  >
                    Sign up
                  </span>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
