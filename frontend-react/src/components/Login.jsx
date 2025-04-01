import { useState } from "react"
import React  from 'react'

const Login = () => {
    const[userName, setUserName] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')




  return (
    <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 bg-light-dark p-5">
                    <h3 className="text-light text-center mb-5">Login</h3>
                    <form action="">
                        <input type="text" className='form-control mb-3' placeholder='Username' name=""  />
                        
                        <input type="password" name="" placeholder='Password'  className="form-control mb-5" />
                        <button type="submit" className="btn btn-info d-block mx-auto">Login</button>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default Login