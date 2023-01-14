// statefull component

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { SubmitButton } from './../../Common/SubmitButton/SubmitButton.component'
import { errorHandler } from '../../../utils/errorHandler';
import { notify } from '../../../utils/notify';
import { httpClient } from '../../../utils/httpClient';

const defaultForm = {
  username: '',
  password: '',
}
export class Login extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        ...defaultForm
      },
      error: {
        ...defaultForm
      },
      rememberMe: false,
      isSubmitting: false
    }
  }
  componentDidMount() {
    const rememberMe = JSON.parse(localStorage.getItem('remember_me'));
    if (rememberMe) {
      this.props.history.push('/home')
    }
  }

  validateForm = () => {
    let usernamerErr;
    let passwordErr;
    let validForm = true;

    if (!this.state.data['username']) {
      usernamerErr = 'required field*';
      validForm = false;
    }

    if (!this.state.data['password']) {
      passwordErr = 'required field*';
      validForm = false;
    }

    this.setState({
      error: {
        username: usernamerErr,
        password: passwordErr
      }
    })

    return validForm;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const isValid = this.validateForm();
    if (!isValid) return;

    // this.setState({
    //   isSubmitting: true
    // })
    // API call
    httpClient.POST(`/auth/login`, this.state.data)
      .then(response => {
        notify.showSuccess(`Welcome ${response.data.user.username}`)
        // localstorage setup
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('remember_me', JSON.stringify(this.state.rememberMe))

        this.props.history.push('/dashboard')
      })
      .catch(err => {
        errorHandler(err)
      })
  }

  handleChange = (e) => {
    let { name, type, value, checked } = e.target;
    if (type === 'checkbox') {
      return this.setState({
        [name]: checked
      })
    }
    // this.state[name]=value;
    // to modify state we use this.setState method
    this.setState(preState => ({
      data: {
        ...preState.data,
        [name]: value
      }
    }), () => {
      if (this.state.error[name]) {
        this.validateForm();
      }
    })
  }

  render() {
    return (
      <div className="auth_box">
        <h2>Login</h2>
        <p>Please login to start your session!</p>
        <form className="form-group" onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input className="form-control" type="text" id="username" name="username" placeholder="Username" onChange={this.handleChange}></input>
          <p className="error">{this.state.error.username}</p>
          <label htmlFor="password">Password</label>
          <input className="form-control" type="password" id="password" name="password" placeholder="Password" onChange={this.handleChange}></input>
          <p className="error">{this.state.error.password}</p>

          <input type="checkbox" name="rememberMe" onChange={this.handleChange}></input>
          <label> &nbsp;Remeber me</label>
          <hr />
          <SubmitButton
            isSubmitting={this.state.isSubmitting}
            enabledLabel="Login"
            disabledLabel="Loging in..."
          >

          </SubmitButton>
        </form>
        <p>Don't Have an Account?</p>
        <p style={{ float: 'left' }}>Register <Link to="/register">here</Link></p>
        <p style={{ float: 'right' }}><Link to="/forgot_password">forgot password?</Link></p>
      </div>
    )
  }
}