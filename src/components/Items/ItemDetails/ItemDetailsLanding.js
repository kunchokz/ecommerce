import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AddReview } from './AddReview/AddReview.component'
import { Details } from './Details/Details.component'
import { searchItem_ac } from './../../../actions/item.ac'

class ItemDetailsLandingComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }
  componentDidMount() {
    this.itemId = this.props.match.params['id'];
    // aciton file ko through fetch garne
    this.props.searchItem_ac({
      _id: this.itemId
    })

  }

  render() {
    return (
      <>
        <Details item={this.props.item}></Details>
        <hr />
        <AddReview itemId={this.itemId}></AddReview>
      </>
    )
  }
}
const mapStateToProps = rootStore => ({
  item: rootStore.item?.searchResults[0],
})

const mapDispatchToProps = dispatch => ({
  searchItem_ac: (params) => dispatch(searchItem_ac(params))
})

export const ItemDetailsLanding = connect(mapStateToProps, mapDispatchToProps)(ItemDetailsLandingComponent)

// connect
// mapStatetoProps
// mapDispatchtoProps
