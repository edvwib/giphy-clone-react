import React, { Component } from 'react';
import './index.css';

class Controls extends Component {

  autoplayBtn;
  loopBtn;

  state = {
    autoplay: false,
    loop: true,
  }

  getSetting = (item) => {
    let setting = window.localStorage.getItem(item);
    if (setting === 'true' || setting === null) {
      return true;
    }
    return false;
  }

  setSetting = (item, settingIn, element) => {
    this.setButton(element, settingIn);
    if (settingIn) {
      window.localStorage.setItem(item, 'true');
      return;
    }
    window.localStorage.setItem(item, 'false');
  }

  setButton = (button, status) => {
    if (status) {
      button.classList.remove('active');
    } else {
      button.classList.add('active');
    }
  }

  componentDidMount = () => {
    this.autoplayBtn = document.querySelector('.play-pause-global');
    this.loopBtn = document.querySelector('.loop-container');

    this.setButton(this.autoplayBtn, this.getSetting('autoplay'));
    this.setButton(this.loopBtn, this.getSetting('loop'));

    this.setState({
      autoplay: this.getSetting('autoplay'),
      loop: this.getSetting('loop'),
    });

    this.autoplayBtn.addEventListener('click', () => {
      this.setSetting('autoplay', !this.getSetting('autoplay'), this.autoplayBtn);
      this.setState({ autoplay: this.getSetting('autoplay') });
    });
    this.loopBtn.addEventListener('click', () => {
      this.setSetting('loop', !this.getSetting('loop'), this.loopBtn);
      this.setState({loop: this.getSetting('loop')});
    });
  }

  render() {
    return (
      <div className="controls">
        <div className="play-pause-global" data-autoplaystate={this.state.autoplay} onClick={this.props.onclick}>
          <div className="play-global" data-autoplaystate={this.state.autoplay} title="Automatically play all gifs">▶</div>
          <div className="pause-global" data-autoplaystate={this.state.autoplay} title="Play gifs when hovering">&#10074;&#10074;</div>
        </div>
        <div className="loop-container" data-loopstate={this.state.loop} onClick={this.props.onclick} title="Loop GIF instead of pausing when done">
          <span role="img" aria-label="loop-icon" data-loopstate={this.state.loop} className="loop-global">&#8635;</span>
        </div>
      </div>
    );
  }
}

export default Controls;
