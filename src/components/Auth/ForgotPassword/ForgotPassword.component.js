import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { errorHandler } from '../../../utils/errorHandler';
import { httpClient } from '../../../utils/httpClient';
import { notify } from '../../../utils/notify';
import { SubmitButton } from '../../Common/SubmitButton/SubmitButton.component';

export class ForgotPassword extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      emailErr: '',
      isSubmitting: false
    }
  }
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      isSubmitting: true
    })
    httpClient
      .POST('/auth/forgot-password', { email: this.state.email })
      .then(response => {
        this.props.history.push('/');
        notify.showSuccess("password reset link sent to your email please check inbox")
      })
      .catch(err => {
        errorHandler(err);
        this.setState({
          isSubmitting: false
        })
      })

  }

  render() {
    return (
      <div className="auth_box">
        <h2>Forgot Password</h2>
        <p>Please provide your email address to reset your password</p>
        <form className="form-group" onSubmit={this.handleSubmit}>
          <label>Email</label>
          <input type="text" name="email" placeholder="Email" className="form-control" onChange={this.handleChange}></input>
          <hr />
          <SubmitButton
            isSubmitting={this.state.isSubmitting}></SubmitButton>
        </form>
        <p>back to <Link to="/">login</Link></p>
      </div>
    )
  }
}
