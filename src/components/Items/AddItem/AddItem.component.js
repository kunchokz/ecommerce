import React, { Component } from 'react'
import { ItemForm } from '../ItemForm/ItemForm.component'
import { httpClient } from './../../../utils/httpClient'
import { errorHandler } from './../../../utils/errorHandler'
import { notify } from '../../../utils/notify'
export default class AddItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isSubmitting: false
    }
  }

  add = (data, files) => {
    // http call
    this.setState({
      isSubmitting: true
    })
    httpClient.UPLOAD('POST', '/item', data, files)
      .then(response => {
        notify.showSuccess("Item Added Successfully");
        this.props.history.push('/view_items')
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
      <div>
        <ItemForm
          title="Add Item"
          description="Please Add necessary detail to add item"
          submitCallback={this.add}
          isSubmitting={this.isSubmitting}
        ></ItemForm>
      </div>
    )
  }
}
