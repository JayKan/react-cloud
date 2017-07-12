import React from 'react';
import { connect } from 'react-redux';
import TogglePlayButton from '../components/TogglePlayButton';

class TogglePlayButtonContainer extends React.Component {
  render() {
    return <TogglePlayButton { ...this.props } />;
  }
}

function mapStateToProps(state) {
  const { player } = state;
  const { isPlaying } = player;

  return {
    isPlaying,
  };
}

export default connect(mapStateToProps)(TogglePlayButtonContainer);