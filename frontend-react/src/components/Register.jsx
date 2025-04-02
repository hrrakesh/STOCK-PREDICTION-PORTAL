import React from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import axios from 'axios'

const Register = () => {
   const [formData, setFormData] = useState({
    userName:'',
    email:'',
    password:'',
   })
   
   const [errors, setErrors] = useState({})
   const [success, setSuccess] = useState(false)
   const [loading, setLoading] = useState(false)

   const handleChange = (e) =>{
    setFormData({
        ...formData,
        [e.target.name]:e.target.value
     })

   }

   const handlRegistration = async (e)=>{
        e.preventDefault()
        setLoading(true);

        const userData = {
        username: formData.userName,
        email: formData.email,
        password: formData.password,
    };
    try{
        const respone = await axios.post("http://127.0.0.1:8000/api/v1/register/", userData);
        console.log("response data",respone.data)
        console.log("registration successful")
        setErrors({})
        setSuccess(true)
        setFormData({
          userName: "",
          email: "",
          password: "",
        });
    }catch(error){
        setErrors(error.response.data)
        console.error("registration failed", error.response.data);
    }finally{
        setLoading(false)
    }
   }
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 bg-light-dark p-5">
            <h3 className="text-light text-center mb-5">Create an Account</h3>
            <form onSubmit={handlRegistration}>
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Username"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                />

                <small>
                  {errors.username && (
                    <div className="text-danger">{errors.username}</div>
                  )}
                </small>
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="form-control mb-3"
                  value={formData.email}
                  onChange={handleChange}
                />

                <small>
                  {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </small>
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

                <small>
                  {errors.password && (
                    <div className="text-danger">{errors.password}</div>
                  )}
                </small>
              </div>

              {success && (
                <div
                  className="alert alert-success alert-dismissible fade show"
                  role="alert"
                >
                  Registration Successful
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    onClick={() => setSuccess(false)}
                  ></button>
                </div>
              )}

              {loading ? (
                <button
                  type="submit"
                  className="btn btn-danger d-block mx-auto"
                  disabled
                >
                  <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                  Please Wait
                </button>
              ) : (
                <button type="submit" className="btn btn-info d-block mx-auto">
                  Register
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register