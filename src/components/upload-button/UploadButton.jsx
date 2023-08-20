import React from 'react';
import './upload-button.css'
import PropTypes from 'prop-types'

const UploadButton = props => {
    return(
        <button className="uploadButton" onClick={props.onClick} > Upload Button</button>
    )
}

UploadButton.propTypes = {
    onClick: PropTypes.func
}

export default UploadButton;