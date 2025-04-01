import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const Register = () => {
   const [formData, setFormData] = useState({
    userName:'',
    email:'',
    password:'',
   })

   const handleChange = (e) =>{
    setFormData({
        ...formData,
        [e.target.name]:e.target.value
     })
   }

   const handlRegistration = async (e)=>{
    e.preventDefault()
    const userData = {
      username: formData.userName,
      email: formData.email,
      password: formData.password,
    };
    try{
        const respone = await axios.post("http://127.0.0.1:8000/api/v1/register/", userData);
        console.log("response data",respone.data)
        console.log("registration successful")
    }catch(error){
        console.error('registration failed', error.respone.data)
    }
   }
  return (
    <>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 bg-light-dark p-5">
                    <h3 className="text-light text-center mb-5">Create an Account</h3>
                    <form onSubmit={handlRegistration}>
                        <input type="text" className='form-control mb-3' placeholder='Username' name="userName" value={formData.userName} onChange={handleChange} />
                        
                        <input type="email" name="email" placeholder='Email Address'  className="form-control mb-3" value={formData.email} onChange={handleChange}/>
                        
                        <input type="password" name="password" placeholder='Set Password'  className="form-control mb-5" value={formData.password} onChange={handleChange}/>
                        
                        <button type="submit" className="btn btn-info d-block mx-auto">Register</button>
                    </form>
                </div>
            </div>
        </div>


    </>
  )
}

export default Register