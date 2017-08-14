import React from 'react';

class ModalLogin extends React.Component {
  render() {
    const onClickFunc = e => e.stopPropagation();
    return (
      <div className="modal-content" onClick={ onClickFunc }>
        <div className="modal-header">Sign into your Soundcloud Account</div>
        <div className="modal-body" />
        <div className="modal-footer" />
      </div>
    );
  }
}

export default ModalLogin;