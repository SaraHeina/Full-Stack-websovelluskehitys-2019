import React from 'react'
import { connect } from 'react-redux'

const ErrorMessage = (props) => {
  const style = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (!props.errorMessage) { return null }
  return (
    <div style={style}>
      {props.errorMessage}
    </div>
  )
}

const mapStateToProps = (state) => ({
  errorMessage: state.errorMessage
})

export default connect(
  mapStateToProps
)(ErrorMessage)