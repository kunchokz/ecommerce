import React from 'react'
import ImageGallery from 'react-image-gallery';
import ReactStarsRating from 'react-awesome-stars-rating';
import './Details.component.css'

const IMG_URL = process.env.REACT_APP_IMG_URL;


const getImages = (item) => {
  return (item.images || []).map((img, index) => ({
    original: `${IMG_URL}${img}`,
    thumbnail: `${IMG_URL}${img}`
  }))
}

export const Details = (props) => {
  const item = props.item || {};
  return (
    <>
      <h2>{item?.name} Details</h2>
      <div className="row">
        <div className="col-md-6">
          <ImageGallery items={getImages(item)} />
        </div>
        <div className="col-md-6 item-details">
          <p>Category :{item.category}</p>
          <p>Brand :{item.brand}</p>
          <p>Price :{item.price}</p>
          <p>Description :{item.description}</p>
          <p>...remaining data</p>
          {(item.reviews || []).map((review, index) => (
            <div key={index}>
              <h3>{review.user.email}</h3>
              <ReactStarsRating isEdit={false} value={review.point} />
              <p style={{ marginTop: '5px' }}>{review.message}</p>
            </div>
          ))}
        </div>
      </div>

    </>
  )
}
