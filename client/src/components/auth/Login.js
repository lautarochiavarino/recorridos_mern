import React, { Fragment, useState } from 'react';
import {Link} from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    
    email: '',
    password: ''
    
  });

  const { email, password, } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
      e.preventDefault();
      

      console.log('succes');
      }
   

  return (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Iniciar Sesión</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Ingrese su cuenta
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
          
          <input type='submit' className='btn btn-primary' value='Iniciar Sesión' />
        </form>
        <p className='my-1'>
          No tenes cuenta? <Link to ='/register'>Registrarse</Link>
        </p>
      </section>
    </Fragment>
  );
};
export default Login;
