import React, { Component } from 'react'
import { errorHandler } from '../../../utils/errorHandler'
import { httpClient } from '../../../utils/httpClient'
import { notify } from '../../../utils/notify'
import { Loader } from '../../Common/Loader/Loader.component'
import { ItemForm } from '../ItemForm/ItemForm.component'

export class EditItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      item: {},
      isSubmitting: false
    }
  }
  componentDidMount() {
    this.setState({
      isLoading: true
    })
    this.itemId = this.props.match.params['id']
    httpClient.GET(`/item/${this.itemId}`, true)
      .then(response => {
        this.setState({
          item: response.data
        })
      })
      .catch(err => {
        errorHandler(err)
      })
      .finally(() => {
        this.setState({
          isLoading: false
        })
      })
  }

  edit = (data, files) => {
    // http call
    this.setState({
      isSubmitting: true
    })

    httpClient.UPLOAD('PUT', `/item/${this.itemId}`, data, files)
      .then(response => {
        notify.showInfo("Item Updated Succesfully");
        this.props.history.push('/view_items');
      })
      .catch(err => {
        errorHandler(err)
        this.setState({
          isSubmitting: false
        })
      })
  }

  render() {
    let content = this.state.isLoading
      ? <Loader></Loader>
      : <ItemForm
        title="Update Item"
        description=""
        submitCallback={this.edit}
        isSubmitting={this.state.isSubmitting}
        itemData={this.state.item}
      >

      </ItemForm>
    return content;
  }
}
