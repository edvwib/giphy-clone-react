import React, { Component } from 'react';
import './index.css';

class SearchForm extends Component {
  render() {
    return (
      <form className="searchForm" onSubmit={this.props.onSubmit} method="GET">
        <img className="logo" src="assets/images/logo.gif" alt="giphy-logo"/>
        <label htmlFor="search">Search</label>
        <input type="search" name="search" id="search"
          onChange={this.props.onChange}
        />
      </form>
    );
  }
}

export default SearchForm;
