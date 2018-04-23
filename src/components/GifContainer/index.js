import React, { Component } from 'react';
import Gif from './../Gif';

class GifContainer extends Component {
  render() {
    return (
      <div className="gifContainer">
        {this.props.gifs.map(gif => <Gif key={gif.id} src={gif} />)}
      </div>
    );
  }
}

export default GifContainer;
