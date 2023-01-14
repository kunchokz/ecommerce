import React, { Component } from 'react'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import { formatDate } from '../../../utils/date.util'
import { Loader } from '../../Common/Loader/Loader.component'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchItems_ac, removeItem_ac } from '../../../actions/item.ac'

const IMG_URL = process.env.REACT_APP_IMG_URL;

class ViewItemsComponent extends Component {

  componentDidMount() {
    console.log('props in view component >>', this.props)
    const { itemData } = this.props;
    if (itemData) {
      return this.setState({
        items: itemData
      })
    }
    this.props.fetch();
  }

  editItem = id => {
    this.props.history.push(`/edit_item/${id}`);
  }

  removeItem = (id) => {
    // ask for confirmation
    let confirmation = window.confirm('Are you sure to remove?');
    if (confirmation) {
      this.props.removeItem_ac(id)
    }
  }

  render() {
    let content = this.props.isLoading
      ? <Loader></Loader>
      : <table className="table">
        <thead>
          <tr>
            <th>S.N</th>
            <th>Name</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Created At</th>
            <th>Tags </th>
            <th>Images </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.props.items.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td> <Link to={`/item_details/${item._id}`}>{item.name}</Link> </td>
              <td>{item.category}</td>
              <td>{item.brand}</td>
              <td>{item.price}</td>
              <td>{formatDate(item.createdAt)}</td>
              <td>{(item.tags || []).join(',')}</td>
              <td>
                <img src={`${IMG_URL}${item.images[0]}`} alt="item_image.png" width="200px"></img>
              </td>
              <td>
                <FaPencilAlt
                  onClick={() => this.editItem(item._id)}
                  style={{ color: 'blue', cursor: 'pointer' }}
                >
                </FaPencilAlt> |
                <FaTrashAlt
                  onClick={() => this.removeItem(item._id)}
                  style={{ color: 'red', cursor: 'pointer' }}></FaTrashAlt>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    return (
      <>
        <h2>View Items</h2>
        {this.props.itemData && (
          <button className="btn btn-success" onClick={() => this.props.resetSearch()}>Search Again</button>
        )}
        {content}
      </>
    )
  }
}

// 1st argument of connect is 
// incoming data as an props inside component
const mapStateToProps = rootStore => ({
  isLoading: rootStore.item.isLoading,
  items: rootStore.item.items
})

// 2nd argument of connect is 
// outgoing actions from component
// const mapDispatchToProps = {
//   fetch: fetchItems_ac
// }
const mapDispatchToProps = dispatch => ({
  fetch: (condition) => dispatch(fetchItems_ac(condition)),
  removeItem_ac: (id) => dispatch(removeItem_ac(id))
})

// both configured options are availabe inside props in component
export const ViewItems = connect(mapStateToProps, mapDispatchToProps)(ViewItemsComponent)