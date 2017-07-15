import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  isPlaying: PropTypes.bool.isRequired,
};

class TogglePlayButton extends React.Component {
  constructor(props) {
    super(props);
    this.togglePlay = this.togglePlay.bind(this);
  }

  togglePlay() {
    const { isPlaying } = this.props;
    const audioElement = document.getElementById('audio');
    if (!audioElement) {
      return;
    }

    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
  }

  render() {
    const { isPlaying } = this.props;
    return (
      <div
        className={`toggle-play-button active ${(isPlaying ? 'is-playing' : '')}`}
        onClick={ this.togglePlay }
      >
        <i className="toggle-play-button-icon ion-radio-waves" />
        <i className="toggle-play-button-icon ion-ios-play" />
      </div>
    );
  }
}

TogglePlayButton.propTypes = propTypes;

export default TogglePlayButton;