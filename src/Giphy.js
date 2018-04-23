import React, { Component } from 'react';
import './Giphy.css';
import GifContainer from './components/GifContainer';
import Search from './components/Search';

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
    gifs: [],
    responseID: null,
  }

  handleInputChange = (e) => {
    this.setState({
      query: e.target.value,
    })

    this.currentQuery = e.target.value;
  };

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
        })
      });
  }


  componentDidMount = () => {
    this.fetchGifs();
  }

  shouldComponentUpdate = (nextState) => {
    if (this.currentQuery !== this.state.query)
      return true;

    if (this.lastResponseID === nextState.responseID)
      return false;

    return true;
  }

  componentDidUpdate = () => {
    this.lastResponseID = this.state.responseID;
    this.fetchGifs();
  }

  render() {
    return (
      <div className="giphy">
        <Search onChange={this.handleInputChange}/>

        <GifContainer gifs={this.state.gifs} />
      </div>
    );
  }
}

export default Giphy;
