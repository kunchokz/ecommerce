import React, { Component } from 'react'
import { SubmitButton } from '../../../Common/SubmitButton/SubmitButton.component';
import ReactStarsRating from 'react-awesome-stars-rating';
import { connect } from 'react-redux';
import { addReview_ac } from './../../../../actions/item.ac'
const defaultFormField = {
  point: 0,
  message: ''
}
class AddReviewComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {
        ...defaultFormField
      }
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState(pre => ({
      data: {
        ...pre.data,
        [name]: value
      }
    }))
  }

  onRatingPointChange = (val) => {
    this.setState(pre => ({
      data: {
        ...pre.data,
        point: val
      }
    }))
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.addReview_ac(this.state.data, this.props.itemId)
    this.setState({
      data: {
        ...defaultFormField
      }
    })
  }
  render() {
    return (
      <>
        <h2>Add Review</h2>
        <form className="form-group" onSubmit={this.handleSubmit}>
          <label>Point</label>
          <br />
          <ReactStarsRating onChange={(val) => this.onRatingPointChange(val)} value={this.state.data.point} />
          <br />
          <br />
          <label>Message</label>
          <input type="text" value={this.state.data.message} name="message" placeholder="Message here..." className="form-control" onChange={this.handleChange}></input>
          <hr />
          <SubmitButton></SubmitButton>

        </form>

      </>
    )
  }
}
// const mapStateToProps = {}
const mapDispatchToProps = dispatch => ({
  addReview_ac: (reviewData, id) => dispatch(addReview_ac(reviewData, id))
})
export const AddReview = connect(null, mapDispatchToProps)(AddReviewComponent)
