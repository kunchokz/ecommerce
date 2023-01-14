import React, { Component } from 'react'
import { errorHandler } from '../../../utils/errorHandler';
import { httpClient } from '../../../utils/httpClient';
import { notify } from '../../../utils/notify';
import { SubmitButton } from '../../Common/SubmitButton/SubmitButton.component';

const defaultFormFields = {
  password: '',
  confirmPassword: ''
}
export class ResetPassword extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: { ...defaultFormFields },
      error: { ...defaultFormFields },
      isSubmitting: false
    }
  }
  componentDidMount() {
    this.userId = this.props.match.params['token'];

  }
  handleChange = e => {
    const { name, value } = e.target;
    this.setState(preState => ({
      data: {
        ...preState.data,
        [name]: value
      }
    }))

  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      isSubmitting: true
    })
    httpClient.POST(`/auth/reset-password/${this.userId}`, this.state.data)
      .then(response => {
        notify.showSuccess("Password Reset Successfull please login")
        this.props.history.push('/')
      })
      .catch(err => {
        errorHandler(err)
        this.setState({
          isSubmitting: false
        })
      })
  }

  render() {
    return (
      <div className="auth_box">
        <h2>Reset Password</h2>
        <p>Please choose your password</p>
        <form className="form-group" noValidate onSubmit={this.handleSubmit}>
          <label>Password</label>
          <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleChange}></input>
          <label>Confirm Passwor</label>
          <input type="password" className="form-control" name="confirmPassword" placeholder="Confirm Password" onChange={this.handleChange}></input>

          <hr />
          <SubmitButton type="submit" isSubmitting={this.state.isSubmitting}></SubmitButton>
        </form>
      </div>
    )
  }
}
