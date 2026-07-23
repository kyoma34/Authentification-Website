import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = "Enter a valid email";
        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 8)
            newErrors.password = "At least 8 characters";
        if (formData.confirmPassword !== formData.password)
            newErrors.confirmPassword = "Passwords do not match";
        if (!formData.acceptTerms)
            newErrors.acceptTerms = "You must accept the terms";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = validate();
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return; // stop here if validation failed, don't hit the API
        }

        axios.post('http://localhost:3001/register', {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
        })
        .then(result => { console.log(result) 
            navigate('/login')
        })
        .catch(error => { console.log(error) })
    }

  return (
    <div className="register-container">
        <div className="register-card">
            <h1>Create an Account</h1>
            <p>Fill in the form below to create an account</p>
            <form className="register-form" onSubmit={handleSubmit} noValidate>
                <div className="register-inputs">
                    <label htmlFor="name">Name:  </label>
                    <input type="text" placeholder="Enter your name" name="name" value={formData.name} onChange={handleChange}/>
                    {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="register-inputs">
                    <label htmlFor="email">Email:  </label>
                    <input type="email" placeholder="Enter your email" name='email' value={formData.email} onChange={handleChange}/>
                    {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="register-inputs">
                    <label htmlFor="password">Password:  </label>
                    <input type="password" placeholder="Enter your password" name='password' value={formData.password} onChange={handleChange}  />
                    {errors.password && <span className="error-text">{errors.password}</span>}
                </div>

                <div className="register-inputs">
                    <label htmlFor="confirmPassword">Confirm Password:  </label>
                    <input type="password" placeholder="Confirm your password" name='confirmPassword' value={formData.confirmPassword} onChange={handleChange}/>
                    {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                </div>

                <div className="register-inputs register-accept">
                    <label className="register-accept-label">
                        <input type="checkbox" id="acceptTerms" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange}/>
                        <span>I agree to the terms and conditions</span>
                    </label>
                    {errors.acceptTerms && (
                        <span className="error-text">{errors.acceptTerms}</span>
                    )}
                </div>
                <button type="submit" className="register-submit">Sign Up</button>
                <p className="register-login">
                    Already have an account? <a href="/login">Log in</a>
                </p>
            </form>
        </div>

    </div>
  )
}

export default Register