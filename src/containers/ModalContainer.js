import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '../components/Modal';

const propTypes = {
  modal: PropTypes.string,
};

class ModalContainer extends React.Component {
  render() {
    if (!this.props.modal) {
      return <div />;
    }

    return <Modal { ...this.props } />
  }
}

ModalContainer.propTypes = propTypes;

function mapStateToProps(state) {
  const { modal } = state;
  return { modal };
}

export default connect(mapStateToProps)(ModalContainer);