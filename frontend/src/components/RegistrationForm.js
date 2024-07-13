import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username:'',
    email:'',
    password:'',
    confirmPassword:'',

  });
  const [error,setError] = useState('');
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prevState => ({ 
      ...prevState,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword){
      setError('Passwords do not match');
      return;
    }

    try {
      console.log('Registering user:', formData)
      await new Promise (resolve => setTimeout(resolve, 1000));
      alert ('Registation succesful');
    } catch (error) {
      setError('Registration failed. Please try again')  
    }
  };
  
  return (
    <div className="registration-form">
      <h2>Register for Echo</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;