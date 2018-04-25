import React, { Component } from 'react';
import './index.css';
import ReactPlayer from 'react-player'

class Gif extends Component {

  state = {
    autoplay: false,
    loop: true,
  }

  playPauseGif = (e) => {
    if (!this.state.autoplay) {
      e.target.paused ? e.target.play() : e.target.pause();
    }
  }

  componentDidMount = () => {
    this.setState({
      autoplay: this.props.autoplay,
      loop: this.props.loop,
    });
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if (nextProps.loop !== this.state.loop)
      return true;
    if (nextProps.autoplay !== this.state.autoplay)
      return true;

    return false;
  }

  componentDidUpdate = () => {
    console.log(JSON.parse(this.state.autoplay));

  }

  render() {
    return (
      <ReactPlayer
        className="gif"
        onMouseEnter={this.playPauseGif}
        onMouseLeave={this.playPauseGif}
        onClick={this.playPauseGif}
        url={this.props.src['images']['original_mp4']['mp4']}
        playing={JSON.parse(this.state.autoplay)}
        loop={JSON.parse(this.state.loop)}
      />
    )
  }
}

export default Gif;
