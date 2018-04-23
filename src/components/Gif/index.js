import React, { Component } from 'react';

class Gif extends Component {
  render() {
    return (
      <video
        className="gif"
        src={this.props.src['images']['original_mp4']['mp4']}
        autoPlay
        loop />
    );
  }
}

export default Gif;
