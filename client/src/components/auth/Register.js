import React, { Fragment, useState } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {setAlert} from '../../actions/alert';
import PropTypes from 'prop-types';

// import axios from 'axios';

const Register = ({setAlert}) => {
  const [formData, setFormData] = useState({
  
    email: '',
    password: '',
    password2: '',
  });

  const { email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
      e.preventDefault();
      if (password !== password2) {
        setAlert('El password no coincide', 'danger', 3000);

      }else{
      //  const newUser ={
      //   email,
      //   password
      //  };

      //  try {
      //   const config = {
      //     headers: {
      //       'Content-Type': 'application/json'
      //     }

       
      //   };

      //   const body = JSON.stringify(newUser);
      //   const res = await axios.post('http://localhost:5000/api/users', body, config);
      //   console.log(res.data);
      //  } catch (err) {
      //   console.error(err.response.data);
      //  }

      console.log('succes');
      }
    };

  return (
    <Fragment>
    
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
          Ya estás registrado? <Link to='/login'>Iniciar Sesión</Link>
        </p>
     
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired
}
export default connect(null,{setAlert})(Register);
