import React, { Component } from 'react'
import { formatDate } from '../../../utils/date.util'
import { SubmitButton } from './../../Common/SubmitButton/SubmitButton.component'
import { FaTrashAlt } from 'react-icons/fa'

const IMG_URL = process.env.REACT_APP_IMG_URL;

const defaultState = {
  name: '',
  category: '',
  brand: '',
  color: '',
  price: '',
  description: '',
  quantity: '',
  batchNo: '',
  modelNo: '',
  manuDate: '',
  expiryDate: '',
  salesDate: '',
  purchasedDate: '',
  discountedItem: false,
  discountType: '',
  discountValue: '',
  warrentyStatus: false,
  warrentyPeriod: '',
  tags: '',
  isReturnEligible: false,
  returnedDate: ''
}

export class ItemForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {
        ...defaultState
      },
      error: {
        ...defaultState
      },
      filesToUpload: [],
      filesToPreview: [], //for existing images
      filesToRemove: []
    }
  }
  componentDidMount() {
    const { itemData } = this.props;
    if (itemData) {
      this.setState({
        data: {
          ...defaultState,
          ...itemData,
          discountedItem: itemData.discount && itemData.discount.discountedItem ? true : false,
          discountType: itemData.discount && itemData.discount.discountType ? itemData.discount.discountType : '',
          discountValue: itemData.discount && itemData.discount.discountValue ? itemData.discount.discountValue : '',
          purchasedDate: itemData.purchasedDate ? formatDate(itemData.purchasedDate, 'YYYY-MM-DD') : '',
          manuDate: itemData.manuDate ? formatDate(itemData.manuDate, 'YYYY-MM-DD') : '',
          expiryDate: itemData.expiryDate ? formatDate(itemData.expiryDate, 'YYYY-MM-DD') : '',
          salesDate: itemData.salesDate ? formatDate(itemData.salesDate, 'YYYY-MM-DD') : ''
        },
        filesToPreview: itemData.images
      })

    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { data, filesToRemove, filesToUpload } = this.state;
    data.filesToRemove = filesToRemove
    this.props.submitCallback(data, filesToUpload);

  }
  handleChange = e => {
    let { name, value, type, checked, files } = e.target;
    const { filesToUpload } = this.state;
    if (type === 'file') {
      filesToUpload.push(files[0])
      return this.setState({
        filesToUpload
      }, () => {
        console.log('file stored in state >>', this.state.filesToUpload)
      })
    }
    if (type === 'checkbox') {
      value = checked
    }
    this.setState(preState => ({
      data: {
        ...preState.data,
        [name]: value
      }
    }))
  }
  removeSelectedImage = (file, index) => {
    const { filesToUpload } = this.state;
    filesToUpload.splice(index, 1);
    this.setState({
      filesToUpload
    })
  }

  removeExistingImage = (file, index) => {
    console.log('file is >>', file)
    const { filesToPreview, filesToRemove } = this.state;
    filesToRemove.push(file)
    filesToPreview.splice(index, 1);
    this.setState({
      filesToPreview,
      filesToRemove
    })
  }

  render() {
    const { data, filesToUpload, filesToPreview } = this.state;

    return (
      <>
        <h2>{this.props.title}</h2>
        <p>{this.props.description}</p>
        <form className="form-group" onSubmit={this.handleSubmit} noValidate>
          <label>Name</label>
          <input type="text" value={data.name} name="name" placeholder="Name" className="form-control" onChange={this.handleChange}></input>
          <label>Description</label>
          <textarea name="description" value={data.description} rows="6" placeholder="Description" className="form-control" onChange={this.handleChange}></textarea>
          <label>Category</label>
          <input type="text" name="category" value={data.category} placeholder="Category" className="form-control" onChange={this.handleChange}></input>
          <label>Brand</label>
          <input type="text" name="brand" value={data.brand} placeholder="Brand" className="form-control" onChange={this.handleChange}></input>
          <label>Color</label>
          <input type="text" name="color" value={data.color} placeholder="Color" className="form-control" onChange={this.handleChange}></input>
          <label>Price</label>
          <input type="number" name="price" value={data.price} className="form-control" onChange={this.handleChange}></input>
          <label>Quantity</label>
          <input type="number" name="quantity" value={data.quantity} className="form-control" onChange={this.handleChange}></input>
          <label>Batch No</label>
          <input type="text" name="batchNo" value={data.batchNo} placeholder="Batch No" className="form-control" onChange={this.handleChange}></input>
          <label>ModelNo</label>
          <input type="text" name="modelNo" value={data.modelNo} placeholder="ModelNo" className="form-control" onChange={this.handleChange}></input>
          <label>Manu Date</label>
          <input type="date" name="manuDate" value={data.manuDate} className="form-control" onChange={this.handleChange}></input>
          <label>Expiry Date</label>
          <input type="date" name="expiryDate" value={data.expiryDate} className="form-control" onChange={this.handleChange}></input>
          <label>Purchased Date</label>
          <input type="date" name="purhcasedDate" value={data.purchasedDate} className="form-control" onChange={this.handleChange}></input>
          <input type="checkbox" checked={data.discountedItem} name="discountedItem" onChange={this.handleChange}></input>
          <label> &nbsp; Discounted Item</label>
          <br />
          {data.discountedItem && (
            <>
              <label>Discount Type</label>
              <input type="text" value={data.discountType} name="discountType" placeholder="Discount Type" className="form-control" onChange={this.handleChange}></input>
              <label>Discount Value</label>
              <input type="text" value={data.discountValue} name="discountValue" placeholder="Discount Value" className="form-control" onChange={this.handleChange}></input>
            </>
          )}
          <input type="checkbox" checked={data.warrentyStatus} name="warrentyStatus" onChange={this.handleChange}></input>
          <label> &nbsp; Warrenty Status</label>
          <br />
          {data.warrentyStatus && (
            <React.Fragment>
              <label>Warrenty Period</label>
              <input type="text" value={data.warrentyPeriod} name="warrentyPeriod" placeholder="Warrenty Period" className="form-control" onChange={this.handleChange}></input>
            </React.Fragment>
          )}
          <label>Tags</label>
          <input type="text" value={data.tags} name="tags" placeholder="Tags" className="form-control" onChange={this.handleChange}></input>
          <input type="checkbox" checked={data.isReturnEligible} name="isReturnEligible" onChange={this.handleChange}></input>
          <label> &nbsp; Return Eligible</label>
          <br></br>
          <label>Choose Image</label>
          <input type="file" className="form-control" onChange={this.handleChange} />
          {
            filesToUpload.map((file, index) => (
              <div key={index} style={{ margin: '5px' }} >
                <img src={URL.createObjectURL(file)} alt="item_image.png" width="150px"></img>
                <span title="Remove Image" onClick={() => this.removeSelectedImage(file, index)} style={{ marginLeft: '10px', color: 'red', cursor: 'pointer' }}>
                  <FaTrashAlt></FaTrashAlt>
                </span>

              </div>
            ))
          }
          {
            filesToPreview.map((file, index) => (
              <div key={index} style={{ margin: '5px' }} >
                <img src={`${IMG_URL}${file}`} alt="item_image.png" width="150px"></img>
                <span title="Remove Image" onClick={() => this.removeExistingImage(file, index)} style={{ marginLeft: '10px', color: 'red', cursor: 'pointer' }}>
                  <FaTrashAlt></FaTrashAlt>
                </span>

              </div>
            ))
          }
          <hr></hr>
          <SubmitButton
            isSubmitting={this.props.isSubmitting}
          >

          </SubmitButton>
        </form>
      </>
    )
  }
}
