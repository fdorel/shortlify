import React, { useEffect, useState, useContext } from 'react';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';
import {AuthContext} from '../context/AuthContext';

export const AuthPage = () => {
  // in this object are all that data that we are sending to Provider 
  // this means that inside 'auth' we have a method called 'login' that we can call.
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({ email: '', password: '' })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      // 1 - url, 2 - method 'post', 3 - data that we want to send to the server (in this case the email and password from above:  const [form, setForm] = useState({ email: '', password: '' })
      // that is why we destruct the local state 'form'
      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message)
    } catch (e) {
      
    }
  }

  const loginHandler = async () => {
    try {
      // 1 - url, 2 - method 'post', 3 - data that we want to send to the server (in this case the email and password from above:  const [form, setForm] = useState({ email: '', password: '' })
      // that is why we destruct the local state 'form'
      const data = await request('/api/auth/login', 'POST', {...form})
      //auth.login(data.token, data.userId)
      auth.login(data.token, data.userId)
    } catch (e) {
      
    }
  }

  return (
    <div className="row">
     <div className="col s10 offset-s1">
       <h1>Shorten URL</h1>
       <div className="card blue-grey darken-3">
        <div className="card-content white-text">
          <span className="card-title">Authorization</span>
          <div>

          <div className="input-field">
            <input placeholder="Enter your email"
              id="email"
              type="text"
              name="email"
              className="green-input"
              value={form.email}
              onChange={changeHandler}/>
              <label htmlFor="email"></label>
            </div>  

            <div className="input-field">
            <input placeholder="Enter your password"
              id="password"
              type="password"
              name="password" 
              className="green-input"
              value={form.password}
              onChange={changeHandler}/>
              <label htmlFor="password"></label>
            </div> 

          </div>
        </div>
        <div className="card-action">
          <button
            className="btn light-blue lighten-1 white-text" 
            style={{marginRight: 20}}
            onClick={loginHandler}
            disabled={loading}
            >
              Login
          </button>
          <button 
            className="btn teal accent-4 white-text"
            onClick={registerHandler}
            // if the flag 'loading' is true, then we block it by disable===true
            disabled={loading}
            >
              Register
          </button>
        </div>
      </div>
     </div>
    </div>
  )
}
