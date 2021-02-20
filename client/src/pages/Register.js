import { useState, useEffect } from 'react';
import { useAlertContext } from '../context/providers/alert';
import { useAuthContext } from '../context/providers/auth';

const Register = ({ history }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });
  const { name, email, password, passwordConfirm } = user;
  const { setAlert } = useAlertContext();
  const { registerUser, error, clearErrors, isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
    if (error === 'User already exists') {
      setAlert(error, 'danger');
      clearErrors();
    }
  }, [error, isAuthenticated, history]);

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== passwordConfirm) {
      setAlert('Passwords do not match', 'danger');
    } else {
      registerUser({
        name,
        email,
        password
      });
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input id="name" type="text" name="name" value={name} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input id="email" type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            id="passwordConfirm"
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <input type="submit" value="Register" className="btn btn-primary btn-block" />
      </form>
    </div>
  );
};

export default Register;
