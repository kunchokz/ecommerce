import React, { Component } from 'react';
import { SubmitButton } from '../../Common/SubmitButton/SubmitButton.component';
import { Link } from 'react-router-dom';
import { errorHandler } from '../../../utils/errorHandler';
import { notify } from '../../../utils/notify';
import { httpClient } from '../../../utils/httpClient';

const defaultForm = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  username: '',
  password: '',
  confirmPassword: '',
  gender: '',
  dob: '',
  permanentAddress: '',
  temporaryAddress: ''
}
export class Register extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        ...defaultForm
      },
      error: {
        ...defaultForm
      },
      isSubmitting: false,
      isValidForm: false
    }
  }

  handleChange = e => {
    const { name, value } = e.target;

    this.setState((preState) => ({
      data: {
        ...preState.data,
        [name]: value
      }
    }), () => {
      this.validateFrom(name)
    })
  }

  validateFrom = fieldName => {

    let errMsg;
    switch (fieldName) {
      case 'username':
        errMsg = this.state.data[fieldName]
          ? this.state.data[fieldName].length > 6
            ? ''
            : 'username must be 6 characters long'
          : 'required field*'
        break;
      case 'password':
        errMsg = this.state.data['confirmPassword']
          ? this.state.data['confirmPassword'] === this.state.data[fieldName]
            ? ''
            : 'password didnot match'
          : this.state.data[fieldName]
            ? this.state.data[fieldName].length > 8
              ? ''
              : 'weak password'
            : 'required field*'
        break;
      case 'confirmPassword':
        errMsg = this.state.data['password']
          ? this.state.data[fieldName] === this.state.data['password']
            ? ''
            : 'password didnot match'
          : this.state.data[fieldName]
            ? this.state.data[fieldName].length > 6
              ? ''
              : 'password must be 6 characters long'
            : 'required field*'
        break;

      case 'email':
        errMsg = this.state.data[fieldName]
          ? this.state.data[fieldName].includes('.com') && this.state.data[fieldName].includes('@')
            ? ''
            : 'invalid email'
          : 'required field*'
        break;

      default:
        break;
    }
    this.setState(preState => ({
      error: {
        ...preState.error,
        [fieldName]: errMsg
      }
    }), () => {
      const errors = Object
        .values(this.state.error)
        .filter(err => err);

      this.setState({
        isValidForm: errors.length === 0
      })
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    httpClient
      .POST(`/auth/register`, this.state.data)
      .then(response => {
        notify.showSuccess('Registration successfull please login');
        this.props.history.push('/');
      })
      .catch(err => {
        errorHandler(err)
      })
  }


  render() {
    return (
      <div className="auth_box">
        <h2>Register</h2>
        <p>Please Register to use our application</p>
        <form onSubmit={this.handleSubmit} className="form-group">
          <label>First Name</label>
          <input type="text" name="firstName" placeholder="First Name" className="form-control" onChange={this.handleChange} ></input>
          <label>Last Name</label>
          <input type="text" name="lastName" placeholder="Last Name" className="form-control" onChange={this.handleChange} ></input>
          <label>Username</label>
          <input type="text" name="username" placeholder="Username" className="form-control" onChange={this.handleChange} ></input>
          <p className="error"> {this.state.error.username}</p>
          <label>Password</label>
          <input type="password" name="password" placeholder="Password" className="form-control" onChange={this.handleChange} ></input>
          <p className="error"> {this.state.error.password}</p>
          <label>Confirm password</label>
          <input type="password" name="confirmPassword" placeholder="Confirm password" className="form-control" onChange={this.handleChange} ></input>
          <p className="error"> {this.state.error.confirmPassword}</p>
          <label>Email</label>
          <input type="text" name="email" placeholder="Email" className="form-control" onChange={this.handleChange} ></input>
          <p className="error"> {this.state.error.email}</p>

          <label>D.O.B</label>
          <input type="date" name="dob" className="form-control" onChange={this.handleChange} ></input>
          <label>Phone Number</label>
          <input type="number" name="phoneNumber" className="form-control" onChange={this.handleChange} ></input>
          <label>Gender</label>
          <input type="text" name="gender" placeholder="Gender" className="form-control" onChange={this.handleChange} ></input>
          <label>Permanent Address</label>
          <input type="text" name="permanentAddress" placeholder="Permanent Address" className="form-control" onChange={this.handleChange} ></input>
          <label>Temporary Address</label>
          <input type="text" name="temporaryAddress" placeholder="Temporary Address" className="form-control" onChange={this.handleChange} ></input>
          <hr />
          <SubmitButton
            isSubmitting={this.state.isSubmitting}
            isDisabled={!this.state.isValidForm}
          ></SubmitButton>
        </form>
        <p>Already Registered?</p>
        <p>Back to <Link to="/">login</Link></p>
      </div>
    )
  }
}