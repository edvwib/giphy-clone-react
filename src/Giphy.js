import React, { Component } from 'react';
import './Giphy.css';
import Controls from './components/Controls';
import GifContainer from './components/GifContainer';
import SearchForm from './components/SearchForm';

class Giphy extends Component {

  //API
  apiKey = 'gPUGVC81TiJn8FV4ZTnfM32wji8sBltf';
  apiSearch = 'v1/gifs/search';
  apiTrending = 'v1/gifs/trending';

  lastResponseID = null;
  currentQuery = 'css';

  state = {
    query: 'css',
    limit: 5,
    search: true,
    autoplay: false,
    loop: true,
    gifs: [],
    responseID: null,
  }

  handleSettingsChange = (e) => {
    if (e.target.dataset.autoplayState) {
      this.setState({
        autoplay: e.target.dataset.autoplaystate,
      });
    }
    if (e.target.dataset.loopstate) {
      this.setState({
        loop: e.target.dataset.loopstate,
      });
    }
  }

  handleInputChange = (e) => {
    this.setState({
      query: e.target.value,
    });

    this.currentQuery = e.target.value;
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.fetchGifs();
  }

  fetchGifs = () => {
    let api = 'https://api.giphy.com/';
    if (this.state.search) {
      api += this.apiSearch +
        `?q=${this.state.query}` +
        `&limit=${this.state.limit}`;
    } else {
      api += this.apiTrending + `?limit=${this.state.limit}`;
    }
    api += `&api_key=${this.apiKey}`;

    fetch(api)
      .then(data => data.json())
      .then((json) => {
        this.setState({
          gifs: json.data,
          responseID: json.meta.response_id,
        });
      });
  }


  componentDidMount = () => {
    this.fetchGifs();

    this.setState({
      autoplay: window.localStorage.getItem('autoplay'),
      loop: window.localStorage.getItem('loop'),
    });
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if (this.currentQuery !== this.state.query)
      return true;

    if (this.lastResponseID === nextState.responseID)
      return false;

    return true;
  }

  componentDidUpdate = () => {
    this.lastResponseID = this.state.responseID;
    this.fetchGifs();

    console.log('updated');
  }

  render() {
    return (
      <div className="giphy">
        <Controls onclick={this.handleSettingsChange}/>
        <SearchForm onChange={this.handleInputChange} onSubmit={this.onSubmit}/>

        <GifContainer gifs={this.state.gifs} autoplay={this.state.autoplay} loop={this.state.loop}/>
      </div>
    );
  }
}

export default Giphy;
