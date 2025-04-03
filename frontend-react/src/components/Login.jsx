import { use, useContext, useState } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setErrors] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userData = {
      username: formData.username,
      password: formData.password,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/token/",
        userData
      );
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      console.log("Login successful");
      navigate("/dashboard");
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Invalid Credentials");
      setErrors("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-light-dark p-5">
          <h3 className="text-light text-center mb-5">Login to our Portal</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-2">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                name="password"
                placeholder="Set Password"
                className="form-control mb-2"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {error && <div className="text-danger">{error}</div>}
            {loading ? (
              <button
                type="submit"
                className="btn btn-danger d-block mx-auto"
                disabled
              >
                <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                Logging In..
              </button>
            ) : (
              <button type="submit" className="btn btn-info d-block mx-auto">
                Login
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
