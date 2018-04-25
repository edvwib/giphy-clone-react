import React, { Component } from 'react';
import Gif from './../Gif';
import './index.css';

class GifContainer extends Component {
  render() {
    return (
      <div className="gifContainer">
        {
          this.props.gifs.map((gif, id) =>
            <Gif
              key={gif.id}
              src={gif}
              id={id}
              autoplay={this.props.autoplay}
              loop={this.props.loop}
            />
          )
        }
      </div>
    );
  }
}

export default GifContainer;
