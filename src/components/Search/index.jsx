import React, { Component } from 'react';

class Search extends Component {
  render() {
    return (
      <div className="searchForm">
        <label htmlFor="search">Search: </label>
        <input type="search" name="search" id="search"
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default Search;
