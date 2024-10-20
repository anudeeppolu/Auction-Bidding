import React, { useState, useRef } from 'react';
import { Toast } from 'primereact/toast'; // For displaying success/error messages
import { InputText } from 'primereact/inputtext';  // Correct import for InputText
import { Button } from 'primereact/button';
import axios from 'axios';  // Import Axios for API call
import './Login.css'; // Optional: for custom styles
import { postLogin } from '../../actions/authService';
import { useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";
import { useAuth } from '../Auth/Auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // For loading state
  const toast = useRef(null);
  const navigate = useNavigate()
  const cookies = new Cookies();
  const {login} = useAuth()


  // Function to handle login logic
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    const payload = { email, password }
    // API call using Axios for login
    const response = await postLogin(payload);
    try {
      if (email && password) {
        // If the response is successful
        if (response.status === 200) {
          toast.current.show({ severity: 'success', summary: 'Login Successful', detail: `Welcome, ${email}` });
          // Handle successful login (e.g., store token, redirect, etc.)
          const userData = response?.data
          login(userData)
          navigate('/home')
          localStorage.setItem('authToken',userData?.token);
          console.log('token', userData);
          // alert()
        }
        else if (response.status === 400) {
          toast.current.show({ severity: 'error', summary: 'Password is not matching', detail: 'Enter again' });
          navigate('/login')
        }
        else if (response.status === 404) {
          toast.current.show({ severity: 'error', summary: 'Email not found', detail: 'Please Register' });
          console.log('Login Response:', response.data);
        }
      } else {
        toast.current.show({ severity: 'error', summary: 'Login Failed', detail: 'Please enter email and password' });
      }
    } catch (error) {
      // Handle error cases
      console.error('Login error:', error);
      toast.current.show({ severity: 'error', summary: 'Login Error', detail: 'Something went wrong' });
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="login-container">
      <Toast ref={toast} />
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="field">
          <label htmlFor="email">Email:</label>
          <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="password">Password:</label>
          <InputText id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            label={loading ? 'Logging in...' : 'Login'}
            type="submit"
            className="p-button-rounded p-button-success"
            disabled={loading} // Disable button during loading
          />
          <Button
            label={'Register'}
            type="submit"
            className="p-button-rounded p-button-success"
            onClick={()=>{navigate('/register')}}
          />
        </div>
      </form>
    </div>
  );
}

export default Login;




