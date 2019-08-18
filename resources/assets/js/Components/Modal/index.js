import React from 'react'
import ReactDOM from 'react-dom';

import './style.css';

export default ({title, isShowing, hide, children}) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className="modal fade show" tabIndex="-1" role="dialog" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={hide}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
    <div className="modal-backdrop fade show"></div>
  </React.Fragment>, document.body) : null;