import React, { Component } from 'react'
import { errorHandler } from '../../../utils/errorHandler'
import { httpClient } from '../../../utils/httpClient'
import { notify } from '../../../utils/notify'
import { SubmitButton } from '../../Common/SubmitButton/SubmitButton.component'
import { ViewItems } from '../ViewItems/ViewItems.component'

const formFields = {
  name: '',
  category: '',
  brand: '',
  minPrice: '',
  maxPrice: '',
  fromDate: '',
  multipleDateRange: false,
  toDate: '',
  tags: '',
}

export class SearchItems extends Component {
  constructor() {
    super()

    this.state = {
      data: {
        ...formFields
      },
      error: {
        ...formFields
      },
      isSubmitting: false,
      categories: [],
      allItems: [],
      names: [],
      searchResults: []
    }
  }

  componentDidMount() {
    httpClient.POST('/item/search', {})
      .then(({ data }) => {
        let cats = [];
        console.log('data is >>', data)
        data.forEach(item => {
          if (!cats.includes(item.category)) {
            cats.push(item.category)
          }
        })
        this.setState({
          categories: cats,
          allItems: data
        })
      })
      .catch(err => {
        errorHandler(err)
      })
  }

  handleChange = e => {
    let { type, name, value, checked } = e.target;
    if (name === 'category') {
      this.buildNames(value);
    }
    if (type === 'checkbox') {
      value = checked
    }

    this.setState(pre => ({
      data: {
        ...pre.data,
        [name]: value
      }
    }))
  }

  submit = e => {
    e.preventDefault();
    const { data } = this.state;
    if (!data.multipleDateRange) {
      data.toDate = data.fromDate;
    }
    this.setState({
      isSubmitting: true
    })

    httpClient.POST('/item/search', data)
      .then(({ data }) => {
        if (!data.length) {
          return notify.showInfo("No any item matched your search query")
        }
        this.setState({
          searchResults: data
        })
      })
      .catch(err => {
        errorHandler(err)
      })
      .finally(() => {
        this.setState({
          isSubmitting: false
        })
      })

  }
  reset = () => {
    this.setState({
      data: { ...formFields },
      searchResults: []
    })
  }

  buildNames = selectedCategory => {
    let names = this.state.allItems.filter(item => item.category === selectedCategory);
    this.setState({
      names
    })
  }

  render() {
    let content = this.state.searchResults && this.state.searchResults.length > 0
      ? <ViewItems resetSearch={this.reset} itemData={this.state.searchResults}></ViewItems>
      : <>
        <h2>Search Product</h2>
        <form className="form-group" noValidate onSubmit={this.submit}>
          <label>Category</label>
          <select name="category" className="form-control" onChange={this.handleChange}>
            <option>(Select Category)</option>
            {
              this.state.categories.map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))
            }
          </select>
          {
            this.state.names.length > 0 && (
              <>
                <label>Name</label>
                <select name="name" className="form-control" onChange={this.handleChange}>
                  <option>(Select Name)</option>
                  {
                    this.state.names.map((item, index) => (
                      <option key={index} value={item.name}>{item.name}</option>
                    ))
                  }
                </select>
              </>
            )
          }

          <label>Brand</label>
          <input type="text" name="brand" className="form-control" placeholder="Brand" onChange={this.handleChange}></input>
          <label>Min Price</label>
          <input type="number" name="minPrice" className="form-control" onChange={this.handleChange}></input>
          <label>Max Price</label>
          <input type="text" name="maxPrice" className="form-control" onChange={this.handleChange}></input>
          <label>Select Date</label>
          <input type="date" name="fromDate" className="form-control" onChange={this.handleChange}></input>
          <input type="checkbox" name="multipleDateRange" onChange={this.handleChange}></input>
          <label>&nbsp;Multiple Date Range </label>
          <br />
          {
            this.state.data.multipleDateRange && (
              <>
                <label>To Date</label>
                <input type="date" name="toDate" className="form-control" onChange={this.handleChange}></input>
              </>
            )
          }

          <label>Tags</label>
          <input type="text" name="tags" className="form-control" placeholder="Tags" onChange={this.handleChange}></input>
          <hr />
          <SubmitButton
            isSubmitting={this.state.isSubmitting}
          ></SubmitButton>
        </form>
      </>
    return content;
  }
}
