import React, { Fragment, useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
      e.preventDefault();
      if (password !== password2) {
        console.log('Passwords do not match');

      }else{
       const newUser ={
        email,
        password
       };

       try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };

        const body = JSON.stringify(newUser);
        const res = await axios.post('http://localhost:5000/api/users', body, config);
        console.log(res.data);
       } catch (err) {
        console.error(err.response.data);
       }
      }
    };

  return (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Registrarse</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Cree su cuenta
        </p>
        <form className='form' onSubmit={e => onSubmit(e)}>
          
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              minLength='6'
              value={password}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Confirmar Password'
              name='password2'
              minLength='6'
              value={password2}
              onChange={(e) => onChange(e)}
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Registrar' />
        </form>
        <p className='my-1'>
          Ya estás registrado? <a href='login.html'>Iniciar Sesión</a>
        </p>
      </section>
    </Fragment>
  );
};
export default Register;
