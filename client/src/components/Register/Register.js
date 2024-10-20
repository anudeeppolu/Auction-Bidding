import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import './Register.css'; // Add custom styles if needed
import { postRegister } from '../../actions/authService';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const toast = React.useRef(null);
  const [message, setMessage] = useState('');

  

  const validateForm = () => {
    let errors = {};
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (confirmPassword !== password) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleClear = ()=>{
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  const handleRegister = async (e) => {
    const payload = { email, password }
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const response = await postRegister(payload);
    try {
      if(response.status == 201){
        setMessage(response?.data?.message)
        console.log(response,'message')
        toast.current.show({ severity: 'success', summary:'Registration Successful', detail: 'You can now log in.' });
      }
      if(response.status == 409){
        setMessage(response?.message)
        // alert(response)
        // console.log(message,'message')
        toast.current.show({ severity: 'success', summary: 'Already Registered.', detail: 'Please log in.' });
      }
      if(response.status == 500){
        setMessage(response?.message)
        toast.current.show({ severity: 'warning', summary: 'Registration failed',detail: 'please try again'});
      }
      
    } catch (error) {
      setMessage(response?.message)
      toast.current.show({ severity: 'error', summary:'Registration Failed', detail: 'An error occurred.' });
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
    // handleClear()
  };

  return (
    <div className="register-container">
      <Toast ref={toast} />
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="field">
          <label htmlFor="email">Email:</label>
          <InputText
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={formErrors.email ? 'p-invalid' : ''}
          />
          {formErrors.email && <small className="p-error">{formErrors.email}</small>}
        </div>

        <div className="field">
          <label htmlFor="password">Password:</label>
          <Password
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            toggleMask
            feedback={false}
            className={formErrors.password ? 'p-invalid' : ''}
          />
          {formErrors.password && <small className="p-error">{formErrors.password}</small>}
        </div>

        <div className="field">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <Password
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            toggleMask
            feedback={false}
            className={formErrors.confirmPassword ? 'p-invalid' : ''}
          />
          {formErrors.confirmPassword && <small className="p-error">{formErrors.confirmPassword}</small>}
        </div>

        <Button
          label={loading ? 'Registering...' : 'Register'}
          type="submit"
          disabled={loading}
          className="p-button-rounded p-button-success"
        />
      </form>
    </div>
  );
}

export default Register;
