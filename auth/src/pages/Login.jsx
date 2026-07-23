import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
            email: "",
            password: "",

        });

    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState("");
    
        const handleChange = (e) => {
            const { name, value, type, checked } = e.target;
            setFormData((prev) => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            }));
        };
    
        const validate = () => {
            const newErrors = {};
            if (!formData.email.trim()) newErrors.email = "Email is required";
            else if (!/\S+@\S+\.\S+/.test(formData.email))
                newErrors.email = "Enter a valid email";
            if (!formData.password) newErrors.password = "Password is required";
            else if (formData.password.length < 8)
                newErrors.password = "At least 8 characters";
            return newErrors;
        };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = validate();
        setErrors(newErrors);
        setLoginError(""); // Reset login error on new submission

        if (Object.keys(newErrors).length > 0) {
            return; // stop here if validation failed, don't hit the API
        }

        axios.post('http://localhost:3001/login', {
            email: formData.email,
            password: formData.password,
        })
        .then(result => { console.log(result) 
            navigate('/home')
        })
        .catch(error => { console.log(error) 
            setLoginError("Invalid email or password. Please try again.");
        })
    }

  return (
    <div className="register-container">
        <div className="register-card">
            <h1>Welcome Back</h1>
            <p>Please enter your details to login</p>
            <form className="register-form" onSubmit={handleSubmit} noValidate>
                <div className="register-inputs">
                    <label htmlFor="email">Email:  </label>
                    <input type="email" placeholder="Enter your email" name="email" value={formData.email} onChange={handleChange}/>
                    {errors.email && <span className="error-text">{errors.email}</span>}
                    {loginError && <span className="error-text">{loginError}</span>}
                </div>

                <div className="register-inputs">
                    <label htmlFor="password">Password:  </label>
                    <input type="password" placeholder="Enter your password" name="password" value={formData.password} onChange={handleChange}/>
                    {errors.password && <span className="error-text">{errors.password}</span>}
                </div>

                <div className="register-inputs login-remember">
                    <label className="login-remember-label">
                        <input type="checkbox" name="remember" />
                        <span>Remember me</span>
                    </label>
                    <span className="login-forgot">
                        <a href="/forgot-password">Forgot Password?</a>
                    </span>
                </div>

                
                <button type="submit" className="register-submit">Login</button>
                <p className="register-login">
                    Don't have an account? <a href="/register">Sign up</a>
                </p>
            </form>
        </div>
        
    </div>
  )
}

export default Login
