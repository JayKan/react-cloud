import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
import MobilePlayerContent from './MobilePlayerContent';

const propTypes = {
  playingSongId: PropTypes.number,
};

class MobilePlayer extends React.Component {
  renderPlayerContent() {
    const { playingSongId } = this.props;
    if (playingSongId === null) {
      return <div />;
    }

    return <MobilePlayerContent { ...this.props } />;
  }

  render() {
    const { playingSongId } = this.props;
    const isSongPlaying = playingSongId !== null;
    return (
      <Motion style={{ height: spring(isSongPlaying ? 100 : 0) }}>
        {({ height }) =>
          <div className="mobile-player-container" style={{ height }}>
            { this.renderPlayerContent() }
          </div>
        }
      </Motion>
    );
  }
}

MobilePlayer.propTypes = propTypes;

export default MobilePlayer;